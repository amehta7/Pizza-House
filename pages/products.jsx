import React from 'react'
import PizzaList from '../components/PizzaList'
import axios from 'axios'

const products = ({ pizzaData }) => {
  return <PizzaList data={pizzaData} />
}

export const getServerSideProps = async () => {
  const res = await axios.get('http://localhost:3000/api/products')

  return {
    props: {
      pizzaData: res.data,
    },
  }
}

export default products
