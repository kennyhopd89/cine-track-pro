"use client";

import { Festival, Submission, SubmissionStatus } from "@/types";
import { FestivalCard } from "./FestivalCard";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Plus } from "lucide-react";

interface KanbanBoardProps {
    festivals: Festival[];
    submissions: Submission[];
    onCardClick: (festival: Festival, submission?: Submission) => void;
}

const COLUMNS: { id: SubmissionStatus | 'Planning', label: string }[] = [
    { id: 'Planning', label: 'Planning' },
    { id: 'Submitted', label: 'Submitted' },
    { id: 'Selected', label: 'Selected' },
    { id: 'Rejected', label: 'Rejected' }
];

export function KanbanBoard({ festivals, submissions, onCardClick }: KanbanBoardProps) {

    const getColumnItems = (status: string) => {
        if (status === 'Planning') {
            // Return festivals that DON'T have a submission yet, OR have submission status 'Planning'
            return festivals.filter(f => {
                const sub = submissions.find(s => s.festivalId === f.id);
                return !sub || sub.status === 'Planning';
            });
        }
        // Return festivals that have a submission with the matching status
        return festivals.filter(f => {
            const sub = submissions.find(s => s.festivalId === f.id);
            return sub?.status === status;
        });
    };

    return (
        <div className="flex h-full space-x-4 overflow-x-auto pb-4">
            {COLUMNS.map(col => {
                const items = getColumnItems(col.id);

                return (
                    <div key={col.id} className="flex-shrink-0 w-80 flex flex-col">
                        <div className="flex justify-between items-center mb-3 px-2">
                            <h3 className="font-bold text-zinc-400 text-sm uppercase tracking-wider">
                                {col.label}
                            </h3>
                            <span className="bg-zinc-800 text-zinc-500 text-xs px-2 py-0.5 rounded-full">
                                {items.length}
                            </span>
                        </div>

                        <div className="flex-1 space-y-3 overflow-y-auto min-h-[200px]">
                            {items.map(festival => {
                                const sub = submissions.find(s => s.festivalId === festival.id);
                                return (
                                    <FestivalCard
                                        key={festival.id}
                                        festival={festival}
                                        submission={sub}
                                        onClick={() => onCardClick(festival, sub)}
                                    />
                                );
                            })}

                            {items.length === 0 && (
                                <div className="h-24 border-2 border-dashed border-zinc-800/50 rounded-xl flex items-center justify-center text-zinc-700 text-xs">
                                    No items
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
