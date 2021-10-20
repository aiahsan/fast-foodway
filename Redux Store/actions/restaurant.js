import types from './types'
import { url, headers } from '../../configuration';

//longitude latitude
export const getRestaurants = (data,callback) => {
    return async dispatch => {
        fetch(`${url}restaurants_by_location`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then(responseData => {
                if(responseData.success){
                    dispatch({
                        type:types.getRestaurants,
                        payload: responseData.response
                    })
                    callback?callback():null
                }
            })
            .catch((err) => {
                console.log("get restaurant",err)
            })
    }
}

//restaurant
export const getCategories = (id) => {
    const data= async  => {
       return fetch(`${url}categories`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({restaurant:id})
        })
       
    }

    return data;
}


//cat_id
export const getMenu = (id) => {
    return async  => {
      return  fetch(`${url}menus`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({cat_id :id})
        })
    
    }
}


export const getTags = () => {
    return async dispatch => {
        fetch(`${url}getTags`, {
            method: 'GET',
            headers: headers,
        })
        .then((response) => response.json())
        .then(responseData => {
                if(responseData.success){
                    dispatch({
                        type:types.getTags,
                        payload: responseData.response
                    })
                }
            })
            .catch((err) => {
                console.log("get tags",err)
            })
    }
}

//latitude longitude
//tag (id of tag)
export const getRestaurantByTag = (data) => {
    return async => {
        console.log("screenod",data)
       return fetch(`${url}resTags`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        })
    }
}



//restaurant_id
export const getReviews = (data) => {
    return async  => {
        return fetch(`${url}getReview`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        })
    }
}

//restaurant_id rating comment
export const writeReview=(data)=>{
    return async () => {
        return fetch(`${url}addReview`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        })
    }
}

export const addToWishlist=(data)=>{
    return async () => {
        return fetch(`${url}addWishlist`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        })
    }
}

export const removeFromWishlist=(data)=>{
    return async () => {
        return fetch(`${url}removeWishlist`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        })
    }
}

export const getWishlist = (callback) => {
    return async dispatch => {
        fetch(`${url}getWishlist`, {
            method: 'GET',
            headers: headers,
        })
        .then((response) => response.json())
        .then(responseData => {
                if(responseData.success){
                    dispatch({
                        type:types.getWishlist,
                        payload: responseData.response
                    })
                }
                callback()
            })
            .catch((err) => {
                console.log("get wishlist",err)
            })
    }
}

//latitude,longitude,restaurant_id
export const deliveryAvailable=(data)=>{
    return async () => {
        return fetch(`${url}isAvailable`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        })
    }
}

//search (string) latitude longitude
export const searchRestaurant=(data)=>{
    return async () => {
        return fetch(`${url}searchRestaurant`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        })
    }
}

export const searchMenu=(data)=>{
    return async () => {
        return fetch(`${url}menu_search`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        })
    }
}


export const setcategoryItem=(data)=>{
    return {
        type:"fetchItems",
        payload:data
    }
}
export const setpostalItem=(data)=>{
    return {
        type:"fetchPostal",
        payload:data
    }
}

