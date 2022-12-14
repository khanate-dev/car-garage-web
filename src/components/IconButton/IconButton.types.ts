import { ButtonHTMLAttributes, ReactElement } from 'react';

import { ButtonVariant } from 'components/Button';
import { icons } from 'components/icons';

import { Size, ThemeColor } from 'types/general';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

	/** the style class to add to the button */
	className?: string,

	/** the icon to render */
	icon: keyof typeof icons | ReactElement,

	/** the size of the button. @default 'medium' */
	size?: Size,

	/** the color of the button. @default 'default' */
	color?: ThemeColor,

	/** the style of the button's corners. @default 'rounded' */
	corners?: 'flat' | 'rounded' | 'circular',

	/** the style variant of the button @default 'fill' */
	variant?: ButtonVariant,

	/** should the button show loading spinner */
	isLoading?: boolean,

}
