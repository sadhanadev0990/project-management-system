/* eslint-disable no-underscore-dangle */
import { Project, InfoProject, CRProject } from './ProjectModel';

import {
	getApiInstance,
	postApiInstance,
	putApiInstance,
	deleteApiInstance
} from '../config/apiconfig';
import * as api from '../../common/constants/api';

export const getProjects = async (
	project: InfoProject
): Promise<Project[] | undefined> => {
	try {
		const response = await getApiInstance(api.GET_PROJECTS_URL(project));
		return response.data;
	} catch (error) {
		return error;
	}
};

export const createProject = async (
	project: CRProject
): Promise<string | undefined> => {
	try {
		const response = await postApiInstance(api.SAVE_PROJECT_URL, project);
		return response.data;
	} catch (error) {
		return error;
	}
};

export const getProjectDetail = async (
	id: string
): Promise<Project | undefined> => {
	try {
		const response = await getApiInstance(api.GET_PROJECT_INFO_URL(id));
		return response.data;
	} catch (error) {
		return error;
	}
};

export const updateProject = async (
	project: Project
): Promise<Project | undefined> => {
	try {
		const response = await putApiInstance(
			api.GET_PROJECT_INFO_URL(project._id),
			project
		);
		return response.data;
	} catch (error) {
		return error;
	}
};

export const deleteProject = async (
	id: string
): Promise<Project | undefined> => {
	try {
		const response = await deleteApiInstance(api.GET_PROJECT_INFO_URL(id));
		return response.data;
	} catch (error) {
		return error;
	}
};
