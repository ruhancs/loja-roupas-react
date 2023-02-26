import { useContext,useState,useEffect,Fragment } from 'react'
import { useParams } from 'react-router-dom'

import ProductCard from '../../product-card/product-card.component'

import { CategoriesContext } from '../../../contexts/categories.context'

import './category.styles.scss'

const Category = () => {
    const { category } = useParams()//para pegar o nome da categoria de Route em shop.component
    const { categoriesMap } = useContext(CategoriesContext)
    const [ products,setProducts ] = useState(categoriesMap[category])

    useEffect(() => {
        setProducts(categoriesMap[category])
    },[categoriesMap,category])

    return (
        <Fragment>
            <h2 className='category-title'>{category.toLocaleUpperCase()}</h2>
            <div className='category-container'>
                {
                    // somente tentar usar o map quando os products ja estiverem carregados
                    products && products.map((product) => {
                        return (
                            <ProductCard key={product.id} product={product} />
                        )
                    })
                }
            </div>
        </Fragment>
    )
}

export default Category