import React from 'react'
import { View, Text , TouchableWithoutFeedback } from 'react-native'
import styles from "./styles"
import VectorIcon from "react-native-vector-icons/MaterialIcons";
import { size , colors , fonts } from "../../assets/styletile"
import Language from '../../Localization/Language'


export default Coupon = (props) => {
    return (
      <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={styles.container}>
          <View style={[styles.spacebetween, { alignItems: "space-between" }]}>
            <Text style={{ color: colors.primary }}>
              {!props.cart.coupon ? Language.doYouHaveVoucher : Language.removeVoucher}
            </Text>
            <VectorIcon
              name="navigate-next"
              size={20}
              color={colors.primary}
            ></VectorIcon>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  