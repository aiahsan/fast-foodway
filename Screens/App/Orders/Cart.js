import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
  Modal,
} from "react-native";
import NotFound from "../../../Components/NotFound";
import CartImage from "../../../assets/backgroundImage/CART.png";
import Language from "../../../Localization/Language";
import RestaurentItem from "../../../Components/Restaurant/RestaurantItem";
import Header from "../../../Components/Header";
import GradientButton from "../../../Components/Button/GradientButton";
import { fonts, size, colors } from "../../../assets/styletile";
import Icon from "react-native-vector-icons/Entypo";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { addItem, deleteItem } from "../../../Redux Store/actions/cart";
import InputBox from "../../../Components/InputBox";
import Wrapper from "../../../Components/Wrapper";

const getExtras=(item)=>{
  if(item.extras)
  {
    if(item.extras.length>0)
    {
        return <>
             <Text  style={[
                  styles.textContent,
                  { color: colors.primary, fontFamily: fonts.primaryBold },
                ]}>Extras</Text>  
            {
              item.extras.map(x=>         <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
              <Text style={styles.price}>{x.title}</Text>
              <Text style={styles.price}>{Language.price}: {'\u00A3'}{x.price}</Text>

                        </View>         
              )
            }
        </>
    }
  }
  console.log("itt",item)
}

const Counter = (props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          props.onSubtract();
        }}
      >
        <View
          style={{
            ...styles.counterButton,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        >
          <Icon name={"minus"} size={15} color={colors.primary}></Icon>
        </View>
      </TouchableWithoutFeedback>

      <Text style={[{ fontWeight: "bold", color: "black" }]}>
        {props.value}
      </Text>
      <TouchableWithoutFeedback
        onPress={() => {
          props.onAdd();
        }}
      >
        <View
          style={{
            ...styles.counterButton,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
          }}
        >
          <Icon name={"plus"} size={15} color={colors.primary}></Icon>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const Item = (props) => {
  const item = { ...props.item, restaurant: props.restaurant };
  const [quantity, setQuantity] = useState(1);

  const addItem = () => {
    return props.addItem(item);
  };

  const removeItem = () => {
    return props.deleteItem(item);
  };

  return (
    <View
      style={[
        styles.spacebetween,
        styles.container,
        {
          borderBottomWidth: 2,
          borderColor: colors.lightBackground,
          backgroundColor: colors.background,
        },
      ]}
    >
      <View style={{ width: "70%" }}>
        <View style={{display:'flex',justifyContent:'space-between',flexDirection:'row'}}>
        <Text style={[styles.textContent, { fontSize: 14 }]}>
          {props.item.title}
        </Text>
       
        <Text style={styles.price}>
    {Language.price}: {props.currencyCode}{parseFloat(props.item.price) * quantity}
        </Text>
        </View>
        {
          getExtras(props.item)
        }
      </View>

      <View
        style={{
          justifyContent: "space-between",
          width: "30%",
        }}
      >
        <Counter
          value={props.item.quantity}
          onAdd={addItem}
          onSubtract={removeItem}
        ></Counter>
      </View>
    </View>
  );
};

const SummaryItem = (props) => {
  return (
    <View style={[styles.spacebetween, { marginBottom: "2%" }, props.style]}>
      <Text style={[{ fontFamily: fonts.primaryBold }, props.titleStyle]}>
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

const Cart = (props) => {
  const [showmodal, setmodal] = useState(false);
  const cart = props.cartReducer;
  console.log("cart",cart.items)
  if (cart.items.length == 0)
    return (
      <NotFound
        title={Language.YourCartIsEmpty}
        image={CartImage}
        subtitle={Language.LooksLikeYouHaventAddedAnyItemsToYourCartYet}
      ></NotFound>
    );
  else
    return (
      <Wrapper>
        <Header title={Language.cart} />
        {/* <TakeNotes visible={showmodal}></TakeNotes> */}
        <ScrollView
          style={{ backgroundColor: colors.lightBackground, flex: 1 }}
        >
          <RestaurentItem
            style={{ shadowColor: colors.border,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41, elevation: 0 }}
            flag={true}
            item={cart.restaurant}
          />

          {cart.items.map((item) => {
            console.log("idi",item)
return (
            <Item
              item={item}
              key={item.id}
              addItem={props.addItem}
              deleteItem={props.deleteItem}
              restaurant={cart.restaurant}
              currencyCode={cart.currency.code}
            />
          )

          })}

          <TouchableWithoutFeedback
          onPress={() => props.navigation.navigate("menu", { item: cart.restaurant })}
          >
            <View style={[styles.container, { paddingHorizontal: "1%" }]}>
              <Text
                style={[
                  styles.textContent,
                  { color: colors.primary, fontFamily: fonts.primaryBold },
                ]}
              >
              </Text>
            </View>
          </TouchableWithoutFeedback>

          <View style={{ backgroundColor: colors.background }}>
            <View
              style={[
                {
                  paddingVertical: "4%",
                  borderBottomWidth: 1,
                  borderColor: colors.darkBackground,
                },
              ]}
            >
              <View style={[styles.spacebetween]}>
                <Text style={[styles.textRed, { color: "black" }]}>
                  {Language.deliveryInstructions}
                </Text>
                <Text
                  onPress={() => setmodal(!showmodal)}
                  style={[styles.textRed]}
                >
                  {Language.addNotes}{" "}
                </Text>
              </View>

              <InputBox
                multiline={true}
                placeholder={Language.enterDeliveryInstructions}
                style={{ width: "95%", alignSelf: "center", height: 100 }}
              ></InputBox>
            </View>
            <SummaryItem
              style={{ paddingVertical: "3%" }}
              titleStyle={{ color: "black" }}
              title={Language.subtotal}
              value={`${'\u00A3'} ${cart.totalPrice.toFixed(2)}`}
            />

            <SummaryItem
              style={{ paddingBottom: "3%" }}
              titleStyle={{ color: "black" }}
              title={Language.totalDiscount}
              value={`- ${'\u00A3'} ${cart.discount.toFixed(2)}`}
            />


            <SummaryItem
              style={{ paddingVertical: "2%" }}
              titleStyle={{ color: "black" }}
              title={Language.totalAmount}
              value={`${'\u00A3'} ${cart.discounted_price.toFixed(2)}`}
            />
          </View>

          <View style={{ marginHorizontal: "3%", marginVertical: "2%" }}>
            <GradientButton
              onPress={() =>
                props.navigation.push("checkout", { item: props.cartReducer })
              }
              text={Language.checkout}
              style={{ marginVertical: 10 }}
            ></GradientButton>
          </View>
        </ScrollView>
      </Wrapper>
    );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9",
    paddingVertical: "4%",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.13,
    // shadowRadius: 2.62,
    // shadowColor: colors.border,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41, elevation: 2,
  },
  spacebetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "3%",
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
  counterButton: {
    width: 30,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 2,
    paddingVertical: 2,
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
  },
  price: {
    color: colors.textSecondary,
    fontFamily: fonts.secondary,
    marginTop: 2,
    fontSize: 14,
  },
});

const mapStateToProps = (state) => {
  const { cartReducer } = state;
  return { cartReducer };
};

connect(mapStateToProps)(Counter);
export default connect(mapStateToProps, { addItem, deleteItem })(Cart);
