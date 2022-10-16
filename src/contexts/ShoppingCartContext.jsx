import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/Reducer";



const addNewItemToCart = (cartItems, item) => {
  const currentItem = cartItems.find((cartItem) => 
    cartItem.id === item.id
  )

  if (currentItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: cartItem.quantity + 1}
        : cartItem
    )
  }

  return [ ...cartItems, { ...item, quantity: 1}]
}

const subtractItemInCart = (cartItems, item) => {

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

const addItemInCart = (cartItems, item) => {
  return cartItems.map((cartItem) => (
      item.id === cartItem.id
      ? { ...cartItem, quantity: cartItem.quantity + 1}
      : cartItem
  ))
}

const removeItem = (cartItems, item) => {
  return cartItems.filter(cartItem => item.id !== cartItem.id)
}

export const ShoppingCartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
  SET_CART_COUNT: 'SET_CART_COUNT',
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
}

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch(type) {
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      }
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      }
    default:
      throw new Error(`Unhandled type of ${type} in cartReducer`);
  }
}



export const ShoppingCartProvider = ({ children }) => {
  const [{ cartItems, isCartOpen, cartCount }, dispatch] = useReducer(cartReducer, INITIAL_STATE)

  const updateCartItemsReducer = (cartItems) => {
    const newCartCount = cartItems.reduce((total, item) => {
      return total + item.quantity;
    }, 0)

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems,
        cartCount: newCartCount,
      })
    );
  }

  const  addItemToCart = (item) => {
    const newCartItems = addNewItemToCart(cartItems, item);
    updateCartItemsReducer(newCartItems);
  }

  const decrementItemQuantityInCart = (item) => {
    const newCartItems = subtractItemInCart(cartItems, item);
    updateCartItemsReducer(newCartItems);
  }

  const incrementItemQuantityInCart = (item) => {
    const newCartItems = addItemInCart(cartItems, item);
    updateCartItemsReducer(newCartItems);
  }

  const removeItemFromCart = (item) => {
    const newCartItems = removeItem(cartItems, item);
    updateCartItemsReducer(newCartItems);
  }

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool))
  }
 
  const value = {
    isCartOpen, 
    setIsCartOpen,
    addItemToCart, 
    decrementItemQuantityInCart,
    incrementItemQuantityInCart,
    removeItemFromCart,
    cartItems, 
    cartCount,
   }
  return (
    <ShoppingCartContext.Provider value={value}>{children}</ShoppingCartContext.Provider>
  )
}