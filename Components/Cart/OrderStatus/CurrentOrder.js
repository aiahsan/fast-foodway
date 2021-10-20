import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Image } from 'react-native';
import { colors, fonts } from '../../../assets/styletile';
import SmallHeading from '../../Heading/SmallHeading';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Language from '../../../Localization/Language'


class CurrentOrder extends Component {

    makeCall = (number) => {
        let phoneNumber = '';
        if (Platform.OS === 'android') {
            phoneNumber = `tel:${number}`;
        } else {
            phoneNumber = `telprompt:${number}`;
        }

        Linking.openURL(phoneNumber);
    };

    renderItem = (item, index) => {
        console.log(item)
        const { restaurant, curr_status, order, currency_code, id,rider } = item;
        var itemsArray;
        order.items.map((item, index) => {
            if (index == 0) {
                itemsArray = item.title;
            }
            else {
                itemsArray = itemsArray + ', ' + item.title;
            }
        })
        return (<TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('orderStatus', { orderId: id })}>
            <View style={[styles.orderContainer, { borderTopWidth: index == 0 ? 0 : 1 }]}>
                <View style={{flex:1}}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={{ uri: restaurant.image }} style={styles.image} />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.heading}>{restaurant.display_name}</Text>
                            <Text style={styles.items}>{itemsArray}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: 5, alignItems: 'flex-end' }}>
    <Text style={styles.textHead}>{Language.orderStatus} :</Text>
                        <Text style={styles.status}>{curr_status}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.textHead}>{Language.totalAmount}:</Text>
                        <Text style={styles.amount}>{currency_code} {order.amount}</Text>
                    </View>
                </View>
                <View style={{alignItems:'flex-end'}}>
                <Icon name='phone-outgoing' style={styles.icon} onPress={() => this.makeCall(rider.phone)} />
    <Text style={styles.rider}>{Language.callRider}</Text>
                </View>
            </View>
        </TouchableOpacity>)

    }


    render() {
        return (
            <View style={styles.container}>
                <SmallHeading text={Language.currentOrders} style={{ padding: 15, paddingBottom: 0 }} />
                {this.props.data.map((item, index) => {
                    return this.renderItem(item, index);
                })}
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        backgroundColor: 'white',
        marginHorizontal: 10,
        borderRadius: 10,

    },
    orderContainer: {
        padding: 15,
        borderColor: colors.border,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10
    },
    heading: {
        color: colors.textPrimary,
        fontFamily: fonts.primaryBold,
        fontSize: 16,
    },
    items: {
        fontFamily: fonts.secondary,
        color: colors.textSecondary,
        marginTop: 3,

    },
    textHead: {
        fontFamily: fonts.secondaryBold,
        marginRight: 5,
        color: colors.textPrimary,
    },
    status: {
        color: colors.primary,
        fontFamily: fonts.secondaryBold,
        textTransform: 'capitalize',
        fontSize: 16
    },
    amount: {
        color: colors.textPrimary,
        fontFamily: fonts.secondaryBold,
    },

    icon: {
        color: colors.primary,
        fontSize: 26,
    },
    rider:{
        fontFamily: fonts.secondaryBold,
        marginTop:5,
        fontSize:12,
        color:colors.third
    }

})


export default CurrentOrder;