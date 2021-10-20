import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { colors, fonts } from '../../assets/styletile';
import icon from '../../assets/images/location-white.png'
import Icon from 'react-native-vector-icons/Ionicons';
import AddressList from './AddressList';
import Language from '../../Localization/Language'


class LocationHeader extends Component {

    state = {
        visible: false
    }


    render() {
        return (

            <View>
                <TouchableNativeFeedback
                    onPress={() => this.props.setVisible(!this.props.visible)}
                    background={TouchableNativeFeedback.Ripple(colors.darkBackground, false)}
                >
                    <View style={styles.container}>

                        <View style={{ alignItems: 'flex-start' }}>
                            <Text style={styles.heading}>{Language.deliverTo}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                <Text style={styles.text}>{this.props.location.title}</Text>
                                <Icon name='ios-arrow-down' style={styles.icon} />
                            </View>

                        </View>
                        <Image source={icon} style={styles.image} />
                    </View>
                </TouchableNativeFeedback>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        shadowColor: colors.border,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41, elevation: 2,
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.primary
    },
    image: {
        height: 35,
        width: 25,
        resizeMode: 'contain',
    },
    heading: {
        fontFamily: fonts.primary,
        color: colors.background,
        fontSize: 14
    },
    text: {
        marginTop: 5,
        fontFamily: fonts.primaryBold,
        color: colors.background,
        fontSize: 18
    },
    icon: {
        color: colors.background,
        fontSize: 24,
        marginLeft: 10
    }
})


export default LocationHeader;