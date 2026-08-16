export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  blurb: string;
  featured?: boolean;
};

export const categories = ["All", "Action Figures", "Board Games", "Outdoor", "Arts & Crafts", "Puzzles"] as const;

export const products: Product[] = [
  {
    id: "robot",
    name: "Turbo Robot Fighter",
    price: 29,
    category: "Action Figures",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    blurb: "Light-up eyes, 12 poseable joints.",
    featured: true,
  },
  {
    id: "blocks",
    name: "Rainbow Building Blocks",
    price: 34,
    category: "Arts & Crafts",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=400&fit=crop",
    blurb: "100 colourful pieces, endless creations.",
    featured: true,
  },
  {
    id: "chess",
    name: "Classic Chess Set",
    price: 42,
    category: "Board Games",
    image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=400&h=400&fit=crop",
    blurb: "Wooden pieces, folding board.",
    featured: true,
  },
  {
    id: "kite",
    name: "Dragon Kite",
    price: 18,
    category: "Outdoor",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    blurb: "Soars up to 100m, easy to fly.",
    featured: true,
  },
  {
    id: "puzzle",
    name: "Space Adventure Puzzle",
    price: 22,
    category: "Puzzles",
    image: "https://images.unsplash.com/photo-1611048267451-e6ed903c4a38?w=400&h=400&fit=crop",
    blurb: "500 pieces, glow-in-the-dark.",
  },
  {
    id: "dinosaur",
    name: "Dino Discovery Set",
    price: 38,
    category: "Action Figures",
    image: "https://images.unsplash.com/photo-1615789591457-74a63395c990?w=400&h=400&fit=crop",
    blurb: "6 realistic dinosaur figures.",
  },
  {
    id: "paints",
    name: "Kids Art Paint Kit",
    price: 26,
    category: "Arts & Crafts",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop",
    blurb: "24 washable colours, safe for kids.",
  },
  {
    id: "frisbee",
    name: "Glow Frisbee",
    price: 12,
    category: "Outdoor",
    image: "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?w=400&h=400&fit=crop",
    blurb: "Lights up at night, ultra durable.",
  },
];