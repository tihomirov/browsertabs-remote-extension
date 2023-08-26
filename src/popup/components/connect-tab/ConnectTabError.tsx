import React, {FC} from 'react';

import * as s from './styles.module.scss';

type ConnectTabErrorProps = Readonly<{
	message: string | undefined;
	reloadTabButton: boolean;
	onReloadTabClick: () => void;
}>;

export const ConnectTabError: FC<ConnectTabErrorProps> = ({message, reloadTabButton, onReloadTabClick}) => {
	if (!message) {
		return null;
	}

	return (
		<div className={s.container}>
			<span className={s.error}>{message}</span>
			{reloadTabButton && (
				<div onClick={onReloadTabClick}>Reload Tab</div>
			)}
		</div>
	);
};
