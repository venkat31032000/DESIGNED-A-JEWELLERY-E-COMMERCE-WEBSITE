import foodzilla from "../apis/foodzilla"
import { AUTH_ERROR, RESET_PASSWORD, RESET_PASSWORD_REQUEST, LOGOUT,FORGOT_PASSWORD, FORGOT_PASSWORD_REQUEST, SIGNIN, SIGNIN_REQUEST,SIGNUP,SIGNUP_REQUEST, UPADTE_PROFILE, UPDATE_PROFILE_ERROR, UPDATE_PROFILE_REQ } from "./types"

export const siginUser = (email,password)=>async(dispatch,getState)=>{
    dispatch({type:SIGNIN_REQUEST})
   try {
       const {data}=await foodzilla.post('/api/users/signin',{email,password})
       dispatch({type:SIGNIN,payload:data})
       localStorage.setItem('User',JSON.stringify(data))
   } catch (error) {
       dispatch({type:AUTH_ERROR,payload:error.response&&error.response.data.message?error.response.data.message:error.message})
   }
}

export const signupUser =(name,email,password)=>async dispatch =>{
    dispatch({type:SIGNUP_REQUEST})
   try {
       const {data}=await foodzilla.post('/api/users/signup',{name,email,password})
       dispatch({type:SIGNUP,payload:data})
       dispatch({type:SIGNIN,payload:data})
       localStorage.setItem('User',JSON.stringify(data))
   } catch (error) {
       dispatch({type:AUTH_ERROR,payload:error.response&&error.response.data.message?error.response.data.message:error.message})
   } 
}

export const forgotPassword =(email)=>async dispatch =>{
    dispatch({type:FORGOT_PASSWORD_REQUEST})
   try {
       const {data}=await foodzilla.post('/api/users/forgotpassword',{email})
       dispatch({type:FORGOT_PASSWORD,payload:data})
       localStorage.setItem('User',JSON.stringify(data))
   } catch (error) {
       dispatch({type:AUTH_ERROR,payload:error.response&&error.response.data.message?error.response.data.message:error.message})
   } 
}

export const resetPassword =(id, token, password)=>async dispatch =>{
    dispatch({type:RESET_PASSWORD_REQUEST})
   try {
       const {data}=await foodzilla.post(`/api/users/resetPassword/${id}/${token}`,{password})
       dispatch({type:RESET_PASSWORD,payload:data})
       localStorage.setItem('User',JSON.stringify(data))
   } catch (error) {
       dispatch({type:AUTH_ERROR,payload:error.response&&error.response.data.message?error.response.data.message:error.message})
   } 
}

export const updateprofile=(userInfo)=>async (dispatch,getState)=>{
    dispatch({type:UPDATE_PROFILE_REQ,payload:userInfo})
    try{
        const user = getState().user?.user;
      const {data} = await foodzilla.put('/api/users/updateProfile',userInfo,{
        headers:{
            Authorization: `Bearer ${user.token}`
         }
      })
      dispatch({type:UPADTE_PROFILE,payload:data})
      localStorage.setItem('User',JSON.stringify(data))
     console.log(data)
    }
    catch(error){
        dispatch({type:UPDATE_PROFILE_ERROR,payload:error.response&&error.response.data.message?error.response.data.message:error.message})
    }
}

export const logout=()=>async dispatch=>{
    localStorage.removeItem('User')
    dispatch({type:LOGOUT})
}