import { FunctionComponent, ReactNode } from 'react';

export interface PageProps {

	/** the title of the page */
	title: string,

	/** the class to apply to the main container element */
	className?: string,

	children: ReactNode,

}