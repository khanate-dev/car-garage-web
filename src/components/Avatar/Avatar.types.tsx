import { ImgHTMLAttributes } from 'react';

import { Size } from 'types/general';

export interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {

	/** the alt text for the avatar */
	alt: string,

	/** the size of the avatar. @default 'medium' */
	size?: Size,

}