import React, { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { connect } from 'react-redux';
import HomeStack from "../Navigation/HomeStack";
import AuthStack from "../Navigation/AuthStack";
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, Image } from "react-native";
import { colors } from "../assets/styletile";
import logo from '../assets/images/logo.jpeg';
import SplashScreen from 'react-native-splash-screen'
import Language from '../Localization/Language'
import { getLanguages } from '../Redux Store/actions/user'
import Map from '../Screens/App/Map/Map'
import Navigator from '../Navigator'

const AuthLoading = (props) => {

  const MyTheme = {
    dark: false,
    colors: {
      primary: colors.primary,
      background: colors.lightBackground,
      card: 'rgb(255, 255, 255)',
      text: colors.textPrimary,
      border: colors.border,
    },
  };

  const [loading, setLoading] = useState(true);
  const [isSignedIn, setStatus] = useState(false);

  useEffect(() => {
    if (!props.languages)
      props.getLanguages();
    if (props.userReducer !== null) {
      setStatus(true);
      if (props.userLanguage)
        Language.setLanguage(props.userLanguage.code);
    }
    else {
      Language.setLanguage('en');
      setStatus(false);
    }

    setLoading(false);

  }, [props]);

  if (loading) {
    return <View style={{ flex: 1, backgroundColor: colors.primary, justifyContent: 'center' }}></View>
  }

  return (
    <NavigationContainer
      ref={(navigatorRef) => {
        Navigator.setTopLevelNavigator(navigatorRef);
      }}
      theme={MyTheme}>
      {isSignedIn ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const mapStateToProps = state => {
  const { userReducer, userLanguage, userLocation, languages } = state;
  return { userReducer, userLanguage, userLocation, languages };
};



export default connect(mapStateToProps, { getLanguages })(AuthLoading);
