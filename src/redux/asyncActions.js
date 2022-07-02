import axios from "axios"
import { addItemsFetchAction, addCartFetchAction, addFavoritesFetchAction } from "./actions"


export const fetchItem  = () => {
    return dispatch => {
     axios.get('https://62567d3252d8738c692f86e0.mockapi.io/items')
     .then(res => dispatch(addItemsFetchAction(res.data)))
    }
}

 export const fetchCartItem  = () => {
    return dispatch => {
     axios.get('https://62567d3252d8738c692f86e0.mockapi.io/cart').then(res => dispatch(addCartFetchAction(res.data)))
    }
}

 export const fetchFavorites  = () => {
    return dispatch => {
     axios.get('https://62567d3252d8738c692f86e0.mockapi.io/favorites').then(res=>dispatch(addFavoritesFetchAction(res.data)))
    }
}