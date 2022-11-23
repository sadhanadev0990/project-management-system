import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProjectCard } from '../../components/card/card';
import { Loader } from '../../components/loader/Loader';
import { RootState } from '../../redux/rootReducer';
import { getProjects, deleteProject } from '../../redux/Project/ProjectAction';

export const Dashboard: React.FC = () => {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const dispatch = useDispatch();
	const { projectList, deleteProjectStatus, isLoading } = useSelector(
		(state: RootState) => state.project
	);

	const getProjectList = (page: number) => {
		dispatch(
			getProjects({
				project: {
					page
				}
			})
		);
	};

	useEffect(() => {
		getProjectList(1);
	}, []);

	useEffect(() => {
		if (deleteProjectStatus === 'success') {
			getProjectList(1);
		}
	}, [deleteProjectStatus]);

	const onDeleteProject = (projectId: string) => {
		setShowDeleteModal(false);
		dispatch(deleteProject({ id: projectId }));
	};

	return (
		<div className="dashboard-container">
			<div className="project-list-container">
				{isLoading ? (
					<Loader />
				) : (
					<ProjectCard
						projects={projectList.projects}
						onDeleteProject={onDeleteProject}
						setShowDeleteModal={setShowDeleteModal}
						showDeleteModal={showDeleteModal}
					/>
				)}
			</div>
		</div>
	);
};
