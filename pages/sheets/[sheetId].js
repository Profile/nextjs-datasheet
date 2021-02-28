import Head from 'next/head';
import { useState } from 'react';

import { SheetHeader } from 'components/Sheets/Header';
import { SheetContent } from 'components/Sheets/Content';

import deepClone  from 'utils/deepClone';

import styles from 'styles/Sheets.module.css';

const employee = () => ({
    id: 1,
    name: 'Example name',
    surname: 'Example surname',
    dateOfBirth: '1614446820809',
    position: 'CASHIER',
    phone: '+994000000000'
});
const mockEmployees = [
    employee(),
    employee(),
    employee(),
    employee(),
];

const headerCells = [
    { key: 'id', name: 'ID', type: 'text', editable: false, filterable: true },
    { key: 'name', name: 'Name', type: 'text', editable: true, filterable: true },
    { key: 'surname', name: 'Surname', type: 'text', editable: true, filterable: true },
    { key: 'dateOfBirth', name: 'Date of birth', type: 'text', editable: true, filterable: true },
    { key: 'position', name: 'Position', type: 'text', editable: true, filterable: true },
    { key: 'phone', name: 'Phone', type: 'text', editable: true, filterable: true },
    { key: 'deleted', name: 'Mark as deleted', type: 'checkbox', editable: false, filterable: false },
];

export default function Sheets() {
    const [editableCell, setEditableCell] = useState(null);
    const [initialValues] = useState(deepClone(mockEmployees));// TODO: experimental
    const [employees, setEmployees] = useState(mockEmployees);

    /** Return touched value. */
    const isTouched = (value) => value.touched;

    /** Computed diff between initial and current value. */
    const isEqualInitialValue = (item, index) => {
        const currentValues = JSON.stringify(item);
        const initialValue = JSON.stringify(initialValues[index]);

        return currentValues === initialValue;
    };

    /** Handle editable cell. */
    const handleCellValue = (name, value) => {
        const [key, index] = name.split('.');
        const copiedEmployees = [...employees];
        const editedEmployee = employees[index];
        editedEmployee[key] = value;
        editedEmployee.touched = true;

        setEmployees(copiedEmployees);
    };

    /** Revert all changes to initial. */
    const handleRevertValues = () => {
        window.confirm('Are you sure ?') && setEmployees(deepClone(initialValues));
    };

    /** Handle sheets submit action. */
    const handleSubmitForm = () => {
        const touched = employees.filter(isTouched);
        const payload = {
            updated: [],
            deleted: [],
        };

        touched.forEach((item, index) => {
            const {deleted, touched, ...rest} = item;

            if(deleted) {
                payload.deleted.push(rest);
            }
            else if(!deleted && !isEqualInitialValue(rest, index)) {
                payload.updated.push(rest);
            }
        });

        console.log(payload)
    };

    return (
        <div>
            <Head>
                <title>Sheets - Employees</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <section className={styles.sheet}>
                    {<SheetHeader cells={headerCells} />}
                    <div> {/* TODO: Search functionality*/} </div>
                    {
                        <SheetContent
                            handleCellValue={handleCellValue}
                            editableCell={editableCell}
                            setEditableCell={setEditableCell}
                            rows={employees}
                            cells={headerCells}
                        />
                    }
                </section>
                {/* TODO: Some basic validations (date, phone number validation etc.)*/}
                {/* TODO: Pagination*/}

                <div className={styles.formActions}>
                    <button className={styles.submitAction} onClick={handleSubmitForm}>
                        Save changes
                    </button>
                    <button className={styles.submitAction} onClick={handleRevertValues}>
                        Revert all changes
                    </button>
                </div>

            </main>
        </div>
    );
}
