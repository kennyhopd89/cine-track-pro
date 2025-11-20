import { Project } from "@/types";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { StatusBadge } from "@/components/ui/StatusBadge";
import Link from "next/link";

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
    const { vfxStats } = project;
    const pct = vfxStats.total > 0 ? Math.round((vfxStats.done / vfxStats.total) * 100) : 0;

    return (
        <Link href={`/projects/${project.id}`}>
            <GlassPanel className="overflow-hidden cursor-pointer hover:border-indigo-500 transition group relative h-full">
                <div className="h-48 relative overflow-hidden">
                    <img
                        src={project.poster}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700 opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    <div className="absolute bottom-3 left-4 z-10">
                        <h3 className="font-bold text-lg text-white shadow-sm">{project.title}</h3>
                        <span className="text-[10px] bg-zinc-800 px-2 py-0.5 rounded text-zinc-300 border border-zinc-700">
                            {project.code}
                        </span>
                    </div>
                </div>

                <div className="p-4">
                    <div className="flex justify-between items-center mb-2 text-xs">
                        <span className="text-zinc-400">VFX Progress</span>
                        <span className="text-white font-mono">{pct}%</span>
                    </div>
                    <div className="w-full bg-zinc-800 rounded-full h-1.5 mb-4">
                        <div
                            className="bg-indigo-500 h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${pct}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between items-center text-xs text-zinc-500">
                        <span>{project.director}</span>
                        <StatusBadge status={project.status} />
                    </div>
                </div>
            </GlassPanel>
        </Link>
    );
}
