import { ChangeEventHandler } from 'react';

import { Rating } from 'types/general';

type Obj = Record<string, any>;

interface BaseRatingProps<Form extends Obj = Obj> {

	/** the style class to apply to the container */
	className?: string,

	/**
	 * is the component interactive?
	 * if true, renders the component like a form element with a hidden input
	*/
	interactive?: boolean,

	/** the name of the interactive rating input */
	name?: keyof Form,

	/** the id of the interactive rating input */
	id?: string,

	/** the value of rating  */
	rating?: Rating,

	/** the default value of rating  */
	defaultValue?: Rating,

	/** the value of the controlled rating input  */
	value?: Rating,

	/** the on change callback of the controlled rating input */
	onChange?: ChangeEventHandler<HTMLInputElement>,

	/** is the field required? */
	required?: boolean,

}

export interface ViewRatingProps extends BaseRatingProps {

	/**
	 * is the component interactive?
	 * if true, renders the component like a form element with a hidden input
	*/
	interactive?: false,

	/** the name of the interactive rating input */
	name?: undefined,

	/** the id of the interactive rating input */
	id?: undefined,

	/** the value of rating  */
	rating: Rating,

	/** the default value of rating  */
	defaultValue?: undefined,

	/** the value of the controlled rating input  */
	value?: undefined,

	/** the on change callback of the controlled rating input */
	onChange?: undefined,

	/** is the field required? */
	required?: undefined,

}

export interface InteractiveRatingProps<
	Form extends Obj = Obj
> extends BaseRatingProps<Form> {

	/**
	 * is the component interactive?
	 * if true, renders the component like a form element with a hidden input
	*/
	interactive: true,

	/** the name of the interactive rating input */
	name: keyof Form,

	/** the id of the interactive rating input */
	id?: string,

	/** the value of rating  */
	rating?: undefined,

	/** the default value of rating  */
	defaultValue?: Rating,

	/** the value of the controlled rating input  */
	value?: Rating,

	/** the on change callback of the controlled rating input */
	onChange?: ChangeEventHandler<HTMLInputElement>,

	/** is the field required? */
	required?: boolean,

}

export type RatingProps<Form extends Obj = Obj> = (
	| ViewRatingProps
	| InteractiveRatingProps<Form>
);
