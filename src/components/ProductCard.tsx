import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data/products";

export function ProductCard({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (product: Product) => void;
}) {
  return (
    <article className="card-soft group overflow-hidden rounded-2xl">
      <div className="overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="space-y-1 p-4">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          {product.category}
        </p>
        <h3 className="font-display text-base">{product.name}</h3>
        <p className="text-sm text-muted-foreground">{product.blurb}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="font-display text-lg">${product.price.toFixed(2)}</span>
          <Button size="sm" onClick={() => onAdd(product)}>
            <Plus className="size-4" />
            Add
          </Button>
        </div>
      </div>
    </article>
  );
}