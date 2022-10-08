import { useState } from 'react';

import { cx } from 'helpers/class-name';
import { handleImageUpload, validImageExtensions } from 'helpers/image';

import { Image, ImageUploadProps } from './ImageUpload.types';
import styles from './ImageUpload.module.scss';

const ImageUpload = ({
	className,
	name,
	defaultValue,
	onChange,
	required,
	isProfile,
}: ImageUploadProps) => {

	const [image, setImage] = useState<null | Image>(null);
	const [error, setError] = useState<null | string>(null);

	return (
		<label
			className={cx(
				styles['container'],
				image && styles['uploaded'],
				isProfile && styles['profile'],
				className
			)}
			htmlFor={name}
		>

			{image?.preview &&
				<img
					className={styles['preview']}
					src={image.preview ?? defaultValue}
				/>
			}

			<input
				id={name}
				name={name}
				type='file'
				accept={validImageExtensions.join()}
				onChange={event => {
					try {
						setError(null);
						const newImage = handleImageUpload(event);
						setImage(newImage);
						onChange?.(event);
					}
					catch (error: any) {
						setError(error.message ?? error);
					}
				}}
				required={required}
			/>

			{!image && defaultValue &&
				<input
					name={name}
					type='hidden'
					value={defaultValue}
				/>
			}

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
