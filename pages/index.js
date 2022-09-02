import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Home from './home.js'

export default function Index() {
  return (
    <div >
      <Head>
        <title>T r y f a s h i o n</title>
        <meta name="description" content="Women and mens Clothing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home />
    </div>
  )
}
