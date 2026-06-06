import { cn } from "@/lib/utils";

type AuthFieldProps = {
  id: string;
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  className?: string;
};

export function AuthField({
  id,
  label,
  name,
  type = "text",
  autoComplete,
  required = false,
  className,
}: AuthFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      />
    </div>
  );
}
