import { useMemo, useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Blocks, CarFront, MessageCircle, Music2, Puzzle, Rocket, Search, ShoppingBag, X } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
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
import xylophoneImg from "@/assets/toy-xylophone.jpg";
import teddyImg from "@/assets/toy-teddy.jpg";
import rocketImg from "@/assets/toy-rocket.jpg";
import blocksImg from "@/assets/toy-blocks.jpg";

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

  const offers = [
    {
      eyebrow: "New arrivals",
      title: "A world of play, ready to explore",
      description: "Fresh toys chosen to spark curious little minds.",
      image: xylophoneImg,
      imageAlt: "Colorful wooden xylophone toy",
      category: "All",
      accent: "from-sky-950/85 via-sky-900/45",
    },
    {
      eyebrow: "Cuddle collection",
      title: "Big hugs for little hearts",
      description: "Soft companions made for every adventure and nap.",
      image: teddyImg,
      imageAlt: "Soft teddy bear toy",
      category: "Plushies",
      accent: "from-rose-950/85 via-rose-900/40",
    },
    {
      eyebrow: "Imagine more",
      title: "Launch into playtime",
      description: "Out-of-this-world toys for the next big imagination.",
      image: rocketImg,
      imageAlt: "Colorful rocket toy",
      category: "All",
      accent: "from-indigo-950/85 via-indigo-900/45",
    },
    {
      eyebrow: "Build & discover",
      title: "Little builders, big ideas",
      description: "Hands-on toys that make learning feel like play.",
      image: blocksImg,
      imageAlt: "Colorful wooden building blocks",
      category: "Wooden Toys",
      accent: "from-emerald-950/85 via-emerald-900/45",
    },
  ];
  const [heroApi, setHeroApi] = useState<CarouselApi>();
  const [heroIdx, setHeroIdx] = useState(0);

  useEffect(() => {
    if (!heroApi) return;

    const updateSelectedSlide = () => setHeroIdx(heroApi.selectedScrollSnap());
    updateSelectedSlide();
    heroApi.on("select", updateSelectedSlide);

    return () => {
      heroApi.off("select", updateSelectedSlide);
    };
  }, [heroApi]);

  useEffect(() => {
    if (!heroApi) return;

    const id = setInterval(() => heroApi.scrollNext(), 5000);
    return () => clearInterval(id);
  }, [heroApi]);

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
    <div className="relative isolate min-h-screen overflow-hidden bg-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] hidden 2xl:block">
        <CarFront className="absolute left-[3vw] top-[5%] size-20 -rotate-12 text-sky-300/45" strokeWidth={1.25} />
        <Blocks className="absolute right-[4vw] top-[9%] size-16 rotate-12 text-amber-300/50" strokeWidth={1.25} />
        <Music2 className="absolute right-[1vw] top-[17%] size-11 rotate-12 text-rose-300/45" strokeWidth={1.25} />
        <Puzzle className="absolute left-[5vw] top-[23%] size-14 -rotate-6 text-rose-300/45" strokeWidth={1.25} />
        <Rocket className="absolute right-[3vw] top-[27%] size-20 rotate-25 text-indigo-300/45" strokeWidth={1.25} />
        <Blocks className="absolute left-[1vw] top-[33%] size-11 -rotate-12 text-orange-300/45" strokeWidth={1.25} />
        <Music2 className="absolute left-[2vw] top-[42%] size-16 -rotate-12 text-emerald-300/50" strokeWidth={1.25} />
        <Blocks className="absolute right-[7vw] top-[47%] size-12 rotate-12 text-orange-300/45" strokeWidth={1.25} />
        <Puzzle className="absolute right-[2vw] top-[56%] size-12 -rotate-12 text-amber-300/50" strokeWidth={1.25} />
        <CarFront className="absolute right-[2vw] top-[64%] size-16 rotate-6 text-sky-300/45" strokeWidth={1.25} />
        <Puzzle className="absolute left-[6vw] top-[69%] size-18 rotate-12 text-violet-300/45" strokeWidth={1.25} />
        <Music2 className="absolute right-[7vw] top-[77%] size-12 -rotate-12 text-rose-300/45" strokeWidth={1.25} />
        <Blocks className="absolute left-[2vw] top-[79%] size-14 rotate-6 text-emerald-300/45" strokeWidth={1.25} />
        <Rocket className="absolute left-[2vw] top-[86%] size-14 -rotate-20 text-rose-300/45" strokeWidth={1.25} />
        <Music2 className="absolute right-[4vw] top-[89%] size-18 rotate-12 text-emerald-300/50" strokeWidth={1.25} />
      </div>
      <Toaster />

      <header className="sticky top-0 z-30 overflow-hidden border-b border-sky-100 bg-[#F0F9FF]/95 backdrop-blur shadow-xs">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden 2xl:block">
          <Puzzle className="absolute left-[4vw] -top-2 size-14 -rotate-12 text-rose-300/45" strokeWidth={1.25} />
          <CarFront className="absolute left-[13vw] top-3 size-11 rotate-6 text-sky-300/45" strokeWidth={1.25} />
          <Blocks className="absolute right-[13vw] -top-2 size-14 rotate-12 text-amber-300/50" strokeWidth={1.25} />
          <Rocket className="absolute right-[4vw] top-3 size-11 rotate-25 text-indigo-300/45" strokeWidth={1.25} />
        </div>
        <div className="relative z-10 mx-auto flex max-w-6xl items-center gap-4 px-4 py-2">
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

      <section className="surface-soft relative">
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:py-10">
          <Carousel setApi={setHeroApi} opts={{ loop: true }} className="group">
            <CarouselContent className="ml-0">
              {offers.map((offer) => (
                <CarouselItem key={offer.title} className="pl-0">
                  <article className="relative isolate min-h-[360px] overflow-hidden rounded-3xl bg-slate-900 shadow-xl sm:min-h-[420px]">
                    <img
                      src={offer.image}
                      alt={offer.imageAlt}
                      className="absolute inset-0 -z-20 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className={`absolute inset-0 -z-10 bg-gradient-to-r ${offer.accent} to-transparent`} />
                    <div className="flex min-h-[360px] max-w-xl flex-col justify-end p-7 text-left text-white sm:min-h-[420px] sm:p-12">
                      <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/80">{offer.eyebrow}</p>
                      <h1 className="mt-3 font-display text-4xl leading-tight sm:text-6xl">{offer.title}</h1>
                      <p className="mt-4 max-w-md text-sm text-white/85 sm:text-base">{offer.description}</p>
                      <div className="mt-7 flex flex-wrap items-center gap-3">
                        <Button
                          onClick={() => setCategory(offer.category)}
                          className="bg-white text-slate-900 hover:bg-white/90"
                        >
                          Shop the collection
                        </Button>
                        <span className="flex items-center gap-2 text-xs font-medium text-white/85">
                          <MessageCircle className="size-4" /> Order via WhatsApp
                        </span>
                      </div>
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-3 border-white/20 bg-white/90 text-slate-900 hover:bg-white sm:left-5" />
            <CarouselNext className="right-3 border-white/20 bg-white/90 text-slate-900 hover:bg-white sm:right-5" />
          </Carousel>
          <div className="mt-4 flex items-center justify-center gap-2">
            {offers.map((offer, index) => (
              <button
                key={offer.title}
                onClick={() => heroApi?.scrollTo(index)}
                aria-label={`Show ${offer.eyebrow} offer`}
                aria-current={index === heroIdx}
                className={index === heroIdx ? "h-2 w-7 rounded-full bg-[#D82338] transition-all" : "size-2 rounded-full bg-slate-300 transition-all hover:bg-slate-400"}
              />
            ))}
          </div>
        </div>
      </section>

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-20">
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
