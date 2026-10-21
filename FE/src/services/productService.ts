import {api} from "./api";
/** GET /products. Query: category, color, sort, minPrice, maxPrice, page, limit. Returns {products: Product[], total, page, pages}. Catalog browsing. */
export const getAllProducts=(params?:Record<string,unknown>)=>api.get("/products",{params});
/** GET /products/:id. Path: product id or slug. Returns Product with colors and images; no sizes field. Product page. */
export const getProductById=(id:string)=>api.get(`/products/${id}`);
/** GET /products/featured. No body. Returns Product[]. Home best sellers. */
export const getFeaturedProducts=()=>api.get("/products/featured");
/** GET /products/:id/related. Path: product id. Returns Product[]. Recommendations. */
export const getRelatedProducts=(id:string)=>api.get(`/products/${id}/related`);
