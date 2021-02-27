import styles from "./Sheets.module.css";

export function SheetContent({rows, cells}) {
    return (
        <div className={styles.tableContent}>
            {
                rows.map((row, rowIndex) => (
                    <div className={styles.tableContentRows} key={rowIndex}>
                        {cells.map(cell => (
                            <div className={styles.tableContentCell} key={cell}>
                                <div className={styles.tableContentCellValue}>
                                    {row[cell]}
                                </div>
                            </div>
                        ))}
                    </div>
                ))
            }
        </div>
    )
}