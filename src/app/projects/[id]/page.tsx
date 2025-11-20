"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useProjectStore } from "@/store/useProjectStore";
import { ProjectHeader } from "@/components/project/ProjectHeader";
import { VFXStatsPanel } from "@/components/project/VFXStatsPanel";
import { AssetTable } from "@/components/project/AssetTable";
import { AssetType } from "@/types";
import { Wand2, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { AssetModal } from "@/components/project/AssetModal";

import { KanbanBoard } from "@/components/festival/KanbanBoard";
import { SubmissionModal } from "@/components/festival/SubmissionModal";
import { Festival, Submission } from "@/types";

export default function ProjectDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const { projects, assets, festivals, submissions } = useProjectStore();

    const project = projects.find((p) => p.id === id);
    const projectAssets = assets.filter((a) => a.pid === id);
    const projectSubmissions = submissions.filter(s => s.projectId === id);

    const [activeTab, setActiveTab] = useState<'assets' | 'festivals'>('assets');
    const [assetFilter, setAssetFilter] = useState<AssetType | 'all'>('all');
    const [isAssetModalOpen, setIsAssetModalOpen] = useState(false);

    // Festival Modal State
    const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
    const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);
    const [selectedSubmission, setSelectedSubmission] = useState<Submission | undefined>(undefined);

    if (!project) {
        return <div className="p-8 text-white">Project not found</div>;
    }

    const filteredAssets = assetFilter === 'all'
        ? projectAssets
        : projectAssets.filter(a => a.dept === assetFilter);

    const showVFXStats = assetFilter === 'vfx';

    const handleFestivalClick = (festival: Festival, submission?: Submission) => {
        setSelectedFestival(festival);
        setSelectedSubmission(submission);
        setIsSubmissionModalOpen(true);
    };

    return (
        <div className="flex-1 flex flex-col bg-[#09090b] relative overflow-y-auto">
            <ProjectHeader
                project={project}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            <div className="flex-1 p-8">
                {activeTab === 'assets' && (
                    <div className="animate-fade-in">
                        {/* Filter Bar */}
                        <div className="flex justify-between items-center mb-6 sticky top-0 bg-[#09090b] z-10 py-2">
                            <div className="flex space-x-2">
                                {(['all', 'editorial', 'vfx', 'sound', 'master'] as const).map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setAssetFilter(type)}
                                        className={cn(
                                            "px-3 py-1.5 rounded-full text-xs font-medium border transition flex items-center capitalize",
                                            assetFilter === type
                                                ? "bg-zinc-800 text-white border-zinc-700"
                                                : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white",
                                            type === 'vfx' && assetFilter !== 'vfx' && "border-purple-900/50 bg-purple-900/20 text-purple-400 hover:text-purple-300 hover:bg-purple-900/40"
                                        )}
                                    >
                                        {type === 'vfx' && <Wand2 className="mr-1 w-3 h-3" />}
                                        {type}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setIsAssetModalOpen(true)}
                                className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white px-4 py-2 rounded shadow text-sm flex items-center transition"
                            >
                                <LinkIcon className="mr-2 w-4 h-4" /> Add Asset Link
                            </button>
                        </div>

                        {showVFXStats && <VFXStatsPanel project={project} />}

                        <AssetTable assets={filteredAssets} />
                    </div>
                )}

                {activeTab === 'festivals' && (
                    <div className="h-full animate-fade-in">
                        <KanbanBoard
                            festivals={festivals}
                            submissions={projectSubmissions}
                            onCardClick={handleFestivalClick}
                        />
                    </div>
                )}
            </div>

            <AssetModal
                isOpen={isAssetModalOpen}
                onClose={() => setIsAssetModalOpen(false)}
                projectId={id}
            />

            {selectedFestival && (
                <SubmissionModal
                    isOpen={isSubmissionModalOpen}
                    onClose={() => setIsSubmissionModalOpen(false)}
                    festival={selectedFestival}
                    project={project}
                    submission={selectedSubmission}
                />
            )}
        </div>
    );
}
