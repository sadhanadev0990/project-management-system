export const SAVE_PROJECT_URL = '/api/v1/projects/';

export const GET_PROJECTS_URL = (project: { page: number }) =>
	`/api/v1/projects`;

export const GET_PROJECT_INFO_URL = (projectId: string) =>
	`/api/v1/projects/${projectId}`;

export const GET_LOGIN_URL = `/api/v1/users/login`;

export const GET_SIGNUP_URL = `/api/v1/users/signup`;

export const GET_LOGOUT_URL = `/api/v1/users/logout`;
