import toyBlocks from "@/assets/toy-blocks.jpg";
import toyBunny from "@/assets/toy-bunny.jpg";
import toyCar from "@/assets/toy-car.jpg";
import toyPuzzle from "@/assets/toy-puzzle.jpg";
import toyRainbow from "@/assets/toy-rainbow.jpg";
import toyRocket from "@/assets/toy-rocket.jpg";
import toyTeddy from "@/assets/toy-teddy.jpg";
import toyXylophone from "@/assets/toy-xylophone.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  blurb: string;
  featured?: boolean;
};

export const categories = ["All", "Wooden Toys", "Plushies", "Puzzles", "Musical", "Vehicles"] as const;

export const products: Product[] = [
  {
    id: "rainbow-stacker",
    name: "Pastel Wooden Rainbow",
    price: 28,
    category: "Wooden Toys",
    image: toyRainbow,
    blurb: "Natural pine wood, 7 stacking arches.",
    featured: true,
  },
  {
    id: "cuddle-bunny",
    name: "Velvet Cuddle Bunny",
    price: 24,
    category: "Plushies",
    image: toyBunny,
    blurb: "Ultra-soft linen plush with floppy ears.",
    featured: true,
  },
  {
    id: "space-rocket",
    name: "Cosmic Wooden Rocket",
    price: 32,
    category: "Vehicles",
    image: toyRocket,
    blurb: "Detachable stages and astronaut figure.",
    featured: true,
  },
  {
    id: "rainbow-xylophone",
    name: "Little Maestro Xylophone",
    price: 26,
    category: "Musical",
    image: toyXylophone,
    blurb: "8 tuned metal keys with wooden mallets.",
    featured: true,
  },
  {
    id: "building-blocks",
    name: "Classic Wooden Blocks Set",
    price: 34,
    category: "Wooden Toys",
    image: toyBlocks,
    blurb: "50 smooth geometric pieces in cotton sack.",
  },
  {
    id: "classic-car",
    name: "Vintage Roadster Toy",
    price: 22,
    category: "Vehicles",
    image: toyCar,
    blurb: "Smooth rolling wheels, solid beechwood.",
  },
  {
    id: "shape-puzzle",
    name: "Geometric Shape Puzzle",
    price: 19,
    category: "Puzzles",
    image: toyPuzzle,
    blurb: "Encourages fine motor & sorting skills.",
  },
  {
    id: "teddy-bear",
    name: "Little Honey Bear",
    price: 25,
    category: "Plushies",
    image: toyTeddy,
    blurb: "Hand-stitched classic nursery companion.",
  },
];