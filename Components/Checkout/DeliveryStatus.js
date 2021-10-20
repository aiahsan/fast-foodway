import React, { useState } from "react";
import { StyleSheet, Text, View, Switch } from "react-native";
import { size, colors, fonts } from "../../assets/styletile";
import { connect } from "react-redux";
import { setDelivery } from "../../Redux Store/actions/cart";
import Language from '../../Localization/Language'

function DeliveryStatus(props) {
  const [isEnabled, setEnable] = useState(true);
  const { cartReducer, setDelivery } = props;
  console.log("================", cartReducer.delivery);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        marginTop: 0,
        paddingTop: 0,
      }}
    >
      <Text
        style={{
          fontFamily: fonts.primary,
          color: colors.primary,
          fontSize: 15,
          marginRight: 5,
        }}
      >
        {isEnabled ? "Delivery" : "Pickup"}
      </Text>
      <Switch
        trackColor={{ false: "#767577", true: colors.secondary }}
        thumbColor={isEnabled ? colors.primary : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => {
          setEnable(!isEnabled);
          setDelivery(isEnabled ? { delivery: 1 } : { delivery: 0 });
        }}
        value={isEnabled}
      />
    </View>
  );
}

const mapStateToProps = (state) => {
  const { cartReducer } = state;
  return { cartReducer };
};

export default connect(mapStateToProps, {
  setDelivery,
})(DeliveryStatus);
