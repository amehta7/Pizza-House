import Image from 'next/image'
import styles from '../styles/Navbar.module.css'
import { FaBars } from 'react-icons/fa'
import { useState } from 'react'

const Navbar = () => {
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
          <li className={styles.listItem}>Home</li>
          <li className={styles.listItem}>Products</li>
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
      <div className={styles.item}>
        <div className={styles.cart}>
          <Image src='/img/cart.png' alt='cart' width='30px' height='30px' />
          <div className={styles.counter}>2</div>
        </div>
      </div>

      <div className={styles.MobileIcon}>
        <FaBars color='white' onClick={() => setOpen(!open)} />
      </div>
      {open && (
        <ul className={styles.MobileMenu} open={open}>
          <li
            className={styles.listItem}
            onClick={() => {
              setOpen(!open)
            }}
          >
            Home
          </li>
          <li
            className={styles.listItem}
            onClick={() => {
              setOpen(!open)
            }}
          >
            Products
          </li>
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
        </ul>
      )}
    </div>
  )
}

export default Navbar
