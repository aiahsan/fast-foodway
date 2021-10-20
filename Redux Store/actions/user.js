import AsyncStorage from "@react-native-community/async-storage";
import Language from '../../Localization/Language'
import types from './types'
import { url, setConfig, headers, store } from '../../configuration';


export const signIn = (data, type, setLoading, setMessage) => {
    const api = url + type;
    setLoading(true);
    return async dispatch => {
        try {
            let response = await fetch(api, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            });
            response = await response.json();
            console.log("Sign in", response.response)
            if (response.success) {
                dispatch({
                    type: types.signIn,
                    payload: response.response
                })
                setConfig();
               //dispatch(setLanguage(response.response.language, null, true));
            }
            else {
                setMessage(response.message)
            }
            setLoading(false);
        }
        catch (error) {
            setLoading(false);
            console.log("Sign in", error)
            setMessage('Network request failed')
        }
    }
}

export const logOut = () => {
    Language.setLanguage('en')
    const data = store.getState();
    const fcmToken = data['fcmToken']
    return async dispatch => {
        await AsyncStorage.clear();
        fetch(`${url}signout`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                fcm_token: fcmToken.token
            })
        })
            .then(res => res.json())
            .then(response => {
                console.log(response)
            })
            .catch(err => console.log(err))

        dispatch({
            type: types.logOut,
            payload: {}
        })
    }
}

export const getLanguages = () => {
    return async dispatch => {
        try {
            let response = await fetch(`${url}get_langs`, {
                method: 'GET',
                headers: headers,
            });
            response = await response.json();
            console.log("LANGUAGES", response)
            dispatch({
                type: types.getLanguages,
                payload: response.response
            })
        }
        catch (err) {
            console.log("get languages", err)
        }
    }
}

export const getLanguage = () => {
    return async dispatch => {
        try {
            let response = await fetch(`${url}get_lang`, {
                method: 'GET',
                headers: headers,
            });
            response = await response.json();
            console.log('language response', response)
            if (response.response != null) {
                Language.setLanguage(response.response.code)
                dispatch({
                    type: types.setLanguage,
                    payload: response.response
                })
            }

        }
        catch (err) {
            console.log("get user language", err)
        }

    }
}


export const setLanguage = (lang, navigation, flag, callback) => {
    Language.setLanguage(lang.code)
    return async dispatch => {
        if (flag)
            dispatch({
                type: types.setLanguage,
                payload: lang
            })
        else
            fetch(`${url}setLang`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    lang_id: lang.id
                })
            })
                .then(res => res.json())
                .then(response => {
                    dispatch({
                        type: types.setLanguage,
                        payload: lang
                    })
                    if (navigation) navigation.navigate('requestLocation')
                    if (callback) callback()
                })
                .catch((err) => {
                    if (callback) callback()
                    console.log("set language", err)
                })
    }
}

export const setLocation = (loc) => {
    return dispatch => {
        dispatch({
            type: types.setLocation,
            payload: loc
        })
    }
}

export const forgotPassword = (email) => {
    return () => {
        return fetch(`${url}forgot`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                email
            })
        })
    }
}

export const newPassword = (data) => {
    return () => {
        return fetch(`${url}reset`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        })
    }
}

export const changePassword = (data) => {
    return async () => {
        return fetch(`${url}change_pass`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        })
    }
}


export const updateProfile = (data, showMessage, onClose) => {
    return async (dispatch) => {
        fetch(`${url}edit_account`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    dispatch({
                        type: types.updateProfile,
                        payload: data

                    })
                    onClose()
                    showMessage("Profile edited successfully", 'Request successful')

                }
                else
                    showMessage(res.message)
            })
            .catch((err) => this.showMessage("Network request failed"))
    }
}


//address city state country type instructions latitude longitude
export const addAddress = (data) => {
    return async () => {
        return fetch(`${url}add_address`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        })
    }
}

//address_id address city state country type instructions latitude longitude
export const editAddress = (data) => {
    return async () => {
        return fetch(`${url}edit_address`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        })
    }
}



export const deleteAddress = (id) => {
    return async () => {
        return fetch(`${url}delete_address`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                address_id: id
            })
        })
    }
}

export const getAddresses = (setLoading) => {
    return async dispatch => {
        fetch(`${url}addresses`, {
            method: 'GET',
            headers: headers,
        })
            .then((response) => response.json())
            .then(responseData => {
                if (responseData.success) {
                    dispatch({
                        type: types.getAddresses,
                        payload: responseData.response
                    })
                    if (setLoading) setLoading()
                }
            })
            .catch((err) => {
                console.log("get addresses", err)
            })
    }
}

export const registerDevice = (data) => {
    return async (dispatch) => {
        console.log('action called')
        fetch(`${url}saveDevice`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                dispatch({
                    type: types.saveToken,
                    payload: data
                })
            })
            .catch(err => console.log("save device", err))
    }
}

