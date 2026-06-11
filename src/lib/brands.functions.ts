import { createServerFn } from "@tanstack/react-start";

export type PublicBrand = {
  id: string;
  name: string;
  slug: string;
  category: string;
  link_url: string | null;
  logo_url: string | null;
  sort_order: number;
};

export const getVisibleBrands = createServerFn({ method: "GET" }).handler(
  async (): Promise<PublicBrand[]> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("brands")
      .select("id,name,slug,category,link_url,logo_path,sort_order")
      .eq("visible", true)
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true });
    if (error) throw new Error(error.message);

    const rows = data ?? [];
    const paths = rows.map((r) => r.logo_path).filter((p): p is string => !!p);
    const urlMap = new Map<string, string>();
    if (paths.length > 0) {
      const { data: signed } = await supabaseAdmin.storage
        .from("brand-logos")
        .createSignedUrls(paths, 60 * 60 * 24 * 365);
      for (const s of signed ?? []) {
        if (s.path && s.signedUrl) urlMap.set(s.path, s.signedUrl);
      }
    }

    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      slug: r.slug,
      category: r.category,
      link_url: r.link_url,
      sort_order: r.sort_order,
      logo_url: r.logo_path ? urlMap.get(r.logo_path) ?? null : null,
    }));
  },
);
