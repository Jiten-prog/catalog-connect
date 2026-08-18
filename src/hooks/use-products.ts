import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { Product } from "@/data/products";

type ProductRow = {
  id: string;
  name: string;
  category: string;
  price: number | string;
  description: string | null;
  image_url: string | null;
  badge: string | null;
  rating: number | null;
  old_price: number | string | null;
};

function toProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    price: Number(row.price),
    image: row.image_url || "/logo.png",
    blurb: row.description || "",
  };
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(Boolean(supabase));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return;
    let active = true;

    supabase
      .from("products")
      .select("id, name, category, price, description, image_url, badge, rating, old_price")
      .order("created_at", { ascending: false })
      .then(({ data, error: fetchError }) => {
        if (!active) return;
        if (fetchError) setError(fetchError.message);
        else setProducts((data as ProductRow[] | null)?.map(toProduct) ?? []);
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { products, loading, error };
}
