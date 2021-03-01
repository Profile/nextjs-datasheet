import { memo } from 'react';
import styles from './Sheets.module.css';

export const SheetHeader  = memo(
    ({ cells }) => {
        return (
            <div className={styles.tableHeader}>
                <div className={styles.tableHeaderRows}>
                    {cells.map((cell) => (
                        <div className={styles.tableHeaderCell} key={cell.name}>
                            {cell.name}
                        </div>
                    ))}
                </div>
            </div>
        );
    },
    () => true
);