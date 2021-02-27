import styles from "./Sheets.module.css";

export function EditAbleInput({value, onChange, onBlur}) {
    return (
        <input
            className={styles.tableContentCellInput}
            type="text"
            value={value}
            autoFocus={true}
            onBlur={onBlur}
            onChange={onChange}
        />
    )
}