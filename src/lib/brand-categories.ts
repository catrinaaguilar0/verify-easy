export const BRAND_CATEGORIES = [
  { value: "muurverf", label: "Muurverf" },
  { value: "lakverf", label: "Lakverf" },
  { value: "beits", label: "Beits" },
  { value: "grondverf", label: "Grondverf" },
  { value: "houtolie", label: "Houtolie" },
  { value: "reinigers", label: "Reinigers" },
  { value: "overig", label: "Overig" },
] as const;

export type BrandCategory = (typeof BRAND_CATEGORIES)[number]["value"];

export function categoryLabel(value: string): string {
  return BRAND_CATEGORIES.find((c) => c.value === value)?.label ?? value;
}
