import Head from 'next/head';
import Link from 'next/link';

import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ul>
          <li>
            <Link href="/sheets/1">
              Employees
            </Link>
          </li>
        </ul>
      </main>

    </div>
  )
}
