import React, {FC} from 'react';
import {Outlet} from 'react-router-dom';

export const Root: FC = () => (
	<div>
		<h1>React Router Contacts</h1>
		<nav>
			<ul>
				<li>
					<a href={'/contacts/1'}>Link 1</a>
				</li>
				<li>
					<a href={'/contacts/2'}>Link 2</a>
				</li>
			</ul>
		</nav>
		<div>
			<Outlet />
		</div>
	</div>
);
