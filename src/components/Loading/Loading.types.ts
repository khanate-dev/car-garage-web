import { Size, ThemeColor } from 'types/general';

export interface LoadingProps {

	/** the size of the loader */
	size?: Size,

	/** the color of the loading dots */
	color?: ThemeColor,

	/** is the loader being used in a button? */
	button?: boolean,

}