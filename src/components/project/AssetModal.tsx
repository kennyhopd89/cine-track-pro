"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Asset, AssetType, AssetStatus } from "@/types";
import { useProjectStore } from "@/store/useProjectStore";

interface AssetModalProps {
    isOpen: boolean;
    onClose: () => void;
    projectId: string;
    assetToEdit?: Asset;
}

export function AssetModal({ isOpen, onClose, projectId, assetToEdit }: AssetModalProps) {
    const { addAsset, updateAsset } = useProjectStore();

    const [formData, setFormData] = useState({
        dept: 'vfx' as AssetType,
        ver: '',
        scope: '',
        url: '',
        status: 'waiting' as AssetStatus,
        note: ''
    });

    useEffect(() => {
        if (assetToEdit) {
            setFormData({
                dept: assetToEdit.dept,
                ver: assetToEdit.ver,
                scope: assetToEdit.scope,
                url: assetToEdit.url,
                status: assetToEdit.status,
                note: assetToEdit.note
            });
        } else {
            setFormData({
                dept: 'vfx',
                ver: '',
                scope: '',
                url: '',
                status: 'waiting',
                note: ''
            });
        }
    }, [assetToEdit, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (assetToEdit) {
            updateAsset(assetToEdit.id, formData);
        } else {
            addAsset({
                id: 'a' + Date.now(),
                pid: projectId,
                ...formData
            });
        }
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={assetToEdit ? "Edit Asset" : "Add New Asset"}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs text-zinc-400 block mb-1">Department</label>
                        <select
                            className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white text-sm focus:border-indigo-500 outline-none"
                            value={formData.dept}
                            onChange={e => setFormData({ ...formData, dept: e.target.value as AssetType })}
                        >
                            <option value="editorial">Editorial</option>
                            <option value="vfx">VFX</option>
                            <option value="sound">Sound</option>
                            <option value="master">Master</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs text-zinc-400 block mb-1">Status</label>
                        <select
                            className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white text-sm focus:border-indigo-500 outline-none"
                            value={formData.status}
                            onChange={e => setFormData({ ...formData, status: e.target.value as AssetStatus })}
                        >
                            <option value="waiting">Waiting</option>
                            <option value="changes_req">Changes Required</option>
                            <option value="approved">Approved</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="text-xs text-zinc-400 block mb-1">Version / Shot Name</label>
                    <input
                        type="text"
                        required
                        className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white focus:border-indigo-500 outline-none"
                        placeholder="e.g. Shot 024_Comp_v03"
                        value={formData.ver}
                        onChange={e => setFormData({ ...formData, ver: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs text-zinc-400 block mb-1">Scope</label>
                        <input
                            type="text"
                            className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white focus:border-indigo-500 outline-none"
                            placeholder="e.g. Reel 1"
                            value={formData.scope}
                            onChange={e => setFormData({ ...formData, scope: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="text-xs text-zinc-400 block mb-1">Link URL</label>
                        <input
                            type="text"
                            className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white focus:border-indigo-500 outline-none"
                            placeholder="frame.io/..."
                            value={formData.url}
                            onChange={e => setFormData({ ...formData, url: e.target.value })}
                        />
                    </div>
                </div>

                <div>
                    <label className="text-xs text-zinc-400 block mb-1">Notes</label>
                    <textarea
                        className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white focus:border-indigo-500 outline-none text-sm h-20"
                        placeholder="Add comments..."
                        value={formData.note}
                        onChange={e => setFormData({ ...formData, note: e.target.value })}
                    />
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-zinc-400 hover:text-white text-sm">Cancel</button>
                    <button type="submit" className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded font-medium text-sm shadow-lg shadow-indigo-900/20">
                        {assetToEdit ? 'Update Asset' : 'Add Asset'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
