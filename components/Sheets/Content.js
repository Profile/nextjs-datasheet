import { EditableInput } from './EditableInput';
import styles from './Sheets.module.css';

export function SheetContent({ rows, cells, editableCell, setEditableCell, handleCellValue }) {
    /** Generate unique key. */
    const generateUniqueKey = (key, index) => {
        return `${key}.${index}`;
    };

    return (
        <div className={styles.tableContent}>
            {rows.map((row, rowIndex) => (
                <div className={styles.tableContentRows} key={rowIndex}>
                    {cells.map((cell) => (
                        <div className={styles.tableContentCell} key={cell.key}>
                            {cell.editable && editableCell === generateUniqueKey(cell.key, rowIndex) ? (
                                <EditableInput
                                    value={row[cell.key]}
                                    onChange={({ target }) =>
                                        handleCellValue(
                                            generateUniqueKey(cell.key, rowIndex),
                                            target.value
                                        )
                                    }
                                    onFocus={(event) => event.target.select()}
                                />
                            ) : (
                                <div
                                    className={styles.tableContentCellValue}
                                    onDoubleClick={() =>
                                        setEditableCell(generateUniqueKey(cell.key, rowIndex))
                                    }>
                                    {row[cell.key]}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
