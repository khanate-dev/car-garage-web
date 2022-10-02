import { ReactNode } from 'react';

export interface PageProps {

	/** the title of the page */
	title: string,

	/** the class to apply to the main container element */
	className?: string,

	/** should the page show an empty page message? */
	isEmpty?: boolean,

	children: ReactNode,

}