import styles from "./Sheets.module.css";

export function SheetHeader({cells}) {
    return (
        <div className={styles.tableHeader}>
            <div className={styles.tableHeaderRows}>
                {
                    cells.map(cell => (
                        <div className={styles.tableHeaderCell} key={cell}>
                            {cell.replace(/([a-z0-9])([A-Z])/g, '$1 $2')}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}