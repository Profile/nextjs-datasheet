import Head from 'next/head';
import { useState, useEffect } from 'react';

import { SheetHeader } from 'components/Sheets/Header';
import { SheetFilter } from 'components/Sheets/Filter';
import { SheetContent } from 'components/Sheets/Content';
import { SheetPagination } from 'components/Sheets/Pagination';
import { validationSchema } from 'components/Sheets/validationSchema';
import { postData } from 'components/Sheets/services';

import deepClone from 'utils/deepClone';
import validate from 'utils/validate';

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
    const [isFormChanged, setIsFormChanged] = useState(false);
    const [initialValues] = useState(deepClone(employeesData));
    const [employees, setEmployees] = useState(employeesData);
    const [filterValues, setFilterValues] = useState({});

    /** Watch form changes. */
    useEffect(() => {
        setIsFormChanged(!!employees.find(isChanged));
    }, [employees]);

    /** Item is changed. */
    const isChanged = (value) => !!value.touched || !!value.deleted;

    /** Item has errors. */
    const hasErrors = (value) => {
        return !value.deleted && Object.values(value.error).find(i => !!i)
    }

    /** Computed diff between initial and current value. */
    const isEqualInitialValue = (item) => {
        const currentValue = JSON.stringify(item);
        const initialValue = JSON.stringify(
            initialValues.find((initial) => item.id === initial.id)
        );

        return currentValue === initialValue;
    };

    /** Handle editable cell. */
    const handleCellValue = (name, value) => {
        const [key, id] = name.split('.');
        const copiedEmployees = [...employees];
        const editedEmployee = copiedEmployees.find(
            (employee) => parseInt(employee.id) === parseInt(id)
        );
        editedEmployee[key] = value;
        const { touched, deleted, error, ...rest } = editedEmployee;
        editedEmployee.touched = !isEqualInitialValue(rest);
        editedEmployee.error = { ...error, ...validate(key, rest, validationSchema) };

        setEmployees(copiedEmployees);
    };

    /** Revert all changes to initial. */
    const handleRevertValues = () => {
        window.confirm('Are you sure ?') && setEmployees(deepClone(initialValues));
    };

    /** Handle Click outside of editable input. */
    const handleCloseEditableCell = ({ target: { type } }) => {
        if (type === 'text') return;
        setEditableCell(null);
    };

    /** Handle filter values. */
    const handleFilterValues = (changedValue) => {
        setFilterValues({ ...filterValues, ...changedValue });
    };

    /** Filter items by filterValues. */
    const handleFilteredItems = (items) => {
        return items.filter((item) => {
            return Object.keys(filterValues).every((key) => {
                const itemValue = item[key].toString().toLowerCase().replace(/\s/g, '');
                const filterValue = filterValues[key].toString().toLowerCase().replace(/\s/g, '');

                return !!itemValue.includes(filterValue);
            });
        });
    };

    /** Handle sheets submit action. */
    const handleSubmitForm = async () => {
        const touched = employees.filter(isChanged);
        const hasError = touched.find(hasErrors);

        if(hasError) {
            return alert('Please fix errors');
        }

        const payload = {
            updated: [],
            deleted: []
        };

        touched.forEach((item) => {
            const { deleted, touched, error, ...rest } = item;
            deleted ? payload.deleted.push(rest.id) : payload.updated.push(rest);
        });

        if (!payload.updated.length && !payload.deleted.length) {
            return alert('Nothing changed');
        }

        try {
            await postData('/api/employees', payload);
            alert('Successfully updated');
        }catch (e) {
            alert('Something went wrong..');
        }


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
                <SheetPagination {...meta} />

                {isFormChanged && (
                    <div className={styles.formActions}>
                        <button className={styles.submitAction} onClick={handleSubmitForm}>
                            Save changes
                        </button>
                        <button className={styles.submitAction} onClick={handleRevertValues}>
                            Revert all changes
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}

const generateUrlPath = ({currentPage} = {}) => {
    return `${process.env.API_BASE_URL}/api/employees?currentPage=${Math.max(currentPage || 1, 1)} : ''}`;
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
