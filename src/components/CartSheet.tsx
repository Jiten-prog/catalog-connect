import { useState } from "react";
import { Minus, Plus, Trash2, MessageCircle } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { buildCartMessage, useCart } from "@/lib/cart";
import { PhoneDialog } from "@/components/PhoneDialog";

export function CartSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { lines, total, setQty, remove, phone, setPhone } = useCart();
  const [askPhone, setAskPhone] = useState(false);

  function send(to: string) {
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

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="flex w-full flex-col sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="font-display text-xl">Your cart</SheetTitle>
            <SheetDescription>
              Send the list to your WhatsApp and we'll take it from there.
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 space-y-4 overflow-y-auto px-4">
            {lines.length === 0 ? (
              <p className="py-10 text-center text-sm text-muted-foreground">
                Nothing here yet. Add something lovely.
              </p>
            ) : (
              lines.map((line) => (
                <div key={line.product.id} className="flex gap-3">
                  <img
                    src={line.product.image}
                    alt={line.product.name}
                    loading="lazy"
                    width={800}
                    height={800}
                    className="size-20 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{line.product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ${line.product.price.toFixed(2)}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="size-7"
                        onClick={() => setQty(line.product.id, line.qty - 1)}
                        aria-label={`Decrease ${line.product.name}`}
                      >
                        <Minus className="size-3" />
                      </Button>
                      <span className="w-6 text-center text-sm">{line.qty}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="size-7"
                        onClick={() => setQty(line.product.id, line.qty + 1)}
                        aria-label={`Increase ${line.product.name}`}
                      >
                        <Plus className="size-3" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="size-7 text-muted-foreground"
                        onClick={() => remove(line.product.id)}
                        aria-label={`Remove ${line.product.name}`}
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <SheetFooter>
            <Separator className="mb-2" />
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total</span>
              <span className="font-display text-lg">${total.toFixed(2)}</span>
            </div>
            <Button variant="whatsapp" disabled={!lines.length} onClick={handleSend}>
              <MessageCircle className="size-4" />
              Send cart to WhatsApp
            </Button>
            {phone ? (
              <button
                className="mt-2 text-center text-xs text-muted-foreground underline"
                onClick={() => setAskPhone(true)}
              >
                Sending to +{phone} — change number
              </button>
            ) : null}
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <PhoneDialog
        open={askPhone}
        initial={phone}
        onOpenChange={setAskPhone}
        onSave={(next) => {
          setPhone(next);
          setAskPhone(false);
          send(next);
        }}
      />
    </>
  );
}