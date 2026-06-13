import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Lock, Truck, ShieldCheck, CreditCard, ArrowLeft, Check } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/catalog";

export const Route = createFileRoute("/afrekenen")({
  head: () => ({
    meta: [
      { title: "Afrekenen | Nieuweverf" },
      { name: "description", content: "Reken veilig en snel af. Verzending vanaf €50 gratis." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: CheckoutPage,
});

type Step = 1 | 2 | 3;

const PAYMENT_METHODS = [
  { id: "ideal", label: "iDEAL", desc: "Direct via je eigen bank" },
  { id: "bancontact", label: "Bancontact", desc: "Voor Belgische klanten" },
  { id: "card", label: "Creditcard", desc: "Visa, Mastercard, Amex" },
  { id: "paypal", label: "PayPal", desc: "Betaal met je PayPal-account" },
  { id: "invoice", label: "Achteraf betalen", desc: "Klarna — binnen 14 dagen" },
] as const;

const SHIPPING_OPTIONS = [
  { id: "standard", label: "Standaard bezorging", desc: "Voor 23:00 besteld, morgen in huis", price: 0, freeFrom: 50 },
  { id: "evening", label: "Avondbezorging", desc: "Tussen 18:00 en 22:00", price: 6.95 },
  { id: "pickup", label: "Afhalen in winkel", desc: "Klaar binnen 2 uur — Amsterdam", price: 0 },
] as const;

function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [shipping, setShipping] = useState<typeof SHIPPING_OPTIONS[number]["id"]>("standard");
  const [payment, setPayment] = useState<typeof PAYMENT_METHODS[number]["id"]>("ideal");

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    street: "",
    house: "",
    postal: "",
    city: "",
    country: "Nederland",
    company: "",
    note: "",
    newsletter: true,
    terms: false,
  });

  const shippingOption = SHIPPING_OPTIONS.find((s) => s.id === shipping)!;
  const shippingCost = useMemo(() => {
    if (shippingOption.id === "standard" && subtotal >= (shippingOption.freeFrom ?? Infinity)) return 0;
    return shippingOption.price;
  }, [shippingOption, subtotal]);
  const total = subtotal + shippingCost;

  function setField<K extends keyof typeof form>(key: K, val: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  const step1Valid =
    form.email.includes("@") &&
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.street.trim() &&
    form.house.trim() &&
    /^\d{4}\s?[A-Za-z]{2}$/.test(form.postal.trim()) &&
    form.city.trim();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-md rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
            <h1 className="text-2xl font-extrabold text-ink">Je winkelwagen is leeg</h1>
            <p className="mt-2 text-sm text-ink-soft">Voeg eerst producten toe voordat je afrekent.</p>
            <Link to="/" className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-accent-foreground hover:bg-accent-strong">
              Verder winkelen
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  function placeOrder() {
    if (!form.terms) return;
    const ref = "VOW-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    const summary = {
      ref,
      email: form.email,
      name: `${form.firstName} ${form.lastName}`,
      address: `${form.street} ${form.house}, ${form.postal.toUpperCase()} ${form.city}`,
      shipping: shippingOption.label,
      payment: PAYMENT_METHODS.find((p) => p.id === payment)!.label,
      subtotal,
      shippingCost,
      total,
      itemCount: items.reduce((a, b) => a + b.quantity, 0),
    };
    try {
      sessionStorage.setItem("vow-last-order", JSON.stringify(summary));
    } catch {
      // ignore
    }
    clear();
    navigate({ to: "/bestelling-bevestigd", search: { ref } });
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <nav className="text-xs text-ink-soft">
          <Link to="/" className="hover:text-accent">Home</Link>
          <span className="mx-1">/</span>
          <Link to="/winkelwagen" className="hover:text-accent">Winkelwagen</Link>
          <span className="mx-1">/</span>
          <span className="text-ink">Afrekenen</span>
        </nav>

        <div className="mt-4 flex items-center justify-between gap-4">
          <h1 className="text-3xl font-extrabold text-ink md:text-4xl">Afrekenen</h1>
          <div className="hidden items-center gap-2 text-xs text-ink-soft sm:flex">
            <Lock className="h-4 w-4 text-accent" /> SSL-versleutelde verbinding
          </div>
        </div>

        {/* Steps */}
        <ol className="mt-6 flex items-center gap-3 text-xs font-semibold">
          {[
            { n: 1, label: "Gegevens" },
            { n: 2, label: "Verzending" },
            { n: 3, label: "Betaling" },
          ].map((s) => {
            const done = step > s.n;
            const current = step === s.n;
            return (
              <li key={s.n} className="flex items-center gap-2">
                <span
                  className={`grid h-7 w-7 place-items-center rounded-full border text-xs ${
                    done
                      ? "border-accent bg-accent text-accent-foreground"
                      : current
                      ? "border-accent text-accent"
                      : "border-border text-ink-soft"
                  }`}
                >
                  {done ? <Check className="h-4 w-4" /> : s.n}
                </span>
                <span className={current ? "text-ink" : "text-ink-soft"}>{s.label}</span>
                {s.n < 3 && <span className="ml-2 h-px w-6 bg-border sm:w-12" />}
              </li>
            );
          })}
        </ol>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Main column */}
          <section>
            {step === 1 && (
              <div className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
                <div>
                  <h2 className="text-lg font-bold text-ink">Contact</h2>
                  <p className="text-xs text-ink-soft">Je ontvangt hier je bestelbevestiging.</p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <Field label="E-mail" required>
                      <input type="email" value={form.email} onChange={(e) => setField("email", e.target.value)} className={inputCls} placeholder="jij@voorbeeld.nl" />
                    </Field>
                    <Field label="Telefoon">
                      <input type="tel" value={form.phone} onChange={(e) => setField("phone", e.target.value)} className={inputCls} placeholder="06 12 34 56 78" />
                    </Field>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h2 className="text-lg font-bold text-ink">Bezorgadres</h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <Field label="Voornaam" required>
                      <input value={form.firstName} onChange={(e) => setField("firstName", e.target.value)} className={inputCls} />
                    </Field>
                    <Field label="Achternaam" required>
                      <input value={form.lastName} onChange={(e) => setField("lastName", e.target.value)} className={inputCls} />
                    </Field>
                    <Field label="Bedrijf (optioneel)" className="sm:col-span-2">
                      <input value={form.company} onChange={(e) => setField("company", e.target.value)} className={inputCls} />
                    </Field>
                    <Field label="Straat" required className="sm:col-span-2">
                      <input value={form.street} onChange={(e) => setField("street", e.target.value)} className={inputCls} />
                    </Field>
                    <Field label="Huisnummer" required>
                      <input value={form.house} onChange={(e) => setField("house", e.target.value)} className={inputCls} />
                    </Field>
                    <Field label="Postcode" required>
                      <input value={form.postal} onChange={(e) => setField("postal", e.target.value)} className={inputCls} placeholder="1234 AB" />
                    </Field>
                    <Field label="Plaats" required>
                      <input value={form.city} onChange={(e) => setField("city", e.target.value)} className={inputCls} />
                    </Field>
                    <Field label="Land">
                      <select value={form.country} onChange={(e) => setField("country", e.target.value)} className={inputCls}>
                        <option>Nederland</option>
                        <option>België</option>
                        <option>Duitsland</option>
                      </select>
                    </Field>
                  </div>
                  <label className="mt-4 flex cursor-pointer items-start gap-2 text-sm text-ink">
                    <input type="checkbox" checked={form.newsletter} onChange={(e) => setField("newsletter", e.target.checked)} className="mt-0.5 h-4 w-4 accent-accent" />
                    Houd me op de hoogte van nieuwe kleuren en acties.
                  </label>
                </div>

                <div className="flex items-center justify-between border-t border-border pt-4">
                  <Link to="/winkelwagen" className="inline-flex items-center gap-1 text-sm text-ink-soft hover:text-accent">
                    <ArrowLeft className="h-4 w-4" /> Terug naar winkelwagen
                  </Link>
                  <button
                    type="button"
                    disabled={!step1Valid}
                    onClick={() => setStep(2)}
                    className="rounded-md bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-accent-foreground hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Door naar verzending
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
                <div>
                  <h2 className="text-lg font-bold text-ink">Verzendmethode</h2>
                  <p className="text-xs text-ink-soft">Kies hoe je je bestelling wilt ontvangen.</p>
                </div>
                <div className="space-y-3">
                  {SHIPPING_OPTIONS.map((opt) => {
                    const cost = opt.id === "standard" && subtotal >= (opt.freeFrom ?? Infinity) ? 0 : opt.price;
                    const active = shipping === opt.id;
                    return (
                      <label
                        key={opt.id}
                        className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition ${active ? "border-accent bg-accent/5" : "border-border hover:border-accent/60"}`}
                      >
                        <input type="radio" name="shipping" checked={active} onChange={() => setShipping(opt.id)} className="mt-1 h-4 w-4 accent-accent" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-ink">{opt.label}</span>
                            <span className="text-sm font-bold text-ink">{cost === 0 ? "Gratis" : formatPrice(cost)}</span>
                          </div>
                          <div className="text-xs text-ink-soft">{opt.desc}</div>
                        </div>
                      </label>
                    );
                  })}
                </div>

                <Field label="Bezorginstructie (optioneel)">
                  <textarea
                    value={form.note}
                    onChange={(e) => setField("note", e.target.value)}
                    rows={2}
                    className={inputCls}
                    placeholder="Bijv. afleveren bij de buren"
                  />
                </Field>

                <div className="flex items-center justify-between border-t border-border pt-4">
                  <button type="button" onClick={() => setStep(1)} className="inline-flex items-center gap-1 text-sm text-ink-soft hover:text-accent">
                    <ArrowLeft className="h-4 w-4" /> Terug
                  </button>
                  <button type="button" onClick={() => setStep(3)} className="rounded-md bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-accent-foreground hover:bg-accent-strong">
                    Door naar betaling
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
                <div>
                  <h2 className="text-lg font-bold text-ink">Betaalmethode</h2>
                  <p className="text-xs text-ink-soft">Alle betalingen verlopen via een beveiligde verbinding.</p>
                </div>
                <div className="space-y-2">
                  {PAYMENT_METHODS.map((m) => {
                    const active = payment === m.id;
                    return (
                      <label
                        key={m.id}
                        className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition ${active ? "border-accent bg-accent/5" : "border-border hover:border-accent/60"}`}
                      >
                        <input type="radio" name="payment" checked={active} onChange={() => setPayment(m.id)} className="h-4 w-4 accent-accent" />
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-ink">{m.label}</div>
                          <div className="text-xs text-ink-soft">{m.desc}</div>
                        </div>
                        <CreditCard className="h-4 w-4 text-ink-soft" />
                      </label>
                    );
                  })}
                </div>

                <label className="flex cursor-pointer items-start gap-2 rounded-lg border border-border bg-surface p-3 text-sm text-ink">
                  <input type="checkbox" checked={form.terms} onChange={(e) => setField("terms", e.target.checked)} className="mt-0.5 h-4 w-4 accent-accent" />
                  <span>
                    Ik ga akkoord met de <Link to="/" className="text-accent hover:underline">algemene voorwaarden</Link> en het retourbeleid.
                  </span>
                </label>

                <div className="flex items-center justify-between border-t border-border pt-4">
                  <button type="button" onClick={() => setStep(2)} className="inline-flex items-center gap-1 text-sm text-ink-soft hover:text-accent">
                    <ArrowLeft className="h-4 w-4" /> Terug
                  </button>
                  <button
                    type="button"
                    disabled={!form.terms}
                    onClick={placeOrder}
                    className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-accent-foreground hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Lock className="h-4 w-4" /> Bestelling plaatsen — {formatPrice(total)}
                  </button>
                </div>
              </div>
            )}

            <ul className="mt-6 grid grid-cols-1 gap-3 text-xs text-ink-soft sm:grid-cols-3">
              <li className="flex items-center gap-2 rounded-lg border border-border bg-surface p-3"><ShieldCheck className="h-4 w-4 text-accent" /> 14 dagen retourrecht</li>
              <li className="flex items-center gap-2 rounded-lg border border-border bg-surface p-3"><Truck className="h-4 w-4 text-accent" /> Gratis verzending vanaf €50</li>
              <li className="flex items-center gap-2 rounded-lg border border-border bg-surface p-3"><Lock className="h-4 w-4 text-accent" /> Veilig betalen</li>
            </ul>
          </section>

          {/* Order summary */}
          <aside className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] lg:sticky lg:top-32 lg:self-start">
            <h2 className="text-lg font-bold text-ink">Je bestelling</h2>
            <ul className="mt-4 max-h-72 space-y-3 overflow-y-auto pr-1">
              {items.map((it) => (
                <li key={it.productId} className="flex items-start gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-surface">
                    <img src={it.image} alt={it.name} className="h-full w-full object-contain" />
                    <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-ink px-1 text-[10px] font-bold text-background">{it.quantity}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] uppercase tracking-wider text-ink-soft">{it.brand}</div>
                    <div className="truncate text-sm font-semibold text-ink">{it.name}</div>
                    {it.volume && <div className="text-xs text-ink-soft">{it.volume}</div>}
                  </div>
                  <div className="text-sm font-semibold text-ink">{formatPrice(it.price * it.quantity)}</div>
                </li>
              ))}
            </ul>

            <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex justify-between text-ink"><span>Subtotaal</span><span className="font-semibold">{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between text-ink"><span>Verzending</span><span className="font-semibold">{shippingCost === 0 ? "Gratis" : formatPrice(shippingCost)}</span></div>
              <div className="text-xs text-ink-soft">Incl. 21% btw</div>
            </div>
            <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
              <span className="text-sm font-bold text-ink">Totaal</span>
              <span className="text-2xl font-extrabold text-ink">{formatPrice(total)}</span>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}

const inputCls =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-ink placeholder:text-ink-soft focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";

function Field({ label, children, required, className }: { label: string; children: React.ReactNode; required?: boolean; className?: string }) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="mb-1 block text-xs font-semibold text-ink">
        {label} {required && <span className="text-destructive">*</span>}
      </span>
      {children}
    </label>
  );
}
