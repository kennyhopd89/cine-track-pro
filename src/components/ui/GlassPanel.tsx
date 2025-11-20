import { cn } from "@/lib/utils";
import React from "react";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

export function GlassPanel({ children, className, ...props }: GlassPanelProps) {
    return (
        <div
            className={cn(
                "glass-panel rounded-xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-xl",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
