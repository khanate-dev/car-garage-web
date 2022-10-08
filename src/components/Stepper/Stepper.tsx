import { StepperProps } from './Stepper.types';
import styles from './Stepper.module.scss';

const Stepper = <Step extends string>({
	steps,
	step,
}: StepperProps<Step>) => {

	return (
		<div
			className={styles['stepper']}
		>
			{steps.map((current, index) =>
				<div
					key={current}
					className={
						steps.indexOf(step) > index
							? styles['completed']
							: step === current
								? styles['current']
								: undefined
					}
				></div>
			)}
		</div>
	);

};

export default Stepper;
