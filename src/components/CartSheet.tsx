import { useState } from "react";
import { Minus, Plus, Trash2, MessageCircle, Send } from "lucide-react";
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
import {
  OWNER_PHONE,
  OWNER_PHONE_DISPLAY,
  buildOwnerCartMessage,
  buildCustomerCartMessage,
  useCart,
} from "@/lib/cart";
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

  function sendToOwner(customerPhone: string) {
    const text = encodeURIComponent(buildOwnerCartMessage(lines, total, customerPhone));
    window.open(`https://wa.me/${OWNER_PHONE}?text=${text}`, "_blank", "noopener,noreferrer");
    toast.success(`Order summary prepared for Gullak Store (${OWNER_PHONE_DISPLAY})`);
  }

  function sendToCustomer(customerPhone: string) {
    const text = encodeURIComponent(buildCustomerCartMessage(lines, total));
    window.open(`https://wa.me/${customerPhone}?text=${text}`, "_blank", "noopener,noreferrer");
    toast.success(`Sent copy to your WhatsApp (+${customerPhone})`);
  }

  function handleSend() {
    if (!lines.length) return;
    if (!phone) {
      setAskPhone(true);
      return;
    }
    sendToOwner(phone);
  }

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="flex w-full flex-col sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="font-display text-xl">🛒 Your Wishlist</SheetTitle>
            <SheetDescription>
              Send your order directly to Gullak Store on WhatsApp!
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 space-y-4 overflow-y-auto px-4">
            {lines.length === 0 ? (
              <p className="py-10 text-center text-sm text-muted-foreground">
                Nothing here yet — go pick some awesome toys! 🎮
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
                    className="size-20 rounded-xl object-cover border border-slate-100 bg-slate-50"
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
                        className="size-7 text-muted-foreground hover:text-destructive"
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

          <SheetFooter className="flex flex-col gap-2">
            <Separator className="mb-1" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total</span>
              <span className="font-display text-lg">${total.toFixed(2)}</span>
            </div>

            {/* Primary Action: Send Order to Store Owner */}
            <Button
              variant="whatsapp"
              disabled={!lines.length}
              onClick={handleSend}
              className="w-full font-semibold shadow-xs"
            >
              <MessageCircle className="size-4" />
              Send Order to Gullak Store
            </Button>

            {/* Secondary Action: Also send copy to customer's own number */}
            {phone && lines.length > 0 ? (
              <div className="flex flex-col items-center gap-1 mt-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span>Your number: <strong>+{phone}</strong></span>
                  <button
                    className="underline text-[#009DE0] hover:text-[#0089c4]"
                    onClick={() => setAskPhone(true)}
                  >
                    Change
                  </button>
                </div>
                <button
                  className="flex items-center gap-1 underline text-muted-foreground hover:text-foreground mt-0.5"
                  onClick={() => sendToCustomer(phone)}
                >
                  <Send className="size-3" />
                  Also send copy to my own WhatsApp
                </button>
              </div>
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
          sendToOwner(next);
        }}
      />
    </>
  );
}