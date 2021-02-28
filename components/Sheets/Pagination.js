import styles from './Sheets.module.css';

export function SheetPagination({ currentPage }) {
    return (
        <div className={styles.tablePagination}>
            <a
                disabled={currentPage <= 1}
                className={styles.tablePaginationBtn}
                href={`?currentPage=${parseInt(currentPage) - 1}`}>
                Prev
            </a>
            <input
                disabled={true}
                className={styles.tablePaginationInput}
                type="number"
                defaultValue={currentPage}
            />
            <a
                className={styles.tablePaginationBtn}
                href={`?currentPage=${parseInt(currentPage) + 1}`}>
                Next
            </a>
        </div>
    );
}
