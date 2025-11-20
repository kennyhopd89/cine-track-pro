"use client";

import { Festival, Submission } from "@/types";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Calendar, MapPin, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface FestivalCardProps {
    festival: Festival;
    submission?: Submission;
    onClick: () => void;
}

export function FestivalCard({ festival, submission, onClick }: FestivalCardProps) {
    // Deadline Logic
    const today = new Date();
    const dDate = new Date(festival.deadline);
    const diffTime = dDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const isSubmitted = submission?.status === 'Submitted' || submission?.status === 'Selected' || submission?.status === 'Rejected';
    const isCritical = diffDays < 7 && diffDays >= 0 && !isSubmitted;
    const isPastDue = diffDays < 0 && !isSubmitted;

    return (
        <div onClick={onClick} className="cursor-pointer group">
            <GlassPanel className={cn(
                "p-4 transition-all duration-300 hover:bg-zinc-800/50 border-l-4",
                isCritical ? "border-l-red-500" :
                    submission?.status === 'Selected' ? "border-l-green-500" :
                        submission?.status === 'Submitted' ? "border-l-blue-500" :
                            "border-l-zinc-700"
            )}>
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-white group-hover:text-indigo-400 transition">{festival.name}</h3>
                    {festival.tier === 'A-List' && (
                        <span className="text-[10px] font-bold bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/30">
                            A-LIST
                        </span>
                    )}
                </div>

                <div className="flex items-center text-xs text-zinc-400 mb-3">
                    <MapPin size={12} className="mr-1" />
                    {festival.location}
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className={cn(
                        "flex items-center text-xs font-mono",
                        isCritical ? "text-red-400 animate-pulse" :
                            isPastDue ? "text-zinc-600" : "text-zinc-400"
                    )}>
                        <Calendar size={12} className="mr-1.5" />
                        {isPastDue ? "Closed" : `${diffDays} days left`}
                    </div>

                    {submission ? (
                        <span className={cn(
                            "text-xs px-2 py-1 rounded-full border flex items-center",
                            submission.status === 'Submitted' ? "bg-blue-900/20 text-blue-400 border-blue-800" :
                                submission.status === 'Selected' ? "bg-green-900/20 text-green-400 border-green-800" :
                                    submission.status === 'Rejected' ? "bg-red-900/20 text-red-400 border-red-800" :
                                        "bg-zinc-800 text-zinc-400 border-zinc-700"
                        )}>
                            {submission.status}
                        </span>
                    ) : (
                        <span className="text-xs text-zinc-600 flex items-center">
                            <Clock size={12} className="mr-1" /> Planning
                        </span>
                    )}
                </div>
            </GlassPanel>
        </div>
    );
}
