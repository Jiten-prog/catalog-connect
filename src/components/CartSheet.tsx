import { useState } from "react";
import { Minus, Plus, Trash2, MessageCircle, ShieldCheck } from "lucide-react";
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

  function executeSend(customerPhone: string) {
    // 1. Prepare message for store owner with customer's phone number
    const ownerText = encodeURIComponent(buildOwnerCartMessage(lines, total, customerPhone));
    // 2. Prepare message for customer
    const customerText = encodeURIComponent(buildCustomerCartMessage(lines, total));

    // Open chat for owner with customer's details
    window.open(`https://wa.me/${OWNER_PHONE}?text=${ownerText}`, "_blank", "noopener,noreferrer");

    // Also open copy for customer
    setTimeout(() => {
      window.open(`https://wa.me/${customerPhone}?text=${customerText}`, "_blank", "noopener,noreferrer");
    }, 400);

    toast.success("Order summary sent! A copy has been shared with the store owner.");
  }

  function handleSend() {
    if (!lines.length) return;
    if (!phone) {
      setAskPhone(true);
      return;
    }
    executeSend(phone);
  }

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="flex w-full flex-col sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="font-display text-xl">🛒 Your Wishlist</SheetTitle>
            <SheetDescription>
              Receive your order summary on WhatsApp instantly.
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

            <Button
              variant="whatsapp"
              disabled={!lines.length}
              onClick={handleSend}
              className="w-full font-semibold shadow-xs py-2.5"
            >
              <MessageCircle className="size-4" />
              Send Order Summary to WhatsApp
            </Button>

            {/* Disclaimer and user phone info */}
            <div className="flex flex-col items-center text-center gap-1.5 pt-1 text-xs text-muted-foreground">
              {phone ? (
                <div className="flex items-center gap-1.5">
                  <span>Sending to: <strong>+{phone}</strong></span>
                  <button
                    className="underline text-[#009DE0] hover:text-[#0089c4]"
                    onClick={() => setAskPhone(true)}
                  >
                    (Change)
                  </button>
                </div>
              ) : null}
              <p className="flex items-center justify-center gap-1 text-[11px] text-slate-500">
                <ShieldCheck className="size-3.5 text-emerald-600 shrink-0" />
                A copy will be shared with the store owner for order confirmation.
              </p>
            </div>
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
          executeSend(next);
        }}
      />
    </>
  );
}