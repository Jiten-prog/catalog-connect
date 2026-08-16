import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ShoppingBag, MessageCircle } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { categories, products, type Product } from "@/data/products";
import { CartProvider, useCart } from "@/lib/cart";
import { ProductCard } from "@/components/ProductCard";
import { CartSheet } from "@/components/CartSheet";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Petal & Pine — Calm Home Goods Catalog" },
      {
        name: "description",
        content:
          "Browse a small catalog of calm home goods, filter by category, and send your cart straight to WhatsApp.",
      },
      { property: "og:title", content: "Petal & Pine — Calm Home Goods Catalog" },
      {
        property: "og:description",
        content:
          "Browse a small catalog of calm home goods, filter by category, and send your cart straight to WhatsApp.",
      },
    ],
  }),
  component: () => (
    <CartProvider>
      <CatalogPage />
    </CartProvider>
  ),
});

function CatalogPage() {
  const { add, count } = useCart();
  const [category, setCategory] = useState<string>("All");
  const [cartOpen, setCartOpen] = useState(false);

  const featured = useMemo(() => products.filter((p) => p.featured), []);
  const visibleFeatured = useMemo(
    () => (category === "All" ? featured : featured.filter((p) => p.category === category)),
    [category, featured],
  );
  const filtered = useMemo(
    () => (category === "All" ? products : products.filter((p) => p.category === category)),
    [category],
  );

  function handleAdd(product: Product) {
    add(product);
    toast.success(`${product.name} added to cart`);
  }

  return (
    <div className="min-h-screen">
      <Toaster />

      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <span className="font-display text-lg">Petal &amp; Pine</span>
          <Button variant="outline" size="sm" onClick={() => setCartOpen(true)}>
            <ShoppingBag className="size-4" />
            Cart
            {count > 0 ? <Badge className="ml-1">{count}</Badge> : null}
          </Button>
        </div>
      </header>

      <section className="surface-soft">
        <div className="mx-auto max-w-6xl px-4 py-14 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Small batch catalog
          </p>
          <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            Quiet things for calm rooms
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
            Pick what you love, then send your cart to your own WhatsApp in one tap — no
            checkout forms, no accounts.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <MessageCircle className="size-4 text-whatsapp" />
            Cart summary delivered on WhatsApp
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 pb-20">
        <div className="flex flex-wrap justify-center gap-2 py-8">
          {categories.map((c) => (
            <Button
              key={c}
              size="sm"
              variant={category === c ? "default" : "secondary"}
              onClick={() => setCategory(c)}
            >
              {c}
            </Button>
          ))}
        </div>

        {visibleFeatured.length > 0 ? (
          <section className="mb-14">
            <h2 className="mb-4 font-display text-2xl">Featured</h2>
            <Carousel opts={{ align: "start", loop: true }}>
              <CarouselContent>
                {visibleFeatured.map((product) => (
                  <CarouselItem
                    key={product.id}
                    className="basis-full sm:basis-1/2 lg:basis-1/3"
                  >
                    <ProductCard product={product} onAdd={handleAdd} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </section>
        ) : null}

        <section>
          <h2 className="mb-4 font-display text-2xl">
            {category === "All" ? "All items" : category}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={handleAdd} />
            ))}
          </div>
        </section>
      </main>

      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
}