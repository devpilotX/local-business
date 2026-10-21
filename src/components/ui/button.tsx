import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// Adapted from the MIT shadcn/ui button composition pattern.
const variants = cva("button", {
  variants: {
    variant: {
      primary: "button-primary",
      accent: "button-accent",
      outline: "button-outline",
      ghost: "button-ghost",
      light: "button-light",
      inverseOutline: "button-inverse-outline",
    },
    size: {
      sm: "button-sm",
      md: "",
      lg: "button-lg",
    },
  },
  defaultVariants: { variant: "primary", size: "md" },
});

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof variants> & { asChild?: boolean };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: Props) {
  const Component = asChild ? Slot : "button";
  return (
    <Component
      className={cn(variants({ variant, size }), className)}
      {...props}
    />
  );
}
