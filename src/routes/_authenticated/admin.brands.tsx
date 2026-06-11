import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { BRAND_CATEGORIES, type BrandCategory, categoryLabel } from "@/lib/brand-categories";
import { toast } from "sonner";
import { ArrowDown, ArrowUp, Eye, EyeOff, LogOut, Plus, Trash2, Upload } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/brands")({
  head: () => ({
    meta: [
      { title: "Merken beheren" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminBrandsPage,
});

type BrandRow = {
  id: string;
  name: string;
  slug: string;
  category: BrandCategory;
  logo_path: string | null;
  link_url: string | null;
  sort_order: number;
  visible: boolean;
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function getSignedUrls(paths: string[]): Promise<Record<string, string>> {
  const out: Record<string, string> = {};
  if (paths.length === 0) return out;
  const { data } = await supabase.storage
    .from("brand-logos")
    .createSignedUrls(paths, 60 * 60);
  for (const s of data ?? []) {
    if (s.path && s.signedUrl) out[s.path] = s.signedUrl;
  }
  return out;
}

function AdminBrandsPage() {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      setUserEmail(u.user?.email ?? null);
      if (!u.user) return setIsAdmin(false);
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", u.user.id)
        .eq("role", "admin")
        .maybeSingle();
      setIsAdmin(!!data);
    })();
  }, []);

  const brandsQuery = useQuery({
    queryKey: ["admin-brands"],
    enabled: isAdmin === true,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("brands")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("name", { ascending: true });
      if (error) throw error;
      const rows = (data ?? []) as BrandRow[];
      const paths = rows.map((r) => r.logo_path).filter((p): p is string => !!p);
      const urls = await getSignedUrls(paths);
      return rows.map((r) => ({ ...r, logo_url: r.logo_path ? urls[r.logo_path] : null }));
    },
  });

  const refresh = () => qc.invalidateQueries({ queryKey: ["admin-brands"] });

  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState<string>("muurverf");
  const [creating, setCreating] = useState(false);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    setCreating(true);
    try {
      const maxSort = Math.max(0, ...(brandsQuery.data ?? []).map((b) => b.sort_order));
      const { error } = await supabase.from("brands").insert({
        name: newName.trim(),
        slug: slugify(newName) || crypto.randomUUID().slice(0, 8),
        category: newCategory as BrandRow["category"],
        sort_order: maxSort + 10,
        visible: true,
      });
      if (error) throw error;
      setNewName("");
      toast.success("Merk toegevoegd");
      refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Kon merk niet toevoegen");
    } finally {
      setCreating(false);
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (isAdmin === null) {
    return <div className="grid min-h-screen place-items-center">Bezig met laden…</div>;
  }

  if (!isAdmin) {
    return (
      <div className="grid min-h-screen place-items-center bg-surface px-4">
        <div className="max-w-md rounded-xl border border-border bg-background p-8 text-center">
          <h1 className="text-xl font-bold text-ink">Geen toegang</h1>
          <p className="mt-2 text-sm text-ink-soft">
            Je bent ingelogd als <strong>{userEmail}</strong>, maar je hebt geen admin-rechten.
            Vraag een beheerder om je de admin-rol toe te kennen.
          </p>
          <p className="mt-3 text-xs text-ink-soft">
            Je gebruikers-ID staat hieronder; geef deze door aan een admin om je rol toe te voegen.
          </p>
          <code className="mt-2 block break-all rounded bg-surface p-2 text-xs">
            <UserIdDisplay />
          </code>
          <div className="mt-6 flex justify-center gap-3">
            <Button variant="outline" onClick={handleSignOut}>
              Uitloggen
            </Button>
            <Link to="/" className="inline-flex items-center text-sm text-accent">
              ← Naar website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-border bg-background">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-xl font-bold text-ink">Merken beheren</h1>
            <p className="text-xs text-ink-soft">Ingelogd als {userEmail}</p>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="text-sm text-ink-soft hover:text-ink">
              Website bekijken
            </Link>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="mr-1 h-4 w-4" /> Uitloggen
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-8 rounded-xl border border-border bg-background p-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-ink">
            Nieuw merk toevoegen
          </h2>
          <form
            onSubmit={handleCreate}
            className="mt-4 grid gap-3 sm:grid-cols-[1fr,200px,auto]"
          >
            <div>
              <Label htmlFor="brand-name">Naam</Label>
              <Input
                id="brand-name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Bijv. Boonstoppel"
                maxLength={80}
                required
              />
            </div>
            <div>
              <Label htmlFor="brand-category">Categorie</Label>
              <Select value={newCategory} onValueChange={setNewCategory}>
                <SelectTrigger id="brand-category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BRAND_CATEGORIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button type="submit" disabled={creating} className="w-full">
                <Plus className="mr-1 h-4 w-4" />
                Toevoegen
              </Button>
            </div>
          </form>
        </section>

        <section>
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-ink">
            Alle merken ({brandsQuery.data?.length ?? 0})
          </h2>
          {brandsQuery.isLoading && <p className="text-sm text-ink-soft">Laden…</p>}
          {brandsQuery.isError && (
            <p className="text-sm text-destructive">Fout bij laden: {String(brandsQuery.error)}</p>
          )}
          <div className="space-y-3">
            {(brandsQuery.data ?? []).map((b, i, arr) => (
              <BrandRowCard
                key={b.id}
                brand={b}
                isFirst={i === 0}
                isLast={i === arr.length - 1}
                neighbours={arr}
                onChanged={refresh}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function UserIdDisplay() {
  const [id, setId] = useState("…");
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setId(data.user?.id ?? "—"));
  }, []);
  return <>{id}</>;
}

type BrandWithUrl = BrandRow & { logo_url: string | null };

function BrandRowCard({
  brand,
  isFirst,
  isLast,
  neighbours,
  onChanged,
}: {
  brand: BrandWithUrl;
  isFirst: boolean;
  isLast: boolean;
  neighbours: BrandWithUrl[];
  onChanged: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const [editName, setEditName] = useState(brand.name);
  const [editCategory, setEditCategory] = useState(brand.category);
  const [editLink, setEditLink] = useState(brand.link_url ?? "");
  const dirty = useMemo(
    () =>
      editName !== brand.name ||
      editCategory !== brand.category ||
      (editLink || null) !== (brand.link_url || null),
    [editName, editCategory, editLink, brand],
  );

  async function update(patch: Partial<BrandRow>) {
    setBusy(true);
    try {
      const { error } = await supabase.from("brands").update(patch).eq("id", brand.id);
      if (error) throw error;
      onChanged();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Kon niet opslaan");
    } finally {
      setBusy(false);
    }
  }

  async function handleUpload(file: File) {
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Maximaal 2 MB per logo");
      return;
    }
    setBusy(true);
    try {
      const ext = file.name.split(".").pop()?.toLowerCase() || "png";
      const path = `${brand.slug}-${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("brand-logos")
        .upload(path, file, { contentType: file.type, upsert: false });
      if (upErr) throw upErr;
      // delete old
      if (brand.logo_path) {
        await supabase.storage.from("brand-logos").remove([brand.logo_path]);
      }
      const { error } = await supabase
        .from("brands")
        .update({ logo_path: path })
        .eq("id", brand.id);
      if (error) throw error;
      toast.success("Logo geüpload");
      onChanged();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload mislukt");
    } finally {
      setBusy(false);
    }
  }

  async function move(direction: -1 | 1) {
    const idx = neighbours.findIndex((n) => n.id === brand.id);
    const swap = neighbours[idx + direction];
    if (!swap) return;
    setBusy(true);
    try {
      const { error: e1 } = await supabase
        .from("brands")
        .update({ sort_order: swap.sort_order })
        .eq("id", brand.id);
      const { error: e2 } = await supabase
        .from("brands")
        .update({ sort_order: brand.sort_order })
        .eq("id", swap.id);
      if (e1 || e2) throw e1 || e2;
      onChanged();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Kon volgorde niet wijzigen");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete() {
    setBusy(true);
    try {
      if (brand.logo_path) {
        await supabase.storage.from("brand-logos").remove([brand.logo_path]);
      }
      const { error } = await supabase.from("brands").delete().eq("id", brand.id);
      if (error) throw error;
      toast.success("Merk verwijderd");
      onChanged();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Kon niet verwijderen");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <div className="grid gap-4 md:grid-cols-[120px,1fr,auto]">
        <div className="grid h-24 place-items-center rounded-lg border border-border bg-surface p-2">
          {brand.logo_url ? (
            <img
              src={brand.logo_url}
              alt={brand.name}
              className="max-h-full max-w-full object-contain"
            />
          ) : (
            <span className="text-xs text-ink-soft">Geen logo</span>
          )}
        </div>

        <div className="space-y-2">
          <div className="grid gap-2 sm:grid-cols-[1fr,180px]">
            <div>
              <Label className="text-xs">Naam</Label>
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                maxLength={80}
              />
            </div>
            <div>
              <Label className="text-xs">Categorie ({categoryLabel(brand.category)})</Label>
              <Select value={editCategory} onValueChange={setEditCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BRAND_CATEGORIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label className="text-xs">Doel-URL (optioneel)</Label>
            <Input
              value={editLink}
              onChange={(e) => setEditLink(e.target.value)}
              placeholder="https://…"
              type="url"
              maxLength={500}
            />
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm hover:border-accent">
              <Upload className="h-4 w-4" />
              {brand.logo_path ? "Logo vervangen" : "Logo uploaden"}
              <input
                type="file"
                className="hidden"
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                disabled={busy}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void handleUpload(f);
                  e.target.value = "";
                }}
              />
            </label>
            <div className="inline-flex items-center gap-2 text-sm">
              <Switch
                checked={brand.visible}
                disabled={busy}
                onCheckedChange={(v) => update({ visible: v })}
              />
              {brand.visible ? (
                <span className="inline-flex items-center gap-1 text-ink-soft">
                  <Eye className="h-4 w-4" /> Zichtbaar
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-ink-soft">
                  <EyeOff className="h-4 w-4" /> Verborgen
                </span>
              )}
            </div>
            {dirty && (
              <Button
                size="sm"
                disabled={busy}
                onClick={() =>
                  update({
                    name: editName.trim(),
                    category: editCategory as BrandRow["category"],
                    link_url: editLink.trim() || null,
                  })
                }
              >
                Opslaan
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end justify-between gap-2">
          <div className="flex gap-1">
            <Button
              size="icon"
              variant="outline"
              disabled={busy || isFirst}
              onClick={() => move(-1)}
              aria-label="Omhoog"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              disabled={busy || isLast}
              onClick={() => move(1)}
              aria-label="Omlaag"
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="sm" variant="ghost" className="text-destructive">
                <Trash2 className="mr-1 h-4 w-4" /> Verwijderen
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Merk "{brand.name}" verwijderen?</AlertDialogTitle>
                <AlertDialogDescription>
                  Het logo wordt ook verwijderd. Deze actie kan niet ongedaan worden gemaakt.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuleren</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Verwijderen</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
