import React from "react";
import { StyleSheet, Text, View } from "react-native";
import styles from "./styles"
import Language from '../../Localization/Language'


export default Address = (props) => {
  return (
    <View style={[styles.container, { marginTop: 0, paddingTop: "5%" }]}>
      <Text style={styles.smallHeading}>{Language.deliveryAddress}</Text>
      <View style={[styles.spacebetween]}>
        <Text style={[styles.textContent, { width: "70%" }]}>
          {props.address}
        </Text>
        <Text onPress={() => props.onChangePress()} style={[styles.textRed]}>
          {Language.change}
        </Text>
      </View>
    </View>
  );
};

