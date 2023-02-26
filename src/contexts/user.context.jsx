import { createContext,useState, useEffect } from "react";
import { onAuthStateChangedListener,creatUserDocFromAuth } from "../utils/firebase/firebase.util";

// valor que se quer acessar
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
})

// os componentes que estiverem dentro de <UserProvider> poderao utilizar children
export const UserProvider = ({ children }) => {//children e oque esta dentro de <UserContextProvider>
    const [ currentUser, setCurrentUser ] = useState(null)
    const value = { currentUser,setCurrentUser }
    
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user){
                creatUserDocFromAuth(user)
            }
            setCurrentUser(user)//inserir o user para ser usado em todas rotas
        })

        return unsubscribe 
    },[])
    
    // para pegar o componet que se quer utilizar
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}