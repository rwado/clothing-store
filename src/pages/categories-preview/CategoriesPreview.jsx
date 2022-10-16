import { useSelector } from "react-redux"
import { CategoryPreview } from "../../components/category-preview/CategoryPreview"
import { selectCategoriesMap } from "../../store/categories/categorySelector"


export const CategoriesPreview = () => {
  const categories = useSelector(selectCategoriesMap)
  return (
    <div className="category-preview-container">
      {Object.keys(categories).map((title) => {
        const products = categories[title];
        return <CategoryPreview key={title} title={title} products={products}/>
      })}
    </div>
  )
}