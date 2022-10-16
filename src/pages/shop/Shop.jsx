import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { useDispatch } from "react-redux"

import { CategoriesPreview } from "../categories-preview/CategoriesPreview"
import { Category } from "../category/Category"
import { getCategoriesAndDocuments } from "../../utils/firebase/Firebase"
import { setCategoriesMap } from "../../store/categories/categoryAction"

import "./shop.scss"

export const Shop = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesArray = await getCategoriesAndDocuments('categories');
      dispatch(setCategoriesMap(categoriesArray))
    };

    getCategoriesMap();
  }, []);

  return (
      <Routes>
        <Route index element={<CategoriesPreview />}/>
        <Route path=":category" element={<Category />}/>
      </Routes>
  )

}