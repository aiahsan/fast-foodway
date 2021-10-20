import React, { Component } from 'react';
import { Modal, View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { colors, fonts } from '../../../assets/styletile';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LargeHeading from '../../../Components/Heading/LargeHeading'
import SmallHeading from '../../../Components/Heading/SmallHeading'
import GradientButton from '../../Button/GradientButton';
import SimpleButton from '../../Button/SimpleButton';
import { ScrollView } from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
import { removecoupon, emptyCart } from '../../../Redux Store/actions/cart';
import { connect } from 'react-redux';
import Language from '../../../Localization/Language'

const width = Dimensions.get("window").width;
class OrderConfirmed extends Component {

    state = {
        orderPlaced: this.props.response
    }

    orderPlaced = () => {
        return (<ScrollView style={{ flex: 1 }}>
            <View style={styles.iconView}>
                <Icon name='check-bold' style={styles.icon} />
            </View>
            <LargeHeading text={Language.thankyouForYourOrder} style={{ width: '70%', lineHeight: 35, alignSelf: 'center' }} />
            <Text style={styles.text}>{Language.youCanTrackOrder}</Text>
            <GradientButton
                text={Language.trackMyOrder}
                style={{ width: '80%', alignSelf: 'center', marginTop: 20 }}
                onPress={() => {
                    this.props.onClose();
                    this.props.navigation.navigate('orderStatus', { orderId: this.props.orderId, emptyCart: this.props.response })
                }}
            />
            <SimpleButton
                text={Language.orderSomethingElse}
                style={{ width: '80%', alignSelf: 'center', marginVertical: 20 }}
                onPress={() => {
                    this.props.onClose();
                    this.props.navigation.navigate('Home', { emptyCart: this.props.response })
                }}
            />
        </ScrollView>
        )
    }


    findingRider = () => {
        return (<View style={{
            justifyContent: 'center',
        }}>

            <LottieView
                autoPlay
                ref={animation => { this.animation = animation }}
                source={require("../../../assets/animations/map.json")}
                style={{ width: '80%', zIndex: 2, alignSelf: 'center', marginTop: 20 }}
                speed={0.8} />
            <LargeHeading text={Language.pleaseWaitWhileWeConfirm} style={{ marginHorizontal: 20 }} />
        </View>)

    }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => {
                    this.props.navigation.navigate('Home', { emptyCart: this.props.response })
                }}
            >
                <StatusBar backgroundColor='rgb(162,66,67)' />
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {this.props.response ? this.orderPlaced() : this.findingRider()}
                    </View>
                </View>
            </Modal>
        );
    }
}



const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: '#7d7d7d85'
    },
    modalView: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: 'hidden',
        minHeight: '70%',
        width: '100%',
        shadowColor: colors.border,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41, elevation: 5,
        backgroundColor: 'white',

    },
    iconView: {
        marginTop: '10%',
        width: 150,
        height: 150,
        borderColor: colors.secondary,
        borderWidth: 10,
        borderRadius: 100,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: '5%'
    },
    icon: {
        fontSize: 100,
        color: colors.primary

    },
    text: {
        fontSize: 18,
        color: colors.textSecondary,
        fontFamily: fonts.secondaryBold,
        width: '80%',
        textAlign: 'center',
        marginVertical: '5%',
        alignSelf: 'center',
    }

});



export default connect(null, { emptyCart })(OrderConfirmed)