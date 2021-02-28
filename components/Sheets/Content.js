import { EditableInput } from './EditableInput';
import styles from './Sheets.module.css';

export function SheetContent({ rows, cells, editableCell, setEditableCell, handleCellValue }) {
    /** Generate unique key. */
    const generateUniqueKey = (key, index) => {
        return `${key}.${index}`;
    };

    /** Render editable cell. */
    const renderEditableCell = ({ row, rowIndex, cell }) => (
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
    );

    /** Render checkbox cell. */
    const renderCheckboxCell = ({ row, rowIndex, cell }) => (
        <input
        type="checkbox"
        checked={row[cell.key] !== undefined ? row[cell.key]: false }
        defaultChecked={row[cell.key]}
        onChange={({ target }) =>
            handleCellValue(
                generateUniqueKey(cell.key, rowIndex),
                !row[cell.key]
            )
        }
    />
    );


    return (
        <div className={styles.tableContent}>
            {rows.map((row, rowIndex) => (
                <div className={styles.tableContentRows} key={rowIndex}>
                    {cells.map((cell) => (
                        <div className={styles.tableContentCell} key={cell.key}>
                            {cell.editable &&
                            editableCell === generateUniqueKey(cell.key, rowIndex) ? (
                                renderEditableCell({ row, rowIndex, cell })
                            ) : (
                                <div
                                    className={styles.tableContentCellValue}
                                    onDoubleClick={() =>
                                        setEditableCell(generateUniqueKey(cell.key, rowIndex))
                                    }>
                                    {cell.type === 'checkbox' ? (
                                        renderCheckboxCell({ row, rowIndex, cell })
                                    ) : (
                                        row[cell.key]
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
