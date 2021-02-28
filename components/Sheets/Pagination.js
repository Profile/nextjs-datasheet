import styles from './Sheets.module.css';

export function SheetPagination({ currentPage, total, perPage, maxPage }) {
    return (
        <div className={styles.tablePagination}>
            {currentPage > 1 && (
                <a
                    className={styles.tablePaginationBtn}
                    href={`?currentPage=${parseInt(currentPage) - 1}`}>
                    Prev
                </a>
            )}
            <input
                disabled={true}
                className={styles.tablePaginationInput}
                type="number"
                defaultValue={currentPage}
            />
            { parseInt(currentPage) < parseInt(maxPage) && (
                <a
                    className={styles.tablePaginationBtn}
                    href={`?currentPage=${parseInt(currentPage) + 1}`}>
                    Next
                </a>
            )}
        </div>
    );
}
