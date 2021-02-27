import styles from "./Sheets.module.css";

export function EditableInput({value, onChange, onFocus, onBlur}) {
    return (
        <input
            className={styles.tableContentCellInput}
            type="text"
            value={value}
            autoFocus={true}
            onBlur={onBlur}
            onFocus={onFocus}
            onChange={onChange}
        />
    )
}