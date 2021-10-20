import {combineReducers} from 'redux';
import {userReducer,userLanguage,userLocation,allLanguages,userAddresses,fcmToken} from './user';
import {cartReducer} from './cart';
import {allCategories,restaurants,wishlist} from './restaurant'
import {menuItemsNew} from './itemsReducers'
import {postalReducer} from './postalReducer'

export default combineReducers({
    userReducer,
    userLanguage,
    userLocation,
    languages:allLanguages,
    userAddresses,
    cartReducer,
    allCategories,
    restaurants,
    wishlist,
    fcmToken,
    menuItemsNew,
    postalReducer
  });
  

