import { useMemo, useState, useEffect, useCallback } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ShoppingBag, MessageCircle, Search, X } from "lucide-react";
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
      { title: "ToyWorld — The Fun Shop for Kids" },
      {
        name: "description",
        content:
          "Shop the best toys, games, action figures, and gifts for kids of all ages. Send your wishlist to WhatsApp in one tap!",
      },
      { property: "og:title", content: "ToyWorld — The Fun Shop for Kids" },
      {
        property: "og:description",
        content:
          "Shop the best toys, games, action figures, and gifts for kids of all ages.",
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
  const [query, setQuery] = useState("");

  // Hero headline carousel
  const headlines = [
    { line1: "Where Every Day is", highlight: "Playtime!" },
    { line1: "Toys That Spark", highlight: "Imagination!" },
    { line1: "Gifts Kids Will", highlight: "Absolutely Love!" },
    { line1: "Fun for Every", highlight: "Age & Stage!" },
  ];
  const [heroIdx, setHeroIdx] = useState(0);
  const [heroVisible, setHeroVisible] = useState(true);

  const advanceHero = useCallback(() => {
    setHeroVisible(false);
    setTimeout(() => {
      setHeroIdx((i) => (i + 1) % headlines.length);
      setHeroVisible(true);
    }, 400);
  }, [headlines.length]);

  useEffect(() => {
    const id = setInterval(advanceHero, 3200);
    return () => clearInterval(id);
  }, [advanceHero]);

  const featured = useMemo(() => products.filter((p) => p.featured), []);
  const visibleFeatured = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = category === "All" ? featured : featured.filter((p) => p.category === category);
    if (!q) return base;
    return base.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.blurb.toLowerCase().includes(q),
    );
  }, [category, featured, query]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = category === "All" ? products : products.filter((p) => p.category === category);
    if (!q) return base;
    return base.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.blurb.toLowerCase().includes(q),
    );
  }, [category, query]);

  function handleAdd(product: Product) {
    add(product);
    toast.success(`${product.name} added to cart`);
  }

  return (
    <div className="min-h-screen">
      <Toaster />

      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <span className="font-display text-2xl tracking-wide shrink-0" style={{ color: 'oklch(0.62 0.23 25)' }}>🧸 ToyWorld</span>

          {/* Search bar */}
          <div className="relative flex-1 max-w-sm ml-auto">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 size-4 pointer-events-none"
              style={{ color: 'oklch(0.55 0.03 270)' }}
            />
            <input
              id="product-search"
              type="search"
              placeholder="Search toys…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-full border border-border bg-background/80 py-2 pl-9 pr-9 text-sm outline-none ring-0 transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          <Button variant="outline" size="sm" onClick={() => setCartOpen(true)} className="gap-2 font-semibold shrink-0">
            <ShoppingBag className="size-4" />
            Cart
            {count > 0 ? <Badge className="ml-1">{count}</Badge> : null}
          </Button>
        </div>
      </header>

      <section className="surface-soft">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-bold">
            🎉 Fun for all ages
          </p>
          <h1
            className="mt-4 font-display text-4xl leading-tight sm:text-6xl"
            style={{
              color: 'oklch(0.22 0.04 270)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(12px)',
            }}
          >
            {headlines[heroIdx].line1}{' '}
            <span style={{ color: 'oklch(0.62 0.23 25)' }}>{headlines[heroIdx].highlight}</span>
          </h1>
          {/* Dot indicators */}
          <div className="mt-5 flex items-center justify-center gap-2">
            {headlines.map((_, i) => (
              <button
                key={i}
                onClick={() => { setHeroVisible(false); setTimeout(() => { setHeroIdx(i); setHeroVisible(true); }, 400); }}
                aria-label={`Slide ${i + 1}`}
                style={{
                  width: i === heroIdx ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '9999px',
                  background: i === heroIdx ? 'oklch(0.62 0.23 25)' : 'oklch(0.75 0.05 25)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Discover amazing toys, games, and gifts for kids of all ages.
            Pick your favourites and send your wishlist straight to WhatsApp — no accounts needed!
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground font-medium">
            <MessageCircle className="size-4 text-whatsapp" />
            Send your wishlist via WhatsApp in one tap
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
            <h2 className="mb-4 font-display text-2xl" style={{ color: 'oklch(0.62 0.23 25)' }}>Featured Picks</h2>
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
          <h2 className="mb-4 font-display text-2xl" style={{ color: 'oklch(0.62 0.23 25)' }}>
            {query.trim()
              ? `🔍 Results for "${query.trim()}"`
              : category === "All"
              ? "🎮 All Toys"
              : category}
          </h2>
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-4xl mb-3">🧸</p>
              <p className="font-semibold text-foreground">No toys found for "{query}"</p>
              <p className="text-sm text-muted-foreground mt-1">Try a different search or browse all categories.</p>
              <button
                onClick={() => setQuery("")}
                className="mt-4 text-sm underline"
                style={{ color: 'oklch(0.62 0.23 25)' }}
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} onAdd={handleAdd} />
              ))}
            </div>
          )}
        </section>
      </main>

      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
}