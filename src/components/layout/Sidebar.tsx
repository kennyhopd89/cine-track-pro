"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Film, LayoutGrid, Plus } from "lucide-react";
import { useProjectStore } from "@/store/useProjectStore";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ProjectModal } from "@/components/project/ProjectModal";

export function Sidebar() {
    const pathname = usePathname();
    const { projects } = useProjectStore();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <aside className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col flex-shrink-0 z-20 h-screen">
            <div className="p-6 flex items-center space-x-3 border-b border-zinc-800 h-16">
                <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white font-bold">
                    <Film size={16} />
                </div>
                <span className="font-bold text-lg tracking-tight text-white">CINE-TRACK Pro</span>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                <Link
                    href="/"
                    className={cn(
                        "w-full text-left px-4 py-2 rounded-lg font-medium transition flex items-center",
                        pathname === "/"
                            ? "bg-zinc-800 text-white"
                            : "text-zinc-400 hover:text-white hover:bg-zinc-900/50"
                    )}
                >
                    <LayoutGrid className="mr-3 w-5 h-5" />
                    Dashboard
                </Link>

                <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mt-6 mb-2 px-2 flex justify-between items-center">
                    <span>Projects</span>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="hover:text-white text-zinc-600 transition"
                    >
                        <Plus size={14} />
                    </button>
                </div>

                <div className="space-y-1">
                    {projects.map((p) => (
                        <Link
                            key={p.id}
                            href={`/projects/${p.id}`}
                            className={cn(
                                "w-full text-left px-4 py-2 rounded-lg text-sm truncate transition flex items-center group",
                                pathname === `/projects/${p.id}`
                                    ? "bg-zinc-800 text-white"
                                    : "text-zinc-400 hover:text-white hover:bg-zinc-900/50"
                            )}
                        >
                            <span className={cn(
                                "w-2 h-2 rounded-full mr-3 transition-colors",
                                pathname === `/projects/${p.id}` ? "bg-indigo-500" : "bg-zinc-600 group-hover:bg-indigo-500"
                            )} />
                            {p.title}
                        </Link>
                    ))}
                </div>
            </nav>

            <ProjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </aside>
    );
}
