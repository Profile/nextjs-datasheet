import { EditableInput } from './EditableInput';
import styles from './Sheets.module.css';

export function SheetContent({ rows, cells, editableCell, setEditableCell, handleCellValue }) {
    const nonEditableCells = ['id'];

    /** Generate unique key. */
    const generateUniqueKey = (main, child) => {
        return `${main}.${child}`;
    };

    return (
        <div className={styles.tableContent}>
            {rows.map((row, rowIndex) => (
                <div className={styles.tableContentRows} key={rowIndex}>
                    {cells.map((cell) => (
                        <div className={styles.tableContentCell} key={cell.name}>
                            {!nonEditableCells.includes(cell.name) &&
                            editableCell === generateUniqueKey(cell.name, rowIndex) ? (
                                <EditableInput
                                    value={row[cell.name]}
                                    onChange={({target}) => handleCellValue(generateUniqueKey(cell.name, rowIndex), target.value)}
                                    onFocus={(event => event.target.select())}
                                />
                            ) : (
                                <div
                                    className={styles.tableContentCellValue}
                                    onDoubleClick={() =>
                                        setEditableCell(generateUniqueKey(cell.name, rowIndex))
                                    }>
                                    {row[cell.name]}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
