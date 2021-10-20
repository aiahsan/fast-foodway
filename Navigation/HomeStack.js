import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";
import { connect } from "react-redux";
import { colors } from "../assets/styletile";

import Home from "../Screens/App/Home";
import SelectLanguage from "../Screens/SelectLanguage";
import RequestLocation from "../Screens/App/RequestLocation";
import Checkout from "../Screens/App/Orders/Checkout";
import Cart from "../Screens/App/Orders/Cart";
import Search from "../Screens/App/Search";
import Restaurant from "../Screens/App/Restaurant/Restaurant";
import OrderStatus from "../Screens/App/Orders/OrderStatus";
import OrderDetails from "../Screens/App/Orders/OrderDetails";
import Map from "../Screens/App/Map/Map";
import Addresses from "../Screens/App/Profile/Addresses";
import AddAddress from "../Screens/App/Profile/AddAddress";
import EnterCoupon from "../Screens/App/Orders/EnterCoupon";
import Reviews from "../Screens/App/Restaurant/Reviews";
import PaymentDetails from "../Screens/App/Orders/PaymentDetails";
import NotPlaced from "../Screens/App/Orders/NotPlaced";
import Profile from "../Screens/App/Profile/Profile";
import EditProfile from "../Screens/App/Profile/EditProfile";
import ChangePassword from "../Screens/App/Profile/ChangePassword";
import WishList from "../Screens/App/Profile/WishList";
import Orders from "../Screens/App/Profile/Orders";
import Categories from "../Screens/App/Restaurant/Categories";
import Language from "../Localization/Language";
import OrderConfirmed from "../Screens/App/Orders/OrderConfirmed";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainStack = (props) => {
  console.log("from stack", props);

  return (
    <Stack.Navigator
      initialRouteName={
        !props.userLanguage
          ? "selectLangauge"
          : !props.userLocation
          ? "requestLocation"
          : "tabBar"
      }
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
      }}
    >
      <Stack.Screen name="selectLanguage" component={SelectLanguage} />
      <Stack.Screen name="requestLocation" component={RequestLocation} />
      <Stack.Screen name="map" component={Map} />
      <Stack.Screen
        name="tabBar"
        component={() => <MainTabNavigation language={props.userLanguage} />}
      />
      <Stack.Screen name="enterCoupon" component={EnterCoupon} />
      <Stack.Screen name="orderDetails" component={OrderDetails} />
      <Stack.Screen name="orderStatus" component={OrderStatus} />
      <Stack.Screen name="checkout" component={Checkout} />
      <Stack.Screen name="addAddress" component={AddAddress} />
      <Stack.Screen name="addresses" component={Addresses} />
      <Stack.Screen name="paymentDetails" component={PaymentDetails} />
      <Stack.Screen name="notPlaced" component={NotPlaced} />
      <Stack.Screen name="menu" component={Restaurant} />
      <Stack.Screen name="categories" component={Categories} />
      <Stack.Screen name="reviews" component={Reviews} />
      <Stack.Screen name="editProfile" component={EditProfile} />
      <Stack.Screen name="changePassword" component={ChangePassword} />
      <Stack.Screen name="wishlist" component={WishList} />
      <Stack.Screen name="orders" component={Orders} />
      <Stack.Screen name="orderConfirmed" component={OrderConfirmed} />
    </Stack.Navigator>
  );
};

const MainTabNavigation = (props) => {
  useEffect(() => {}, [props]);
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        style: { paddingVertical: 5, paddingBottom: insets.bottom },
        inactivecolor: colors.disabled,
        activeTintColor: colors.primary,
        showLabel: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: Language.home,
          unmountOnBlur: true,
          tabBarIcon: ({ color }) => (
            <Icon name="home" style={{ fontSize: 20 }} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: Language.search,
          unmountOnBlur: true,
          tabBarIcon: ({ color }) => (
            <Icon name="search" style={{ fontSize: 20 }} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarLabel: Language.cart,
          tabBarIcon: ({ color }) => (
            <Icon name="shopping-cart" style={{ fontSize: 20 }} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Profile}
        options={{
          tabBarLabel: Language.profile,
          tabBarIcon: ({ color }) => (
            <Icon name="user" style={{ fontSize: 20 }} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const mapStateToProps = (state) => {
  const { userLocation, userLanguage, userReducer } = state;
  return { userLocation, userLanguage, userReducer };
};

export default connect(mapStateToProps)(MainStack);
