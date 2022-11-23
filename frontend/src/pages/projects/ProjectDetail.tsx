import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { getProjectDetail } from '../../redux/Project/ProjectAction';
import { RootState } from '../../redux/rootReducer';
import { ProjectEdit } from './ProjectEdit';
import { Loader } from '../../components/loader/Loader';

import './projects.scss';

export const ProjectDetail: React.FC = () => {
	const dispatch = useDispatch();
	const { projectInfo, isLoading } = useSelector(
		(state: RootState) => state.project
	);
	const location = useLocation();
	const { projectId } = location.state;

	useEffect(() => {
		dispatch(getProjectDetail({ id: projectId }));
	}, []);

	return (
		<div className="project-detail-container">
			{isLoading ? <Loader /> : <ProjectEdit project={projectInfo} />}
		</div>
	);
};
