import { ReactElement } from "react";

type ButtonVariants = "primary" | "secondary";

interface ButtonProps {
  variant: ButtonVariants;
  text: string;
  startIcon?: ReactElement;
}

type Variants = Record<ButtonVariants, string>;

const variantClasses: Variants = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-200 text-purple-400",
};

const defaultClasses = "px-4 py-2 rounded-md font-light flex gap-2";

export function Button({ variant, text, startIcon }: ButtonProps) {
  return (
    <button className={`${defaultClasses} ${variantClasses[variant]}`}>
      <div className="self-center">{startIcon}</div>
      {text}
    </button>
  );
}
