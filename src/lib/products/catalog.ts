import type { SupabaseClient } from "@supabase/supabase-js";
import { unstable_noStore as noStore } from "next/cache";
import { Product, type Occasion, type Style } from "@/types";
import type { Database, ProductRow } from "@/lib/supabase/database";
import { getServerSupabaseClient } from "@/lib/supabase/server";

function normalizeStringArray(values: unknown): string[] {
  if (!Array.isArray(values)) {
    return [];
  }

  return values.filter((value): value is string => typeof value === "string");
}

export function rowToProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    price: Number(row.price),
    category: row.category,
    description: row.description,
    images: normalizeStringArray(row.images),
    stock: Number(row.stock ?? 0),
    details: normalizeStringArray(row.details),
    tags: normalizeStringArray(row.tags),
    olfactoryNotes: row.olfactory_notes ?? undefined,
    intensity: row.intensity ?? undefined,
    fixation: row.fixation ?? undefined,
    concentration: row.concentration ?? undefined,
    occasion: normalizeStringArray(row.occasion) as Occasion[],
    style: normalizeStringArray(row.style) as Style[],
    material: row.material ?? undefined,
    finish: row.finish ?? undefined,
    weight: row.weight === null || row.weight === undefined ? undefined : Number(row.weight),
    dimensions: row.dimensions ?? undefined,
  };
}

export function productToRow(product: Product, sortOrder = 0): ProductRow {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    category: product.category,
    description: product.description,
    images: product.images,
    stock: product.stock,
    details: product.details,
    tags: product.tags,
    olfactory_notes: product.olfactoryNotes ?? null,
    intensity: product.intensity ?? null,
    fixation: product.fixation ?? null,
    concentration: product.concentration ?? null,
    occasion: product.occasion ?? null,
    style: product.style ?? null,
    material: product.material ?? null,
    finish: product.finish ?? null,
    weight: product.weight ?? null,
    dimensions: product.dimensions ?? null,
    featured: false,
    active: true,
    sort_order: sortOrder,
  };
}

export async function fetchProducts(client: SupabaseClient<Database, "public">) {
  const { data, error } = await client
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) => rowToProduct(row as ProductRow));
}

export async function fetchProductById(client: SupabaseClient<Database, "public">, id: string) {
  const { data, error } = await client
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return null;
  }

  return rowToProduct(data as ProductRow);
}

export async function fetchProductBySlug(client: SupabaseClient<Database, "public">, slug: string) {
  const { data, error } = await client
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    return null;
  }

  return rowToProduct(data as ProductRow);
}

export async function loadCatalog(client: SupabaseClient<Database, "public">, seedIfEmpty = false) {
  void seedIfEmpty;
  return fetchProducts(client);
}

export async function getPublicProducts() {
  try {
    noStore();
    const client = getServerSupabaseClient();
    return fetchProducts(client);
  } catch {
    return [];
  }
}

export async function getPublicProductBySlug(slug: string) {
  try {
    noStore();
    const client = getServerSupabaseClient();
    const product = await fetchProductBySlug(client, slug);
    return product ?? null;
  } catch {
    return null;
  }
}
