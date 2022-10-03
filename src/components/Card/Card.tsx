import { cx } from 'helpers/class-name';

import Chip, { ChipProps } from 'components/Chip';
import Button from 'components/Button';

import { sizes } from 'types/general';

import { CardProps } from './Card.types';
import styles from './Card.module.scss';

const Card = ({
	cover,
	image,
	labels,
	title,
	subtitle,
	description,
	details,
	actions,
	size = 'medium',
	color = 'primary',
	centered,
}: CardProps) => {

	return (
		<div
			className={cx(
				styles['card'],
				centered && styles['centered'],
				size,
				color
			)}
		>

			{cover &&
				<div className={styles['cover']}>
					{typeof cover === 'string'
						? <img src={cover} alt='' />
						: cover
					}
				</div>
			}

			{image &&
				<div className={styles['image']}>
					{typeof image === 'string'
						? <img src={image} alt='' />
						: image
					}
				</div>
			}

			{labels &&
				<div className={styles['labels']}>
					{labels.map((label, index) => {

						const props: ChipProps = (
							typeof label !== 'string'
								? label
								: { title: label }
						);

						return (
							<Chip
								key={index}
								{...props}
								size={
									props.size
									?? sizes[sizes.indexOf(size) - 1]
									?? 'tiny'
								}
							/>
						);

					})}
				</div>
			}

			<h3 className={styles['title']}>
				{title}
			</h3>

			{subtitle &&
				<h6 className={styles['subtitle']}>
					{subtitle}
				</h6>
			}

			{description &&
				<p className={styles['description']}>
					{description}
				</p>
			}

			{details &&
				<div className={styles['details']}>
					{details.map(({ label, value }, index) =>
						<div
							key={index}
							className={styles['detail']}
						>
							<span>
								{label}
							</span>
							<span>
								{value}
							</span>
						</div>
					)}
				</div>
			}

			{actions &&
				<div className={styles['actions']}>
					{actions.map((action, index) =>
						<Button
							key={index}
							{...action}
							size={
								action.size
								?? sizes[sizes.indexOf(size) - 2]
								?? 'tiny'
							}
							variant={action.variant ?? 'outline'}
						/>
					)}
				</div>
			}

		</div>
	);

};

export default Card;