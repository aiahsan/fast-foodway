import types from '../actions/types'

export const allCategories=(state=null,action)=>{
    if(action.type==types.getTags){
        return action.payload
    }
    return state;
}


export const restaurants=(state=null,action)=>{
    if(action.type==types.getRestaurants){
        return action.payload
    }
    return state;
}

export const wishlist=(state=[],action)=>{
    if(action.type==types.getWishlist){
        return action.payload
    }
    return state;
}