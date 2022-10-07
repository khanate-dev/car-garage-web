import { useState } from 'react';

import { cx } from 'helpers/class-name';
import { handleImageUpload, validImageExtensions } from 'helpers/image';

import { ImageUploadProps } from './ImageUpload.types';
import styles from './ImageUpload.module.scss';

const ImageUpload = ({
	className,
	image,
	setImage,
	required,
}: ImageUploadProps) => {

	const [error, setError] = useState<null | string>(null);

	return (
		<label
			className={cx(
				styles['container'],
				image && styles['uploaded'],
				className
			)}
			htmlFor='upload-file-button'
		>

			{image?.preview &&
				<img
					className={styles['preview']}
					src={image.preview}
				/>
			}

			<input
				id='upload-file-button'
				type='file'
				accept={validImageExtensions.join()}
				onChange={event => {
					try {
						setError(null);
						const newImage = handleImageUpload(event);
						setImage(newImage);
					}
					catch (error: any) {
						setError(error.message ?? error);
					}
				}}
				required={required}
			/>

			{error &&
				<div
					className={styles['error']}
				>
					{error}
				</div>
			}

		</label>
	);

};

export default ImageUpload;
