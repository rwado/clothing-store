import { useDispatch, useSelector } from "react-redux";
import { addCartItem, clearCartItem, removeCartItem } from "../../store/cart/cartAction";
import { selectCartItems } from "../../store/cart/cartSelector";

import "./checkout-item.scss"

export const CheckoutItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;

    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems)

    const decrementItemHandler = () => dispatch(removeCartItem(cartItems, cartItem));
    const incrementItemHandler = () => dispatch(addCartItem(cartItems, cartItem));
    const removeItemHandler = () => dispatch(clearCartItem(cartItems, cartItem));

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