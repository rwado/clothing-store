import { useContext } from "react";

import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";

import { Button } from "../button/Button"


import "./product-card.scss"


export const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(ShoppingCartContext)

  const addItemToCartHandler = () => addItemToCart(product)

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name}/>
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={addItemToCartHandler}>Add to cart</Button>
    </div>
  )
}