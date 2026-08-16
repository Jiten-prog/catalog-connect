import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { normalizePhone } from "@/lib/cart";

type Props = {
  open: boolean;
  initial: string;
  onOpenChange: (open: boolean) => void;
  onSave: (phone: string) => void;
};

export function PhoneDialog({ open, initial, onOpenChange, onSave }: Props) {
  const [value, setValue] = useState(initial);
  const [error, setError] = useState("");

  function submit() {
    const digits = normalizePhone(value);
    if (digits.length < 8) {
      setError("Enter your full number with country code, e.g. +91 98765 43210");
      return;
    }
    setError("");
    onSave(digits);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Enter your WhatsApp number</DialogTitle>
          <DialogDescription>
            Your number will be attached to the order sent to Gullak (+91 95306 40463) so we can confirm your items.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="whatsapp">WhatsApp linked phone number</Label>
          <Input
            id="whatsapp"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
          />
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </div>
        <DialogFooter>
          <Button variant="whatsapp" onClick={submit}>
            Save & send cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}