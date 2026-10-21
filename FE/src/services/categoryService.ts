import {api} from "./api";
/** GET /categories. No body. Returns [{id, name, slug, description, image, productCount}]. Navigation and catalog. */
export const getAllCategories=()=>api.get("/categories");
/** GET /categories/:slug. Path: slug. Returns {id,name,slug,description,image,productCount}. Collection heading. */
export const getCategoryBySlug=(slug:string)=>api.get(`/categories/${slug}`);
