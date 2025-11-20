"use client";
"use client";

import { Project } from "@/types";
import { Camera, ArrowLeft, User, Edit, Box, Globe } from "lucide-react";
import Link from "next/link";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ProjectModal } from "@/components/project/ProjectModal";
import { useProjectStore } from "@/store/useProjectStore";

interface ProjectHeaderProps {
    project: Project;
    activeTab: 'assets' | 'festivals';
    onTabChange: (tab: 'assets' | 'festivals') => void;
}

export function ProjectHeader({ project, activeTab, onTabChange }: ProjectHeaderProps) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { updateProject } = useProjectStore();

    const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateProject(project.id, { poster: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="h-56 relative flex-shrink-0">
            {/* Background Blur */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-30 blur-xl scale-110 transition-all duration-700"
                style={{ backgroundImage: `url(${project.poster})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

            <div className="absolute bottom-0 left-0 w-full p-8 flex items-end z-10">
                {/* Poster */}
                <div className="relative group mr-6 flex-shrink-0">
                    <img
                        src={project.poster}
                        alt={project.title}
                        className="w-36 h-52 rounded-lg shadow-2xl border border-zinc-700 object-cover bg-zinc-800"
                    />
                    <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center cursor-pointer rounded-lg text-white">
                        <Camera className="mb-2 w-6 h-6" />
                        <span className="text-xs font-medium">Change Cover</span>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleCoverUpload}
                        />
                    </label>
                </div>

                {/* Info */}
                <div className="mb-2 flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                        <span className="text-xs font-mono bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded border border-zinc-700">
                            {project.code}
                        </span>
                        <StatusBadge status={project.status} />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-1 truncate shadow-black drop-shadow-md">
                        {project.title}
                    </h1>
                    <div className="flex items-center text-zinc-400 text-sm space-x-4">
                        <span className="flex items-center">
                            <User className="mr-1 w-4 h-4" /> {project.director}
                        </span>
                        <button
                            onClick={() => setIsEditModalOpen(true)}
                            className="text-zinc-500 hover:text-white transition flex items-center"
                        >
                            <Edit className="mr-1 w-4 h-4" /> Edit Info
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex space-x-1 bg-zinc-900/80 p-1 rounded-lg backdrop-blur-md border border-zinc-700">
                    <button
                        onClick={() => onTabChange('assets')}
                        className={cn(
                            "px-5 py-2 rounded text-sm font-medium transition flex items-center",
                            activeTab === 'assets' ? "bg-indigo-600 text-white" : "text-zinc-400 hover:text-white"
                        )}
                    >
                        <Box className="mr-2 w-4 h-4" /> Assets
                    </button>
                    <button
                        onClick={() => onTabChange('festivals')}
                        className={cn(
                            "px-5 py-2 rounded text-sm font-medium transition flex items-center",
                            activeTab === 'festivals' ? "bg-indigo-600 text-white" : "text-zinc-400 hover:text-white"
                        )}
                    >
                        <Globe className="mr-2 w-4 h-4" /> Festivals
                    </button>
                </div>
            </div>

            <Link
                href="/"
                className="absolute top-6 left-6 text-zinc-300 hover:text-white bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md z-50 text-sm border border-white/10 flex items-center transition"
            >
                <ArrowLeft className="mr-2 w-4 h-4" /> Dashboard
            </Link>

            <ProjectModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                projectToEdit={project}
            />
        </div>
    );
}
