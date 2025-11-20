export type ProjectStatus = 'Development' | 'Pre-Production' | 'Production' | 'Post-Production' | 'Completed';

export interface VFXStats {
  total: number;
  done: number;
  deadline: string; // ISO Date string YYYY-MM-DD
}

export interface Project {
  id: string;
  title: string;
  code: string;
  director: string;
  poster: string;
  status: ProjectStatus;
  vfxStats: VFXStats;
}

export type AssetType = 'editorial' | 'vfx' | 'sound' | 'master';
export type AssetStatus = 'waiting' | 'changes_req' | 'approved';

export interface Festival {
  id: string;
  name: string;
  location: string;
  tier: 'A-List' | 'B-List' | 'Shorts' | 'Regional';
  deadline: string;
  contactEmail: string;
}

export type SubmissionStatus = 'Planning' | 'Submitted' | 'Selected' | 'Rejected';

export interface Submission {
  id: string;
  projectId: string;
  festivalId: string;
  status: SubmissionStatus;
  submissionDate?: string;
  screenerLink?: string;
  screenerPass?: string;
  dcpVersion?: string;
  trackingNumber?: string;
}

export interface Asset {
  id: string;
  pid: string;
  dept: AssetType;
  ver: string;
  scope: string;
  url: string;
  status: AssetStatus;
  note: string;
}
