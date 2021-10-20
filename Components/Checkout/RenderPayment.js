import React, { useState ,useEffect} from "react";
import { Text, View, TouchableWithoutFeedback, Image } from "react-native";
import visaIcon from "../../assets/icons/visa.png";
import cashIcon from "../../assets/icons/cash.png";
import tickIcon from "../../assets/icons/tick.png";
import { colors } from "../../assets/styletile";
import DeliveryStatus from "./DeliveryStatus";
import styles from "./styles";
import { connect } from "react-redux";
import Language from '../../Localization/Language'


const RenderPayment = (props) => {
  // const [paymentMethod, setPayementMethod] = useState("COD");
  const { payment } = props.cartReducer;
  const Item = (props) => {
   
    return (
      <TouchableWithoutFeedback onPress={() => props.onPress()}>
        <View
          style={{
            height: 45,
            width: "100%",
            backgroundColor: colors.lightBackground,
            borderWidth: 0.5,
            borderColor: colors.disabled,
            borderRadius: 5,
            marginBottom: "3%",
            ...styles.spacebetween,
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              resizeMode="contain"
              source={props.icon}
              style={{ width: 35, height: 35, marginHorizontal: "3%" }}
            ></Image>
            <Text>{props.text}</Text>
          </View>
          {props.selected && (
            <Image
              source={tickIcon}
              style={{
                width: 20,
                height: 20,
                marginHorizontal: "3%",
                alignSelf: "center",
              }}
            ></Image>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  };
 
  return (
    <View style={styles.container}>
      <View style={{ ...styles.spacebetween, alignItems: "center" }}>
  <Text style={{ ...styles.smallHeading }}>{Language.paymentMethod}</Text>
        <DeliveryStatus
          updateAccountStatus={(val) => {
          }}
        />
      </View>

      <Item
        onPress={() => {
          props.setPaymentMethod({ payment: 0 });
          // setPayementMethod("COD");
          // props.getSelectedMethod("COD");
        }}
        icon={cashIcon}
        text={Language.cashOnDelivery}
        selected={payment === 0 && true}
      />
      {props.cartReducer.delivery === 0 && (
        <Item
          onPress={() => {
            props.navigation.push("paymentDetails");
            // props.getSelectedMethod("onlinePayment");
          }}
          icon={visaIcon}
          text={Language.onlinePayment}
          selected={payment === 1 && true}
        />
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  const { cartReducer } = state;
  return { cartReducer };
};

export default connect(mapStateToProps, null)(RenderPayment);
