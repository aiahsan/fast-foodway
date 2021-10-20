import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableNativeFeedback, FlatList, Dimensions } from 'react-native';
import { colors, fonts } from '../../assets/styletile';
import icon from '../../assets/images/location3.png'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getAddresses, setLocation } from '../../Redux Store/actions/user'
import { getCurrentLocation } from '../../Redux Store/actions/map'
import { getRestaurants } from "../../Redux Store/actions/restaurant";
import { connect } from 'react-redux';
import { ModalLoader } from '../../Components/Loader';
import Language from '../../Localization/Language'
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';

const icons = {
    Home: "home-outline",
    Work: "briefcase-outline",
    Other: "map-marker-outline",
    Casa: 'home-outline',
    Altra: 'map-marker-outline',
    Lavoro: 'briefcase-outline'

}

const height = Dimensions.get('window').height;

class AddressList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    getCurrentLocation = () => {
        this.setState({ loading: true })
        this.props.getCurrentLocation((lat, long) => {
            this.props.getRestaurants({ longitude: long, latitude: lat }, () => {
                this.setState({ loading: false })
                this.props.onClose()
            });
        })
    }

    addNewAddress = () => {
        this.props.onClose()
        this.props.navigation.navigate('map', { backToHome: true })
    }

    renderItem = (item) => {
        const flag = item.id == this.props.userLocation.id;
        return (
            <TouchableNativeFeedback
                onPress={() => {
                    this.setState({ loading: true })
                    this.props.setLocation({
                        latitude: item.latitude,
                        longitude: item.longitude,
                        title: item.type,
                        type: item.type,
                        city: item.city,
                        country: item.country,
                        state: item.state,
                        address: item.address,
                        id: item.id
                    })

                    this.props.getRestaurants({ longitude: item.longitude, latitude: item.latitude },
                        () => this.setState({ loading: false }, this.props.onClose()));
                }}
                background={TouchableNativeFeedback.Ripple(colors.lightBackground, false)}
            >
                <View style={{
                    ...styles.rowStyle,
                    alignItems: 'flex-start',
                    backgroundColor: flag ? colors.lightBackground : colors.background
                }}>
                    <Icon name={icons[item.type]} style={styles.iconStyle} />
                    <View style={{ width: '80%' }}>
                        <Text style={styles.textHeading}>{item.type}</Text>
                        <Text style={styles.text}>{item.address}</Text>
                    </View>
                    {flag ? <View style={{ position: 'absolute', right: 0, top: '50%' }}>
                        <Icon name='check' style={{ ...styles.iconStyle, color: colors.primary }} />
                    </View> : <View></View>}
                </View>
            </TouchableNativeFeedback>
        )
    }


    headerComponent = () => {
        return <View>
            <TouchableNativeFeedback
                onPress={this.addNewAddress}
                background={TouchableNativeFeedback.Ripple(colors.lightBackground, false)}
            >
                <View style={{ ...styles.rowStyle, borderTopWidth: 0, }}>
                    <Icon name='plus' style={{ ...styles.iconStyle, color: colors.primary }} />
                    <Text style={{ ...styles.text, color: colors.primary }}>{Language.addNewAddress}</Text>
                </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
                onPress={this.getCurrentLocation}
                background={TouchableNativeFeedback.Ripple(colors.lightBackground, false)}
            >
                <View style={styles.rowStyle}>
                    <Icon name='crosshairs-gps' color={colors.textSecondary} style={styles.iconStyle} />
                    <Text style={styles.text}>{Language.currentLocation}</Text>
                </View>
            </TouchableNativeFeedback>
        </View>

    }


    render() {
        if (this.props.visible)
            return (
                <SafeAreaInsetsContext.Consumer>
                    {(insets) => <View style={{ ...styles.container, top: 60     }}>
                        <Text style={styles.heading}>{Language.deliverTo}</Text>
                        <ModalLoader visible={this.state.loading} />
                        <FlatList
                            ListHeaderComponent={this.headerComponent()}
                            showsVerticalScrollIndicator={false}
                            key={Math.random().toString()}
                            data={this.props.userAddresses}
                            style={{ flex: 1, }}
                            keyExtractor={(item) => item.id}
                            horizontal={false}
                            renderItem={({ item }) => (
                                this.renderItem(item)
                            )}
                        />
                    </View>}
                </SafeAreaInsetsContext.Consumer>

            );
        else return <View></View>
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        backgroundColor: colors.background,
        zIndex: 2,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        shadowColor: colors.darkBackground,
        shadowOffset: {
    width: 0,
    height: 2,
},
shadowOpacity: 0.45,
shadowRadius: 3.84,
 elevation: 2,
  
        paddingBottom: 20,
        flex: 1,
        maxHeight: 0.7 * height
    },
    heading: {
        color: colors.textPrimary,
        fontFamily: fonts.primaryBold,
        fontSize: 20,
        margin: 10,
        marginVertical: 15
    },
    rowStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderColor: colors.border,
        padding: 10,
        borderTopWidth: 1,
        justifyContent: 'flex-start'
    },
    iconStyle: {
        fontSize: 20,
        marginRight: 15,
        color: colors.textSecondary
    },
    text: {
        fontFamily: fonts.primary,
        color: colors.textSecondary,
        fontSize: 15,
    },
    textHeading: {
        fontFamily: fonts.primaryBold,
        color: colors.primary,
        fontSize: 16,
        marginBottom: 3
    }
})



const mapStateToProps = state => {
    const { userAddresses, userLocation } = state;
    return { userAddresses, userLocation };
};


export default connect(mapStateToProps, {
    getAddresses,
    getCurrentLocation,
    setLocation,
    getRestaurants
})(AddressList);
