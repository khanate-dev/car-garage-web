import { CardProps } from './Card.types';
import styles from './Card.module.scss';
import { cx } from 'helpers/class-name';

const Card = ({
	icon,
	title,
	subtitle,
	content,
	size = 'medium',
	color = 'primary',
	isCentered,
}: CardProps) => {

	return (
		<div
			className={cx(
				styles['card'],
				isCentered && styles['centered'],
				size,
				color
			)}
		>

			<div className={styles['header']}>
				{icon}
				<h3>{title}</h3>
			</div>

			{subtitle &&
				<div className={styles['subtitle']}>
					<p>{subtitle}</p>
				</div>
			}

			{content &&
				<div className={styles['content']}>
					{content.map((subCard, index) =>
						<div
							key={index}
							className={styles['sub-card']}
						>

							{(subCard.icon || subCard.title) &&
								<div className={styles['sub-header']}>
									<span>{subCard.icon}</span>
									<span>{subCard.title}</span>
								</div>
							}

							{subCard.subtitle &&
								<div className={styles['sub-subtitle']}>
									{subCard.subtitle}
								</div>
							}

							<div className={styles['sub-content']}>
								<span>{subCard.label}</span>
								<span>{subCard.value}</span>
							</div>
						</div>
					)}
				</div>
			}

		</div>
	);

};

export default Card;