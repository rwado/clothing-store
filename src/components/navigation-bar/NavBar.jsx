import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { ReactComponent as CrownLogo} from '../../assets/crown.svg'

import { signOutUser } from "../../utils/firebase/Firebase"
import { CartIcon } from "../cart-icon/CartIcon"
import { CartDropdown } from "../cart-dropdown/CartDropdown"

import { UserContext } from "../../contexts/UserContext"
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext"

import "./navbar.scss"



export const NavBar = () => {
  const { currentUser } = useContext(UserContext)
  const { isCartOpen } = useContext(ShoppingCartContext)

  return (
    <>
      <div className="navbar">
        <Link className="logo-container" to="/">
          <CrownLogo className="logo"/>
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          <Link className="nav-link" to="/auth">
            {
              currentUser ? (
                <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
              ) : (
                <span className="nav-link">SIGN IN</span>
              )
            }
          </Link>
          <Link className="nav-link" to="/checkout">
            CHECKOUT
          </Link>
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
    </>
  )
}