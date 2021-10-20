import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, Linking } from 'react-native';
import image from '../../../assets/images/rider.jpg'
import { colors, fonts } from '../../../assets/styletile'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Language from '../../../Localization/Language'
import avatar from '../../../assets/images/avatar.jpg'

class RiderDetail extends Component {


    makeCall = () => {
        const { phone } = this.props.rider;
        let phoneNumber = '';
        if (Platform.OS === 'android') {
            phoneNumber = `tel:${phone}`;
        } else {
            phoneNumber = `telprompt:${phone}`;
        }

        Linking.openURL(phoneNumber);
    };


    render() {
        const { rider } = this.props;
        return (
            <View style={styles.container}>
                <Image source={avatar} style={styles.image} />
                <View style={{ marginLeft: 20 }}>
                    <Text style={styles.heading}>{Language.yourRider}</Text>
                    <Text style={styles.text}>{rider.name}</Text>
                </View>
                <Icon name='phone-outgoing' style={styles.icon} onPress={this.makeCall} />

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: "white",
        borderColor: colors.border,
        paddingHorizontal: '5%',
        paddingVertical: '3%',
        borderTopWidth: 1,
        alignItems: "center",
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10

    },
    heading: {
        fontFamily: fonts.secondaryBold,
        color: colors.textSecondary,
        fontSize: 14,
        marginBottom: 3
    },
    text: {
        fontFamily: fonts.primaryBold,
        color: colors.textPrimary,
        fontSize: 18
    },
    icon: {
        position: 'absolute',
        color: colors.primary,
        fontSize: 24,
        right: 20

    }

})

export default RiderDetail;