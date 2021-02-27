import Head from 'next/head';
import styles from '../../styles/Sheets.module.css'

const employee = () => ({
    id: Date.now(),
    name: 'Example name',
    surname: 'Example surname',
    dateOfBirth: Date.now().toLocaleString(),
    position: 'CASHIER',
    phone: '+994000000000'
});
const employees = Array.from({length: 5}).fill(employee());

export default function Sheets() {
  return (
    <div>
      <Head>
        <title>Sheets - Employees</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
          <div className={styles.container}>
              <div className={styles.tableHeader}>
                  <div className={styles.tableHeaderRows}>
                      <div className={styles.tableHeaderCell}>
                          id
                      </div>
                      <div className={styles.tableHeaderCell}>
                          name
                      </div>
                      <div className={styles.tableHeaderCell}>
                          surname
                      </div>
                      <div className={styles.tableHeaderCell}>
                          dateOfBirth
                      </div>
                      <div className={styles.tableHeaderCell}>
                          position
                      </div>
                      <div className={styles.tableHeaderCell}>
                          phone
                      </div>
                  </div>
              </div>
              <div> {/* TODO: Search functionality*/} </div>
              <div className={styles.tableContentRows}> Table rows </div>
          </div>
          {/* TODO: Some basic validations (date, phone number validation etc.)*/}
          {/* TODO: Pagination*/}
      </main>
    </div>
  )
}
