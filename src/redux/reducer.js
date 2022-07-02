const defaultState = {
    items: [],
    cartItems: [],
    favorites: [],
}

export const reducer = (state=defaultState, action) => {
    switch(action.type){
        case "ADD_ITEMS_FETCH":
            return {...state, items: [...state.items, ...action.payload]}
        case "ADD_CART_FETCH":
            return {...state, cartItems: [...state.cartItems, ...action.payload]}
            case "ADD_FAVORITE_FETCH":
            return {...state, favorites: [...state.favorites, ...action.payload]}
        case "ADD_CART_POST":
            return {...state, cartItems:[...state.cartItems, action.payload]}
        case "ADD_CART_DELETE":
            return {...state, cartItems:[...state.cartItems.filter(item => Number(item.parentId) !== Number(action.payload.id))]}
        case "ADD_FAVORITE":
            return {...state, favorites: [...state.favorites, action.payload] }
            case "ADD_FAVORITE_DELETE":
            return {...state, favorites: [...state.favorites.filter(item => Number(item.id) !== Number(action.payload.id))] }
        case "REMOVE_ITEM": 
            return {...state, cartItems: [...state.cartItems.filter(item => Number(item.id) !== Number(action.payload)) ]}    
        default: return state 
    }
}