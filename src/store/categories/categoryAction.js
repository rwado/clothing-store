import { CATEGORIES_ACTION_TYPES } from "./categoryTypes"
import { createAction } from "../../utils/reducer/Reducer"

export const setCategoriesMap = (categoriesArray) => 
   createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray)
