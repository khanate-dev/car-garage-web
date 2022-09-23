import {
	ButtonHTMLAttributes,
	FunctionComponent,
	ReactNode,
	SVGProps,
} from 'react';

import { ThemeColor } from 'types/general';

export const buttonSizes = [
	'tiny',
	'small',
	'medium',
	'large',
	'huge',
] as const;

export type ButtonSize = typeof buttonSizes[number];

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
	size?: ButtonSize,

	/** the button's action icon */
	icon?: FunctionComponent<SVGProps<SVGSVGElement>>,

	/** the style variant of the button @default 'fill' */
	variant?: ButtonVariant,

}