import React, { Component } from "react";
import { View, StyleSheet, ScrollView, SafeAreaView, Text } from "react-native";
import Header from "../../../Components/Header";
import { Picker } from '@react-native-community/picker';
import { url, headers } from '../../../configuration';

import { fonts, size, colors } from "../../../assets/styletile";
import OrderConfirmed from "../../../Components/Cart/OrderStatus/OrderConfirmed";
import { connect } from "react-redux";
import { addAddress, setLocation } from "../../../Redux Store/actions/user";
import Language from "../../../Localization/Language";
import {
  removecoupon,
  emptyCart,
  setPaymentMethod,
  setDelivery,
} from "../../../Redux Store/actions/cart";
import {
  Address,
  RenderPayment,
  Summary,
  Coupon,
} from "../../../Components/Checkout/index";
import { placeOrder } from "../../../Redux Store/actions/order";
import Wrapper from "../../../Components/Wrapper";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      orderResponse: false,
      coupon: "",
      paymentMethod: "",
      orderId: null,
      serviceSharges: 0,
      selectedService:0,
      selectedPay:true,
      finalScharges:0.00,
      isServicesGet:false
    };
  }
  
componentDidMount()
{
  const data=async () => {
    const response=  await fetch(`${url}service_charges`, {
        method: 'GET',
        headers: headers
    }).then(res => res.json())
    .then(response => {
      console.log("rpr",response.response.charges)
      this.setState({finalScharges:parseFloat(response.response.charges),isServicesGet:true})
      //setsCharges()
      //this.props.setpostalItem(response.response)

     return response.response
    });
  
  
    
  
  }
  data(); 
}
  
  render() {
    const { coupon } = this.state;
    const item = this.props.cartReducer;

    return (
      <Wrapper>
        <Header
          title={Language.checkout}
          left="arrow-left"
          leftNavigation={() => this.props.navigation.pop()}
        />
        <ScrollView
          style={{ backgroundColor: colors.lightBackground, flex: 1 }}
        >
          <View style={{ flex: 2 }}>
            <Address
              onChangePress={() => {
                this.props.navigation.navigate("addresses", {
                  selectable: true,
                });
              }}
              address={`${this.props.userLocation.address}, ${this.props.userLocation.city}`}
            />
          </View>

          <View style={{ flex: 3 }}>
            <RenderPayment
              setPaymentMethod={this.props.setPaymentMethod}
              navigation={this.props.navigation}
              handleSelect={this.handleSelect}
            />
            <View style={{ backgroundColor: 'white', padding: '4%' }}>
              <Text style={styles.smallHeading}>Select Delivery Postal Code</Text>
             {
              item.delivery === 0 ?<Picker
              selectedValue={this.state.selectedService}
              onValueChange={(itemValue, itemIndex) =>
           {
            const dataCheck= this.props.postalReducer.find(x=>x.id==itemValue);
            if(dataCheck)
            {
            this.setState({selectedService: itemValue,serviceSharges:parseFloat(dataCheck.price)})
              
            }
           }
              }
                itemStyle={{ height: 50 }}
                style={{ height: 50, width: '100%' }}
              >
                <Picker.Item label={"Select Postal Service"} />
                {

                  (this.props.postalReducer ? this.props.postalReducer.map(x => <Picker.Item label={x.post_code + " Price: " + '\u00A3' + x.price} value={x.id} />
                  ) : <></>)
                }
              </Picker>:<></>
            }
            </View>
          </View>

          
          <View style={{ flex: 4 }}>
           {
             item.delivery === 0?
              <Summary
              subTotal={`${item.currency.code} ${(item.totalPrice + (item.delivery === 0 ?this.state.serviceSharges:0)).toFixed(2)}`}
              deliveryCost={Language.free}
              coupon={item.coupon}
              Discount={`${item.currency.code} ${item.discount.toFixed(2)}`}
              couponDiscount={`${item.currency.code} ${item.coupon_discount ? item.coupon_discountitem.coupon_discount : ''}`}
              total={`${item.currency.code} ${(item.discounted_price +this.state.finalScharges+ (item.delivery === 0 ?this.state.serviceSharges:0)).toFixed(2)}`}
              svscharges={`${item.currency.code} ${this.state.finalScharges.toFixed(2)}`}
              onButtonPress={() => {
                if(item.delivery==0 && this.state.selectedService==0 )
                {
                    alert("Please select delivery postal code")
                }
                else
                {
                  this.props.navigation.navigate('orderConfirmed', {
                    d_charges: this.state.serviceSharges,
                  })
                }
              }}
              
              serviceCharges={`${item.currency.code} ${(item.delivery === 0 ?this.state.serviceSharges:0).toFixed(2)}`}
            />:<Summary
            subTotal={`${item.currency.code} ${(item.totalPrice + (item.delivery === 0 ?this.state.serviceSharges:0)).toFixed(2)}`}
            deliveryCost={Language.free}
            coupon={item.coupon}
            Discount={`${item.currency.code} ${item.discount.toFixed(2)}`}
            couponDiscount={`${item.currency.code} ${item.coupon_discount ? item.coupon_discountitem.coupon_discount : ''}`}
            total={`${item.currency.code} ${(item.discounted_price +this.state.finalScharges+ (item.delivery === 0 ?this.state.serviceSharges:0)).toFixed(2)}`}
            svscharges={`${item.currency.code} ${this.state.finalScharges.toFixed(2)}`}
            onButtonPress={() => {
              if(this.state.isServicesGet)
              {
                this.props.navigation.navigate('orderConfirmed', {
                  d_charges: this.state.serviceSharges,
                })
              }
              else
              alert("Opp's something wen't wrong")
            }}
            
          />
           }
          </View>
        </ScrollView>
      </Wrapper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: "4%",
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.13,
    shadowRadius: 2.62,
    shadowColor: colors.border,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41, elevation: 1,
  },
  spacebetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  smallHeading: {
    fontSize: size.paragraph,
    color: "black",
    marginBottom: "3%",
    fontFamily: fonts.primaryBold,
  },
  textContent: {
    fontSize: size.content,
    color: "black",
    fontFamily: fonts.primary,
  },
  textRed: {
    fontSize: 14,
    color: colors.primary,
    fontFamily: fonts.primaryBold,
  },
});

const mapStateToProps = (state) => {
  const { userLocation, cartReducer, postalReducer } = state;
  return { userLocation, cartReducer, postalReducer };
};

export default connect(mapStateToProps, {
  addAddress,
  removecoupon,
  placeOrder,
  emptyCart,
  setDelivery,
  setPaymentMethod,
  setLocation
})(Checkout);
