import { create } from 'zustand';
import { Project, Asset, ProjectStatus, Festival, Submission } from '@/types';
import { supabase } from '@/lib/supabase';
import {
    mapProjectFromDB, mapProjectToDB,
    mapAssetFromDB, mapAssetToDB,
    mapSubmissionFromDB, mapSubmissionToDB,
    mapFestivalFromDB
} from '@/lib/mappers';

interface ProjectState {
    projects: Project[];
    assets: Asset[];
    festivals: Festival[];
    submissions: Submission[];
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchInitialData: () => Promise<void>;

    setProjects: (projects: Project[]) => void;
    addProject: (project: Omit<Project, 'id'>) => Promise<void>;
    updateProject: (id: string, data: Partial<Project>) => Promise<void>;
    deleteProject: (id: string) => Promise<void>;
    setCurrentProject: (id: string | null) => void;

    addAsset: (asset: Omit<Asset, 'id'>) => Promise<void>;
    updateAsset: (id: string, data: Partial<Asset>) => Promise<void>;
    deleteAsset: (id: string) => Promise<void>;

    addSubmission: (submission: Omit<Submission, 'id'>) => Promise<void>;
    updateSubmission: (id: string, data: Partial<Submission>) => Promise<void>;
    deleteSubmission: (id: string) => Promise<void>;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
    projects: [],
    assets: [],
    festivals: [],
    submissions: [],
    isLoading: false,
    error: null,

    fetchInitialData: async () => {
        set({ isLoading: true, error: null });
        try {
            const [pRes, aRes, fRes, sRes] = await Promise.all([
                supabase.from('projects').select('*'),
                supabase.from('assets').select('*'),
                supabase.from('festivals').select('*'),
                supabase.from('submissions').select('*')
            ]);

            if (pRes.error) throw pRes.error;
            if (aRes.error) throw aRes.error;
            if (fRes.error) throw fRes.error;
            if (sRes.error) throw sRes.error;

            set({
                projects: (pRes.data || []).map(mapProjectFromDB),
                assets: (aRes.data || []).map(mapAssetFromDB),
                festivals: (fRes.data || []).map(mapFestivalFromDB),
                submissions: (sRes.data || []).map(mapSubmissionFromDB),
                isLoading: false
            });
        } catch (error: any) {
            console.error('Error fetching data:', error);
            set({ error: error.message, isLoading: false });
        }
    },

    setProjects: (projects) => set({ projects }),
    setCurrentProject: (id) => { }, // Not really used in this implementation, can be removed or kept as placeholder

    addProject: async (project) => {
        // We omit ID and let Supabase generate it.
        const dbData = mapProjectToDB(project);
        const { data, error } = await supabase.from('projects').insert(dbData).select().single();
        if (error) {
            console.error('Error adding project:', error);
            return;
        }
        const newProject = mapProjectFromDB(data);
        set((state) => ({ projects: [...state.projects, newProject] }));
    },

    updateProject: async (id, data) => {
        const dbData = mapProjectToDB(data);
        const { error } = await supabase.from('projects').update(dbData).eq('id', id);
        if (error) {
            console.error('Error updating project:', error);
            return;
        }
        set((state) => ({
            projects: state.projects.map((p) => p.id === id ? { ...p, ...data } : p)
        }));
    },

    deleteProject: async (id) => {
        const { error } = await supabase.from('projects').delete().eq('id', id);
        if (error) {
            console.error('Error deleting project:', error);
            return;
        }
        set((state) => ({
            projects: state.projects.filter((p) => p.id !== id)
        }));
    },

    addAsset: async (asset) => {
        const dbData = mapAssetToDB(asset);
        const { data, error } = await supabase.from('assets').insert(dbData).select().single();
        if (error) {
            console.error('Error adding asset:', error);
            return;
        }
        const newAsset = mapAssetFromDB(data);
        set((state) => ({ assets: [...state.assets, newAsset] }));
    },

    updateAsset: async (id, data) => {
        const dbData = mapAssetToDB(data);
        const { error } = await supabase.from('assets').update(dbData).eq('id', id);
        if (error) {
            console.error('Error updating asset:', error);
            return;
        }
        set((state) => ({
            assets: state.assets.map((a) => a.id === id ? { ...a, ...data } : a)
        }));
    },

    deleteAsset: async (id) => {
        const { error } = await supabase.from('assets').delete().eq('id', id);
        if (error) {
            console.error('Error deleting asset:', error);
            return;
        }
        set((state) => ({
            assets: state.assets.filter((a) => a.id !== id)
        }));
    },

    addSubmission: async (submission) => {
        const dbData = mapSubmissionToDB(submission);
        const { data, error } = await supabase.from('submissions').insert(dbData).select().single();
        if (error) {
            console.error('Error adding submission:', error);
            return;
        }
        const newSubmission = mapSubmissionFromDB(data);
        set((state) => ({ submissions: [...state.submissions, newSubmission] }));
    },

    updateSubmission: async (id, data) => {
        const dbData = mapSubmissionToDB(data);
        const { error } = await supabase.from('submissions').update(dbData).eq('id', id);
        if (error) {
            console.error('Error updating submission:', error);
            return;
        }
        set((state) => ({
            submissions: state.submissions.map((s) => s.id === id ? { ...s, ...data } : s)
        }));
    },

    deleteSubmission: async (id) => {
        const { error } = await supabase.from('submissions').delete().eq('id', id);
        if (error) {
            console.error('Error deleting submission:', error);
            return;
        }
        set((state) => ({
            submissions: state.submissions.filter((s) => s.id !== id)
        }));
    },
}));
