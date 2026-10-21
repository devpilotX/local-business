import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
// Adapted from the MIT shadcn/ui button composition pattern.
const variants = cva("button", {
  variants: {
    variant: {
      primary: "button-primary",
      outline: "button-outline",
      light: "button-light",
    },
  },
  defaultVariants: { variant: "primary" },
});
type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof variants> & { asChild?: boolean };
export function Button({
  className,
  variant,
  asChild = false,
  ...props
}: Props) {
  const Component = asChild ? Slot : "button";
  return (
    <Component className={cn(variants({ variant }), className)} {...props} />
  );
}
