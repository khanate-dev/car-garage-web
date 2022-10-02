import { Size, ThemeColor } from 'types/general';

export interface ChipProps {

	/** the chip title */
	title: string,

	/** the color accent of the chip. @default 'default' */
	color?: ThemeColor,

	/** the size of the chip. @default 'medium' */
	size?: Size,

}