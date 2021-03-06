import { EditableInput } from './EditableInput';
import styles from './Sheets.module.css';

export function SheetContent({ rows, cells, editableCell, setEditableCell, handleCellValue }) {
    /** Generate unique key. */
    const generateUniqueKey = (key, id) => {
        return `${key}.${id}`;
    };

    /** Render editable cell. */
    const renderEditableCell = ({ row, cell }) => (
        <EditableInput
            defaultValue={row[cell.key]}
            onFocus={(event) => event.target.select()}
            onBlur={({ target }) => {
                // Avoid unnecessary computation
                if (target.value === row[cell.key]) return;
                handleCellValue(generateUniqueKey(cell.key, row.id), target.value);
            }}
        />
    );

    /** Render checkbox cell. */
    const renderCheckboxCell = ({ row, cell }) => (
        <input
            type="checkbox"
            checked={row[cell.key] !== undefined ? row[cell.key] : false}
            defaultChecked={row[cell.key]}
            onChange={({ target }) =>
                handleCellValue(generateUniqueKey(cell.key, row.id), !row[cell.key])
            }
        />
    );

    /** Computed editable cell. */
    const canEdit = ({ cell, row }) => {
        return cell.editable && editableCell === generateUniqueKey(cell.key, row.id);
    };

    /** Item is deleted. */
    const isDeleted = (item) => item && !!item.deleted;

    /** Item is touched. */
    const isTouched = (item) => item && !!item.touched;

    /** Item has error. */
    const hasError = ({row, cell}) => !!row?.error?.[cell.key];

    return (
        <div className={styles.tableContent}>
            {rows.map((row) => (
                <div
                    className={`
                        ${styles.tableContentRows}                   
                        ${isTouched(row) ? styles.touched : ''}
                        ${isDeleted(row) ? styles.deleted : ''}
                    `}
                    key={row.id}>
                    {cells.map((cell) => (
                        <div
                            className={`
                                ${styles.tableContentCell}
                                ${hasError({row, cell}) ? styles.hasError : ''}
                            `}
                            key={cell.key}
                        >
                            {!isDeleted(row) && canEdit({ cell, row }) ? (
                                renderEditableCell({ row, cell })
                            ) : (
                                <div
                                    className={styles.tableContentCellValue}
                                    onDoubleClick={() =>
                                        setEditableCell(generateUniqueKey(cell.key, row.id))
                                    }>
                                    {cell.type === 'checkbox'
                                        ? renderCheckboxCell({ row, cell })
                                        : row[cell.key]}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
