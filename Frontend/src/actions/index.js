import foodzilla from "../apis/foodzilla"
import { ERROR, ADD_PRODUCT, ADD_PRODUCT_SUCCESS, DELETE_PRODUCT, DELETE_PRODUCT_SUCCESS, UPDATE_PRODUCT, UPDATE_PRODUCT_SUCCESS, FETCH_ALL, FETCH_ALL_SUCCESS, FETCH_PIZZAS, FETCH_PIZZAS_SUCCESS, SEARCH_SUCCESS, SERACH_ERROR, SHEARCH_REQ, SHOW_SIDEBAR } from "./types"

export const fetchPizzas=(category)=>async dispatch=>{
  dispatch({type:FETCH_PIZZAS,payload:[]})
  try{
    const {data} = await foodzilla.get(`/api/products?category=${category}`)
    dispatch({type:FETCH_PIZZAS_SUCCESS,payload:data})
  }
  catch(e){
    dispatch({type:ERROR,payload:'Opps!,something went wrong'}) 
  }
  
  
}

export const fetchAllProducts=()=>async dispatch=>{
  dispatch({type:FETCH_ALL,payload:[]})
  try{
    const {data} = await foodzilla.get(`/api/products/getAllProducts`)
    dispatch({type:FETCH_ALL_SUCCESS,payload:data})
  }
  catch(e){
    dispatch({type:ERROR,payload:'Opps!,something went wrong'}) 
  }
  
  
}

export const updateProduct=(id,countInStock)=>async dispatch=>{
  dispatch({type:UPDATE_PRODUCT,payload:[]})
  try{
    const {data} = await foodzilla.put(`/api/products/update-product/${id}`, {countInStock: countInStock})
    dispatch({type:UPDATE_PRODUCT_SUCCESS,payload:data})
  }
  catch(e){
    dispatch({type:ERROR,payload:'Opps!,something went wrong'}) 
  }
  
  
}

export const addProduct=(name, image, description, price, type, category, countInStock)=>async dispatch=>{
  dispatch({type:ADD_PRODUCT,payload:[]})
  try{
    const {data} = await foodzilla.post(`/api/products/add-product`, {name, image, description, price, type, category, countInStock})
    dispatch({type:ADD_PRODUCT_SUCCESS,payload:data})
  }
  catch(e){
    dispatch({type:ERROR,payload:'Opps!,something went wrong'}) 
  }
  
  
}

export const deleteProduct=(id)=>async dispatch=>{
  dispatch({type:DELETE_PRODUCT,payload:[]})
  try{
    const {data} = await foodzilla.delete(`/api/products/${id}`)
    dispatch({type:DELETE_PRODUCT_SUCCESS,payload:data})
  }
  catch(e){
    dispatch({type:ERROR,payload:'Opps!,something went wrong'}) 
  }
  
  
}


export const searchProducts =(name)=>async dispatch=>{
  dispatch({type:SHEARCH_REQ})
  try{
  const {data}=await foodzilla.get(`/api/products/search?name=${name}`)
  dispatch({type:SEARCH_SUCCESS,payload:data})
  }
  catch(error){
  dispatch({type:SERACH_ERROR,payload:error.response&&error.response.data.message?error.response.data.message:error.message})
  }
}

export const showSideBar=(boolean)=>{
  return {type:SHOW_SIDEBAR,payload:boolean}
}