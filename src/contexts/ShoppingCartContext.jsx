import { createContext, useState } from "react";

const addNewItemToCart = (cartItems, item) => {
  const currentItem = cartItems.find((cartItem) => {
    return cartItem.id === item.id
  })

  if (currentItem) {
    return cartItems.map((cartItem) => {
      return cartItem.id === item.id
        ? { ...cartItem, quantity: cartItem.quantity + 1}
        : cartItem
    })
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
  itemsQuantity: 0,
  setItemsQuantity: () => {},
});

export const ShoppingCartProvider = ({children}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([])
  const [itemsQuantity, setItemsQuantity] = useState(0);

  const  addItemToCart = (item) => {
    setCartItems(addNewItemToCart(cartItems, item))
    setItemsQuantity(itemsQuantity + 1);
  }

  const decrementItemQuantityInCart = (item) => {
    setCartItems(subtractItemInCart(cartItems, item));
    console.log("decrement")
    setItemsQuantity(itemsQuantity - 1);
  }

  const incrementItemQuantityInCart = (item) => {
    setCartItems(addItemInCart(cartItems, item));
    setItemsQuantity(itemsQuantity + 1);
  }

  const removeItemFromCart = (item) => {
    setCartItems(removeItem(cartItems, item))
    setItemsQuantity(itemsQuantity - item.quantity)
  }
 
  const value = {
    isCartOpen, 
    setIsCartOpen,
    addItemToCart, 
    cartItems, 
    setCartItems, 
    itemsQuantity,
    decrementItemQuantityInCart,
    incrementItemQuantityInCart,
    removeItemFromCart
   }
  return (
    <ShoppingCartContext.Provider value={value}>{children}</ShoppingCartContext.Provider>
  )
}