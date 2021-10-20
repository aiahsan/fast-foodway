import React from 'react'
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { headingstyle, fonts, size, colors } from "../../../assets/styletile"
import Icon from "react-native-vector-icons/SimpleLineIcons";
import Language from '../../../Localization/Language'

const screenHeight = Dimensions.get("window").height;


export const AddressCard = (props) => {
  const {currency_code,order,restaurant,shipping,statuses} = props.data;
  const placed_status = statuses[0];
  const status = statuses[statuses.length - 1];
  console.log(status)
    return (
      <View>
        <View style={{ position: "absolute", alignSelf: "center" }}>
          <View
            style={{
              borderLeftWidth: 2,
              borderColor: colors.darkBackground,
              height: screenHeight / 4.5,
              width: 1,
              alignSelf: "center",
            }}
          ></View>
          <View
            style={{
              borderWidth: 2,
              borderColor: colors.darkBackground,
              borderRadius: 50,
              width: 50,
              height: 50,
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "5%",
            }}
          >
            <Icon name="location-pin" size={25}></Icon>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            backgroundColor: colors.lightBackground,
            marginTop: "5%",
            paddingVertical: "3%",
          }}
        >
          <Text style={[styles.textHeading]}>{restaurant.display_name}</Text>
        <Text style={styles.textAddress}>{restaurant.address}</Text>
          <Text style={[styles.textAddress,{textTransform:'capitalize'}]}>
          {Language.orderPlacedAt}{placed_status.date.split(" ")[1]} {" on "} {placed_status.date.split(" ")[0]}
            </Text>
        </View>
  
        <Text style={[styles.textHeading, { marginTop: screenHeight / 7.2 }]}>
          {shipping.type}
        </Text>
        <Text style={[styles.textAddress]}>
          {shipping.address}
        </Text>
        <Text
          style={[
            styles.textHeading,
            { color: colors.primary, fontSize: 15, marginBottom: "5%",marginTop:'2%' },
          ]}
        >
          {status.status} {" at " } {status.date.split(" ")[1]} {" on "} {status.date.split(" ")[0]}
        </Text>
      </View>
    );
  };


 export const OrderItems = (props) => {
   const {items} = props.order;
    return (
     <>
      <View style={{ paddingVertical: "3%", backgroundColor: "white",paddingHorizontal:'2%' }}>
        {items.map((item) => {
          console.log("itttttt,",item)
          return (
            <>
            <View style={[styles.spaceBetween, { marginVertical: "1%" }]}>
              <View style={{flexDirection: "row"}}>
              <Text
                style={[
                  styles.textHeading,
                  { fontSize: 18, fontFamily: fonts.secondaryBold },
                ]}
              >
                {item.title}
              </Text>
              <Text
                style={[
                  styles.textHeading,
                  { textTransform:'none', fontSize: 15, fontFamily: fonts.secondaryBold },
                ]}
              >
                {"  x  "}{item.quantity}
              </Text>
            </View>
              <Text
                style={[
                  styles.textHeading,
                  { fontSize: 15, fontFamily: fonts.secondaryBold },
                ]}
              >
                {props.currency}{" "}{parseFloat(item.price_discounted).toFixed(2)}
              </Text>
              
            </View>
                <View>
                <Text  style={{
            fontFamily: fonts.primaryBold,
            fontSize: 13,
            padding: "3%",
            color:'red'
          }}>Extras</Text>
                </View>
                {
                item.extras.map(x=><View style={[styles.spaceBetween, { marginVertical: "1%" }]}>
                <View style={{flexDirection: "row"}}>
                <Text
                  style={[
                    styles.textHeading,
                    { fontSize: 15, fontFamily: fonts.secondaryBold },
                  ]}
                >
                  {x.title}
                </Text>
        
              </View>
                <Text
                  style={[
                    styles.textHeading,
                    { fontSize: 15, fontFamily: fonts.secondaryBold },
                  ]}
                >
                  {props.currency}{" "}{parseFloat(x.price).toFixed(2)}
                </Text>
                
              </View>
                )
              }
  </>
  )

        })}
      </View>
    <View>
   
          
    </View>
     </>
      );
  };


  export const Summary = (props) => {
    const {order,currency_code}=props.data;
    console.log(order,'oooooooooooo')
    const Item = (props) => (
      <View style={[styles.spaceBetween, { marginBottom: "2%" }, props.style]}>
        <Text
          style={[
            {
              fontFamily: fonts.secondary,
              color: colors.textPrimary,
              fontSize: 14,
              marginBottom: 5,
            },
            props.textStyle,
          ]}
        >
          {props.title}
        </Text>
        <Text
          style={[
            {
              fontFamily: fonts.secondary,
              color: colors.textPrimary,
              fontSize: 14,
              marginBottom: 5,
            },
            props.textStyle,
          ]}
        >
          {props.price}{" "}
        </Text>
      </View>
    );
    return (
      <View>
        <Text
          style={{
            fontFamily: fonts.primaryBold,
            fontSize: size.heading,
            padding: "3%",
            color:'black'
          }}
        >
          {Language.total}
        </Text>
        <View style={{ backgroundColor: "white", paddingVertical: "3%", paddingHorizontal:'2%' }}>
          <Item title="Basket Total" price={`${currency_code} ${(parseFloat(order.amount)-parseFloat(order.service_charges)-parseFloat(order.delivery_charges)).toFixed(2)}`}></Item>
          <Item title="Service Charges" price={`${currency_code} ${parseFloat(order.service_charges).toFixed(2)}`}></Item>
          <Item title="Delivery Charges" price={`${currency_code} ${parseFloat(order.delivery_charges).toFixed(2)}`}></Item>
          
          {/* <Item title={Language.discount} price={`${currency_code} ${order.amount}`}></Item> */}
          {/* <Item
            style={{
              borderBottomWidth: 0.8,
              borderColor: colors.darkBackground,
              paddingHorizontal: 0,
              marginHorizontal: "3%",
            }}
            textStyle={{
              fontSize: 15,
              fontFamily: fonts.secondaryBold,
              color: colors.primary,
            }}
            title="coupon: Food200"
            price={`${currency_code} ${order.amount}`}
          ></Item> */}
          <Item
            textStyle={{
              fontSize: 15,
              fontFamily: fonts.secondaryBold,
              color: colors.textPrimary,
            }}
            title={Language.totalAmount}
            price={`${currency_code} ${parseFloat(order.amount).toFixed(2)}`}
          ></Item>
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    spaceBetween: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: "2%",
    },
    textHeading: {
      alignSelf: "center",
      color: colors.textPrimary,
      fontFamily: fonts.secondaryBold,
      fontSize: size.heading,
      marginBottom: "1%",
      textAlign: "center",
      textTransform:'capitalize'
    },
    textAddress: {
      alignSelf: "center",
      fontSize: size.content,
      marginVertical: "1%",
      fontFamily: fonts.secondary,
      textAlign: "center",
      paddingHorizontal: "5%",
    },
  });
