import { useContext } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectCartItems } from "../../store/cart/cartSelector"

import { Button } from "../button/Button"
import { CartItem } from "../cart-item/CartItem"

import {
  CartDropdownContainer,
  CartDropdownItemsContainer, 
  CartSummaryContainer, 
  EmptyMessage,
  TotalPriceContainer
} from "./cart-dropdown-styles"

export const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate()

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.quantity * item.price),
    0);

  const goToCheckoutPageHandler = () => {
    navigate("/checkout")
  }

  return (
    <CartDropdownContainer>
      <CartDropdownItemsContainer>
      {
        cartItems.length ? (cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem}/>
        )))
       : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )
      }
      </CartDropdownItemsContainer>
      <CartSummaryContainer>
        <TotalPriceContainer>{`Total: $${totalPrice}`}</TotalPriceContainer>
        <Button onClick={goToCheckoutPageHandler}>GO TO CHECKOUT</Button>
      </CartSummaryContainer>
    </CartDropdownContainer>
  )
}