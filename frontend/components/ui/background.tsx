"use client";

import { useEffect, useRef } from "react";

export function Background() {
    return (
        <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
            {/* Gradient Orbs */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] animate-pulse-slow" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/20 blur-[120px] animate-pulse-slow delay-1000" />

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            {/* Subtle moving particles (CSS ONLY for performance) */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-foreground rounded-full animate-float opacity-50" />
                <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-primary rounded-full animate-float delay-500 opacity-50" />
                <div className="absolute bottom-10 left-10 w-1 h-1 bg-secondary rounded-full animate-float delay-200 opacity-50" />
            </div>
        </div>
    );
}
