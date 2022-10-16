import { useContext } from 'react'
import { useSelector } from 'react-redux'

import { ReactComponent as CrownLogo} from '../../assets/crown.svg'
import { selectCurrentUser } from '../../store/user/userSelector'

import { signOutUser } from "../../utils/firebase/Firebase"
import { CartIcon } from "../cart-icon/CartIcon"
import { CartDropdown } from "../cart-dropdown/CartDropdown"


import { NavigationContainer, LogoContainer, NavLinks, NavLink } from "./navbar-styles"
import { selectIsCartOpen } from '../../store/cart/cartSelector'




export const NavBar = () => {
  const currentUser = useSelector(selectCurrentUser)
  const isCartOpen = useSelector(selectIsCartOpen)

  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrownLogo className="logo"/>
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">
            SHOP
          </NavLink>
          <NavLink to="/auth">
            {
              currentUser ? (
                <NavLink as="span" onClick={signOutUser}>SIGN OUT</NavLink>
              ) : (
                <NavLink as="span">SIGN IN</NavLink>
              )
            }
          </NavLink>
          <NavLink to="/checkout">
            CHECKOUT
          </NavLink>
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
    </>
  )
}