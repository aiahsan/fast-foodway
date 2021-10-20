import types from './types'

export const addItem=(item)=>{
    return {
        type:types.addItem,
        payload:item
    }
}


export const deleteItem=(item)=>{
   
    return {
        type:types.deleteItem,
        payload:item
    }
}
export const hanldeApitizer=(item)=>{
    return {
        type:types.hanldeApitizer,
        payload:item
    }
}
export const clearApitizer=(item)=>{
    return {
        type:types.emptyExtras,
        payload:item
    }
}
export const emptyCart=()=>{
    return{
        type:types.emptyCart,
        payload:{}
    }
}

export const addcoupon = (item)=>{
    return {
        type:types.addcoupon,
        payload:item
    }
}

export const removecoupon=(item)=>{
    return{
        type:types.removecoupon,
        payload:item
    }
}

export const setPaymentMethod=(data)=>{
    return {
        type:types.setPaymentMethod,
        payload:data
    }
}

export const setDelivery=(data)=>{
    return {
        type:types.setDelivery,
        payload:data
    }
}