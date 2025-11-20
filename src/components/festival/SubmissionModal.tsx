"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Festival, Submission, Project, SubmissionStatus } from "@/types";
import { useProjectStore } from "@/store/useProjectStore";
import { generateEmailTemplate } from "@/lib/emailTemplates";
import { Copy, Check, Mail, Film, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubmissionModalProps {
    isOpen: boolean;
    onClose: () => void;
    festival: Festival;
    project: Project;
    submission?: Submission;
}

export function SubmissionModal({ isOpen, onClose, festival, project, submission }: SubmissionModalProps) {
    const { addSubmission, updateSubmission, assets } = useProjectStore();
    const [activeTab, setActiveTab] = useState<'details' | 'assets' | 'email'>('details');
    const [copied, setCopied] = useState(false);

    // Form State
    const [status, setStatus] = useState<SubmissionStatus>('Planning');
    const [screenerLink, setScreenerLink] = useState('');
    const [screenerPass, setScreenerPass] = useState('');
    const [dcpVersion, setDcpVersion] = useState('');

    // Initialize state when modal opens
    useEffect(() => {
        if (isOpen) {
            setStatus(submission?.status || 'Planning');
            setScreenerLink(submission?.screenerLink || '');
            setScreenerPass(submission?.screenerPass || '');
            setDcpVersion(submission?.dcpVersion || '');
            setActiveTab('details');
        }
    }, [isOpen, submission]);

    const handleSave = () => {
        const data = {
            projectId: project.id,
            festivalId: festival.id,
            status,
            screenerLink,
            screenerPass,
            dcpVersion,
            submissionDate: status === 'Submitted' && !submission?.submissionDate ? new Date().toISOString() : submission?.submissionDate
        };

        if (submission) {
            updateSubmission(submission.id, data);
        } else {
            addSubmission({
                ...data
            });
        }
        onClose();
    };

    const emailContent = generateEmailTemplate(festival, project, screenerLink || '[LINK]', screenerPass || '[PASS]');

    const copyToClipboard = () => {
        navigator.clipboard.writeText(emailContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Filter only relevant assets for DCP dropdown
    const dcpAssets = assets.filter(a => a.pid === project.id && (a.dept === 'master' || a.dept === 'vfx'));

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Manage Submission: ${festival.name}`}>
            <div className="flex space-x-1 mb-6 bg-zinc-900/50 p-1 rounded-lg border border-zinc-800">
                {(['details', 'assets', 'email'] as const).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                            "flex-1 py-1.5 text-xs font-medium rounded transition capitalize flex items-center justify-center",
                            activeTab === tab ? "bg-zinc-800 text-white shadow" : "text-zinc-500 hover:text-zinc-300"
                        )}
                    >
                        {tab === 'details' && <FileText size={12} className="mr-1.5" />}
                        {tab === 'assets' && <Film size={12} className="mr-1.5" />}
                        {tab === 'email' && <Mail size={12} className="mr-1.5" />}
                        {tab}
                    </button>
                ))}
            </div>

            <div className="min-h-[300px]">
                {activeTab === 'details' && (
                    <div className="space-y-4 animate-fade-in">
                        <div>
                            <label className="text-xs text-zinc-400 block mb-1">Status</label>
                            <select
                                className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white text-sm focus:border-indigo-500 outline-none"
                                value={status}
                                onChange={e => setStatus(e.target.value as SubmissionStatus)}
                            >
                                <option value="Planning">Planning</option>
                                <option value="Submitted">Submitted</option>
                                <option value="Selected">Selected</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-zinc-900/50 p-3 rounded border border-zinc-800">
                                <div className="text-xs text-zinc-500 mb-1">Deadline</div>
                                <div className="text-sm text-white font-mono">{festival.deadline}</div>
                            </div>
                            <div className="bg-zinc-900/50 p-3 rounded border border-zinc-800">
                                <div className="text-xs text-zinc-500 mb-1">Tier</div>
                                <div className="text-sm text-white">{festival.tier}</div>
                            </div>
                        </div>

                        <div className="bg-zinc-900/50 p-3 rounded border border-zinc-800">
                            <div className="text-xs text-zinc-500 mb-1">Contact Email</div>
                            <div className="text-sm text-indigo-400">{festival.contactEmail}</div>
                        </div>
                    </div>
                )}

                {activeTab === 'assets' && (
                    <div className="space-y-4 animate-fade-in">
                        <div>
                            <label className="text-xs text-zinc-400 block mb-1">Screener Link</label>
                            <input
                                type="text"
                                className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white focus:border-indigo-500 outline-none text-sm"
                                placeholder="https://vimeo.com/..."
                                value={screenerLink}
                                onChange={e => setScreenerLink(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-xs text-zinc-400 block mb-1">Password</label>
                            <input
                                type="text"
                                className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white focus:border-indigo-500 outline-none text-sm"
                                placeholder="Secret123"
                                value={screenerPass}
                                onChange={e => setScreenerPass(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-xs text-zinc-400 block mb-1">DCP Version</label>
                            <select
                                className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white text-sm focus:border-indigo-500 outline-none"
                                value={dcpVersion}
                                onChange={e => setDcpVersion(e.target.value)}
                            >
                                <option value="">Select a DCP / Master...</option>
                                {dcpAssets.map(a => (
                                    <option key={a.id} value={a.ver}>{a.ver} ({a.scope})</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}

                {activeTab === 'email' && (
                    <div className="animate-fade-in h-full flex flex-col">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-zinc-400">Preview</span>
                            <button
                                onClick={copyToClipboard}
                                className="text-xs flex items-center bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded transition"
                            >
                                {copied ? <Check size={12} className="mr-1.5" /> : <Copy size={12} className="mr-1.5" />}
                                {copied ? "Copied!" : "Copy Email"}
                            </button>
                        </div>
                        <textarea
                            readOnly
                            className="w-full flex-1 bg-zinc-950 border border-zinc-800 rounded p-3 text-zinc-300 font-mono text-xs resize-none focus:outline-none h-64"
                            value={emailContent}
                        />
                    </div>
                )}
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t border-zinc-800 mt-4">
                <button onClick={onClose} className="px-4 py-2 text-zinc-400 hover:text-white text-sm">Cancel</button>
                <button onClick={handleSave} className="px-6 py-2 bg-white text-black hover:bg-zinc-200 rounded font-bold text-sm">
                    Save Changes
                </button>
            </div>
        </Modal>
    );
}
