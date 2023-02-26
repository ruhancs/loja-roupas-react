import { useContext,Fragment } from "react"

import { CategoriesContext } from "../../../contexts/categories.context"

import CategoryPreview from "../../category-preview/category-preview.component"

const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext)//pegar os produtos armazenados em ProductsContext

    return (
        <Fragment>
            {
// Object.keys(categoriesMap) retorna um array com todas as keys
                Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title]
                    return (
                        <CategoryPreview key={title} title={title} products={products} />
                    )
                })
            }
        </Fragment>
    )
}

export default CategoriesPreview