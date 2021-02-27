import Head from 'next/head';

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
          {/* TODO: Search functionality*/}
          {/* TODO: Some basic validations (date, phone number validation etc.)*/}
          {/* TODO: Pagination*/}
      </main>
    </div>
  )
}
