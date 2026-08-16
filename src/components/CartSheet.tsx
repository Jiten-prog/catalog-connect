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
import { useCart } from "@/lib/cart";
import { SendOrderFlow } from "@/components/SendOrderFlow";

export function CartSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { lines, total, setQty, remove, phone } = useCart();
  const [sendOrderOpen, setSendOrderOpen] = useState(false);

  function handleSend() {
    if (!lines.length) return;
    setSendOrderOpen(true);
  }

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="flex flex-col h-full bg-white">
          <SheetHeader>
            <SheetTitle className="font-display text-xl text-slate-900">🛒 Your Wishlist</SheetTitle>
            <SheetDescription>
              Receive your order summary on WhatsApp instantly.
            </SheetDescription>
          </SheetHeader>

          {/* Scrollable Products List */}
          <div className="flex-1 space-y-4 overflow-y-auto py-4">
            {lines.length === 0 ? (
              <div className="py-16 text-center space-y-2">
                <p className="text-3xl">🧸</p>
                <p className="text-sm font-medium text-slate-700">Nothing here yet</p>
                <p className="text-xs text-slate-400">Go pick some awesome toys from the catalog!</p>
              </div>
            ) : (
              lines.map((line) => (
                <div key={line.product.id} className="flex gap-3 p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <img
                    src={line.product.image}
                    alt={line.product.name}
                    loading="lazy"
                    width={800}
                    height={800}
                    className="size-18 rounded-lg object-cover bg-white border border-slate-200"
                  />
                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                      <p className="text-sm font-bold text-slate-800 leading-tight">{line.product.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        ${line.product.price.toFixed(2)} each
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1.5 bg-white rounded-lg border border-slate-200 p-0.5">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="size-6 rounded-md"
                          onClick={() => setQty(line.product.id, line.qty - 1)}
                          aria-label={`Decrease ${line.product.name}`}
                        >
                          <Minus className="size-3 text-slate-700" />
                        </Button>
                        <span className="w-5 text-center text-xs font-bold text-slate-800">{line.qty}</span>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="size-6 rounded-md"
                          onClick={() => setQty(line.product.id, line.qty + 1)}
                          aria-label={`Increase ${line.product.name}`}
                        >
                          <Plus className="size-3 text-slate-700" />
                        </Button>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="size-7 text-slate-400 hover:text-red-600 hover:bg-red-50"
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

          {/* Clean footer inside the drawer */}
          <SheetFooter className="space-y-3">
            <div className="flex items-center justify-between text-base py-1">
              <span className="text-slate-600 font-medium">Subtotal</span>
              <span className="font-display text-2xl font-bold text-slate-900">${total.toFixed(2)}</span>
            </div>

            <Button
              variant="whatsapp"
              disabled={!lines.length}
              onClick={handleSend}
              className="w-full font-bold shadow-sm py-3 text-sm rounded-xl cursor-pointer"
            >
              <MessageCircle className="size-4.5 mr-1" />
              Send Order Summary to WhatsApp
            </Button>

            {/* Disclaimer & User Info */}
            <div className="flex flex-col items-center text-center gap-1 text-xs text-slate-500 pt-1">
              {phone ? (
                <div className="flex items-center gap-1.5">
                  <span>Sending to: <strong className="text-slate-700">+{phone}</strong></span>
                  <button
                    className="underline text-[#009DE0] hover:text-[#0089c4] cursor-pointer"
                    onClick={() => setSendOrderOpen(true)}
                  >
                    (Change)
                  </button>
                </div>
              ) : null}
              <p className="flex items-center justify-center gap-1 text-[11px] text-slate-500 mt-0.5">
                <ShieldCheck className="size-3.5 text-emerald-600 shrink-0" />
                A copy will be shared with the store owner for order confirmation.
              </p>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <SendOrderFlow open={sendOrderOpen} onOpenChange={setSendOrderOpen} />
    </>
  );
}
