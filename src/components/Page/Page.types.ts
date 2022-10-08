import { ButtonProps } from 'components/Button';
import { ReactNode } from 'react';

export interface PageProps {

	/** the title of the page */
	title: string,

	/** the class to apply to the main container element */
	className?: string,

	/** extra actions to add to the page header */
	actions?: ButtonProps[],

	/** the filter to render in the page header */
	filters?: ReactNode,

	/** should the page show an empty page message? */
	isEmpty?: boolean,

	/** is the page a grid view? */
	isGridView?: boolean,

	/** should the page have a navigation button for add form? */
	hasAdd?: boolean,

	/** should the page have a back navigation button? */
	hasBack?: boolean,

	children: ReactNode,

}
