import styles from "./Sheets.module.css";

export function EditableInput({defaultValue, onChange, onFocus, onBlur}) {
    return (
        <input
            className={styles.tableContentCellInput}
            type="text"
            defaultValue={defaultValue}
            autoFocus={true}
            onBlur={onBlur}
            onFocus={onFocus}
            onChange={onChange}
        />
    )
}