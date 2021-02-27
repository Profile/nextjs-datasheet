import styles from './Sheets.module.css';

export function SheetContent({ rows, cells, editableCell, setEditableCell }) {
    const generateCustomKey = (main, child) => {
        return `${main}.${child}`;
    };

    return (
        <div className={styles.tableContent}>
            {rows.map((row, rowIndex) => (
                <div className={styles.tableContentRows} key={rowIndex}>
                    {cells.map((cell) => (
                        <div className={styles.tableContentCell} key={cell}>
                            {editableCell === generateCustomKey(cell, rowIndex) ? (
                                <input
                                    className={styles.tableContentCellInput}
                                    type="text"
                                    value={row[cell]}
                                    autoFocus={true}
                                />
                            ) : (
                                <div
                                    className={styles.tableContentCellValue}
                                    onDoubleClick={() =>
                                        setEditableCell(generateCustomKey(cell, rowIndex))
                                    }>
                                    {row[cell]}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
