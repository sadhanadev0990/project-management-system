import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
	setProjectList,
	addProject,
	setProjectDetail,
	setUpdateProjectStatus,
	setDeleteProjectStatus,
	setLoadStatus,
	setAPIError
} from './ProjectSlice';
import * as ProjectAction from './ProjectAction';
import * as ProjectService from './ProjectService';
import { Project, ProjectRes } from './ProjectModel';

export function* getProjects(
	action: ReturnType<typeof ProjectAction.getProjects>
) {
	try {
		yield put(setLoadStatus(true));
		const response: ProjectRes = yield call(
			ProjectService.getProjects,
			action.payload.project
		);
		yield put(setProjectList(response));
	} catch (error) {
		yield put(setAPIError({ error }));
	}
	yield put(setLoadStatus(false));
}

export function* createProject(
	action: ReturnType<typeof ProjectAction.createProject>
) {
	try {
		yield put(setLoadStatus(true));
		const response: Project = yield call(
			ProjectService.createProject,
			action.payload.project
		);
		yield put(addProject(response.status));
	} catch (error) {
		yield put(setAPIError({ error }));
	}
	yield put(setLoadStatus(false));
}

export function* getProjectDetail(
	action: ReturnType<typeof ProjectAction.getProjectDetail>
) {
	try {
		yield put(setLoadStatus(true));
		const response: Project = yield call(
			ProjectService.getProjectDetail,
			action.payload.id
		);
		yield put(setProjectDetail(response));
	} catch (error) {
		yield put(setAPIError({ error }));
	}
	yield put(setLoadStatus(false));
}

export function* updateProject(
	action: ReturnType<typeof ProjectAction.updateProject>
) {
	try {
		yield put(setLoadStatus(true));
		const response: Project = yield call(
			ProjectService.updateProject,
			action.payload.project
		);
		yield put(setUpdateProjectStatus(response.status));
	} catch (error) {
		yield put(setAPIError({ error }));
	}
	yield put(setLoadStatus(false));
}

export function* deleteProject(
	action: ReturnType<typeof ProjectAction.deleteProject>
) {
	try {
		yield put(setLoadStatus(true));
		const response: Project = yield call(
			ProjectService.deleteProject,
			action.payload.id
		);
		yield put(setDeleteProjectStatus(response.status));
	} catch (error) {
		yield put(setAPIError({ error }));
	}
	yield put(setLoadStatus(false));
}

export function* watchProjectSagas() {
	yield all([
		takeLatest(ProjectAction.getProjects.type, getProjects),
		takeLatest(ProjectAction.createProject.type, createProject),
		takeLatest(ProjectAction.getProjectDetail.type, getProjectDetail),
		takeLatest(ProjectAction.updateProject.type, updateProject),
		takeLatest(ProjectAction.deleteProject.type, deleteProject)
	]);
}
