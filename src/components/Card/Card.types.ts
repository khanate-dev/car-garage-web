import { ReactElement, ReactNode } from 'react';
import { Icon } from '@primer/octicons-react';

import { ButtonProps } from 'components/Button';
import { ChipProps } from 'components/Chip';
import { icons } from 'components/icons';

import { Size, ThemeColor } from 'types/general';

interface CardDetail {

	/** the label of the sub card */
	label: string,

	/** the value to show on the sub card */
	value: string,

}

export interface CardProps {

	/** the url of the image or svg component to show in the card cover */
	cover?: string | ReactElement,

	/** the image to show on top of the card. pass a url or an Avatar or Icon component */
	image?: string | ReactElement,

	/** the labels to show on the card */
	labels?: string[] | ChipProps[],

	/** the icon to show next to the title */
	icon?: keyof typeof icons | Icon,

	/** the title of the card */
	title: ReactNode,

	/** the subtitle to show beneath the title */
	subtitle?: ReactNode,

	/** the detailed description */
	description?: ReactNode,

	/** the list of details to show on the card */
	details?: CardDetail[],

	/** the actions to show at the bottom of the card */
	actions?: ButtonProps[],

	/** the accent color of the card. @default 'primary' */
	color?: ThemeColor,

	/** the size of the card. @default 'medium' */
	size?: Size,

	/** should the card content be centered */
	centered?: boolean,

}