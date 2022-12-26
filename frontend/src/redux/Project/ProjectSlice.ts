import { createSlice } from '@reduxjs/toolkit';
import { Project, ProjectRes } from './ProjectModel';

export interface ProjectState {
	isLoading: boolean;
	projectList: ProjectRes;
	projectInfo: Project;
	addProjectStatus: string;
	updateProjectStatus: string;
	deleteProjectStatus: string;
	error: string | null;
}

const initialState: ProjectState = {
	isLoading: false,
	projectList: {
		projects: [],
		projectsCount: 0,
		resultPerPage: 0
	},
	projectInfo: {
		_id: '',
		name: '',
		title: '',
		stage: '',
		status: '',
		description: '',
		teamCount: 0,
		dueDate: ''
	},
	addProjectStatus: '',
	updateProjectStatus: '',
	deleteProjectStatus: '',
	error: null
};

const projectSlice = createSlice({
	name: 'project',
	initialState,
	reducers: {
		setProjectList: (state, action) => {
			state.projectList = action.payload.data;
		},
		addProject: (state, action) => {
			state.addProjectStatus = action.payload.status;
		},
		setProjectDetail: (state, action) => {
			state.projectInfo = action.payload.data
				? action.payload.data.project
				: action.payload;
		},
		setUpdateProjectStatus: (state, action) => {
			state.updateProjectStatus = action.payload.status;
		},
		setDeleteProjectStatus: (state, action) => {
			state.deleteProjectStatus = action.payload.status;
		},
		setLoadStatus: (state, action) => {
			state.isLoading = action.payload;
		},
		setAPIError: (state, action) => {
			state.error = action.payload.error;
		}
	}
});

export const {
	setProjectList,
	addProject,
	setProjectDetail,
	setUpdateProjectStatus,
	setDeleteProjectStatus,
	setLoadStatus,
	setAPIError
} = projectSlice.actions;
export default projectSlice.reducer;
