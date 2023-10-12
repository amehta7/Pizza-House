import Head from 'next/head'
import Image from 'next/image'
import Featured from '../components/Featured'
import PizzaList from '../components/PizzaList'
import styles from '../styles/Home.module.css'
import axios from 'axios'

export default function Home({ pizzaData }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza House</title>
        <meta name='description' content='Best pizza shop in town' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Featured />
      <PizzaList data={pizzaData} />
    </div>
  )
}

export const getServerSideProps = async () => {
  const res = await axios.get('http://localhost:3000/api/products')

  return {
    props: {
      pizzaData: res.data,
    },
  }
}
