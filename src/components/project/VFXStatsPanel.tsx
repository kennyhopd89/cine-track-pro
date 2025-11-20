import { useState } from "react";
import { Project } from "@/types";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { AlertTriangle, CheckCircle, CalendarCheck, Edit } from "lucide-react";
import { VFXProgressModal } from "@/components/project/VFXProgressModal";

interface VFXStatsPanelProps {
    project: Project;
}

export function VFXStatsPanel({ project }: VFXStatsPanelProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { total, done, deadline } = project.vfxStats;

    if (!total && total !== 0) return null;

    const percent = total > 0 ? Math.round((done / total) * 100) : 0;
    const remaining = total - done;

    // Deadline Logic
    const today = new Date();
    const dDate = new Date(deadline);
    const diffDays = Math.ceil((dDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    const isCritical = diffDays < 7 && percent < 90 && deadline;
    const isCompleted = percent >= 100 && total > 0;

    return (
        <div className="mb-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Progress Card */}
                <GlassPanel className="p-5 col-span-2 flex flex-col justify-center border-l-4 border-l-purple-600 relative group">
                    <div className="flex justify-between items-end mb-2">
                        <div>
                            <h3 className="text-lg font-bold text-white">VFX Progress</h3>
                            <p className="text-zinc-400 text-xs">Total: {total} shots</p>
                        </div>
                        <div className="text-3xl font-bold text-purple-400 font-mono">{percent}%</div>
                    </div>
                    <div className="w-full bg-zinc-800 rounded-full h-3 mb-2 relative overflow-hidden">
                        <div
                            className="bg-purple-600 h-3 rounded-full transition-all duration-1000"
                            style={{ width: `${percent}%` }}
                        ></div>
                        {/* Pattern Overlay */}
                        <div className="absolute inset-0 opacity-20 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkQAKrVq36zwjjgzhhYWGMYAEYB8RmROaABADeOQ8CXl/xfgAAAABJRU5ErkJggg==')]"></div>
                    </div>
                    <div className="flex justify-between text-xs text-zinc-500 font-mono">
                        <span>0</span>
                        <span>Done: {done}</span>
                        <span>{total}</span>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="absolute top-4 right-4 text-zinc-500 hover:text-white opacity-0 group-hover:opacity-100 transition"
                    >
                        <Edit size={16} />
                    </button>
                </GlassPanel>

                {/* Alert / Status Card */}
                <div className="flex flex-col justify-center space-y-2">
                    {isCritical ? (
                        <div className="flex items-center bg-red-900/20 border border-red-800 text-red-300 px-4 py-3 rounded-lg animate-pulse">
                            <AlertTriangle className="text-xl mr-3 flex-shrink-0" />
                            <div>
                                <div className="font-bold text-sm">Critical Timeline Alert</div>
                                <div className="text-xs opacity-80">
                                    Deadline VFX ({deadline}) is in {diffDays} days. {remaining} shots remaining!
                                </div>
                            </div>
                        </div>
                    ) : isCompleted ? (
                        <div className="flex items-center bg-green-900/20 border border-green-800 text-green-400 px-4 py-3 rounded-lg">
                            <CheckCircle className="text-xl mr-3" />
                            <div className="font-bold text-sm">VFX Completed!</div>
                        </div>
                    ) : (
                        <GlassPanel className="p-4 flex items-center text-zinc-400">
                            <CalendarCheck className="mr-3 text-lg" />
                            <div>
                                <div className="text-xs uppercase font-bold">Deadline</div>
                                <div className="text-white font-mono">{deadline || 'N/A'}</div>
                            </div>
                        </GlassPanel>
                    )}
                </div>
            </div>

            <VFXProgressModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                project={project}
            />
        </div>
    );
}
