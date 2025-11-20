import { cn } from "@/lib/utils";
import React from "react";

interface StatusBadgeProps {
    status: string;
    type?: 'project' | 'asset';
    className?: string;
}

export function StatusBadge({ status, type = 'project', className }: StatusBadgeProps) {
    const getColors = (s: string) => {
        const lower = s.toLowerCase();
        if (type === 'project') {
            if (lower.includes('production')) return "text-emerald-400";
            if (lower.includes('development')) return "text-zinc-400";
            return "text-white";
        }
        // Asset status
        if (lower === 'approved') return "bg-green-900/30 text-green-400 border-green-800";
        if (lower === 'changes_req') return "bg-amber-900/30 text-amber-400 border-amber-800";
        return "bg-zinc-800 text-zinc-300 border-zinc-700";
    };

    const isAsset = type === 'asset';

    return (
        <span
            className={cn(
                "uppercase font-bold tracking-wider",
                isAsset ? "px-2 py-1 rounded text-[10px] border" : "text-xs",
                getColors(status),
                className
            )}
        >
            {status}
        </span>
    );
}
