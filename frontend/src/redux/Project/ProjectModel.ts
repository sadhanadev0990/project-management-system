export interface Project {
	_id: string;
	name: string;
	title: string;
	stage: string;
	status: string;
	description: string;
	teamCount: number;
	dueDate: string;
}

export interface CRProject {
	name: string;
	title: string;
	stage: string;
	status: string;
	description: string;
	teamCount: number;
	dueDate: string;
}

export interface ProjectRes {
	projects: [];
}
export interface InfoProject {
	page: number;
}
