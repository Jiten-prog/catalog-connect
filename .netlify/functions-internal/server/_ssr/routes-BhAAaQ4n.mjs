import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, l as Slot, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { a as Plus, c as ArrowRight, i as Search, l as ArrowLeft, n as Trash2, o as Minus, r as ShoppingBag, s as MessageCircle, t as X } from "../_libs/lucide-react.mjs";
import { t as useEmblaCarousel } from "../_libs/embla-carousel-react+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { t as Root } from "../_libs/radix-ui__react-separator.mjs";
import { t as Root$1 } from "../_libs/radix-ui__react-label.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BhAAaQ4n.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline",
			whatsapp: "bg-whatsapp text-whatsapp-foreground shadow hover:bg-whatsapp/90"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var CarouselContext = import_react.createContext(null);
function useCarousel() {
	const context = import_react.useContext(CarouselContext);
	if (!context) throw new Error("useCarousel must be used within a <Carousel />");
	return context;
}
var Carousel = import_react.forwardRef(({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
	const [carouselRef, api] = useEmblaCarousel({
		...opts,
		axis: orientation === "horizontal" ? "x" : "y"
	}, plugins);
	const [canScrollPrev, setCanScrollPrev] = import_react.useState(false);
	const [canScrollNext, setCanScrollNext] = import_react.useState(false);
	const onSelect = import_react.useCallback((api) => {
		if (!api) return;
		setCanScrollPrev(api.canScrollPrev());
		setCanScrollNext(api.canScrollNext());
	}, []);
	const scrollPrev = import_react.useCallback(() => {
		api?.scrollPrev();
	}, [api]);
	const scrollNext = import_react.useCallback(() => {
		api?.scrollNext();
	}, [api]);
	const handleKeyDown = import_react.useCallback((event) => {
		if (event.key === "ArrowLeft") {
			event.preventDefault();
			scrollPrev();
		} else if (event.key === "ArrowRight") {
			event.preventDefault();
			scrollNext();
		}
	}, [scrollPrev, scrollNext]);
	import_react.useEffect(() => {
		if (!api || !setApi) return;
		setApi(api);
	}, [api, setApi]);
	import_react.useEffect(() => {
		if (!api) return;
		onSelect(api);
		api.on("reInit", onSelect);
		api.on("select", onSelect);
		return () => {
			api?.off("select", onSelect);
		};
	}, [api, onSelect]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarouselContext.Provider, {
		value: {
			carouselRef,
			api,
			opts,
			orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
			scrollPrev,
			scrollNext,
			canScrollPrev,
			canScrollNext
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref,
			onKeyDownCapture: handleKeyDown,
			className: cn("relative", className),
			role: "region",
			"aria-roledescription": "carousel",
			...props,
			children
		})
	});
});
Carousel.displayName = "Carousel";
var CarouselContent = import_react.forwardRef(({ className, ...props }, ref) => {
	const { carouselRef, orientation } = useCarousel();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: carouselRef,
		className: "overflow-hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref,
			className: cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className),
			...props
		})
	});
});
CarouselContent.displayName = "CarouselContent";
var CarouselItem = import_react.forwardRef(({ className, ...props }, ref) => {
	const { orientation } = useCarousel();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		role: "group",
		"aria-roledescription": "slide",
		className: cn("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", className),
		...props
	});
});
CarouselItem.displayName = "CarouselItem";
var CarouselPrevious = import_react.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
	const { orientation, scrollPrev, canScrollPrev } = useCarousel();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		ref,
		variant,
		size,
		className: cn("absolute  h-8 w-8 rounded-full", orientation === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90", className),
		disabled: !canScrollPrev,
		onClick: scrollPrev,
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Previous slide"
		})]
	});
});
CarouselPrevious.displayName = "CarouselPrevious";
var CarouselNext = import_react.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
	const { orientation, scrollNext, canScrollNext } = useCarousel();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		ref,
		variant,
		size,
		className: cn("absolute h-8 w-8 rounded-full", orientation === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90", className),
		disabled: !canScrollNext,
		onClick: scrollNext,
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Next slide"
		})]
	});
});
CarouselNext.displayName = "CarouselNext";
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
var toy_blocks_default = "/assets/toy-blocks-DYOhzoBo.jpg";
var toy_bunny_default = "/assets/toy-bunny-D30joc0i.jpg";
var toy_car_default = "/assets/toy-car-hl729naO.jpg";
var toy_puzzle_default = "/assets/toy-puzzle-DWLCaQle.jpg";
var toy_rainbow_default = "/assets/toy-rainbow-BA0vvk7-.jpg";
var toy_rocket_default = "/assets/toy-rocket-ByZJdvCi.jpg";
var toy_teddy_default = "/assets/toy-teddy-BSJajmTW.jpg";
var toy_xylophone_default = "/assets/toy-xylophone-CIwW2oZs.jpg";
var categories = [
	"All",
	"Wooden Toys",
	"Plushies",
	"Puzzles",
	"Musical",
	"Vehicles"
];
var products = [
	{
		id: "rainbow-stacker",
		name: "Pastel Wooden Rainbow",
		price: 28,
		category: "Wooden Toys",
		image: toy_rainbow_default,
		blurb: "Natural pine wood, 7 stacking arches.",
		featured: true
	},
	{
		id: "cuddle-bunny",
		name: "Velvet Cuddle Bunny",
		price: 24,
		category: "Plushies",
		image: toy_bunny_default,
		blurb: "Ultra-soft linen plush with floppy ears.",
		featured: true
	},
	{
		id: "space-rocket",
		name: "Cosmic Wooden Rocket",
		price: 32,
		category: "Vehicles",
		image: toy_rocket_default,
		blurb: "Detachable stages and astronaut figure.",
		featured: true
	},
	{
		id: "rainbow-xylophone",
		name: "Little Maestro Xylophone",
		price: 26,
		category: "Musical",
		image: toy_xylophone_default,
		blurb: "8 tuned metal keys with wooden mallets.",
		featured: true
	},
	{
		id: "building-blocks",
		name: "Classic Wooden Blocks Set",
		price: 34,
		category: "Wooden Toys",
		image: toy_blocks_default,
		blurb: "50 smooth geometric pieces in cotton sack."
	},
	{
		id: "classic-car",
		name: "Vintage Roadster Toy",
		price: 22,
		category: "Vehicles",
		image: toy_car_default,
		blurb: "Smooth rolling wheels, solid beechwood."
	},
	{
		id: "shape-puzzle",
		name: "Geometric Shape Puzzle",
		price: 19,
		category: "Puzzles",
		image: toy_puzzle_default,
		blurb: "Encourages fine motor & sorting skills."
	},
	{
		id: "teddy-bear",
		name: "Little Honey Bear",
		price: 25,
		category: "Plushies",
		image: toy_teddy_default,
		blurb: "Hand-stitched classic nursery companion."
	}
];
var CartContext = (0, import_react.createContext)(null);
var PHONE_KEY = "catalog:whatsapp-phone";
function CartProvider({ children }) {
	const [lines, setLines] = (0, import_react.useState)([]);
	const [phone, setPhoneState] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const saved = window.localStorage.getItem(PHONE_KEY);
		if (saved) setPhoneState(saved);
	}, []);
	const value = (0, import_react.useMemo)(() => {
		const count = lines.reduce((n, l) => n + l.qty, 0);
		const total = lines.reduce((n, l) => n + l.qty * l.product.price, 0);
		return {
			lines,
			count,
			total,
			add: (product) => setLines((prev) => {
				if (prev.find((l) => l.product.id === product.id)) return prev.map((l) => l.product.id === product.id ? {
					...l,
					qty: l.qty + 1
				} : l);
				return [...prev, {
					product,
					qty: 1
				}];
			}),
			remove: (id) => setLines((prev) => prev.filter((l) => l.product.id !== id)),
			setQty: (id, qty) => setLines((prev) => qty <= 0 ? prev.filter((l) => l.product.id !== id) : prev.map((l) => l.product.id === id ? {
				...l,
				qty
			} : l)),
			clear: () => setLines([]),
			phone,
			setPhone: (next) => {
				setPhoneState(next);
				window.localStorage.setItem(PHONE_KEY, next);
			}
		};
	}, [lines, phone]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartContext.Provider, {
		value,
		children
	});
}
function useCart() {
	const ctx = (0, import_react.useContext)(CartContext);
	if (!ctx) throw new Error("useCart must be used inside CartProvider");
	return ctx;
}
function normalizePhone(raw) {
	return raw.replace(/[^0-9]/g, "");
}
function buildCartMessage(lines, total) {
	return `Hi! Here is my cart from Petal & Pine:\n\n${lines.map((l) => `• ${l.qty} × ${l.product.name} — $${(l.qty * l.product.price).toFixed(2)}`).join("\n")}\n\nTotal: $${total.toFixed(2)}`;
}
function ProductCard({ product, onAdd }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "card-soft group overflow-hidden rounded-2xl bg-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden bg-slate-50 border-b border-border/50",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: product.image,
				alt: product.name,
				loading: "lazy",
				width: 800,
				height: 800,
				className: "aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-1 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-widest text-muted-foreground",
					children: product.category
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-base",
					children: product.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: product.blurb
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-display text-lg",
						children: ["$", product.price.toFixed(2)]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: () => onAdd(product),
						className: "bg-[#D82338] hover:bg-[#c01d30] text-white font-semibold shadow-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Add"]
					})]
				})
			]
		})]
	});
}
var Sheet = Dialog$1;
var SheetPortal = DialogPortal$1;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogOverlay$1.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = DialogContent$1.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = DialogTitle$1.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogDescription$1.displayName;
var Separator = import_react.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	decorative,
	orientation,
	className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className),
	...props
}));
Separator.displayName = Root.displayName;
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root$1, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = Root$1.displayName;
function PhoneDialog({ open, initial, onOpenChange, onSave }) {
	const [value, setValue] = (0, import_react.useState)(initial);
	const [error, setError] = (0, import_react.useState)("");
	function submit() {
		const digits = normalizePhone(value);
		if (digits.length < 8) {
			setError("Enter your full number with country code, e.g. +91 98765 43210");
			return;
		}
		setError("");
		onSave(digits);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "font-display text-xl",
					children: "Your WhatsApp number"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "We'll send your cart summary to this number on WhatsApp. Include your country code." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "whatsapp",
							children: "WhatsApp linked phone number"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "whatsapp",
							inputMode: "tel",
							autoComplete: "tel",
							placeholder: "+91 98765 43210",
							value,
							onChange: (e) => setValue(e.target.value),
							onKeyDown: (e) => e.key === "Enter" && submit()
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-destructive",
							children: error
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "whatsapp",
					onClick: submit,
					children: "Save & send cart"
				}) })
			]
		})
	});
}
function CartSheet({ open, onOpenChange }) {
	const { lines, total, setQty, remove, phone, setPhone } = useCart();
	const [askPhone, setAskPhone] = (0, import_react.useState)(false);
	function send(to) {
		const text = encodeURIComponent(buildCartMessage(lines, total));
		window.open(`https://wa.me/${to}?text=${text}`, "_blank", "noopener,noreferrer");
		toast.success("Opening WhatsApp with your cart summary");
	}
	function handleSend() {
		if (!lines.length) return;
		if (!phone) {
			setAskPhone(true);
			return;
		}
		send(phone);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			className: "flex w-full flex-col sm:max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
					className: "font-display text-xl",
					children: "🛒 Your Wishlist"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, { children: "Send your toy wishlist to WhatsApp and we'll sort it from there!" })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 space-y-4 overflow-y-auto px-4",
					children: lines.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-10 text-center text-sm text-muted-foreground",
						children: "Nothing here yet — go pick some awesome toys! 🎮"
					}) : lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: line.product.image,
							alt: line.product.name,
							loading: "lazy",
							width: 800,
							height: 800,
							className: "size-20 rounded-xl object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: line.product.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted-foreground",
									children: ["$", line.product.price.toFixed(2)]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "icon",
											variant: "outline",
											className: "size-7",
											onClick: () => setQty(line.product.id, line.qty - 1),
											"aria-label": `Decrease ${line.product.name}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-3" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "w-6 text-center text-sm",
											children: line.qty
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "icon",
											variant: "outline",
											className: "size-7",
											onClick: () => setQty(line.product.id, line.qty + 1),
											"aria-label": `Increase ${line.product.name}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "icon",
											variant: "ghost",
											className: "size-7 text-muted-foreground",
											onClick: () => remove(line.product.id),
											"aria-label": `Remove ${line.product.name}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
										})
									]
								})
							]
						})]
					}, line.product.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetFooter, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "mb-2" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Total"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-display text-lg",
							children: ["$", total.toFixed(2)]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "whatsapp",
						disabled: !lines.length,
						onClick: handleSend,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" }), "Send Wishlist to WhatsApp"]
					}),
					phone ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "mt-2 text-center text-xs text-muted-foreground underline",
						onClick: () => setAskPhone(true),
						children: [
							"Sending to +",
							phone,
							" — change number"
						]
					}) : null
				] })
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneDialog, {
		open: askPhone,
		initial: phone,
		onOpenChange: setAskPhone,
		onSave: (next) => {
			setPhone(next);
			setAskPhone(false);
			send(next);
		}
	})] });
}
var logo_default = "/assets/logo-DCHYTjJW.png";
function CatalogPage() {
	const { add, count } = useCart();
	const [category, setCategory] = (0, import_react.useState)("All");
	const [cartOpen, setCartOpen] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const headlines = [
		{
			line1: "Treasures of Joy at",
			highlight: "Gullak!"
		},
		{
			line1: "Where Every Day is",
			highlight: "Playtime!"
		},
		{
			line1: "Pure Smiles for",
			highlight: "Little Hearts!"
		},
		{
			line1: "Toys That Spark",
			highlight: "Imagination!"
		}
	];
	const [heroIdx, setHeroIdx] = (0, import_react.useState)(0);
	const [heroVisible, setHeroVisible] = (0, import_react.useState)(true);
	const advanceHero = (0, import_react.useCallback)(() => {
		setHeroVisible(false);
		setTimeout(() => {
			setHeroIdx((i) => (i + 1) % headlines.length);
			setHeroVisible(true);
		}, 400);
	}, [headlines.length]);
	(0, import_react.useEffect)(() => {
		const id = setInterval(advanceHero, 3200);
		return () => clearInterval(id);
	}, [advanceHero]);
	const featured = (0, import_react.useMemo)(() => products.filter((p) => p.featured), []);
	const visibleFeatured = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		const base = category === "All" ? featured : featured.filter((p) => p.category === category);
		if (!q) return base;
		return base.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.blurb.toLowerCase().includes(q));
	}, [
		category,
		featured,
		query
	]);
	const filtered = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		const base = category === "All" ? products : products.filter((p) => p.category === category);
		if (!q) return base;
		return base.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.blurb.toLowerCase().includes(q));
	}, [category, query]);
	function handleAdd(product) {
		add(product);
		toast.success(`${product.name} added to cart`);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1.5 w-full gullak-bar" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-30 border-b border-slate-100 bg-white/95 backdrop-blur shadow-xs",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl items-center gap-4 px-4 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-2 shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: logo_default,
								alt: "Gullak - The Toy House",
								className: "h-14 sm:h-18 md:h-20 w-auto object-contain transition-transform hover:scale-105"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex-1 max-w-sm ml-auto",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 size-4 pointer-events-none text-muted-foreground" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "product-search",
									type: "search",
									placeholder: "Search toys…",
									value: query,
									onChange: (e) => setQuery(e.target.value),
									className: "w-full rounded-full border border-slate-200 bg-slate-50/80 py-2 pl-9 pr-9 text-sm outline-none ring-0 transition-all placeholder:text-slate-400 focus:bg-white focus:border-[#009DE0] focus:ring-2 focus:ring-[#009DE0]/20"
								}),
								query && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setQuery(""),
									"aria-label": "Clear search",
									className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => setCartOpen(true),
							className: "gap-2 font-semibold shrink-0 border-border hover:border-primary/50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, {
									className: "size-4",
									style: { color: "var(--gullak-red)" }
								}),
								"Cart",
								count > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-1 inline-flex items-center justify-center size-5 rounded-full text-xs font-bold text-white",
									style: { backgroundColor: "var(--gullak-red)" },
									children: count
								}) : null
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "surface-soft",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-4 py-14 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.25em] text-muted-foreground font-bold",
							children: "✨ Gullak- The Toy House • Handpicked for Smiles"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-4 font-display text-4xl leading-tight sm:text-6xl text-slate-900",
							style: {
								transition: "opacity 0.4s ease, transform 0.4s ease",
								opacity: heroVisible ? 1 : 0,
								transform: heroVisible ? "translateY(0)" : "translateY(12px)"
							},
							children: [
								headlines[heroIdx].line1,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[#D82338]",
									children: headlines[heroIdx].highlight
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 flex items-center justify-center gap-2",
							children: headlines.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setHeroVisible(false);
									setTimeout(() => {
										setHeroIdx(i);
										setHeroVisible(true);
									}, 400);
								},
								"aria-label": `Slide ${i + 1}`,
								className: i === heroIdx ? "w-6 h-2 rounded-full bg-[#D82338] transition-all duration-300" : "w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-400 transition-all duration-300"
							}, i))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg",
							children: "Delightful wooden toys, cuddle plushies, puzzles, and music sets. Choose what your little one loves and send your wishlist straight to WhatsApp in one tap!"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4 text-whatsapp" }), "Instant order & wishlist support via WhatsApp"]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-6xl px-4 pb-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap justify-center gap-2 py-8",
						children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: category === c ? "default" : "secondary",
							onClick: () => setCategory(c),
							className: category === c ? "bg-[#009DE0] hover:bg-[#0089c4] text-white shadow-sm font-semibold rounded-full px-4" : "bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-full px-4 border border-slate-200/60",
							children: c
						}, c))
					}),
					visibleFeatured.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mb-14",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-4 font-display text-2xl text-foreground",
							children: "Featured Picks"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Carousel, {
							opts: {
								align: "start",
								loop: true
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarouselContent, { children: visibleFeatured.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarouselItem, {
									className: "basis-full sm:basis-1/2 lg:basis-1/3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
										product,
										onAdd: handleAdd
									})
								}, product.id)) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarouselPrevious, { className: "hidden sm:flex" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarouselNext, { className: "hidden sm:flex" })
							]
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-4 font-display text-2xl text-foreground",
						children: query.trim() ? `🔍 Results for "${query.trim()}"` : category === "All" ? "🎮 All Toys" : category
					}), filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-20 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-4xl mb-3",
								children: "🧸"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-semibold text-foreground",
								children: [
									"No toys found for \"",
									query,
									"\""
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground mt-1",
								children: "Try a different search or browse all categories."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setQuery(""),
								className: "mt-4 text-sm text-primary underline",
								children: "Clear search"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
						children: filtered.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
							product,
							onAdd: handleAdd
						}, product.id))
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartSheet, {
				open: cartOpen,
				onOpenChange: setCartOpen
			})
		]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CatalogPage, {}) });
//#endregion
export { SplitComponent as component };
