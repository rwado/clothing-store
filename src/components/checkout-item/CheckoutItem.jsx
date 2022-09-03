import { useContext } from "react";

import "./checkout-item.scss"

import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";

export const CheckoutItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;

    const { 
        decrementItemQuantityInCart,
        incrementItemQuantityInCart,
        removeItemFromCart 
    } = useContext(ShoppingCartContext)

    const decrementItemHandler = () => decrementItemQuantityInCart(cartItem);
    const incrementItemHandler = () => incrementItemQuantityInCart(cartItem);
    const removeItemHandler = () => removeItemFromCart(cartItem);

    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={name}/>
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <div className="arrow" onClick={decrementItemHandler}>&#10094;</div>
                <span className="value">{quantity}</span>
                <div className="arrow" onClick={incrementItemHandler}>&#10095;</div>
            </span>
            <span className="price">{price}</span>
            <div className="remove-button" onClick={removeItemHandler}>&#10005;</div>
        </div>
    )
}