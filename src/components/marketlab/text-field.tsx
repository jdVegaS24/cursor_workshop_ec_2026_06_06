import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  hint?: string;
  error?: string | null;
};

export function TextField({
  id,
  label,
  hint,
  error,
  className,
  ...props
}: TextFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          error ? `${id}-error` : hint ? `${id}-hint` : undefined
        }
        className={cn(
          "flex h-11 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm outline-none transition-colors",
          "placeholder:text-muted-foreground/70",
          "focus-visible:border-brand focus-visible:ring-3 focus-visible:ring-brand/20",
          error &&
            "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
        )}
        {...props}
      />
      {hint && !error ? (
        <p
          id={`${id}-hint`}
          className="text-xs leading-relaxed text-muted-foreground"
        >
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
