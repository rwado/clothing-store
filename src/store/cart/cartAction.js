import { createAction } from "../../utils/reducer/Reducer";
import { CART_ACTION_TYPES} from "./cartTypes";

const addItemToCart = (cartItems, item) => {
    const currentItem = cartItems.find((cartItem) => 
        cartItem.id === item.id
    )

    if (currentItem) {
    return cartItems.map((cartItem) =>
        cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        );
    }

    return [ ...cartItems, { ...item, quantity: 1}]
}

const decrementItemInCart = (cartItems, item) => {

    if(item.quantity > 1) {
        return cartItems.map((cartItem) => {
            if(item.id === cartItem.id) {
                return { ...cartItem, quantity: cartItem.quantity - 1}
            } else {
                return cartItem;
            }
        });
    } else {
        return removeItem(cartItems, item)
    }
}


const removeItem = (cartItems, item) => {
    return cartItems.filter(cartItem => item.id !== cartItem.id)
}

export const setIsCartOpen = (boolean) => {
    return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);
}

export const addCartItem = (cartItems, item) => {
    const newCartItems = addItemToCart(cartItems, item);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeCartItem = (cartItems, item) => {
    const newCartItems = decrementItemInCart(cartItems, item);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}


export const clearCartItem = (cartItems, item) => {
    const newCartItems = removeItem(cartItems, item);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}




