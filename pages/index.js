import Head from 'next/head'
import Image from 'next/image'
import Featured from '../components/Featured'
import PizzaList from '../components/PizzaList'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import AddButton from '../components/AddButton'
import { useState } from 'react'
import Add from '../components/Add'

export default function Home({ pizzaData, admin }) {
  const [close, setClose] = useState(true)

  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza House</title>
        <meta name='description' content='Best pizza shop in town' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Featured />
      {admin && <AddButton setClose={setClose} />}
      <PizzaList data={pizzaData} />
      {!close && <Add setClose={setClose} />}
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || ''
  let admin = false

  if (myCookie.token === process.env.TOKEN) {
    admin = true
  }

  const res = await axios.get('http://localhost:3000/api/products')

  return {
    props: {
      pizzaData: res.data,
      admin,
    },
  }
}
