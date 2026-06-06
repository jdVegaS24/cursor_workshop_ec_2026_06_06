import { TextField } from "@/components/marketlab/text-field";

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
    <TextField
      id={id}
      label={label}
      name={name}
      type={type}
      autoComplete={autoComplete}
      required={required}
      className={className}
    />
  );
}
