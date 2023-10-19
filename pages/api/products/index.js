import dbConnect from '../../../db/mongo'
import Product from '../../../models/Product'

const handler = async (req, res) => {
  const { method, cookies } = req

  const token = cookies.token

  dbConnect()

  if (method === 'GET') {
    try {
      const products = await Product.find()
      res.status(200).json(products)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  if (method === 'POST') {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json('Not authenticated!')
    }

    try {
      const product = await Product.create(req.body)
      res.status(201).json(product)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

export default handler
