import { AUTH_ERROR, RESET_PASSWORD, RESET_PASSWORD_REQUEST, LOGOUT, FORGOT_PASSWORD, FORGOT_PASSWORD_REQUEST, SIGNIN, SIGNIN_REQUEST,SIGNUP,SIGNUP_REQUEST, UPADTE_PROFILE, UPDATE_PROFILE_ERROR, UPDATE_PROFILE_REQ } from "../actions/types";
export const signInReducer=(state={loading:false},action)=>{
    switch (action.type) {
        case SIGNIN_REQUEST:
            return {loading:true}
        case SIGNIN:
        return{loading:false,user:action.payload}
        case AUTH_ERROR:
            return{loading:false,error:action.payload}
        case UPDATE_PROFILE_REQ:
              return{loading:true,user:{...state.user,...action.payload}}
        case UPADTE_PROFILE:
            return{loading:false,user:{...state.user,...action.payload}}
        case UPDATE_PROFILE_ERROR:
            return{...state,error:action.payload}
        case LOGOUT:
            return{};
        default:
            return state
    }
}
export const signUpReducer=(state={loading:false},action)=>{
    switch (action.type) {
        case SIGNUP_REQUEST:
            return {loading:true}
        case SIGNUP:
        return{loading:false,user:action.payload}
        case AUTH_ERROR:
            return{loading:false,error:action.payload}
        case LOGOUT:
            return{};
        default:
            return state
    }
}
export const forgotPasswordReducer=(state={loading:false},action)=>{
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
            return {loading:true}
        case FORGOT_PASSWORD:
        return{loading:false,user:action.payload}
        case AUTH_ERROR:
            return{loading:false,error:action.payload}
        case LOGOUT:
            return{};
        default:
            return state
    }
}

export const resetPasswordReducer=(state={loading:false},action)=>{
    switch (action.type) {
        case RESET_PASSWORD_REQUEST:
            return {loading:true}
        case RESET_PASSWORD:
        return{loading:false,user:action.payload}
        case AUTH_ERROR:
            return{loading:false,error:action.payload}
        case LOGOUT:
            return{};
        default:
            return state
    }
}