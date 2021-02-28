import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect } from 'react';

import styles from '../styles/Home.module.css';

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        router.push('/sheets/1?currentPage=1', undefined, {})
  }, []);

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
