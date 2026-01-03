"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export function CountUp({
    value,
    direction = "up",
    delay = 0,
    className = "",
    decimalPlaces = 1,
    suffix = "%", // default suffix
}: {
    value: number;
    direction?: "up" | "down";
    delay?: number;
    className?: string;
    decimalPlaces?: number;
    suffix?: string;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(direction === "down" ? value : 0);
    const springValue = useSpring(motionValue, {
        damping: 60,
        stiffness: 100,
    });
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            setTimeout(() => {
                motionValue.set(direction === "down" ? 0 : value);
            }, delay * 1000);
        }
    }, [motionValue, isInView, delay, value, direction]);

    useEffect(() => {
        springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = latest.toFixed(decimalPlaces) + suffix;
            }
        });

        return () => springValue.destroy(); // Cleanup listener
    }, [springValue, decimalPlaces, suffix]);

    return <span className={className} ref={ref} />;
}
