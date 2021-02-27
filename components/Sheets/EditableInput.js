import styles from "./Sheets.module.css";

export function EditableInput({value, onChange, onBlur}) {
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