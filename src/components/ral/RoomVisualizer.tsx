import { useRef, useState } from "react";
import { Paintbrush, RectangleHorizontal, DoorClosed, Image as ImageIcon, Upload, X, Download, Loader2 } from "lucide-react";
import { toPng } from "html-to-image";

type Surface = "muur" | "kozijn" | "deur" | "foto";
type Finish = "mat" | "zijdeglans" | "hoogglans";
type Blend = "multiply" | "overlay" | "soft-light" | "color" | "darken" | "lighten" | "screen" | "hard-light" | "luminosity";

const surfaces: { id: Surface; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "muur", label: "Muur", icon: Paintbrush },
  { id: "kozijn", label: "Kozijn", icon: RectangleHorizontal },
  { id: "deur", label: "Voordeur", icon: DoorClosed },
  { id: "foto", label: "Eigen foto", icon: ImageIcon },
];

const blendModes: { id: Blend; label: string; description: string }[] = [
  { id: "multiply", label: "Multiply", description: "Ideaal voor donkere muren en diepe kleuren" },
  { id: "overlay", label: "Overlay", description: "Past kleur op lichte en donkere plekken apart aan" },
  { id: "soft-light", label: "Soft Light", description: "Zachte, subtiele kleuring voor elk oppervlak" },
  { id: "hard-light", label: "Hard Light", description: "Sterk contrast, perfect voor heldere accenten" },
  { id: "color", label: "Color", description: "Behoudt structuur van de foto, kleurt tint over" },
  { id: "screen", label: "Screen", description: "Licht op, goed voor lichte muren en bewolkte lucht" },
  { id: "darken", label: "Darken", description: "Alleen donkerder, werkt goed bij hout en steen" },
  { id: "lighten", label: "Lighten", description: "Alleen lichter, ideaal voor kozijnen en details" },
  { id: "luminosity", label: "Luminosity", description: "Behoudt helderheid van foto, RAL als tint" },
];

const finishes: { id: Finish; label: string; sheen: string }[] = [
  { id: "mat", label: "Mat", sheen: "none" },
  { id: "zijdeglans", label: "Zijdeglans", sheen: "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 60%)" },
  { id: "hoogglans", label: "Hoogglans", sheen: "linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 55%)" },
];

export function RoomVisualizer({ hex, code, name }: { hex: string; code: string; name: string }) {
  const [surface, setSurface] = useState<Surface>("muur");
  const [finish, setFinish] = useState<Finish>("mat");
  const [userImage, setUserImage] = useState<string | null>(null);
  const [blend, setBlend] = useState<Blend>("multiply");
  const [opacity, setOpacity] = useState(0.85);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);

  const sheen = finishes.find((f) => f.id === finish)!.sheen;

  const handleExport = async () => {
    if (!stageRef.current) return;
    setExporting(true);
    try {
      const dataUrl = await toPng(stageRef.current, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: "#ffffff",
      });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `ral-${code}-${surface}-${finish}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error(err);
      alert("Exporteren is niet gelukt. Probeer het opnieuw.");
    } finally {
      setExporting(false);
    }
  };

  const handleFile = (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Kies een afbeelding (JPG, PNG of WEBP).");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      alert("Afbeelding is te groot. Max 8 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === "string") setUserImage(result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="border-t border-border bg-surface">
      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-accent">
              Interactief
            </span>
            <h2 className="mt-1 text-xl font-bold text-ink">
              Bekijk RAL {code} {name} in jouw ruimte
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-ink-soft">
              Kies een oppervlak en een glansgraad, of upload een eigen foto van jouw
              ruimte om de RAL-kleur erop te simuleren.
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="inline-flex rounded-lg border border-border bg-card p-1" role="tablist" aria-label="Oppervlak">
            {surfaces.map((s) => {
              const Icon = s.icon;
              const active = surface === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSurface(s.id)}
                  className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                    active ? "bg-accent text-accent-foreground" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {s.label}
                </button>
              );
            })}
          </div>

          <div className="inline-flex rounded-lg border border-border bg-card p-1" role="tablist" aria-label="Glansgraad">
            {finishes.map((f) => {
              const active = finish === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFinish(f.id)}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                    active ? "bg-ink text-background" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Stage */}
        <div
          className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]"
          role="img"
          aria-label={`Simulatie van RAL ${code} ${name} op ${surface} met ${finish} afwerking`}
        >
          <div className="relative h-[340px] w-full">
            {surface === "muur" && (
              <>
                <div className="absolute inset-0" style={{ backgroundColor: hex }} />
                {sheen !== "none" && <div className="absolute inset-0" style={{ background: sheen }} />}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-[#c9a87a] to-[#7e5e35]" />
                <div className="absolute inset-x-0 bottom-24 h-2 bg-white/85" />
                {/* art frame */}
                <div className="absolute left-12 top-12 h-32 w-24 rounded-sm border-[4px] border-white bg-white/15 shadow-lg" />
                {/* sofa */}
                <div className="absolute bottom-24 left-1/2 h-20 w-72 -translate-x-1/2 rounded-t-xl bg-[#efe7d7] shadow-md" />
                <div className="absolute bottom-32 left-[calc(50%-7rem)] h-8 w-10 rounded bg-[#cbb78d]" />
                <div className="absolute bottom-32 left-[calc(50%+4rem)] h-8 w-10 rounded bg-[#a78458]" />
                {/* lamp */}
                <div className="absolute right-14 top-0 h-14 w-px bg-white/40" />
                <div className="absolute right-10 top-12 h-4 w-10 rounded-b-full bg-white" />
              </>
            )}

            {surface === "kozijn" && (
              <>
                <div className="absolute inset-0 bg-[#efe9dc]" />
                {/* exterior wall hint */}
                <div className="absolute inset-x-0 bottom-0 h-6 bg-[#dad2c2]" />
                {/* kozijn frame */}
                <div
                  className="absolute left-1/2 top-10 h-[260px] w-[420px] -translate-x-1/2 rounded-md p-4 shadow-xl"
                  style={{ backgroundColor: hex }}
                >
                  {sheen !== "none" && <div className="absolute inset-0 rounded-md" style={{ background: sheen }} />}
                  <div className="relative grid h-full w-full grid-cols-2 gap-3">
                    <div className="rounded-sm bg-gradient-to-b from-[#cde0ec] to-[#9fb9c9]" />
                    <div className="rounded-sm bg-gradient-to-b from-[#cde0ec] to-[#9fb9c9]" />
                    <div className="rounded-sm bg-gradient-to-b from-[#b9cfdb] to-[#8aa6b6]" />
                    <div className="rounded-sm bg-gradient-to-b from-[#b9cfdb] to-[#8aa6b6]" />
                  </div>
                </div>
                {/* sill */}
                <div
                  className="absolute left-1/2 top-[268px] h-3 w-[440px] -translate-x-1/2 rounded-sm shadow"
                  style={{ backgroundColor: hex, filter: "brightness(0.92)" }}
                />
              </>
            )}

            {surface === "deur" && (
              <>
                <div className="absolute inset-0 bg-[#ece4d2]" />
                {/* bricks hint */}
                <div className="absolute inset-x-0 bottom-0 h-10 bg-[#b8a890]" />
                {/* door */}
                <div
                  className="absolute bottom-10 left-1/2 h-[260px] w-[150px] -translate-x-1/2 rounded-t-md border border-black/15 shadow-2xl"
                  style={{ backgroundColor: hex }}
                >
                  {sheen !== "none" && <div className="absolute inset-0 rounded-t-md" style={{ background: sheen }} />}
                  {/* panels */}
                  <div className="absolute inset-3 grid grid-rows-3 gap-2">
                    <div className="rounded-sm border border-white/20" />
                    <div className="rounded-sm border border-white/20" />
                    <div className="rounded-sm border border-white/20" />
                  </div>
                  {/* handle */}
                  <div className="absolute right-3 top-1/2 h-1.5 w-6 -translate-y-1/2 rounded-full bg-[#d7c98a] shadow" />
                </div>
                {/* doorstep */}
                <div className="absolute bottom-8 left-1/2 h-2 w-[170px] -translate-x-1/2 rounded bg-[#7d7160]" />
              </>
            )}

            {surface === "foto" && (
              <>
                {userImage ? (
                  <>
                    <img
                      src={userImage}
                      alt="Door bezoeker geüploade foto van eigen ruimte"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundColor: hex,
                        mixBlendMode: blend,
                        opacity,
                      }}
                      aria-hidden="true"
                    />
                    {sheen !== "none" && (
                      <div className="absolute inset-0 pointer-events-none" style={{ background: sheen }} />
                    )}
                    <button
                      type="button"
                      onClick={() => setUserImage(null)}
                      className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur transition hover:bg-black/80"
                      aria-label="Verwijder geüploade foto"
                    >
                      <X className="h-3 w-3" /> Verwijder foto
                    </button>
                  </>
                ) : (
                  <label
                    htmlFor="ral-photo-upload"
                    className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-3 bg-[#f5f0e6] text-center transition hover:bg-[#ede6d6]"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      handleFile(e.dataTransfer.files?.[0] ?? null);
                    }}
                  >
                    <div className="rounded-full bg-accent/10 p-4 text-accent">
                      <Upload className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-ink">Upload een foto van jouw ruimte</div>
                      <div className="mt-1 text-xs text-ink-soft">
                        JPG, PNG of WEBP · max 8 MB · sleep een bestand hierheen of klik om te kiezen
                      </div>
                    </div>
                    <input
                      ref={fileInputRef}
                      id="ral-photo-upload"
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      className="sr-only"
                      onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                    />
                  </label>
                )}
              </>
            )}
          </div>

          {/* Foto-modus controls */}
          {surface === "foto" && userImage && (
            <div className="grid gap-3 border-t border-border bg-surface px-4 py-3 sm:grid-cols-[1.4fr_1fr]">
              <label className="flex flex-col gap-1 text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
                Blend-modus
                <select
                  value={blend}
                  onChange={(e) => setBlend(e.target.value as Blend)}
                  className="rounded-md border border-border bg-card px-2 py-1.5 text-xs font-medium text-ink"
                  aria-label="Blend-modus voor kleuroverlay"
                >
                  {blendModes.map((b) => (
                    <option key={b.id} value={b.id}>{b.label} — {b.description}</option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1 text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
                Dekking: {Math.round(opacity * 100)}%
                <input
                  type="range"
                  min={0.2}
                  max={1}
                  step={0.05}
                  value={opacity}
                  onChange={(e) => setOpacity(parseFloat(e.target.value))}
                  className="accent-accent"
                  aria-label="Dekking van de kleur"
                />
              </label>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3 text-xs text-ink-soft">
            <span>
              <span className="font-semibold text-ink">RAL {code} {name}</span> ·{" "}
              {surface === "muur"
                ? "Binnenmuur"
                : surface === "kozijn"
                ? "Kozijn met glas"
                : surface === "deur"
                ? "Voordeur"
                : "Eigen foto"}{" "}
              · {finish}
            </span>
            <span className="font-mono">{hex.toUpperCase()}</span>
          </div>
        </div>

        <p className="mt-3 text-[11px] text-ink-soft">
          Indicatieve weergave op basis van de HEX-waarde. Werkelijke kleur kan licht
          afwijken door beeldscherm, lichtinval en ondergrond — vraag altijd een proefpotje aan.
        </p>
      </div>
    </section>
  );
}
