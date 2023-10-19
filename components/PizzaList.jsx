import styles from '../styles/PizzaList.module.css'
import PizzaCard from './PizzaCard'

const PizzaList = ({ data }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
      <p className={styles.desc}>
        The thing about pizza is that it does not have to be expensive or
        complicated to still be really, really good (especially after a special
        kind of gummy). We are actually home to a lot of amazing pizza joints.
        Even better—those pizza joints all offer something unique, from classic
        Neapolitan-style pies to foldable NY slices to light and crispy
        Roman-style pinsas, which means you can totally eat some form of dough
        and topping every night of the week and never feel like you are having
        the same meal twice.
      </p>
      <div className={styles.wrapper}>
        {data.map((d) => (
          <PizzaCard key={d._id} pizza={d} />
        ))}
      </div>
    </div>
  )
}

export default PizzaList
