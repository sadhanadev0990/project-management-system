/* eslint-disable jest/expect-expect */
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { watchProjectSagas } from '../ProjectSaga';
import {
	getProjects,
	createProject,
	getProjectDetail,
	updateProject,
	deleteProject
} from '../ProjectAction';
import {
	setProjectList,
	addProject,
	setProjectDetail,
	setUpdateProjectStatus,
	setDeleteProjectStatus
} from '../ProjectSlice';
import * as ProjectService from '../ProjectService';

describe('make fetch project list api request', () => {
	it('should call get project list api and dispatch success action', async () => {
		const projects = [
			{
				id: '20',
				name: 'Finance Design System',
				title: 'Finance',
				description:
					'Finance project refers to all banking finance related project requirements and planning. This project is to handle online finance.',
				stage: 'Project Initiation',
				status: 'Not started',
				teamCount: 10,
				dueDate: '2023-09-10'
			}
		];

		return expectSaga(watchProjectSagas)
			.provide([[matchers.call.fn(ProjectService.getProjects), projects]])
			.put(setProjectList(projects))
			.dispatch(getProjects({ project: { page: 1, limit: 6 } }))
			.silentRun();
	});
});

describe('make create project request', () => {
	const payload = {
		name: 'Finance Design System',
		title: 'Finance',
		description:
			'Finance project refers to all banking finance related project requirements and planning. This project is to handle online finance.',
		stage: 'Project Initiation',
		status: 'Not started',
		teamCount: 10,
		dueDate: '2023-09-10'
	};

	it('should call create project api and dispatch success action', async () => {
		return expectSaga(watchProjectSagas)
			.provide([[matchers.call.fn(ProjectService.createProject), payload]])
			.put(addProject(payload))
			.dispatch(createProject({ project: payload }))
			.silentRun();
	});
});

describe('make update project list api request', () => {
	it('should call update project api and dispatch success action', async () => {
		const payload = {
			_id: '20',
			name: 'Finance Design System',
			title: 'Finance',
			description:
				'Finance project refers to all banking finance related project requirements and planning. This project is to handle online finance.',
			stage: 'Project Initiation',
			status: 'Not started',
			teamCount: 10,
			dueDate: '2023-09-10'
		};

		return expectSaga(watchProjectSagas)
			.provide([[matchers.call.fn(ProjectService.updateProject), payload]])
			.put(setUpdateProjectStatus(payload))
			.dispatch(updateProject({ project: payload }))
			.silentRun();
	});
});

describe('make delete project list api request', () => {
	it('should call delete project api and dispatch success action', async () => {
		return expectSaga(watchProjectSagas)
			.provide([[matchers.call.fn(ProjectService.deleteProject), { id: '20' }]])
			.put(setDeleteProjectStatus({ id: '20' }))
			.dispatch(deleteProject({ id: '20' }))
			.silentRun();
	});
});

describe('make get project detail request', () => {
	const payload = {
		_id: '11',
		name: 'Finance Design System',
		title: 'Finance',
		description:
			'Finance project refers to all banking finance related project requirements and planning. This project is to handle online finance.',
		stage: 'Project Initiation',
		status: 'Not started',
		teamCount: 10,
		dueDate: '2023-09-10'
	};

	it('should call project detail api and dispatch success action', async () => {
		return expectSaga(watchProjectSagas)
			.provide([[matchers.call.fn(ProjectService.getProjectDetail), payload]])
			.put(setProjectDetail(payload))
			.dispatch(getProjectDetail({ id: '11' }))
			.silentRun();
	});
});
