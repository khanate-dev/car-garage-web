import { ChangeEventHandler } from 'react';

export interface Image {

	/** the contents of the image file */
	file: File,

	/** the uri string to preview the image in an img tag */
	preview: string,

}

export interface ImageUploadProps<
	Form extends Record<string, any> = Record<string, any>
> {

	/** the style class to pass to the container */
	className?: string,

	/** the name of the file field */
	name: keyof Form,

	/** the id of the file field */
	id?: string,

	/** the default image url or base64 string */
	defaultValue?: string,

	/** the value of the controlled image */
	value?: string,

	/** the function to call when the input value changes */
	onChange?: ChangeEventHandler<HTMLInputElement>,

	/** is the image field required? */
	required?: boolean,

	/** is the image a profile picture? */
	isProfile?: boolean,

}
