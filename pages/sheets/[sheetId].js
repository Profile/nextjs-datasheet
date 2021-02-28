import Head from 'next/head';
import { useState } from 'react';

import { SheetHeader } from 'components/Sheets/Header';
import { SheetFilter } from 'components/Sheets/Filter';
import { SheetContent } from 'components/Sheets/Content';
import { SheetPagination } from 'components/Sheets/Pagination';

import deepClone from 'utils/deepClone';

import styles from 'styles/Sheets.module.css';

const headerCells = [
    { key: 'id', name: 'ID', type: 'text', editable: false, filterable: true },
    { key: 'name', name: 'Name', type: 'text', editable: true, filterable: true },
    { key: 'surname', name: 'Surname', type: 'text', editable: true, filterable: true },
    { key: 'dateOfBirth', name: 'Date of birth', type: 'date', editable: true, filterable: true },
    { key: 'position', name: 'Position', type: 'text', editable: true, filterable: true },
    { key: 'phone', name: 'Phone', type: 'text', editable: true, filterable: true },
    {
        key: 'deleted',
        name: 'Mark as deleted',
        type: 'checkbox',
        editable: false,
        filterable: false
    }
];

export default function Sheets({ employees: { data: employeesData, meta } }) {
    const [editableCell, setEditableCell] = useState(null);
    const [initialValues] = useState(deepClone(employeesData));
    const [employees, setEmployees] = useState(employeesData);
    const [filterValues, setFilterValues] = useState({});

    /** Return touched value. */
    const isTouched = (value) => value.touched;

    /** Computed diff between initial and current value. */
    const isEqualInitialValue = (item) => {
        const currentValues = JSON.stringify(item);
        const initialValue = JSON.stringify(initialValues.find((id) => item.id === id));

        return currentValues === initialValue;
    };

    /** Handle editable cell. */
    const handleCellValue = (name, value) => {
        const [key, id] = name.split('.');
        const copiedEmployees = [...employees];
        const editedEmployee = copiedEmployees.find((employee) => parseInt(employee.id) === parseInt(id));
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
            deleted: []
        };

        touched.forEach((item) => {
            const { deleted, touched, ...rest } = item;

            if (deleted) {
                payload.deleted.push(rest);
            } else if (!deleted && !isEqualInitialValue(rest)) {
                payload.updated.push(rest);
            }
        });

        if (!payload.updated.length && !payload.deleted.length) {
            return alert('Nothing changed');
        }

        alert('Successfully updated');
    };

    /** Handle Click outside of editable input. */
    const handleCloseEditableCell = ({ target: { type } }) => {
        if (type === 'text') return;
        setEditableCell(null);
    };

    /** Handle filter values. */
    let handleFilterValues = (changedValue) => {
        setFilterValues({ ...filterValues, ...changedValue });
    };

    /** Filter items by filterValues. */
    let handleFilteredItems = (items) => {
        return items.filter((item) => {
            return Object.keys(filterValues).every((key) => {
                const itemValue = item[key].toString().toLowerCase().replace(/\s/g, '');
                const filterValue = filterValues[key].toString().toLowerCase().replace(/\s/g, '');

                return !!itemValue.includes(filterValue);
            });
        });
    };

    return (
        <div>
            <Head>
                <title>Sheets - Employees</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.mainContent} onClick={(e) => handleCloseEditableCell(e)}>
                <section className={styles.sheet}>
                    <SheetHeader cells={headerCells} />
                    <SheetFilter
                        filterValues={filterValues}
                        onChange={handleFilterValues}
                        cells={headerCells}
                    />
                    <SheetContent
                        handleCellValue={handleCellValue}
                        editableCell={editableCell}
                        setEditableCell={setEditableCell}
                        rows={handleFilteredItems(employees)}
                        cells={headerCells}
                    />
                </section>
                {/* TODO: Some basic validations (date, phone number validation etc.)*/}

                <SheetPagination {...meta} />

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

const generateUrlPath = (query) => {
    return `${process.env.API_BASE_URL}/api/employees?currentPage=${query.currentPage}`;
};

export async function getServerSideProps({ query }) {
    const res = await fetch(generateUrlPath(query));
    const json = await res.json();
    return {
        props: {
            employees: {
                ...json
            }
        }
    };
}
