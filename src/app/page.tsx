"use client";

import { useProjectStore } from "@/store/useProjectStore";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ProjectModal } from "@/components/project/ProjectModal";

export default function DashboardPage() {
  const { projects } = useProjectStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto p-8 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Dashboard</h1>
          <p className="text-zinc-400">Overview of film projects and progress.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg shadow-lg font-medium flex items-center transition"
        >
          <Plus className="mr-2 w-5 h-5" /> New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
