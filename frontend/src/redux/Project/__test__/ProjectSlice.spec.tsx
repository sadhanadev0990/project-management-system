import { store } from '../../store';
import {
	addProject,
	setProjectList,
	setProjectDetail,
	setUpdateProjectStatus,
	setDeleteProjectStatus
} from '../ProjectSlice';
import {
	getProjects,
	createProject,
	getProjectDetail,
	updateProject,
	deleteProject
} from '../ProjectAction';

describe('ProjectSlice', () => {
	it('Should handle fetch project list request', () => {
		const payload = [
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

		store.dispatch(getProjects({ project: { page: 1, limit: 6 } }));
		store.dispatch(setProjectList({ data: payload }));
		const { projectList } = store.getState().project;
		expect(projectList).toBeDefined();
	});

	it('Should handle get project detail request', () => {
		const payload = {
			id: '20',
			name: 'Finance Design System',
			title: 'Finance',
			description:
				'Finance project refers to all banking finance related project requirements and planning. This project is to handle online finance.',
			stage: 'Project Initiation',
			status: 'Not started',
			teamCount: 10,
			dueDate: '2023-09-10'
		};

		store.dispatch(getProjectDetail({ id: '20' }));
		store.dispatch(setProjectDetail(payload));
		const { projectInfo } = store.getState().project;
		expect(projectInfo).toBeDefined();
	});

	it('Should handle add project request', () => {
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

		store.dispatch(createProject({ project: payload }));
		store.dispatch(addProject({ status: 'success' }));
		const { addProjectStatus } = store.getState().project;
		expect(addProjectStatus).toBeDefined();
	});

	it('Should handle update project request', () => {
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

		store.dispatch(updateProject({ project: payload }));
		store.dispatch(setUpdateProjectStatus({ status: 'success' }));
		const { updateProjectStatus } = store.getState().project;
		expect(updateProjectStatus).toBeDefined();
	});

	it('Should handle delete project request', () => {
		store.dispatch(deleteProject({ id: '11' }));
		store.dispatch(setDeleteProjectStatus({ status: 'success' }));
		const { deleteProjectStatus } = store.getState().project;
		expect(deleteProjectStatus).toBeDefined();
	});
});
