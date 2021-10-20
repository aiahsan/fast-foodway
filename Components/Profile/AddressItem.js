import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, fonts, size } from "../../assets/styletile";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { deleteAddress, getAddresses, setLocation } from '../../Redux Store/actions/user'
import { deliveryAvailable } from '../../Redux Store/actions/restaurant'
import { connect } from 'react-redux';
import { ModalLoader } from '../Loader';
import Toast from 'react-native-root-toast'
import Language from '../../Localization/Language'

const icons = {
    Home: "home-outline",
    Work: "briefcase-outline",
    Other: "map-marker-outline",
    Casa: 'home-outline',
    Lavoro: 'briefcase-outline',
    Other: 'map-marker-outline'
}

class AddressItem extends Component {

    state = {
        loading: false,
    }


    deleteAddress = () => {
        this.setState({ loading: true })
        this.props.deleteAddress(this.props.data.id)
            .then(res => res.json())
            .then(async res => {
                if (res.success) {
                    await this.props.getAddresses(() => this.setState({ loading: false }));
                }
            })
            .catch((err) => this.setState({ loading: false }))
    }


    selectAddresses = () => {
        this.setState({ loading: true })
        const data = this.props.data;
        if (this.props.selectable) {
            this.props.deliveryAvailable({
                latitude: data.latitude,
                longitude: data.longitude,
                restaurant_id: this.props.cartReducer.restaurant.id
            })
                .then(res => res.json())
                .then(res => {
                    this.setState({ loading: false })
                    if (res.response.available) {
                        this.props.setLocation({
                            latitude: data.latitude,
                            longitude: data.longitude,
                            title: data.type,
                            type: data.type,
                            city: data.city,
                            country: data.country,
                            state: data.state,
                            address: data.address,
                            id: data.id
                        })
                        this.props.navigation.pop()
                    }
                    else {
                        this.setState({ loading: false })
                        Toast.show(Language.restaurantDoesntDeliver, {
                            backgroundColor: 'white',
                            textColor: colors.textPrimary,
                            opacity: 0.9,
                            position: -60,
                            shadowColor: colors.lightBackground
                        })
                    }
                })
                .catch(err => console.log("Delivery available", err))
        }
        else {
            this.props.setLocation({
                latitude: data.latitude,
                longitude: data.longitude,
                title: data.type,
                type: data.type,
                city: data.city,
                country: data.country,
                state: data.state,
                address: data.address,
                id: data.id
            })
        }

    }

    render() {
        const data = this.props.data;

        return (
            <TouchableOpacity
                activeOpacity={this.props.selectable ? 0.8 : 1}
                onPress={this.selectAddresses}
            >
                <View style={styles.container}>
                    <ModalLoader visible={this.state.loading} />
                    <View style={styles.innerContainer}>
                        <Icon name={icons[data.type]} style={styles.locationIcon} />
                        <View style={styles.addressContainer}>
                            <Text style={styles.locationName}>{data.type}</Text>
                            <Text style={styles.address}>{`${data.address}, ${data.city}`}</Text>
                            <Text style={styles.address}>{`${data.state}, ${data.country}`}</Text>
                            <View style={styles.noteToRiderView}>
                                <Text style={styles.noteToRiderHeading}>{Language.noteToRider} </Text>
                                <Text style={styles.noteToRiderText}>{data.note ? data.note : 'None'}</Text>
                            </View>
                        </View>
                        <View style={styles.iconContainer}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('addAddress',
                                    { data: this.props.data, edit: !this.props.current ? true : false })}>
                                <Icon name="pencil-outline" style={{ ...styles.icon, marginRight: 5 }} />
                            </TouchableOpacity>
                            {!this.props.current && data.id !== this.props.selectedId ? <TouchableOpacity onPress={() => this.deleteAddress()}>
                                <Icon name="delete" style={styles.icon} />
                            </TouchableOpacity> : <View></View>}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}




const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        padding: 15,
        marginBottom: 10,
        shadowColor: colors.border,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41, elevation: 1,
        paddingHorizontal: 15
    },
    innerContainer: {
        flexDirection: 'row',
        justifyContent: "flex-start",
    },
    addressContainer: {
        flexDirection: 'column',
        maxWidth: '75%',
        minWidth: '70%',
        paddingHorizontal: 8,
    },
    icon: {
        fontSize: 22,
        color: colors.primary,
    },
    locationIcon: {
        fontSize: 24,
        alignSelf: 'flex-start',
        color: colors.primary,
        marginRight: 5
    },
    locationName: {
        fontSize: size.heading,
        fontFamily: fonts.secondaryBold,
        color: colors.primary,
        marginBottom: 5
    },
    address: {
        fontSize: 14,
        fontFamily: fonts.secondary,
        color: colors.textPrimary,
        marginBottom: 3
    },
    noteToRiderText: {
        fontSize: size.paragraph,
        alignSelf: 'center',
        alignSelf: 'flex-end',
        fontFamily: fonts.secondary

    },
    noteToRiderHeading: {
        marginTop: 1,
        fontSize: 14,
        color: colors.textSecondary,
        fontFamily: fonts.secondary
    },
    noteToRiderView: {
        flexDirection: 'row',
    },
    iconContainer: {
        flexDirection: 'row',
        position: 'absolute',
        right: 0
    }
})

const mapStateToProps = state => {
    const { cartReducer } = state;
    return { cartReducer };
};



export default connect(mapStateToProps, { deleteAddress, getAddresses, setLocation, deliveryAvailable })(AddressItem);