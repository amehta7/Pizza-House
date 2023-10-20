import styles from '../../styles/Product.module.css'
import Image from 'next/image'
import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addProduct } from '../../redux/cartSlice'
import { useRouter } from 'next/router'

const Product = ({ pizza }) => {
  const [size, setSize] = useState(0)
  const [price, setPrice] = useState(pizza.prices[0])
  const [extras, setExtras] = useState([])
  const [quantity, setQuantity] = useState(1)

  const dispatch = useDispatch()
  const router = useRouter()

  const handlePrice = (number) => {
    setPrice((prev) => prev + number)
    //setPrice(price + number)
  }

  const handleSize = (sizeIndex) => {
    const diff = pizza.prices[sizeIndex] - pizza.prices[size]
    setSize(sizeIndex)
    handlePrice(diff)
  }

  const handleChange = (e, option) => {
    const checked = e.target.checked

    //console.log(checked)

    if (checked) {
      handlePrice(option.price)
      setExtras((prev) => [...prev, option])
    } else {
      handlePrice(-option.price)
      setExtras(extras.filter((ex) => ex._id !== option._id))
    }
  }

  //console.log(extras)

  const handleAdd = () => {
    dispatch(addProduct({ ...pizza, price, quantity, extras }))
    router.push('/cart')
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image
            src={pizza.img}
            objectFit='contain'
            layout='fill'
            alt={pizza.title}
          />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src='/img/size.png' layout='fill' alt='' />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src='/img/size.png' layout='fill' alt='' />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src='/img/size.png' layout='fill' alt='' />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {pizza.extraOptions.map((op) => (
            <div className={styles.option} key={op._id}>
              <input
                type='checkbox'
                id={op.text}
                name={op.text}
                className={styles.checkbox}
                onChange={(e) => handleChange(e, op)}
              />
              <label htmlFor={op.text}>{op.text}</label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <input
            type='number'
            defaultValue={1}
            className={styles.quantity}
            min={1}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button className={styles.button} onClick={handleAdd}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ params }) => {
  const { id } = params
  const res = await axios.get(`http://localhost:3000/api/products/${id}`)

  return {
    props: {
      pizza: res.data,
    },
  }
}

export default Product
