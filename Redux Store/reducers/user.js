import types from '../actions/types'

export const userReducer = (state = null, action) => {
    if (action.type == types.signIn) {
        return action.payload
    }

    else if (action.type == types.updateProfile) {
        return {
            ...state, name: action.payload.name, phone: action.payload.phone
        }
    }
    else if (action.type == types.logOut)
        return null;
    return state;
}


export const userLanguage = (state = null, action) => {
    if (action.type == types.setLanguage) {
        return {
            id: action.payload.id,
            language: action.payload.language,
            code: action.payload.code
        }
    }

    else if (action.type == types.logOut)
        return null;
    return state;
}

export const userLocation = (state = null, action) => {
    if (action.type == types.setLocation)
        return action.payload
    else if (action.type == types.logOut)
        return null;
    return state;
}

export const allLanguages = (state = null, action) => {
    if (action.type == types.getLanguages) {
        return action.payload.map(({ id, code, language }) => ({ id, code, language }));
    }
    return state;
}

export const userAddresses = (state = [], action) => {
    if (action.type == types.getAddresses) {
        return action.payload;
    }
    return state;
}

export const fcmToken = (state = null, action) => {
    if (action.type == types.saveToken) {
        return action.payload
    }
    else if (action.type == types.logOut)
        return null;
    return state;
}