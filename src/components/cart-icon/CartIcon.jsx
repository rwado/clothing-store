import { useContext } from "react"
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg"

import { ShoppingCartContext } from "../../contexts/ShoppingCartContext"


import "./cart-icon.scss"

export const CartIcon = () => {
  const { itemsQuantity, isCartOpen, setIsCartOpen } = useContext(ShoppingCartContext)

  const toogleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <div className="cart-icon-container" onClick={toogleIsCartOpen}>
      <ShoppingIcon className="shopping-icon"/>
      <span className="item-count">{itemsQuantity}</span>
    </div>
  )
}