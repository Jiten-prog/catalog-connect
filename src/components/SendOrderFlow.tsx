import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PhoneDialog } from "@/components/PhoneDialog";
import {
  buildCustomerCartMessage,
  buildOwnerCartMessage,
  OWNER_PHONE,
  useCart,
} from "@/lib/cart";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SendOrderFlow({ open, onOpenChange }: Props) {
  const { lines, total, phone, setPhone } = useCart();
  const [step, setStep] = useState<"phone" | "confirm">("phone");
  const [customerPhone, setCustomerPhone] = useState("");

  function handlePhoneSave(digits: string) {
    setPhone(digits);
    setCustomerPhone(digits);

    const ownerMessage = buildOwnerCartMessage(lines, total, digits);
    window.open(
      `https://wa.me/${OWNER_PHONE}?text=${encodeURIComponent(ownerMessage)}`,
      "_blank",
      "noopener,noreferrer",
    );

    setStep("confirm");
  }

  function sendCustomerCopy() {
    const customerMessage = buildCustomerCartMessage(lines, total);
    window.open(
      `https://wa.me/${customerPhone}?text=${encodeURIComponent(customerMessage)}`,
      "_blank",
      "noopener,noreferrer",
    );
    close();
  }

  function close() {
    onOpenChange(false);
    setStep("phone");
    setCustomerPhone("");
  }

  return (
    <>
      <PhoneDialog
        open={open && step === "phone"}
        initial={phone}
        onOpenChange={(nextOpen) => (nextOpen ? onOpenChange(true) : close())}
        onSave={handlePhoneSave}
      />

      <Dialog open={open && step === "confirm"} onOpenChange={(nextOpen) => !nextOpen && close()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Order sent to the store</DialogTitle>
            <DialogDescription>
              Want your own copy on WhatsApp too? Tap below to send it to yourself.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:justify-end">
            <Button variant="outline" onClick={close}>
              Skip
            </Button>
            <Button variant="whatsapp" onClick={sendCustomerCopy}>
              Send myself a copy
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
