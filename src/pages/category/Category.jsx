import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { ProductCard } from "../../components/product-card/ProductCard";
import { selectCategoriesMap } from "../../store/categories/categorySelector";


import "./category.scss"

export const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])

    return (
        <>
            <h2>{category.toUpperCase()}</h2>
            <div className="category-container">
                {products && 
                    products.map((product) => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
            </div>
        </>
       
    )
 }