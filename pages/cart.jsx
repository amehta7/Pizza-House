import styles from '../styles/Cart.module.css'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect, useState } from 'react'
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js'
import { useRouter } from 'next/router'

const Cart = () => {
  const { products, total } = useSelector((state) => state.cart)

  const dispatch = useDispatch()
  const router = useRouter()

  //this values are the props in the UI
  const amount = '2'
  const currency = 'USD'
  const style = { layout: 'vertical' }

  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer()

    useEffect(() => {
      dispatch({
        type: 'resetOptions',
        value: {
          ...options,
          currency: currency,
        },
      })
    }, [currency, showSpinner])

    return (
      <React.Fragment>
        {showSpinner && isPending && <div className='spinner' />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId
              })
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const shipping = details.purchase_units[0].shipping
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: 2,
                method: 1,
              })
            })
          }}
        />
      </React.Fragment>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tr className={styles.trTitle}>
            <th>Product</th>
            <th>Name</th>
            <th>Extras</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
          {products.map((p) => (
            <tr className={styles.tr} key={p._id}>
              <td>
                <div className={styles.imgContainer}>
                  <Image
                    src={p.img}
                    layout='fill'
                    objectFit='cover'
                    alt={p.title}
                  />
                </div>
              </td>
              <td>
                <span className={styles.name}>{p.title}</span>
              </td>
              <td>
                {p.extraOptions.map((ex) => (
                  <span className={styles.extras} key={ex._id}>
                    {ex.text},{' '}
                  </span>
                ))}
              </td>
              <td>
                <span className={styles.price}>${p.price}</span>
              </td>
              <td>
                <span className={styles.quantity}>{p.quantity}</span>
              </td>
              <td>
                <span className={styles.total}>$ {p.price * p.quantity}</span>
              </td>
            </tr>
          ))}
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>${total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${total}
          </div>
          <button className={styles.button}>CHECKOUT NOW!</button>

          <PayPalScriptProvider
            options={{
              'client-id': 'test',
              components: 'buttons',
              currency: 'USD',
              'disable-funding': 'credit,card,p24',
            }}
          >
            <ButtonWrapper currency={currency} showSpinner={false} />
          </PayPalScriptProvider>
        </div>
      </div>
    </div>
  )
}

export default Cart
