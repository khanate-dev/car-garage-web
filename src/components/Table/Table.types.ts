export interface TableProps<
	Type extends Record<string, any> = Record<string, any>
> {

	/** the list to render in the table */
	list: Type[],

	/** the list of fields to exclude from the schema */
	exclude?: (Exclude<keyof Type, '__v' | '_id' | 'createdAt' | 'updatedAt'>)[],

}
