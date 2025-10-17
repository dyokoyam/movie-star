import type { ButtonHTMLAttributes } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({ variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      data-variant={variant}
      style={{
        borderRadius: "0.375rem",
        backgroundColor: variant === "primary" ? "#111" : "transparent",
        color: variant === "primary" ? "#fff" : "#111",
        padding: "0.75rem 1.25rem",
        border: variant === "primary" ? "none" : "1px solid #111",
      }}
      {...props}
    />
  );
}

export default Button;
