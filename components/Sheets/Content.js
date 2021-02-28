import { useState } from 'react';

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
            onBlur={({target}) => {
                // Avoid unnecessary computation
                if(target.value === row[cell.key]) return;
                handleCellValue(generateUniqueKey(cell.key, row.id), target.value)
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

    return (
        <div className={styles.tableContent}>
            {rows.map(row => (
                <div className={styles.tableContentRows} key={row.id}>
                    {cells.map((cell) => (
                        <div className={styles.tableContentCell} key={cell.key}>
                            {canEdit({ cell, row }) ? (
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
