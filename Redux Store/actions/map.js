import types from './types'
import Geolocation from '@react-native-community/geolocation';
import { maps_api } from '../../configuration';
import { setLocation } from './user'
import Navigator from '../../Navigator'


const url = 'https://maps.googleapis.com/maps/api';

export const getLocation = (callback) => {
    console.log('get location valled')
    return async => {
        fetch('https://geolocation-db.com/json', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res=>res.json())
          .then(res=>{
            callback && callback()
            Navigator.navigate('map',
            {latitude:res.latitude,longitude:res.longitude,home:true})           
          })
          .catch(err => {
            callback && callback()
          })

    }
}

export const getCurrentLocation = (callback) => {
    return async dispatch => {
        Geolocation.getCurrentPosition(pos => {
            dispatch(getPlaceName(pos.coords.latitude, pos.coords.longitude))
                .then(res => res.json())
                .then(res => {
                    const address = res.results[0].formatted_address;
                    var data = res.results[0].address_components;
                    dispatch(filterData(pos.coords.latitude, pos.coords.longitude, data, address, callback))
                })
                .catch(err => console.log("current location", err))

        },
            err => {
                console.log(err)
                dispatch(getLocation())
            });
    }
}

export const getPlaceName = (latitude, longitude) => {
    return async () => {
        return fetch(`${url}/geocode/json?latlng=${latitude},${longitude}&key=${maps_api}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
    }
}

export const getPlaces = (search) => {
    return async () => {
        return fetch(`${url}/place/autocomplete/json?input=${search}&key=${maps_api}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })

    }
}

export const getPlaceDetail = (id) => {
    return async () => {
        return fetch(`${url}/place/details/json?place_id=${id}&key=${maps_api}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
    }
}

export const filterData = (lat, long, data, address, callback) => {
    return async dispatch => {
        var filteredData;
        filteredData = data.filter(item => {
            if (item.types.filter(item => item == 'country').length !== 0)
                return item.long_name
        })
        const country = filteredData.length !== 0 ? filteredData[0].long_name : "";
        filteredData = data.filter(item => {
            if (item.types.filter(item => item == 'administrative_area_level_1').length !== 0)
                return item.long_name
        })
        const state = filteredData.length !== 0 ? filteredData[0].long_name : "";
        filteredData = data.filter(item => {
            if (item.types.filter(item => item == 'locality').length !== 0)
                return item.long_name
        })
        const city = filteredData.length !== 0 ? filteredData[0].long_name : "";

        dispatch(setLocation({
            latitude: lat,
            longitude: long,
            title: 'Current Location',
            type: 'Home',
            city: city,
            country: country,
            state: state,
            address: address,
            id: null
        }));
        callback(lat, long)
    }
}