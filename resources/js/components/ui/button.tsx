import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Varian default dan link masih menggunakan hardcode HEX, tetapi aman.
        default: "bg-[#FF7E00] text-[#FF7E00]-foreground hover:bg-[#FF7E00]/90 hover:shadow-orange-glow",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-white hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-[#FF7E00] underline-offset-4 hover:underline",
        
        // Varian CTA (Tombol 'Daftar') sudah menggunakan variabel app.css
        cta: "bg-oxygen-orange text-primary-foreground hover:bg-orange-600 shadow-md hover:shadow-orange-glow hover:scale-105",
        
        // Varian CTA Outline (Tombol 'Selfcare') sudah menggunakan variabel app.css
        ctaOutline: "border-2 border-oxygen-teal text-oxygen-teal hover:bg-oxygen-teal hover:text-primary-foreground",
      },
      size: {
        default: "h-9 px-8 py-1.5",
        sm: "h-9 rounded-xl px-3",
        lg: "h-10 rounded-xl px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
