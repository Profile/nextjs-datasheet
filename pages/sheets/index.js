import Head from 'next/head';

import {SheetHeader} from "components/Sheets/header";
import {SheetContent} from "components/Sheets/content";

import styles from 'styles/Sheets.module.css'

const employee = () => ({
    id: 1,
    name: 'Example name',
    surname: 'Example surname',
    dateOfBirth: '1614446820809',
    position: 'CASHIER',
    phone: '+994000000000'
});
const employees = Array.from({length: 5}).fill(employee());

const headerCells = Object.keys(employee());

export default function Sheets() {
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
              {<SheetContent rows={employees} cells={headerCells} />}
          </div>
          {/* TODO: Some basic validations (date, phone number validation etc.)*/}
          {/* TODO: Pagination*/}
      </main>
    </div>
  )
}
