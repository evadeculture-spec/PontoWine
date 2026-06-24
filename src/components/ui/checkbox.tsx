"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Checkbox controlado simples (sem dependência extra), com aparência premium.
 * Compatível com React Hook Form via onCheckedChange.
 */
export interface CheckboxProps {
  id?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
  "aria-invalid"?: boolean;
}

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ id, checked = false, onCheckedChange, className, ...props }, ref) => (
    <button
      ref={ref}
      id={id}
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gold/40 bg-white/[0.03] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60",
        checked && "bg-gold border-gold text-ink",
        className
      )}
      {...props}
    >
      {checked && <Check className="h-3.5 w-3.5" />}
    </button>
  )
);
Checkbox.displayName = "Checkbox";
