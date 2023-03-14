import { Inter } from 'next/font/google'
import styles from './page.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main> 
      <h2>Home root page.tsx</h2>
      <p>
        <Link href='/users'> Users </Link>
      </p>
    </main>
  )
}
