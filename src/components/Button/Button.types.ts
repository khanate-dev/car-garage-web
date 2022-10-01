import {
	ButtonHTMLAttributes,
	ReactElement,
	ReactNode,
} from 'react';

import { Size, ThemeColor } from 'types/general';

export const buttonVariants = [
	'fill',
	'ghost',
	'outline',
] as const;

export type ButtonVariant = typeof buttonVariants[number];

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

	/** the label to show as the button content */
	text: ReactNode,

	/** the color of the button. @default 'default' */
	color?: ThemeColor,

	/** the size of the button. @default 'medium' */
	size?: Size,

	/** the button's action icon */
	icon?: ReactElement,

	/** the style variant of the button @default 'fill' */
	variant?: ButtonVariant,

}