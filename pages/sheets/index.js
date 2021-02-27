import Head from 'next/head';
import styles from '../../styles/Sheets.module.css'

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
              <div className={styles.tableHeader}>
                  <div className={styles.tableHeaderRows}>
                      {
                          headerCells.map(cell => (
                              <div className={styles.tableHeaderCell} key={cell}>
                                  {cell.replace(/([a-z0-9])([A-Z])/g, '$1 $2')}
                              </div>
                          ))
                      }
                  </div>
              </div>
              <div> {/* TODO: Search functionality*/} </div>
              <div className={styles.tableContent}>

                        {
                            employees.map((employee, employeeIndex) => (
                                <div className={styles.tableContentRows} key={employeeIndex}>
                                    {headerCells.map(cell => (
                                        <div className={styles.tableContentCell} key={cell}>
                                            <div className={styles.tableContentCellValue}>
                                                {employee[cell]}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))
                        }

              </div>
          </div>
          {/* TODO: Some basic validations (date, phone number validation etc.)*/}
          {/* TODO: Pagination*/}
      </main>
    </div>
  )
}
