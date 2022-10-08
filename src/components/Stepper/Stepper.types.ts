export interface StepperProps<
	Step extends string
> {

	/** the total number of steps */
	steps: Step[],

	/** the current step */
	step: Step,

}
