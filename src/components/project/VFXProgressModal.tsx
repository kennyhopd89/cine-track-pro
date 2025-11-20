"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Project } from "@/types";
import { useProjectStore } from "@/store/useProjectStore";

interface VFXProgressModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: Project;
}

export function VFXProgressModal({ isOpen, onClose, project }: VFXProgressModalProps) {
    const { updateProject } = useProjectStore();

    const [formData, setFormData] = useState({
        total: 0,
        done: 0,
        deadline: ''
    });

    useEffect(() => {
        if (project && project.vfxStats) {
            setFormData({
                total: project.vfxStats.total,
                done: project.vfxStats.done,
                deadline: project.vfxStats.deadline
            });
        }
    }, [project, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        updateProject(project.id, {
            vfxStats: {
                ...project.vfxStats,
                total: Number(formData.total),
                done: Number(formData.done),
                deadline: formData.deadline
            }
        });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Update VFX Progress">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs text-zinc-400 block mb-1">Total Shots</label>
                        <input
                            type="number"
                            min="0"
                            className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white focus:border-indigo-500 outline-none"
                            value={formData.total}
                            onChange={e => setFormData({ ...formData, total: parseInt(e.target.value) || 0 })}
                        />
                    </div>
                    <div>
                        <label className="text-xs text-zinc-400 block mb-1">Completed Shots</label>
                        <input
                            type="number"
                            min="0"
                            className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white focus:border-indigo-500 outline-none"
                            value={formData.done}
                            onChange={e => setFormData({ ...formData, done: parseInt(e.target.value) || 0 })}
                        />
                    </div>
                </div>

                <div>
                    <label className="text-xs text-zinc-400 block mb-1">Deadline</label>
                    <input
                        type="date"
                        className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white focus:border-indigo-500 outline-none"
                        value={formData.deadline}
                        onChange={e => setFormData({ ...formData, deadline: e.target.value })}
                    />
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-zinc-400 hover:text-white text-sm">Cancel</button>
                    <button type="submit" className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded font-medium text-sm shadow-lg shadow-indigo-900/20">
                        Save Progress
                    </button>
                </div>
            </form>
        </Modal>
    );
}
