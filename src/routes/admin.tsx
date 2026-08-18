import { useEffect, useState, type FormEvent } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { LoaderCircle, LogOut, Plus, Trash2 } from "lucide-react";
import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { categories } from "@/data/products";
import { getSupabase, supabase } from "@/lib/supabaseClient";

export const Route = createFileRoute("/admin")({ component: AdminPage });

type AdminProduct = {
  id: string;
  name: string;
  category: string;
  price: number | string;
  description: string | null;
  image_url: string | null;
};

const initialForm = { name: "", category: "", price: "", description: "", imageUrl: "" };

function AdminPage() {
  const [sessionReady, setSessionReady] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [form, setForm] = useState(initialForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setSessionReady(true);
      return;
    }
    supabase.auth.getUser().then(({ data, error }) => {
      setSignedIn(Boolean(data.user) && !error);
      setSessionReady(true);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSignedIn(Boolean(nextSession));
    });
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!signedIn || !supabase) return;
    void loadProducts();
  }, [signedIn]);

  async function loadProducts() {
    const { data, error } = await getSupabase()
      .from("products")
      .select("id, name, category, price, description, image_url")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setProducts((data as AdminProduct[] | null) ?? []);
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoggingIn(true);
    try {
      const { error } = await getSupabase().auth.signInWithPassword({ email, password });
      if (error) toast.error(error.message);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not sign in.");
    } finally {
      setLoggingIn(false);
    }
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    try {
      const client = getSupabase();
      const { data: userData, error: userError } = await client.auth.getUser();
      if (userError || !userData.user) {
        throw new Error("Your login session has expired. Please sign out and sign in again.");
      }
      let imageUrl = form.imageUrl.trim() || null;
      if (imageFile) {
        const cleanName = imageFile.name.replace(/[^a-zA-Z0-9._-]/g, "-");
        const path = `${crypto.randomUUID()}-${cleanName}`;
        const { error } = await client.storage.from("product-images").upload(path, imageFile, { upsert: false });
        if (error) throw error;
        imageUrl = client.storage.from("product-images").getPublicUrl(path).data.publicUrl;
      }
      const { error } = await client.from("products").insert({
        name: form.name.trim(),
        category: form.category,
        price: Number(form.price),
        description: form.description.trim() || null,
        image_url: imageUrl,
      });
      if (error) throw error;
      toast.success("Product added to the catalog.");
      setForm(initialForm);
      setImageFile(null);
      const fileInput = document.getElementById("product-image") as HTMLInputElement | null;
      if (fileInput) fileInput.value = "";
      await loadProducts();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save the product.");
    } finally {
      setSaving(false);
    }
  }

  async function removeProduct(product: AdminProduct) {
    if (!window.confirm(`Delete ${product.name}?`)) return;
    const { error } = await getSupabase().from("products").delete().eq("id", product.id);
    if (error) toast.error(error.message);
    else {
      setProducts((current) => current.filter((item) => item.id !== product.id));
      toast.success("Product deleted.");
    }
  }

  async function signOut() {
    await getSupabase().auth.signOut();
    setProducts([]);
  }

  if (!supabase) return <ConfigurationMessage />;
  if (!sessionReady) return <PageLoader />;
  if (!signedIn) {
    return (
      <main className="grid min-h-screen place-items-center bg-sky-50 px-4">
        <Toaster />
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-5 rounded-2xl bg-white p-7 shadow-lg">
          <div><p className="text-sm font-semibold text-[#009DE0]">GULLAK</p><h1 className="font-display text-3xl">Owner login</h1></div>
          <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></div>
          <div className="space-y-2"><Label htmlFor="password">Password</Label><Input id="password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required /></div>
          <Button className="w-full bg-[#D82338] hover:bg-[#c01d30]" disabled={loggingIn}>{loggingIn && <LoaderCircle className="animate-spin" />} Sign in</Button>
          <Link to="/" className="block text-center text-sm text-muted-foreground underline">Back to the shop</Link>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-sky-50 px-4 py-8"><Toaster />
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-sm font-semibold text-[#009DE0]">GULLAK</p><h1 className="font-display text-3xl">Catalog manager</h1></div><div className="flex gap-2"><Button asChild variant="outline"><Link to="/">View shop</Link></Button><Button variant="outline" onClick={signOut}><LogOut /> Sign out</Button></div></header>
        <form onSubmit={handleSave} className="grid gap-5 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2">
          <h2 className="font-display text-2xl md:col-span-2">Add a product</h2>
          <Field label="Name *" id="name"><Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></Field>
          <Field label="Category *" id="category"><select id="category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm" required><option value="" disabled>Select a category</option>{categories.filter((category) => category !== "All").map((category) => <option key={category}>{category}</option>)}</select></Field>
          <Field label="Price *" id="price"><Input id="price" type="number" min="0" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required /></Field>
          <Field label="Product image" id="product-image"><Input id="product-image" type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] ?? null)} /></Field>
          <Field label="Or image URL" id="image-url"><Input id="image-url" type="url" placeholder="https://..." value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} /></Field>
          <Field label="Description *" id="description" className="md:col-span-2"><Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required /></Field>
          <Button className="w-fit bg-[#D82338] hover:bg-[#c01d30] md:col-span-2" disabled={saving}>{saving ? <LoaderCircle className="animate-spin" /> : <Plus />} Add product</Button>
        </form>
        <section className="rounded-2xl bg-white p-6 shadow-sm"><h2 className="mb-5 font-display text-2xl">Products ({products.length})</h2><div className="space-y-3">{products.map((product) => <article key={product.id} className="flex items-center gap-4 rounded-xl border p-3"><img src={product.image_url || "/logo.png"} alt="" className="size-16 rounded-lg object-cover" /><div className="min-w-0 flex-1"><h3 className="font-semibold">{product.name}</h3><p className="text-sm text-muted-foreground">{product.category} · ${Number(product.price).toFixed(2)}</p></div><Button variant="destructive" size="icon" aria-label={`Delete ${product.name}`} onClick={() => void removeProduct(product)}><Trash2 /></Button></article>)}{products.length === 0 && <p className="py-6 text-center text-muted-foreground">No products yet.</p>}</div></section>
      </div>
    </main>
  );
}

function Field({ label, id, className = "", children }: { label: string; id: string; className?: string; children: React.ReactNode }) {
  return <div className={`space-y-2 ${className}`}><Label htmlFor={id}>{label}</Label>{children}</div>;
}

function PageLoader() { return <main className="grid min-h-screen place-items-center"><LoaderCircle className="animate-spin" /></main>; }
function ConfigurationMessage() { return <main className="grid min-h-screen place-items-center bg-sky-50 px-4"><div className="max-w-md rounded-2xl bg-white p-7 text-center shadow-lg"><h1 className="font-display text-3xl">Supabase needs configuring</h1><p className="mt-3 text-muted-foreground">Add your project URL and anon key to the root .env file, then restart the development server.</p></div></main>; }
