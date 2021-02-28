import styles from './Sheets.module.css';

export function SheetFilter({ cells, filterValues, onChange }) {
    const whiteListInputType = ['text', 'checkbox'];

    return (
        <div className={styles.tableHeader}>
            <div className={styles.tableHeaderRows}>
                {cells.map((cell) => (
                    <div className={styles.tableHeaderCell} key={cell.name}>
                        {cell.filterable && (
                            <input
                                defaultValue={filterValues[cell.key]}
                                className={styles.tableFilterCellInput}
                                type={whiteListInputType.includes(cell.type) ? cell.type: 'text'}
                                onChange={({ target }) => onChange({ [cell.key]: target.value })}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
