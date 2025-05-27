"use client";
import createGlobe, { COBEOptions } from "cobe";
import { useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
const MOVEMENT_DAMPING = 1400;
const REALISTIC_GLOBE_CONFIG: COBEOptions = {
    width: 600 * 2,  // Increased from 800 for higher resolution
    height: 600 * 2, // Increased from 800 for higher resolution
    onRender: () => { },
    devicePixelRatio: 3.41, // Increased from 2.5 for sharper rendering
    phi: 0,
    theta: 0,
    dark: 1,
    diffuse: 1.2,
    mapSamples: 16000,
    mapBrightness: 6,
    baseColor: [0.3, 0.3, 0.3],
    markerColor: [0.1, 0.8, 1],
    glowColor: [1, 1, 1],
    markers: [
        // longitude latitude
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 },
        { location: [14.5995, 120.9842], size: 0.03 },
        { location: [19.076, 72.8777], size: 0.1 },
        { location: [23.8103, 90.4125], size: 0.05 },
        { location: [30.0444, 31.2357], size: 0.07 },
        { location: [39.9042, 116.4074], size: 0.08 },
        { location: [-23.5505, -46.6333], size: 0.1 },
        { location: [19.4326, -99.1332], size: 0.1 },
        { location: [40.7128, -74.006], size: 0.1 },
        { location: [34.6937, 135.5022], size: 0.05 },
        { location: [41.0082, 28.9784], size: 0.06 },
    ],
};
export function Globe({
    className,
    config = REALISTIC_GLOBE_CONFIG,
}: {
    className?: string;
    config?: COBEOptions;
}) {
    // Use useRef for mutable values that shouldn't trigger re-renders
    const phiRef = useRef(0);
    const widthRef = useRef(0);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointerInteracting = useRef<number | null>(null);
    const pointerInteractionMovement = useRef(0);
    const r = useMotionValue(0);
    const rs = useSpring(r, {
        mass: 1,
        damping: 30,
        stiffness: 100,
    });
    const updatePointerInteraction = (value: number | null) => {
        pointerInteracting.current = value;
        if (canvasRef.current) {
            canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
        }
    };
    const updateMovement = (clientX: number) => {
        if (pointerInteracting.current !== null) {
            const delta = clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            r.set(r.get() + delta / MOVEMENT_DAMPING);
        }
    };
    useEffect(() => {
        const onResize = () => {
            if (canvasRef.current) {
                widthRef.current = canvasRef.current.offsetWidth;
            }
        };
        window.addEventListener("resize", onResize);
        onResize();

        // Apply high-quality rendering properties
        if (canvasRef.current) {
            canvasRef.current.style.imageRendering = "high-quality";
        }

        const globe = createGlobe(canvasRef.current!, {
            ...config,
            width: widthRef.current * 2.5,  // Increased multiplier for sharper rendering
            height: widthRef.current * 2.5, // Increased multiplier for sharper rendering
            onRender: (state) => {
                if (!pointerInteracting.current) phiRef.current += 0.005;
                state.phi = phiRef.current + rs.get();
                state.width = widthRef.current * 2.5;  // Match the above multiplier
                state.height = widthRef.current * 2.5; // Match the above multiplier
            },
        });
        setTimeout(() => {
            if (canvasRef.current) {
                canvasRef.current.style.opacity = "1";
            }
        }, 0);
        return () => {
            globe.destroy();
            window.removeEventListener("resize", onResize);
        };
    }, [rs, config]);
    return (
        <div
            className={cn(
                "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
                className,
            )}
        >
            <canvas
                className={cn(
                    "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]",
                )}
                ref={canvasRef}
                onPointerDown={(e) => {
                    pointerInteracting.current = e.clientX;
                    updatePointerInteraction(e.clientX);
                }}
                onPointerUp={() => updatePointerInteraction(null)}
                onPointerOut={() => updatePointerInteraction(null)}
                onMouseMove={(e) => updateMovement(e.clientX)}
                onTouchMove={(e) =>
                    e.touches[0] && updateMovement(e.touches[0].clientX)
                }
            />
        </div>
    );
}