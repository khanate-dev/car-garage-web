import { Dispatch, SetStateAction } from 'react';

export interface Image {

	/** the contents of the image file */
	file: File,

	/** the uri string to preview the image in an img tag */
	preview: string,

}

export interface ImageUploadProps {

	/** the style class to pass to the container */
	className?: string,

	/** the image state */
	image: null | Image,

	/** the setter function to update the image state */
	setImage: Dispatch<SetStateAction<null | Image>>,

	/** is the image field required? */
	required?: boolean,

}