import { ReactNode } from 'react';

export type FormFieldErrors<
	Form extends Record<string, any>
> = Partial<Record<keyof Form, ReactNode>>;