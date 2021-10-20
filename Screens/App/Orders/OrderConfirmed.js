import React, { Component } from 'react';
import Wrapper from '../../../Components/Wrapper';
import { Modal, View, Text, StyleSheet, Dimensions, StatusBar,Image } from 'react-native';
import { colors, fonts } from '../../../assets/styletile';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LargeHeading from '../../../Components/Heading/LargeHeading'
import SmallHeading from '../../../Components/Heading/SmallHeading'
import GradientButton from '../../../Components/Button/GradientButton';
import SimpleButton from '../../../Components/Button/SimpleButton';
import { ScrollView } from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
import { removecoupon, emptyCart } from '../../../Redux Store/actions/cart';
import { connect } from 'react-redux';
import Language from '../../../Localization/Language'
import Header from '../../../Components/Header';
import { addAddress, setLocation } from "../../../Redux Store/actions/user";
import { placeOrder } from "../../../Redux Store/actions/order";
import error from '../../../assets/images/error.png'
import { CommonActions } from '@react-navigation/native';

class OrderConfirmed extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loaidng: false,
            response: false,
            orderId:null,
            responseText:""
        }
    }

    componentDidMount() {
        this.onSubmit();
    }

    placeOrder = (addressId) => {
        const {
            restaurant,
            totalPrice,
            delivery,
            payment,
            card_number,
            cvc,
            name,
            expiry,
            coupon,
            discounted_price
        } = this.props.cartReducer;
        
        const items = this.props.cartReducer.items.map((item) => {
            
            return {
                price_discounted: item.discountedPrice,
                at_price: item.price,
                quantity: item.quantity,
                menu_id: item.id,
                extras:item.extras?item.extras:[]
            };
        });

        //console.log(this.props.cartReducer, this.props.userLocation.id, addressId);
//        console.log("slbblblslslblslb",this.props.route.params.d_charges);

        var formdata = new FormData();
        formdata.append("amount",discounted_price);
        formdata.append("items", JSON.stringify(items));
        formdata.append("payment", payment);
        formdata.append("delivery", delivery);
        formdata.append("address_id", addressId ? parseInt(addressId) : parseInt(this.props.userLocation.id));
       // formdata.append("shop_id", parseInt(restaurant.id));
        formdata.append("card_number", card_number);
        formdata.append("ccv", cvc);
        formdata.append("name", name);
        formdata.append("expiry", expiry);
        formdata.append("coupon_id", coupon);
        formdata.append("d_charges", this.props.route.params.d_charges);
        this.props
            .placeOrder(formdata)
            .then((res) => res.json())
            .then((response) => {
                console.log("rrrsp",response);
                if (response.success) {
                    this.setState({loading:false, response: true ,orderId:response.response.order_id})
                    this.props.navigation.dispatch(state => {
                        const routes = state.routes.filter(r => r.name !== 'checkout');                      
                        return CommonActions.reset({
                          ...state,
                          routes,
                          index: routes.length - 1,
                        });
                      });
                    this.props.emptyCart();
                } else {
                    this.setState({ loading: false,responseText:response.message });
                }
            })
            .catch((err) => {
                this.setState({ loading: false,response:false,responseText:Language.somethingWentWrong });
                console.log("checkout ", err);
            })
    };

    onSubmit = () => {
        this.setState({ loading: true });
        const { address, city, country, state, instructions, type, latitude, longitude } = this.props.userLocation;
        if (!this.props.userLocation.id) {
            this.props
                .addAddress({
                    address: address,
                    city: city,
                    country: country,
                    state: state,
                    instructions: instructions,
                    type: type,
                    latitude: latitude,
                    longitude: longitude,
                })
                .then((res) => res.json())
                .then((res) => {
                    if (res.success) {
                        console.log(res.message, res.response.id);
                        this.props.setLocation({
                            latitude: latitude,
                            longitude: longitude,
                            title: type,
                            type: type,
                            city: city,
                            country: country,
                            state: state,
                            address: address,
                            id: res.response.id
                        })
                        this.placeOrder(res.response.id);
                    }
                })
                .catch((err) => this.setState({ loading: false }));
        } else this.placeOrder();
    };


    orderNotPlaced=()=>{
        return (
            <Wrapper style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
                <LargeHeading text={Language.somethingWentWrong} />
                <Image source={error} style={{
                    width: 200,
                    height: 200,
                    resizeMode: 'contain',
                    marginVertical: 40,
                    alignSelf: "center"
                }} />
                <SmallHeading text={this.state.responseText} style={{ textAlign: 'center' }} />
                <GradientButton
                    text={Language.tryAgain}
                    style={{ marginVertical: 30, width: '90%', alignSelf: 'center' }}
                    onPress={() => this.props.navigation.pop()}

                />
            </Wrapper>
        );
    }


    orderPlaced = () => {
        const { orderId } = this.state;
        console.log(orderId)
        return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{flex:1,justifyContent: 'center'}}>
            <View style={styles.iconView}>
                <Icon name='check-bold' style={styles.icon} />
            </View>
            <LargeHeading text={Language.thankyouForYourOrder} style={{ width: '70%', lineHeight: 35, alignSelf: 'center' }} />
            <Text style={styles.text}>{Language.youCanTrackOrder}</Text>
            <GradientButton
                text={Language.trackMyOrder}
                style={{ width: '80%', alignSelf: 'center', marginTop: 20 }}
                onPress={() => {this.props.navigation.navigate('orderStatus', { orderId: orderId })}}
            />
            <SimpleButton
                text={Language.orderSomethingElse}
                style={{ width: '80%', alignSelf: 'center', marginVertical: 20 }}
                onPress={() => {this.props.navigation.navigate('Home')}}
            />
        </ScrollView>
        )}


    findingRider = () => {
        return (
        <View style={{flex:1,justifyContent: 'center'}}>
            <LottieView
                autoPlay
                ref={animation => { this.animation = animation }}
                source={require("../../../assets/animations/map.json")}
                style={{ width: '80%', zIndex: 2, alignSelf: 'center', marginTop: 20 }}
                speed={0.8} />
            <LargeHeading text={Language.pleaseWaitWhileWeConfirm} style={{ marginHorizontal: 20 }} />
        </View>
        )}


    render() {
        const { response,loading } = this.state;
        return (
            <Wrapper>
                {loading ? this.findingRider() : response ? this.orderPlaced() : this.orderNotPlaced()}
            </Wrapper>
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





const mapStateToProps = (state) => {
    const { userLocation, cartReducer } = state;
    return { userLocation, cartReducer };
};


export default connect(mapStateToProps, {
    emptyCart,
    addAddress,
    setLocation,
    placeOrder
})(OrderConfirmed)