import types from './types'
import { url, headers } from '../../configuration';


//shop_id
//amount
//address_id
//payment (0:COD, 1:Card)
//delivery (0:rider, 1:self-pick)
//if payment:1 -> card_number, cvv, name
//items [{menu_id,quatity,at_price,price_discounted}]
//coupon_id


export const placeOrder = (data) => {
   
    var myHeaders = new Headers();
    myHeaders.append("secret", headers.secret);
    myHeaders.append("id", headers.id);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,
        redirect: 'follow'
    };
    return async () => {
        return fetch(`${url}place_order`, requestOptions)
    }
}

export const getOrders = () => {
    return async() => {
        return fetch(`${url}myOrders`, {
            method: 'GET',
            headers: headers
        })
    }
}


export const getOrderDetails =(data)=>{
    return async() => {
        return fetch(`${url}orderDetail`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        })
    }
}


export const getCurrentOrders = () => {
    return async() => {
        return fetch(`${url}currOrder`, {
            method: 'GET',
            headers: headers
        })
    }
}


//covid-19 is a valid coupon
//coupon_code amount restaurant_id 
export const validateCoupon = (data) => {
    return async () => {
        return fetch(`${url}checkCoupon`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        })
    }
}

