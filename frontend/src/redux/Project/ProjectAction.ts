import { createAction } from '@reduxjs/toolkit';
import { Project, InfoProject, CRProject } from './ProjectModel';
import * as types from '../../common/constants/types';

export const getProjects = createAction<{ project: InfoProject }>(
	types.GET_PROJECTS
);

export const createProject = createAction<{ project: CRProject }>(
	types.CREATE_PROJECT
);

export const getProjectDetail = createAction<{ id: string }>(
	types.GET_PROJECT_DETAIL
);

export const updateProject = createAction<{ project: Project }>(
	types.UPDATE_PROJECT
);

export const deleteProject = createAction<{ id: string }>(types.DELETE_PROJECT);
