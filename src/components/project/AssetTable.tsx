import { useState } from "react";
import { Asset } from "@/types";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { MoreHorizontal, Edit, Trash2, Lock } from "lucide-react";
import { useProjectStore } from "@/store/useProjectStore";
import { AssetModal } from "@/components/project/AssetModal";
import { useAuth } from "@/context/auth-context";
import { ensureUrlProtocol } from "@/lib/utils";

interface AssetTableProps {
    assets: Asset[];
}

export function AssetTable({ assets }: AssetTableProps) {
    const { deleteAsset } = useProjectStore();
    const { user } = useAuth();
    const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    if (assets.length === 0) {
        return (
            <div className="p-8 text-center text-zinc-600 italic border border-zinc-800 rounded-xl bg-zinc-900/20">
                No assets found.
            </div>
        );
    }

    return (
        <>
            <GlassPanel className="overflow-visible">
                <table className="w-full text-left">
                    <thead className="bg-zinc-900/50 text-xs uppercase text-zinc-500 border-b border-zinc-800">
                        <tr>
                            <th className="p-4">Version / Shot</th>
                            <th className="p-4">Scope</th>
                            <th className="p-4">Link</th>
                            <th className="p-4">Note</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-zinc-800">
                        {assets.map((asset) => (
                            <tr key={asset.id} className="hover:bg-zinc-800/50 transition group relative">
                                <td className="p-4 text-white font-medium">{asset.ver}</td>
                                <td className="p-4">
                                    <span className="bg-zinc-800 border border-zinc-700 text-zinc-300 px-2 py-1 rounded text-xs">
                                        {asset.scope}
                                    </span>
                                </td>
                                <td className="p-4">
                                    {user?.role === 'viewer' ? (
                                        <span className="text-zinc-600 italic flex items-center">
                                            <Lock className="w-3 h-3 mr-2" /> Hidden
                                        </span>
                                    ) : (
                                        <a href={ensureUrlProtocol(asset.url)} target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">
                                            {asset.url}
                                        </a>
                                    )}
                                </td>
                                <td className="p-4 text-zinc-500 italic">{asset.note}</td>
                                <td className="p-4">
                                    <StatusBadge status={asset.status} type="asset" />
                                </td>
                                <td className="p-4 text-right text-zinc-500 relative">
                                    {user?.role !== 'viewer' && (
                                        <>
                                            <button
                                                onClick={() => setOpenMenuId(openMenuId === asset.id ? null : asset.id)}
                                                className="hover:text-white transition p-1 rounded hover:bg-zinc-700"
                                            >
                                                <MoreHorizontal size={16} />
                                            </button>

                                            {openMenuId === asset.id && (
                                                <>
                                                    <div
                                                        className="fixed inset-0 z-10"
                                                        onClick={() => setOpenMenuId(null)}
                                                    />
                                                    <div className="absolute right-4 top-10 w-32 bg-zinc-900 border border-zinc-700 rounded shadow-xl z-20 overflow-hidden">
                                                        <button
                                                            onClick={() => {
                                                                setEditingAsset(asset);
                                                                setOpenMenuId(null);
                                                            }}
                                                            className="w-full text-left px-4 py-2 text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white flex items-center"
                                                        >
                                                            <Edit className="mr-2 w-3 h-3" /> Edit
                                                        </button>
                                                        {user?.role === 'admin' && (
                                                            <button
                                                                onClick={() => {
                                                                    if (confirm('Delete this asset?')) deleteAsset(asset.id);
                                                                    setOpenMenuId(null);
                                                                }}
                                                                className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-zinc-800 hover:text-red-300 flex items-center"
                                                            >
                                                                <Trash2 className="mr-2 w-3 h-3" /> Delete
                                                            </button>
                                                        )}
                                                    </div>
                                                </>
                                            )}
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </GlassPanel>

            <AssetModal
                isOpen={!!editingAsset}
                onClose={() => setEditingAsset(null)}
                projectId={editingAsset?.pid || ''}
                assetToEdit={editingAsset || undefined}
            />
        </>
    );
}
