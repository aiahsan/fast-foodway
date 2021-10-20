import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { colors } from "../../assets/styletile";
import GradientButton from "../../Components/Button/GradientButton";
import InputBox from "../../Components/InputBox";
import BoldText from "../../Components/BoldText";
import LargeHeading from "../../Components/Heading/LargeHeading";
import Language from "../../Localization/Language";
import Alert from "../../Components/Alert";
import logo from '../../assets/images/logo1.png';

import { signIn } from '../../Redux Store/actions/user';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Wrapper from "../../Components/Wrapper";
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';


class SignUp extends Component {
  state = {
    Language: "en",
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    country: "",
    message: "",
    visible: false,
    loading: false,
    shown: false
  };


  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => this.setState({ shown: true }),
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => this.setState({ shown: false }),
    );
  }



  setLoading = (flag) => {
    this.setState({ loading: flag })
  }

  showMessage = (msg) => {
    this.setState({
      loading: false,
      visible: true,
      title: 'Error occurred',
      message: msg
    })
  }

  validateInput = () => {
    if (this.state.username == "")
      this.setState({
        visible: true,
        title: Language.errorTitle,
        message: Language.enterUser,
      });
    else if (this.state.name == "")
      this.setState({
        visible: true,
        title: Language.errorTitle,
        message: 'Please enter full name',
      });
    else if (this.state.email == "")
      this.setState({
        visible: true,
        title: Language.errorTitle,
        message: Language.enterEmail,
      });
    else if (this.state.phone == "")
      this.setState({
        visible: true,
        title: Language.errorTitle,
        message: 'Please enter phone number with country code',
      });
    else if (this.state.password == "")
      this.setState({
        visible: true,
        title: Language.errorTitle,
        message: Language.enterPassword,
      });
    else if (this.state.password != this.state.confirmPassword)
      this.setState({
        visible: true,
        title: Language.errorTitle,
        message: Language.passwordDidNotMatch,
      });
    else {
      this.props.signIn(
        {
          name: this.state.name,
          email: this.state.email,
          phone: this.state.phone,
          username: this.state.username,
          password: this.state.password,
          c_password: this.state.confirmPassword
        },
        'register',
        this.setLoading,
        this.showMessage,
      )
    }
  };

  render() {
    return (
      <Wrapper style={{ backgroundColor: colors.background }}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          enableOnAndroid={true}
          extraScrollHeight={20}
        >
          <View
            style={{ flex: 1, marginBottom: 60, minHeight: '100%', paddingHorizontal: '10%' }}
          >

            <Image source={logo}
              style={{
                resizeMode: 'contain',
                width: '60%',
                height: 200,
                alignSelf: 'center',
                margin: 30
              }}
            />


            <Alert
              visible={this.state.visible}
              title={this.state.title}
              message={this.state.message}
              onClose={() => this.setState({ visible: false })}
            />
            <LargeHeading text={Language.signUp} style={{ textTransform: 'uppercase' }} />

            <InputBox
              placeholder={Language.userName}
              onChange={(val) => this.setState({ username: val })}
            />

            <InputBox
              placeholder='Full Name'
              onChange={(val) => this.setState({ name: val })}
            />

            <InputBox
              placeholder={Language.email}
              onChange={(val) => this.setState({ email: val })}
              keyboardType="email-address"
            />

            <InputBox
              placeholder='Phone Number'
              onChange={(val) => this.setState({ phone: val })}
              keyboardType="numeric"
            />

            <InputBox
              placeholder={Language.password}
              type="password"
              onChange={(val) => this.setState({ password: val })}
            />
            <InputBox
              placeholder={Language.confirmPassword}
              type="password"
              onChange={(val) => this.setState({ confirmPassword: val })}
            />

            <GradientButton
              text={Language.signUp}
              style={{ alignSelf: "center", marginTop: 20, marginBottom: this.state.shown ? 60 : 10 }}
              onPress={() => this.validateInput()}
              disabled={this.state.loading}
              loading={this.state.loading}
            />
          </View>

        </KeyboardAwareScrollView>
        <SafeAreaInsetsContext.Consumer>
          {(insets) => <BoldText text={Language.alreadyHaveAccount} boldText={Language.signIn}
            onPress={() => this.props.navigation.navigate('signIn')}
            style={{
              backgroundColor: colors.lightBackground,
              padding: 15,
              position: 'absolute',
              bottom: insets.bottom,
            }} />}
        </SafeAreaInsetsContext.Consumer>


      </Wrapper>
    );
  }
}

export default connect(null, { signIn })(SignUp);