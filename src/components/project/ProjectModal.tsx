"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Project } from "@/types";
import { Wand2 } from "lucide-react";
import { useProjectStore } from "@/store/useProjectStore";

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    projectToEdit?: Project;
}

export function ProjectModal({ isOpen, onClose, projectToEdit }: ProjectModalProps) {
    const { addProject, updateProject } = useProjectStore();

    const [formData, setFormData] = useState({
        title: '',
        code: '',
        director: '',
        vfxTotal: 0,
        vfxDone: 0,
        vfxDeadline: ''
    });

    useEffect(() => {
        if (projectToEdit) {
            setFormData({
                title: projectToEdit.title,
                code: projectToEdit.code,
                director: projectToEdit.director,
                vfxTotal: projectToEdit.vfxStats.total,
                vfxDone: projectToEdit.vfxStats.done,
                vfxDeadline: projectToEdit.vfxStats.deadline
            });
        } else {
            setFormData({
                title: '',
                code: '',
                director: '',
                vfxTotal: 0,
                vfxDone: 0,
                vfxDeadline: ''
            });
        }
    }, [projectToEdit, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const vfxStats = {
            total: Number(formData.vfxTotal),
            done: Number(formData.vfxDone),
            deadline: formData.vfxDeadline
        };

        if (projectToEdit) {
            updateProject(projectToEdit.id, {
                title: formData.title,
                code: formData.code,
                director: formData.director,
                vfxStats
            });
        } else {
            addProject({
                id: 'p' + Date.now(),
                title: formData.title,
                code: formData.code,
                director: formData.director,
                poster: 'https://placehold.co/400x600/333/FFF?text=' + formData.code,
                status: 'Development',
                vfxStats
            });
        }
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={projectToEdit ? "Edit Project Details" : "Create New Project"}>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="col-span-2">
                        <label className="text-xs text-zinc-400 block mb-1">Project Title</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white focus:border-indigo-500 outline-none transition"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="text-xs text-zinc-400 block mb-1">Internal Code</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white font-mono uppercase"
                            value={formData.code}
                            onChange={e => setFormData({ ...formData, code: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="text-xs text-zinc-400 block mb-1">Director</label>
                        <input
                            type="text"
                            className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white"
                            value={formData.director}
                            onChange={e => setFormData({ ...formData, director: e.target.value })}
                        />
                    </div>

                    <div className="col-span-2 border-t border-zinc-800 pt-4 mt-2">
                        <label className="text-xs font-bold text-purple-400 uppercase block mb-2 flex items-center">
                            <Wand2 className="mr-2 w-3 h-3" /> VFX Tracker Config
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            <div>
                                <label className="text-[10px] text-zinc-500 block">Total Shots</label>
                                <input
                                    type="number"
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white text-center"
                                    placeholder="0"
                                    value={formData.vfxTotal}
                                    onChange={e => setFormData({ ...formData, vfxTotal: Number(e.target.value) })}
                                />
                            </div>
                            <div>
                                <label className="text-[10px] text-zinc-500 block">Shots Done</label>
                                <input
                                    type="number"
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white text-center"
                                    placeholder="0"
                                    value={formData.vfxDone}
                                    onChange={e => setFormData({ ...formData, vfxDone: Number(e.target.value) })}
                                />
                            </div>
                            <div>
                                <label className="text-[10px] text-zinc-500 block">Deadline</label>
                                <input
                                    type="date"
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white text-xs"
                                    value={formData.vfxDeadline}
                                    onChange={e => setFormData({ ...formData, vfxDeadline: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-zinc-400 hover:text-white text-sm">Cancel</button>
                    <button type="submit" className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded font-medium text-sm shadow-lg shadow-indigo-900/20">Save Project</button>
                </div>
            </form>
        </Modal>
    );
}
