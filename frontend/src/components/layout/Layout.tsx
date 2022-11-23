import React from 'react';
import { SideNav } from '../sidenav/SideNav';
import { Header } from '../header/Header';

import './layout.scss';

interface LayoutProps {
	children: JSX.Element;
}
export const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className="Layout">
			<SideNav />
			<div className="content">
				<Header />
				<main className="body-content">{children}</main>
			</div>
		</div>
	);
};
