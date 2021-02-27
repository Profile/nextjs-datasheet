import styles from "./Sheets.module.css";

export const SheetHeader = ({headerCells}) => (
    <div className={styles.tableHeader}>
        <div className={styles.tableHeaderRows}>
            {
                headerCells.map(cell => (
                    <div className={styles.tableHeaderCell} key={cell}>
                        {cell.replace(/([a-z0-9])([A-Z])/g, '$1 $2')}
                    </div>
                ))
            }
        </div>
    </div>
)