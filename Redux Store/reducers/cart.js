import { filterData } from '../actions/map';
import types from '../actions/types'
import _ from 'lodash'

var cart = {
    items: [],
    totalItems: '',
    totalPrice: 0,
    discounted_price: 0,
    discount: 0,
    restaurant: null,
    coupun: null,
    coupun_discount: 0,
    payment: 0,
    delivery: 0,
    card_number: '',
    cvc: '',
    name: '',
    expiry: ''
};
var cart1 = {
    items: [],
    totalItems: '',
    totalPrice: 0,
    discounted_price: 0,
    discount: 0,
    restaurant: null,
    coupun: null,
    coupun_discount: 0,
    payment: 0,
    delivery: 0,
    card_number: '',
    cvc: '',
    name: '',
    expiry: ''
};



export const cartReducer = (state = cart, { type, payload }) => {

    if (payload) {

        var { restaurant, currency, coupun, ...rest } = payload;
        let extrasSum=0;

        switch (type) {
                    
            case types.addItem:
               //return cart1;
                delete rest.extras;
                const existingItem = state.items.find(item => item.id == rest.id)
                if (existingItem) {
                    existingItem.quantity += 1;
                    if (existingItem.extras) {
                        if (existingItem.extras.length > 0) {

                            //alert()
                        extrasSum=_.sum(existingItem.extras.map(x => parseFloat(x.price)));

                        }
                    }
                    const obj = {
                        ...state,
                        discount: state.discount + formatPrice(rest.discount),
                        totalPrice: state.totalPrice + formatPrice(rest.price)+formatPrice(extrasSum),
                        discounted_price: state.discounted_price + formatPrice(rest.discountedPrice)+formatPrice(extrasSum)
                    }
                    extrasSum=0;
                    return obj;
                }
                else {
                    const obj = {
                        ...state,
                        items: [...state.items,
                        { ...rest, quantity: 1 },

                        ],
                        currency, currency,
                        restaurant: restaurant,
                        discount: state.discount + formatPrice(rest.discount),
                        totalPrice: state.totalPrice + formatPrice(rest.price),
                        discounted_price: state.discounted_price + formatPrice(rest.discountedPrice)
                    }
                    extrasSum=0;
                    return obj;
                }

            case types.deleteItem:

                const item = state.items.find(item => item.id == payload.id)
                if (item) {
                    if (item.quantity == 1) {
                        if (item.extras) {
                            if (item.extras.length > 0) {
                                extrasSum=_.sum(item.extras.map(x => parseFloat(x.price)));
                            }
                        }
                        const arr = state.items.filter(item => item.id !== payload.id)
                        const obj = {
                            ...state,
                            items: arr,
                            restaurant: arr.length == 0 ? null : state.restaurant,
                            discount: state.discount - formatPrice(rest.discount),
                            totalPrice: state.totalPrice - formatPrice(rest.price)-formatPrice(extrasSum),
                            discounted_price: state.discounted_price - formatPrice(rest.discountedPrice)-formatPrice(extrasSum)
                        }
                        extrasSum=0;
                        return obj;

                    }
                    else {
                        if (item.extras) {
                            if (item.extras.length > 0) {
                                extrasSum=_.sum(item.extras.map(x => parseFloat(x.price)));


                            }
                        }
                        item.quantity -= 1;

                        const obj = {
                            ...state,
                            discount: state.discount - formatPrice(rest.discount),
                            totalPrice: state.totalPrice - formatPrice(rest.price)-formatPrice(extrasSum),
                            discounted_price: state.discounted_price - formatPrice(rest.discountedPrice)-formatPrice(extrasSum)
                        }
                        extrasSum=0;
                        return obj;
                    }
                }

            case types.emptyCart:
                return cart;


            case types.addCoupun:
                return {
                    ...state,
                    coupun: coupun,
                    coupun_discount: formatPrice(rest.discount),
                    discount: state.discount + formatPrice(rest.discount),
                    discounted_price: state.discounted_price - formatPrice(rest.discount),
                };

            case types.removeCoupun:
                return {
                    ...state,
                    coupun: null,
                    coupun_discount: 0,
                    discount: state.discount - formatPrice(rest.discount),
                    discounted_price: state.discounted_price + formatPrice(rest.discount),
                };

            case types.setPaymentMethod:
                return {
                    ...state,
                    ...payload
                }

            case types.setDelivery:
                return {
                    ...state,
                    ...payload
                }





                case types.emptyExtras:
                    {
                        const existingItem = state.items.find(item => item.id == payload.itemId)
                            
                        
                        if (existingItem && existingItem.extras && existingItem.extras.length > 0) {
                            //let filterd = existingItem.extras.filter(x => x.group_id != payload.group_id);
                            //let sumFilterd = existingItem.extras.filter(x => x.type == payload.group_id);
                            //let totalSum = _.sum(sumFilterd.price);
                            let summ=existingItem.extras.map(x=>parseFloat(x.price));
                            let summain=parseFloat(_.sum(summ));
        
                            existingItem.extras = [];
                            //existingItem.extras.push(payload);
                        
                            const obj = {
                                ...state,
                                totalPrice: state.totalPrice - formatPrice(summain),
                                discounted_price: state.discounted_price - formatPrice(summain),
    
                            }
    
                            return obj;
                        }

                        return state;
    
                    }


            case types.hanldeApitizer:
                {
                        
                    if (payload.type == "check") {
                        const existingItem = state.items.find(item => item.id == payload.itemId)
                    
                        if (existingItem.extras) {
                                
                            if (existingItem.extras.length > 0) {
                                let n = false;
                                console.log("ext", existingItem.extras)
                                const findValues = existingItem.extras.filter(x => x.optionId == payload.optionId)
                                console.log("lng",)
                                if (findValues.length > 0) {
                                    n = true;
                                }
                                if (n == true) {

                                    var filterd = existingItem.extras.filter(x => x.optionId != payload.optionId);
                                    existingItem.extras = filterd;
                                    const obj = {
                                        ...state,

                                        totalPrice: state.totalPrice - formatPrice(payload.price*existingItem.quantity),
                                        discounted_price: state.discounted_price - formatPrice(payload.price*existingItem.quantity),

                                    }
                                    return obj;
                                } else {
                                    existingItem.extras.push(payload);
                                    const obj = {
                                        ...state,
                                        totalPrice: state.totalPrice + formatPrice(payload.price*existingItem.quantity),
                                        discounted_price: state.discounted_price + formatPrice(payload.price*existingItem.quantity),

                                    }
                                    return obj;

                                }
                            } else {
                                existingItem.extras = [payload];
                                const obj = {
                                    ...state,
                                    totalPrice: state.totalPrice + formatPrice(payload.price*existingItem.quantity),
                                    discounted_price: state.discounted_price + formatPrice(payload.price*existingItem.quantity),

                                }
                                let dataFinal = JSON.stringify(obj);
                                return JSON.parse(dataFinal);
                                //add 
                            }
                        } else {

                            existingItem.extras = [payload];
                            const obj = {
                                ...state,
                                totalPrice: state.totalPrice + formatPrice(payload.price),
                                discounted_price: state.discounted_price + formatPrice(payload.price),

                            }
                            let dataFinal = JSON.stringify(obj);
                            return JSON.parse(dataFinal);
                            //add 
                        }
                    }

                    else if (payload.type == "radio") {
                        const existingItem = state.items.find(item => item.id == payload.itemId)

                        //agar mojud
                        if (existingItem && existingItem.extras && existingItem.extras.length > 0) {
                            let filterd = existingItem.extras.filter(x => x.group_id != payload.group_id);
                            let sumFilterd = existingItem.extras.filter(x => x.type == payload.group_id);
                            let totalSum = _.sum(sumFilterd.price);
                            existingItem.extras = filterd;
                            existingItem.extras.push(payload);
                            const obj = {
                                ...state,
                                totalPrice: state.totalPrice - formatPrice(totalSum),
                                discounted_price: state.discounted_price - formatPrice(totalSum),

                            }

                            return obj;
                        }
                        //un ka sum remove 
                        //else
                        //item id k all items remove
                        //add

                        else {
                            existingItem.extras = [payload];
                            const obj = {
                                ...state,
                                totalPrice: state.totalPrice + formatPrice(payload.price),
                                discounted_price: state.discounted_price + formatPrice(payload.price),

                            }
                            let dataFinal = JSON.stringify(obj);
                            return JSON.parse(dataFinal);
                            //add 
                        }
                    }
                }
            case types.logOut:
                return cart;
        }
    }
    return state;
}


const formatPrice = (price) => {
    var formatted_price = parseFloat(price);
    formatted_price = formatted_price.toFixed(2);
    return parseFloat(formatted_price);
}