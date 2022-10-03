import { cx } from 'helpers/class-name';

import { TableProps } from './Table.types';
import styles from './Table.module.scss';

const Table = <Type extends Record<string, any>>({
	list,
	exclude = [],
}: TableProps<Type>) => {

	if (!list[0]) {
		return (
			<div
				className={cx(
					styles['container'],
					styles['empty']
				)}
			>
				No Data Loaded!
			</div>
		);
	}

	const metaColumns = ['__v', '_id', 'createdAt', 'updatedAt'];

	const columns = Object.keys(list[0].shape).filter(key =>
		![...metaColumns, ...exclude].includes(key as any)
	);

	return (
		<div
			className={styles['container']}
		>
			<table
				className={styles['table']}
			>

				<thead>
					<tr>
						{columns.map(key =>
							<th key={key}>
								{key}
							</th>
						)}
					</tr>
				</thead>

				<tbody>
					{list.map((row, index) =>
						columns.map(key =>
							<td
								key={`${index}-${key}`}
							>
								{row[key]}
							</td>
						)
					)}
				</tbody>

			</table>
		</div>
	);

};

export default Table;