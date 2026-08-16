import mug from "@/assets/mug.jpg";
import candle from "@/assets/candle.jpg";
import tote from "@/assets/tote.jpg";
import notebook from "@/assets/notebook.jpg";
import lamp from "@/assets/lamp.jpg";
import soap from "@/assets/soap.jpg";
import plates from "@/assets/plates.jpg";
import plant from "@/assets/plant.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  blurb: string;
  featured?: boolean;
};

export const categories = ["All", "Kitchen", "Home", "Bath", "Stationery"] as const;

export const products: Product[] = [
  {
    id: "mug",
    name: "Sand Stoneware Mug",
    price: 18,
    category: "Kitchen",
    image: mug,
    blurb: "Hand-glazed, holds 300ml.",
    featured: true,
  },
  {
    id: "candle",
    name: "Warm Linen Candle",
    price: 24,
    category: "Home",
    image: candle,
    blurb: "Soy wax, 40 hour burn.",
    featured: true,
  },
  {
    id: "tote",
    name: "Everyday Linen Tote",
    price: 32,
    category: "Home",
    image: tote,
    blurb: "Washed linen, roomy fit.",
    featured: true,
  },
  {
    id: "notebook",
    name: "Cloth Bound Notebook",
    price: 14,
    category: "Stationery",
    image: notebook,
    blurb: "160 dotted pages.",
  },
  {
    id: "lamp",
    name: "Rattan Table Lamp",
    price: 68,
    category: "Home",
    image: lamp,
    blurb: "Woven shade, soft glow.",
    featured: true,
  },
  {
    id: "soap",
    name: "Soap Trio",
    price: 21,
    category: "Bath",
    image: soap,
    blurb: "Cold pressed, three scents.",
  },
  {
    id: "plates",
    name: "Matte Plate Set",
    price: 54,
    category: "Kitchen",
    image: plates,
    blurb: "Set of four, dishwasher safe.",
  },
  {
    id: "plant",
    name: "Potted Olive",
    price: 29,
    category: "Home",
    image: plant,
    blurb: "Loves a sunny window.",
  },
];