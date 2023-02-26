import { Fragment,useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import CartIcon from "../../cart-icon/car-icon.component";
import CartDropdown from "../../cart-dropdown/cart-dropdown.component";

import { UserContext } from "../../../contexts/user.context";
import { CartContext } from "../../../contexts/cart.context";

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { signOutUser } from "../../../utils/firebase/firebase.util";

import { NavigationContainer,NavLink,LogoContainer,NavLinks } from './navigation.styles.jsx'

const Navigation = () => {
    // setCurrentUser
    const { currentUser } = useContext(UserContext)
    const { isCartOpen } = useContext(CartContext)

// nao é necessario usando o onAuthStateChangedListener criado no firebase.util que muda o user cada vez que e modificado o estado
    // const signOutHandler = async() => {
    //     await signOutUser()
    //     setCurrentUser(null)
    // }

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to="/">
                    <CrwnLogo className="logo" />
                </LogoContainer>
                <NavLinks>
                    <NavLink to="/shop">
                        SHOP
                    </NavLink>
                    {
                        currentUser ?(
                            <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
                        ) : (
                    <NavLink to="/auth">
                        SIGN IN
                    </NavLink>
                        )}
                        <CartIcon />
                </NavLinks>
                { isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    )
}

export default Navigation