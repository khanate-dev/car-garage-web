import { useState } from 'react';

import { cx } from 'helpers/class-name';

import { AppIcon } from 'components/icons';

import { ratings } from 'types/general';

import { RatingProps } from './Rating.types';
import styles from './Rating.module.scss';

const Rating = <Form extends Record<string, any> = Record<string, any>>({
	className,
	interactive,
	name,
	rating: passedRating,
	defaultValue = 5,
}: RatingProps<Form>) => {

	const [rating, setRating] = useState<RatingProps['defaultValue']>(defaultValue);

	const StarComponent = interactive ? 'button' : 'div';

	const value = (
		passedRating
		?? rating
	);

	return (
		<div
			className={cx(
				styles['rating'],
				interactive && styles['interactive'],
				className
			)}
		>
			{(interactive) &&
				<input
					type='hidden'
					name={name as string}
					value={rating}
				/>
			}
			{ratings.map(current =>
				<StarComponent
					key={current}
					className={cx(
						styles['star'],
						value && value >= current && styles['filled']
					)}
					type={interactive ? 'button' : undefined}
					onClick={
						setRating
							? () => setRating(current)
							: undefined
					}
				>
					<AppIcon
						icon={
							value && value >= current
								? 'starFilled'
								: 'star'
						}

					/>
				</StarComponent>
			)}
		</div>
	);

};

export default Rating;
