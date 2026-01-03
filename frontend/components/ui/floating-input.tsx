"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const FloatingInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, id, ...props }, ref) => {
        return (
            <div className="relative">
                <input
                    className={cn(
                        "block px-2.5 pb-2.5 pt-4 w-full text-sm text-foreground bg-background/50 backdrop-blur-sm rounded-lg border border-input appearance-none focus:outline-none focus:ring-0 focus:border-primary peer transition-all duration-300 hover:border-primary/30",
                        className
                    )}
                    placeholder=" "
                    id={id}
                    ref={ref}
                    {...props}
                />
                <label
                    htmlFor={id}
                    className="absolute text-sm text-muted-foreground duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 pointer-events-none"
                >
                    {label}
                </label>
            </div>
        );
    }
);
FloatingInput.displayName = "FloatingInput";

export { FloatingInput };
