import { useDispatch, useSelector } from "react-redux";
import { selectCartCount, selectIsCartOpen } from "../../store/cart/cartSelector";

import { setIsCartOpen } from "../../store/cart/cartAction";


import { ShoppingIcon, CartIconContainer, ItemCount } from "./cart-icon"

export const CartIcon = () => {
  const dispatch = useDispatch()

  const cartCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);

  const toogleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={toogleIsCartOpen}>
      <ShoppingIcon className="shopping-icon"/>
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}