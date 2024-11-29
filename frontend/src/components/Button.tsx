import { ReactElement } from "react";

type ButtonVariants = "primary" | "secondary";

interface ButtonProps {
  variant: ButtonVariants;
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  isLoading?: boolean;
}

type Variants = Record<ButtonVariants, string>;

const variantClasses: Variants = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-200 text-purple-400",
};

const defaultClasses = "px-4 py-2 rounded-md font-light flex gap-2";

export function Button({
  variant,
  text,
  startIcon,
  onClick,
  fullWidth,
  isLoading,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${defaultClasses} ${variantClasses[variant]} ${fullWidth ? "w-full" : ""} ${isLoading ? "opacity-45" : ""}`}
      disabled={isLoading}
    >
      {startIcon && <div className="self-center">{startIcon}</div>}
      <div className="mr-auto ml-auto">{text}</div>
    </button>
  );
}
