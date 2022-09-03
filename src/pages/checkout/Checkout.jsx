import { useContext } from "react"

import { CheckoutItem } from "../../components/checkout-item/CheckoutItem"

import { ShoppingCartContext } from "../../contexts/ShoppingCartContext"

import "./checkout.scss"


export const Checkout = () => {
    const { cartItems } = useContext(ShoppingCartContext)

    return (  
        <div className="checkout-container">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Name</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
            {cartItems.map((cartItem) => (
                <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
            ))}
            <h2 class="total">Total: ${cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0)}</h2>
        </div> 

    )
}