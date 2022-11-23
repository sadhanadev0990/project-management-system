import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';

interface PropType {
	component: React.FC;
}

const ProtectedRoute: FC<PropType> = ({ component: Component }) => {
	const isAuthenticated = localStorage.getItem('token');

	if (isAuthenticated)
		return (
			<Layout>
				<Component />
			</Layout>
		);
	return <Navigate to="/login" />;
};

export default ProtectedRoute;
