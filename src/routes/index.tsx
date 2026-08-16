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
import logoImg from "@/assets/logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gullak — The Toy House" },
      {
        name: "description",
        content:
          "Discover pure joy at Gullak — The Toy House! Quality wooden toys, plushies, puzzles, and musical toys. Send your wishlist to WhatsApp in one tap.",
      },
      { property: "og:title", content: "Gullak — The Toy House" },
      {
        property: "og:description",
        content:
          "Discover pure joy at Gullak — The Toy House! Send your wishlist to WhatsApp in one tap.",
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
    { line1: "Treasures of Joy at", highlight: "Gullak!" },
    { line1: "Where Every Day is", highlight: "Playtime!" },
    { line1: "Pure Smiles for", highlight: "Little Hearts!" },
    { line1: "Toys That Spark", highlight: "Imagination!" },
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

      <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/95 backdrop-blur shadow-xs">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-2">
          <div className="flex items-center gap-2 shrink-0">
            <img
              src={logoImg}
              alt="Gullak - The Toy House"
              className="h-14 sm:h-18 md:h-20 w-auto object-contain transition-transform hover:scale-105"
            />
          </div>

          {/* Search bar */}
          <div className="relative flex-1 max-w-sm ml-auto">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 size-4 pointer-events-none text-muted-foreground"
            />
            <input
              id="product-search"
              type="search"
              placeholder="Search toys…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-full border border-slate-200 bg-slate-50/80 py-2 pl-9 pr-9 text-sm outline-none ring-0 transition-all placeholder:text-slate-400 focus:bg-white focus:border-[#009DE0] focus:ring-2 focus:ring-[#009DE0]/20"
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

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCartOpen(true)}
            className="gap-2 font-semibold shrink-0 border-border hover:border-primary/50"
          >
            <ShoppingBag className="size-4" style={{ color: 'var(--gullak-red)' }} />
            Cart
            {count > 0 ? (
              <span
                className="ml-1 inline-flex items-center justify-center size-5 rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: 'var(--gullak-red)' }}
              >
                {count}
              </span>
            ) : null}
          </Button>
        </div>
      </header>

      <section className="surface-soft">
        <div className="mx-auto max-w-6xl px-4 py-14 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-bold">
            ✨ Gullak- The Toy House • Handpicked for Smiles
          </p>
          <h1
            className="mt-4 font-display text-4xl leading-tight sm:text-6xl text-slate-900"
            style={{
              transition: 'opacity 0.4s ease, transform 0.4s ease',
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(12px)',
            }}
          >
            {headlines[heroIdx].line1}{' '}
            <span className="text-[#D82338]">{headlines[heroIdx].highlight}</span>
          </h1>
          {/* Dot indicators */}
          <div className="mt-5 flex items-center justify-center gap-2">
            {headlines.map((_, i) => (
              <button
                key={i}
                onClick={() => { setHeroVisible(false); setTimeout(() => { setHeroIdx(i); setHeroVisible(true); }, 400); }}
                aria-label={`Slide ${i + 1}`}
                className={i === heroIdx ? "w-6 h-2 rounded-full bg-[#D82338] transition-all duration-300" : "w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-400 transition-all duration-300"}
              />
            ))}
          </div>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Delightful wooden toys, cuddle plushies, puzzles, and music sets.
            Choose what your little one loves and send your wishlist straight to WhatsApp in one tap!
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground font-medium">
            <MessageCircle className="size-4 text-whatsapp" />
            Instant order & wishlist support via WhatsApp
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
              className={
                category === c
                  ? "bg-[#009DE0] hover:bg-[#0089c4] text-white shadow-sm font-semibold rounded-full px-4"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-full px-4 border border-slate-200/60"
              }
            >
              {c}
            </Button>
          ))}
        </div>

        {visibleFeatured.length > 0 ? (
          <section className="mb-14">
            <h2 className="mb-4 font-display text-2xl text-foreground">Featured Picks</h2>
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
          <h2 className="mb-4 font-display text-2xl text-foreground">
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
                className="mt-4 text-sm text-primary underline"
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