import React, { Component } from "react";
import { Dimensions, SafeAreaView } from "react-native";
import InputBox from "../../../Components/InputBox";
import GradientButton from "../../../Components/Button/GradientButton";
import Language from "../../../Localization/Language";
import Header from "../../../Components/Header";
import { colors, size, fonts } from "../../../assets/styletile";
import { CreditCardInput } from "react-native-credit-card-input";
import { connect } from "react-redux";
import { setPaymentMethod } from "../../../Redux Store/actions/cart";
import Wrapper from "../../../Components/Wrapper";
import Toast from "react-native-root-toast";

class PaymentDetails extends Component {
  state = {
    form: [],
  };

  _onChange = (form) => {
    // const { cvc, expiry, name, number, type } = form.values;
    this.setState({ form: form });
  };
  showMessage = (msg) => {
    Toast.show(msg, {
      backgroundColor: 'white',
      textColor: colors.textPrimary,
      opacity: 0.9,
      position: -60,
      shadowColor: colors.lightBackground
    });
  };

  onSubmit = () => {
    const { cvc, expiry, name, number, type } = this.state.form.values;
    if (!name)
      this.showMessage("Please enter name")
    else if (!number)
      this.showMessage("Please enter card number")
    else if (!expiry)
      this.showMessage('Please enter expiry')
    else if (!cvc)
      this.showMessage('Please enter cvc')
    else {
      this.props.setPaymentMethod({
        card_number: number,
        cvc: cvc,
        name: name,
        expiry: expiry,
        payment: 1
      });
      this.props.navigation.goBack()
    }

  };
  render() {
    return (
      <Wrapper style={{ flex: 1, backgroundColor: "white" }}>
        <Header
          title={Language.paymentDetails}
          left="arrow-left"
          leftNavigation={() => this.props.navigation.pop()}
        />
        <CreditCardInput
          inputContainerStyle={{ borderBottomWidth: 0 }}
          inputStyle={{
            paddingLeft: 15,
            paddingRight: 15,
            borderRadius: 5,
            borderColor: colors.border,
            borderWidth: 1,
            backgroundColor: colors.lightBackground,
          }}
          requiresName={true}
          labelStyle={{
            fontSize: 16,
            fontFamily: fonts.primary,
            color: colors.textSecondary,
            marginBottom: "3%",
          }}
          onChange={this._onChange}
        ></CreditCardInput>

        <GradientButton
          loading={this.state.loading}
          text={Language.done}
          onPress={this.onSubmit}
          style={{
            marginTop: "7%",
            alignSelf: "center",
            width: Dimensions.get("window").width / 1.2,
          }}
        ></GradientButton>
      </Wrapper>
    );
  }
}

export default connect(null, { setPaymentMethod })(PaymentDetails);
