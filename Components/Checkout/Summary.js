import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { size , colors , fonts } from "../../assets/styletile"
import GradientButton from "../../Components/Button/GradientButton"
import styles from "./styles"
import Language from '../../Localization/Language'

export default  Summary = (props) => {
    const Item = (props) => {
      return (
        <View style={[styles.spacebetween, { marginBottom: "2%" }, props.style]}>
          <Text style={[{ fontFamily: fonts.secondaryBold }, props.titleStyle]}>
            {props.title}
          </Text>
          <Text
            style={[
              {
                fontFamily: fonts.secondaryBold,
                color: "black",
                fontWeight: "bold",
              },
              props.valueStyle,
            ]}
          >
            {props.value}
          </Text>
        </View>
      );
    };
    return (
      <View style={[styles.container, { flex: 1 }]}>
        <Text
          style={[
            styles.textContent,
            { fontFamily: fonts.primaryBold, marginBottom: "4%" },
          ]}
        >
          {Language.summary}
        </Text>
        <Item title={Language.subtotal+" (including delivery charges)"} value={props.subTotal} />
        {props.coupon ? (
          <Item title={Language.coupon} value={props.coupon} />
        ) : (
          <View></View>
        )}
        {/* <Item title={Language.deliveryCost} value={props.deliveryCost} /> */}
        {props.coupon ? (
          <Item title={Language.couponDiscount} value={`- ${props.couponDiscount}`} />
        ) : (
          <View></View>
        )}
        <Item title={Language.totalDiscount} value={`- ${props.Discount}`} />
        <Item title={"Service Charges"} value={` ${props.svscharges}`} />

       
        <Item
          style={{ height: "20%", alignItems: "center", borderTopWidth: 0.2 }}
          titleStyle={styles.textContent}
          valueStyle={{ ...styles.textRed, fontSize: size.heading }}
          title={Language.total}
          value={props.total}
        />
        <View style={{ marginBottom: "3%" }}>
          <GradientButton
            onPress={props.onButtonPress}
            text={Language.submit}
          ></GradientButton>
        </View>
      </View>
    );
  };