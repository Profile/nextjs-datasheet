import { EditableInput } from './EditableInput';
import styles from './Sheets.module.css';

export function SheetContent({ rows, cells, editableCell, setEditableCell }) {
    const nonEditableCells = ['id'];
    const generateCustomKey = (main, child) => {
        return `${main}.${child}`;
    };

    return (
        <div className={styles.tableContent}>
            {rows.map((row, rowIndex) => (
                <div className={styles.tableContentRows} key={rowIndex}>
                    {cells.map((cell) => (
                        <div className={styles.tableContentCell} key={cell.name}>
                            {!nonEditableCells.includes(cell.name) &&
                            editableCell === generateCustomKey(cell.name, rowIndex) ? (
                                <EditableInput
                                    value={row[cell.name]}
                                    onChange={() => console.log(222)}
                                    onBlur={() => console.log(222)}
                                />
                            ) : (
                                <div
                                    className={styles.tableContentCellValue}
                                    onDoubleClick={() =>
                                        setEditableCell(generateCustomKey(cell.name, rowIndex))
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
