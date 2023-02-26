import { createContext,useState,useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.util.js";

import SHOP_DATA from '../shop-data.js' 

export const CategoriesContext = createContext({
    categoriesMap: {},
})

export const CategoriesProvider = ({children}) => {
    const [categoriesMap,setCategoriesMap] = useState({})

    // adicionar os itens de SHOP_DATA no db firestore
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA)
    // },[])

    // pegar as coleçoes adicionadas ao db firestore
    useEffect(() => {
        const getCategories = async() => {
            const categoryMap = await getCategoriesAndDocuments()
            setCategoriesMap(categoryMap)
        }
        getCategories()
    },[])

    const value = { categoriesMap } // value e os produtos que seram transportados entre as paginas
    
    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}