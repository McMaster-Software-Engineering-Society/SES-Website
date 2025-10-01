export type MerchCsvItem = {
  id: string;
  name: string;
  category?: string;
  price?: number;
  image?: string;
  sizes: Record<string, number>;
  // Include any other arbitrary columns for flexibility
  [key: string]: unknown;
};
function normalizeHeader(header: string) {
  return header
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}
function normalizeSizeKey(
  header: string,
): "small" | "medium" | "large" | "xlarge" | undefined {
  const h = normalizeHeader(header);
  if (h === "s" || h === "sm" || h === "small") return "small";
  if (h === "m" || h === "md" || h === "medium") return "medium";
  if (h === "l" || h === "lg" || h === "large") return "large";
  if (h === "xl" || h === "xlarge" || h === "xlarge") return "xlarge";
  return undefined;
}
export async function fetchMerchData(): Promise<MerchCsvItem[]> {
  const res = await fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQiwePOTZKA4Afa4q5smmAQL2UKPSeCvYVImhMbW_LpdRZOYLM4FImRyvfxu6tnbLMSZziBunGxuGgV/pub?output=csv",
  );
  const text = await res.text();
  const lines = text.trim().split("\n");
  if (lines.length === 0) return [];
  const headers = lines[0].split(",");
  return lines.slice(1).map((line) => {
    const values = line.split(",");
    const row: Record<string, string> = {};
    headers.forEach((h, i) => {
      row[h] = values[i] ?? "";
    });
    // Build item using normalized headers
    const item: MerchCsvItem = {
      id: "",
      name: "",
      category: undefined,
      price: undefined,
      image: undefined,
      sizes: {},
    };
    headers.forEach((h) => {
      const normalized = normalizeHeader(h);
      const raw = row[h];
      // Map known columns
      if (!item.id && (normalized === "id" || normalized === "itemid")) {
        item.id = raw;
        return;
      }
      if (
        !item.name &&
        (normalized === "name" ||
          normalized === "itemname" ||
          normalized === "title")
      ) {
        item.name = raw;
        return;
      }
      if (
        !item.category &&
        (normalized === "category" || normalized === "type")
      ) {
        item.category = raw;
        return;
      }
      if (
        item.price === undefined &&
        (normalized === "price" || normalized === "cost")
      ) {
        const n = parseFloat(raw);
        if (!Number.isNaN(n)) item.price = n;
        return;
      }
      if (
        !item.image &&
        (normalized === "image" ||
          normalized === "imageurl" ||
          normalized === "img")
      ) {
        item.image = raw;
        return;
      }
      // Map size-like columns
      const sizeKey = normalizeSizeKey(h);
      if (sizeKey) {
        const qty = parseInt(raw, 10);
        item.sizes[sizeKey] =
          Number.isFinite(qty) && !Number.isNaN(qty) ? qty : 0;
        return;
      }
      // Preserve any other columns
      item[normalized] = raw;
    });
    // Fallbacks
    if (!item.id) item.id = item.name || JSON.stringify(row);
    if (!item.image) item.image = "/merch/clothing-example.png";
    return item;
  });
}
