import { Project, Asset, Submission, Festival, VFXStats } from "@/types";

// --- Project Mappers ---

export function mapProjectFromDB(dbProject: any): Project {
    return {
        id: dbProject.id,
        title: dbProject.title,
        code: dbProject.code,
        director: dbProject.director,
        poster: dbProject.poster,
        status: dbProject.status,
        vfxStats: dbProject.vfx_stats || { total: 0, done: 0, deadline: '' },
    };
}

export function mapProjectToDB(project: Partial<Project>): any {
    const dbProject: any = {};
    if (project.title !== undefined) dbProject.title = project.title;
    if (project.code !== undefined) dbProject.code = project.code;
    if (project.director !== undefined) dbProject.director = project.director;
    if (project.poster !== undefined) dbProject.poster = project.poster;
    if (project.status !== undefined) dbProject.status = project.status;
    if (project.vfxStats !== undefined) dbProject.vfx_stats = project.vfxStats;
    return dbProject;
}

// --- Asset Mappers ---

export function mapAssetFromDB(dbAsset: any): Asset {
    return {
        id: dbAsset.id,
        pid: dbAsset.pid,
        dept: dbAsset.dept,
        ver: dbAsset.ver,
        scope: dbAsset.scope,
        url: dbAsset.link,      // DB: link, App: url
        status: dbAsset.status,
        note: dbAsset.notes,    // DB: notes, App: note
    };
}

export function mapAssetToDB(asset: Partial<Asset>): any {
    const dbAsset: any = {};
    if (asset.pid !== undefined) dbAsset.pid = asset.pid;
    if (asset.dept !== undefined) dbAsset.dept = asset.dept;
    if (asset.ver !== undefined) dbAsset.ver = asset.ver;
    if (asset.scope !== undefined) dbAsset.scope = asset.scope;
    if (asset.url !== undefined) dbAsset.link = asset.url;
    if (asset.status !== undefined) dbAsset.status = asset.status;
    if (asset.note !== undefined) dbAsset.notes = asset.note;
    return dbAsset;
}

// --- Submission Mappers ---

export function mapSubmissionFromDB(dbSubmission: any): Submission {
    return {
        id: dbSubmission.id,
        projectId: dbSubmission.project_id,
        festivalId: dbSubmission.festival_id,
        status: dbSubmission.status,
        submissionDate: dbSubmission.submission_date,
        screenerLink: dbSubmission.screener_link,
        screenerPass: dbSubmission.screener_pass,
        dcpVersion: dbSubmission.dcp_version,
        trackingNumber: dbSubmission.tracking_number,
    };
}

export function mapSubmissionToDB(submission: Partial<Submission>): any {
    const dbSubmission: any = {};
    if (submission.projectId !== undefined) dbSubmission.project_id = submission.projectId;
    if (submission.festivalId !== undefined) dbSubmission.festival_id = submission.festivalId;
    if (submission.status !== undefined) dbSubmission.status = submission.status;
    if (submission.submissionDate !== undefined) dbSubmission.submission_date = submission.submissionDate;
    if (submission.screenerLink !== undefined) dbSubmission.screener_link = submission.screenerLink;
    if (submission.screenerPass !== undefined) dbSubmission.screener_pass = submission.screenerPass;
    if (submission.dcpVersion !== undefined) dbSubmission.dcp_version = submission.dcpVersion;
    if (submission.trackingNumber !== undefined) dbSubmission.tracking_number = submission.trackingNumber;
    return dbSubmission;
}

// --- Festival Mappers ---

export function mapFestivalFromDB(dbFestival: any): Festival {
    return {
        id: dbFestival.id,
        name: dbFestival.name,
        location: dbFestival.location,
        tier: dbFestival.tier,
        deadline: dbFestival.deadline,
        contactEmail: dbFestival.contact_email,
    };
}

export function mapFestivalToDB(festival: Partial<Festival>): any {
    const dbFestival: any = {};
    if (festival.name !== undefined) dbFestival.name = festival.name;
    if (festival.location !== undefined) dbFestival.location = festival.location;
    if (festival.tier !== undefined) dbFestival.tier = festival.tier;
    if (festival.deadline !== undefined) dbFestival.deadline = festival.deadline;
    if (festival.contactEmail !== undefined) dbFestival.contact_email = festival.contactEmail;
    return dbFestival;
}
