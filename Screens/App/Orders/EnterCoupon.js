import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Header from "../../../Components/Header";
import Button from "../../../Components/Button/GradientButton";
import InputBox from "../../../Components/InputBox";
import img from "../../../assets/images/promo.jpg";
import Language from "../../../Localization/Language";
import { validateCoupon } from "../../../Redux Store/actions/order";
import { connect } from "react-redux";
import {colors,fonts} from "../../../assets/styletile";
import {addcoupon} from '../../../Redux Store/actions/cart';
import Wrapper from "../../../Components/Wrapper";


function EnterCoupon(props) {
  const cart = props.cartReducer;
  const [code, setCode] = useState('');
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const applyCoupon = () => {
    console.log(cart.discounted_price)
    
    setLoading(true);
    props
      .validateCoupon({
        restaurant_id: 1,
        amount: cart.discounted_price,
        coupon_code: code,
      })
      .then((res) => res.json())
      .then(async (res) => {
        console.log(res)
        if (res.success) {
          props.addcoupon({
            coupon:code,
            discount:res.response.you_saved
          });         
          setLoading(false)
          setTimeout(()=>{props.navigation.pop()})     
        } else {
          setError("Failure");
          setLoading(false)
        }
      })
      .catch((err) => alert("Network request failed"));
  };

  const showError = () => {
  if (error === "Failure") {
      return (
        <Text style={{ color: colors.primary,fontFamily:fonts.secondaryBold,fontSize:16,marginVertical:5}}>
          Invalid Coupon!
        </Text>
      );
    }
  };


  const validateInput = () => {
    if(code!=""){
      applyCoupon();
    }
    else{
      setError("Failure")
    }
  }

  return (
    <Wrapper>
      <Header title={Language.enterCoupon} left='arrow-left' leftNavigation={() => props.navigation.pop()}/>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        style={{ flex: 1}}
      >
        <View style={{backgroundColor:colors.background,margin:'3%',padding:'4%'}}>
        <Image
          source={img}
          resizeMode="cover"
          style={{ width: "80%", height: 200, marginVertical: "10%" ,alignSelf: "center"}}
        ></Image>
        <InputBox
        value={code}
          onChange={(val) => setCode(val)}
          style={{
            borderWidth: 1,
            alignSelf: "center",
            marginBottom: "2%",
          }}
          placeholder={Language.enterCodeHere}
        ></InputBox>
        {showError()}
        <Button
          loading={loading}
          text={Language.apply}
          style={{ alignSelf: "center", marginBottom: 25, marginTop:'5%' }}
          onPress={validateInput}
        />
        </View>
      </ScrollView>
    </Wrapper>
  );
}

const mapStateToProps = (state) => {
  const { cartReducer } = state;
  return { cartReducer };
};



export default connect(mapStateToProps, {validateCoupon,addcoupon})(EnterCoupon);
