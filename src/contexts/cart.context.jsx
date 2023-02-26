import { createContext,useState,useEffect } from "react";

// encontrar os item que ja existem no cart pelo id
// se o item estiver no cart acrescenta quantidade se nao estiver cria o produto no cart
const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id===productToAdd.id)
    if(existingCartItem){
        return cartItems.map((cartItem) => cartItem.id===productToAdd.id 
            ? {...cartItem,quantity: cartItem.quantity + 1}
            : cartItem
        )
    }
    //adiciona um produto que nao existe no cart
    return [...cartItems, { ...productToAdd, quantity:1 }]
}

const removeCartItem = (cartItems,cartItemToRemove) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id===cartItemToRemove.id)

    if(existingCartItem.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }

    return cartItems.map((cartItem) => cartItem.id===cartItemToRemove.id 
    ? {...cartItem,quantity: cartItem.quantity - 1}
    : cartItem
    )
}

const clearCartItem = (cartItems,cartItemToRemove) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
}

export const CartContext = createContext({
    isCartOpen:false,
    setIsOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemToCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal:0
})

export const CartProvider = ({children}) => {
    const [ isCartOpen, setIsCartOpen ] = useState(false)
    const [ cartItems,setCartItems ] = useState([])
    const [ cartCount, setCartCount ] = useState(0)
    const [ cartTotal, setCartTotal ] = useState(0)

    useEffect(() => {
        const newCartCount = cartItems.reduce((total,cartItem) => total + cartItem.quantity,0)
        setCartCount(newCartCount)
    },[cartItems])
    
    useEffect(() => { 
        const newTotal = cartItems.reduce((total,item) => total + (item.price*item.quantity),0)
        setCartTotal(newTotal)
    },[cartItems])
    
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems,productToAdd))
    }
    
    const removeItemToCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems,cartItemToRemove))
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems,cartItemToClear))
    }

    const value = { 
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        removeItemToCart,
        clearItemFromCart,
        cartItems,
        cartCount,
        cartTotal,
        setCartCount 
    }

    return <CartContext.Provider value={value} >{ children }</CartContext.Provider>
}