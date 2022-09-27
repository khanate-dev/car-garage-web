import { ReactNode } from 'react';

import { Size, ThemeColor } from 'types/general';

export interface AlertProps {

	/** the alert message */
	message: ReactNode,

	/** the type of the alert. @default 'default' */
	color?: ThemeColor,

	/** the size of the alert. @default 'medium' */
	size?: Size,

}