import Image from 'next/image'
import styles from '../styles/Navbar.module.css'
import { FaBars } from 'react-icons/fa'
import React, { useState } from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const { quantity } = useSelector((state) => state.cart)

  const [open, setOpen] = useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image
            src='/img/telephone.png'
            alt='telephone'
            width='32'
            height='32'
          />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW!</div>
          <div className={styles.text}>012 345 678</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href='/' passHref>
            <li className={styles.listItem}>Home</li>
          </Link>
          <Link href='/products' passHref>
            <li className={styles.listItem}>Products</li>
          </Link>
          <li className={styles.listItem}>Menu</li>
          <Image
            src='/img/logo2.png'
            className={styles.makeImageCircular}
            alt='logo'
            width='170px'
            height='105px'
          />
          <li className={styles.listItem}>Events</li>
          <li className={styles.listItem}>Blog</li>
          <li className={styles.listItem}>Contact</li>
        </ul>
      </div>
      <Link href='/cart'>
        <div className={styles.item}>
          <div className={styles.cart}>
            <Image src='/img/cart.png' alt='cart' width='30px' height='30px' />
            <div className={styles.counter}>{quantity}</div>
          </div>
        </div>
      </Link>

      <div className={styles.MobileIcon}>
        <FaBars color='white' onClick={() => setOpen(!open)} />
      </div>
      {open && (
        <div className={styles.MobileMenu} open={open}>
          <Link href='/'>
            <React.Fragment>
              <a
                href='/'
                className={styles.listItem}
                onClick={() => {
                  setOpen(!open)
                }}
              >
                Home
              </a>
            </React.Fragment>
          </Link>
          <Link href='/products'>
            <React.Fragment>
              <a
                href='/products'
                className={styles.listItem}
                onClick={() => {
                  setOpen(!open)
                }}
              >
                Products
              </a>
            </React.Fragment>
          </Link>
          <li
            className={styles.listItem}
            onClick={() => {
              setOpen(!open)
            }}
          >
            Menu
          </li>
          <li
            className={styles.listItem}
            onClick={() => {
              setOpen(!open)
            }}
          >
            Events
          </li>
          <li
            className={styles.listItem}
            onClick={() => {
              setOpen(!open)
            }}
          >
            Blog
          </li>
          <li
            className={styles.listItem}
            onClick={() => {
              setOpen(!open)
            }}
          >
            Contact
          </li>
        </div>
      )}
    </div>
  )
}

export default Navbar
