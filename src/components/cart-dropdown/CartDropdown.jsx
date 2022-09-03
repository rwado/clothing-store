import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import { ShoppingCartContext } from "../../contexts/ShoppingCartContext"

import { Button } from "../button/Button"
import { CartItem } from "../cart-item/CartItem"

import "./cart-dropdown.scss"

export const CartDropdown = () => {
  const { cartItems } = useContext(ShoppingCartContext)
  const navigate = useNavigate()

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.quantity * item.price),
    0);

  const goToCheckoutPageHandler = () => {
    navigate("/checkout")
  }

  return (
    <div className="cart-dropdown">
      <div className="cart-dropdown-container">
        {cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem}/>
        ))}
      </div>
      <div className="cart-button">
        <div className="total-price-container">{`Total: $${totalPrice}`}</div>
        <Button onClick={goToCheckoutPageHandler}>GO TO CHECKOUT</Button>
      </div>
    </div>
  )
}