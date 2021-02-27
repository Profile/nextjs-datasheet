import Head from 'next/head';
import { useState } from 'react';

import { SheetHeader } from 'components/Sheets/Header';
import { SheetContent } from 'components/Sheets/Content';

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
]

const headerCells = [
    {key: 'id', name: 'ID', type: 'text', editable: false,filterable: true  },
    {key: 'name', name: 'Name', type: 'text', editable: true, filterable: true  },
    {key: 'surname', name: 'Surname', type: 'text', editable: true, filterable: true  },
    {key: 'dateOfBirth', name: 'Date of birth', type: 'text', editable: true, filterable: true  },
    {key: 'position', name: 'Position', type: 'text', editable: true, filterable: true  },
    {key: 'phone', name: 'Phone', type: 'text', editable: true, filterable: true  },
    {key: 'deleted', name: 'Mark as deleted', type: 'checkbox', editable: true, filterable: false  },
];

export default function Sheets() {
    const [editableCell, setEditableCell] = useState(null);
    const [employees, setEmployees] = useState(mockEmployees);

    /** Handle editable cell. */
    const handleCellValue = (name, value) => {
        const [key, index] = name.split('.');
        const copiedEmployees = [...employees];
        const editedEmployee = copiedEmployees[index]; //.find((e, i) => index == i);
        editedEmployee[key] = value;

        setEmployees(copiedEmployees);
    };

    return (
        <div>
            <Head>
                <title>Sheets - Employees</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <div className={styles.container}>
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
                </div>
                {/* TODO: Some basic validations (date, phone number validation etc.)*/}
                {/* TODO: Pagination*/}
            </main>
        </div>
    );
}
