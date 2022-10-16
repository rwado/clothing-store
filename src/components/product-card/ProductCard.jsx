import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../../store/cart/cartAction";
import { selectCartItems } from "../../store/cart/cartSelector";


import { Button, BUTTON_TYPE_CLASSES } from "../button/Button"


import "./product-card.scss"


export const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { name, price, imageUrl } = product;
  const cartItems = useSelector(selectCartItems)

  const addItemToCartHandler = () => dispatch(addCartItem(cartItems, product));

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name}/>
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addItemToCartHandler}>Add to cart</Button>
    </div>
  )
}