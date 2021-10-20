import * as React from "react";

import { createStackNavigator,CardStyleInterpolators  } from "@react-navigation/stack";

import SignUp from "../Screens/Auth/Signup";
import SignIn from "../Screens/Auth/Signin";
import ForgotPassword from "../Screens/Auth/Forgotpassword";

import NewPassword from "../Screens/Auth/NewPassword"

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator
  initialRouteName="signIn"
    screenOptions={{
      headerShown: false,
      cardStyleInterpolator:CardStyleInterpolators.forScaleFromCenterAndroid,
    }}
  >
    <Stack.Screen name="signIn" component={SignIn} />     
    <Stack.Screen name="signUp" component={SignUp} />    
    <Stack.Screen name="forgotPassword" component={ForgotPassword} />
    <Stack.Screen name='newPassword' component={NewPassword} />
  </Stack.Navigator>
);



export default AuthStack ;
