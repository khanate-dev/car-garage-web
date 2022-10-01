import { ReactElement } from 'react';

import { Size, ThemeColor } from 'types/general';

interface CardDetails {

	/** the icon to show for the card */
	icon?: ReactElement,

	/** the title of the card */
	title: string,

	/** the subtitle to show beneath the title */
	subtitle?: string,

}

interface SubCard extends Partial<CardDetails> {

	/** the label of the sub card */
	label: string,

	/** the value to show on the sub card */
	value: string,

}

export interface CardProps extends CardDetails {

	content?: SubCard[],

	/** the accent color of the card. @default 'primary' */
	color?: ThemeColor,

	/** the size of the card. @default 'medium' */
	size?: Size,

	/** should the card content be centered */
	isCentered?: boolean,

}