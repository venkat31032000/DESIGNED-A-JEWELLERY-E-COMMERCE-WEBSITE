import { ERROR, ADD_PRODUCT, ADD_PRODUCT_SUCCESS, DELETE_PRODUCT, DELETE_PRODUCT_SUCCESS, FETCH_ALL, FETCH_ALL_SUCCESS, UPDATE_PRODUCT, UPDATE_PRODUCT_SUCCESS } from "../actions/types";


const productReducer = (state = { data: [], loading: true }, action) => {
    switch (action.type) {
        case FETCH_ALL:
            return { loading: true, data: action.payload }
        case FETCH_ALL_SUCCESS:
            return { loading: false, data: action.payload }
        case ADD_PRODUCT:
            return { loading: true, data: action.payload }
        case ADD_PRODUCT_SUCCESS:
            return { loading: false, data: action.payload }
        case UPDATE_PRODUCT:
            return { loading: true, data: action.payload }
        case UPDATE_PRODUCT_SUCCESS:
            return { loading: false, data: action.payload }
        case DELETE_PRODUCT:
            return { loading: true, data: action.payload }
        case DELETE_PRODUCT_SUCCESS:
            return { loading: false, data: action.payload }
        case ERROR:
            return { loading: false, error: action.payload, data: [] }
        default:
            return state
    }
}

export default productReducer