import { ButtonHTMLAttributes, ReactNode } from 'react';

import { Size } from 'types/general';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

	/** the style class to add to the button */
	className?: string,

	/** the icon to render */
	icon: ReactNode,

	/** the size of the button. @default 'medium' */
	size?: Size,

	/** the style of the button's corners. @default 'rounded' */
	corners?: 'flat' | 'rounded' | 'circular',

}