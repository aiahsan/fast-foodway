import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image, Text, TextInput, Platform, SafeAreaView } from 'react-native';
import MapView, { AnimatedRegion, Animated, PROVIDER_GOOGLE } from 'react-native-maps';
import marker from '../../../assets/images/map-marker2.png';
import GradientButton from '../../../Components/Button/GradientButton'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, fonts } from '../../../assets/styletile'
import { getCurrentLocation, getPlaceName, getPlaces, getPlaceDetail, getLocation } from '../../../Redux Store/actions/map';
import { setLocation } from '../../../Redux Store/actions/user';
import { connect } from 'react-redux'
import SearchBar from '../../../Components/Map/SearchBar';
import Language from '../../../Localization/Language'
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import Wrapper from '../../../Components/Wrapper';

const height = Dimensions.get('window').height;
const width = Dimensions.get("window").width;

class Map extends Component {

    constructor(props) {
        super(props);

        const edit = this.props.route.params.edit || false;
        const latitude = this.props.route.params.latitude || null;
        const longitude = this.props.route.params.longitude || null;

        this.state = {
            location: {
                latitude: latitude ? latitude : this.props.userLocation.latitude,
                longitude: longitude ? longitude : this.props.userLocation.longitude,
                latitudeDelta: 0.0122,
                longitudeDelta: width / height * 0.0122,
                city: '',
                state: '',
                country: '',
                address: 'Selected Location'
            },
            searchBar: false,
            searchText: '',
            showAddress: false,
            searchingTimeOut: false,
            searching: false,
            edit: edit ? edit : false
        }
    }


    componentDidMount() {
        console.log('location', this.props.userLocation)
        const latitude = this.props.route.params.latitude;
        const longitude = this.props.route.params.longitude;

        if (!latitude && !longitude && !this.props.userLocation)
            this.requestPermission()
    }

    requestPermission = async => {
        if (Platform.OS == 'android') {
            request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
                switch (result) {
                    case RESULTS.GRANTED:
                        this.getCurrentLocation()
                        break;
                }
            });
        }
        else {
            request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
                switch (result) {
                    case RESULTS.GRANTED:
                        this.getCurrentLocation()
                        break;
                }
            });
        }
    };

    getCurrentLocation = () => {
        this.props.getCurrentLocation((lat, long) => {
            this.setState(prevState => {
                return {
                    location: {
                        ...prevState.location,
                        latitude: lat,
                        longitude: long
                    },
                };
            });
        })
    }


    pickLocation = (region) => {
        if (this.state.searchingTimeOut) {
            clearTimeout(this.state.searchingTimeOut);
            this.setState({ searching: true })
        }

        this.setState(prevState => {
            return {
                location: {
                    ...prevState.location,
                    latitude: region.latitude,
                    longitude: region.longitude,
                },
                searchingTimeOut: setTimeout(() => {
                    this.getPlaceName();
                }, 500)
            };
        });

    }


    getPlaceName = () => {
        this.props.getPlaceName(this.state.location.latitude, this.state.location.longitude)
            .then(res => res.json())
            .then(res => {
                const address = res.results[0].formatted_address;
                var data = res.results[0].address_components;
                this.filterData(data, address)
            })
            .catch(err => console.log("get place name", err))
    }



    filterData = (data, address) => {
        console.log(data)
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
        var city = filteredData.length !== 0 ? filteredData[0].long_name : "";

        if (city == '') {
            filteredData = data.filter(item => {
                if (item.types.filter(item => item == 'administrative_area_level_2').length !== 0)
                    return item.short_name
            })
            city = filteredData.length !== 0 ? filteredData[0].short_name : "";
        }
        this.setState(prevState => {
            return {
                location: {
                    ...prevState.location,
                    city: city,
                    state: state,
                    country: country,
                    address: address
                }
            };
        });
    }

    confirmLocation = () => {
        const location = this.state.location;
        const home = this.props.route.params.home;
        const backToHome = this.props.route.params.backToHome;
        if (home) {
            this.props.setLocation({
                latitude: location.latitude,
                longitude: location.longitude,
                title: 'Selected Location',
                type: 'Home',
                city: location.city,
                country: location.country,
                state: location.state,
                address: location.address,
                id: null
            })
            this.props.navigation.navigate('tabBar')
        }
        else {
            this.props.navigation.navigate('addAddress', {
                edit: this.state.edit,
                data: location,
                map: true,
                backToHome: backToHome
            })
        }

    }


    render() {
        return (

            <Wrapper style={styles.container}>
                <Image source={marker} style={styles.marker} />
                <SearchBar
                    location={this.state.location.address}
                    navigation={this.props.navigation}
                    searchBar={this.state.searchBar}
                    filterData={this.filterData}
                    changeLocation={this.pickLocation}
                />
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    onRegionChangeComplete={this.pickLocation}
                    initialRegion={this.state.location}
                    region={this.state.location}
                    onPanDragStart={() => this.setState({ searchBar: false })}
                >
                </MapView>
                <View style={{ position: 'absolute', bottom: 30, width: '90%' }}>
                    <View style={styles.iconContainer}>
                        <Icon name='gps-fixed' style={styles.gpsIcon} onPress={this.getCurrentLocation} />
                    </View>
                    <GradientButton text={Language.confirmLocation} onPress={this.confirmLocation} />
                </View>
            </Wrapper>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        height: height,
        width: '100%',
        alignItems: "center",
        zIndex: 1
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        top: 60
    },
    marker: {
        position: 'absolute',
        zIndex: 3,
        top: (height / 2) - 15,
        height: 45,
        resizeMode: 'contain',
    },
    iconContainer: {
        height: 50,
        width: 50,
        borderRadius: 30,
        alignSelf: 'flex-end',
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: colors.border,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41, elevation: 1

    },
    gpsIcon: {
        fontSize: 28,
        color: 'white'
    },
    searchBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        width: '100%',
        zIndex: 5,
        backgroundColor: colors.primary,
        padding: 10
    },
    headerIcon: {
        color: 'white',
        fontSize: 24,
        marginHorizontal: 5
    }
});


const mapStateToProps = state => {
    const { userLocation } = state;
    return { userLocation };
};


export default connect(mapStateToProps, {
    getCurrentLocation,
    getPlaceName,
    getPlaces,
    getPlaceDetail,
    getLocation,
    setLocation
})(Map);