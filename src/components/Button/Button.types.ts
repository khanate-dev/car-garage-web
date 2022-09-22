import { ButtonHTMLAttributes, ReactNode } from 'react';

export type ThemeColors = (
	| 'default'
	| 'primary'
	| 'secondary'
	| 'danger'
	| 'success'
	| 'info'
	| 'warning'
);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

	/** the label to show as the button content */
	text: ReactNode,

	/** the color of the button. @default 'default' */
	color?: ThemeColors,

}