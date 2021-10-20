import React, { Component } from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { colors, fonts } from "../../../assets/styletile";
import Icon from "react-native-vector-icons/Ionicons";
import InputBox from "../../../Components/InputBox";
import GradientButton from '../../../Components/Button/GradientButton'
import Language from '../../../Localization/Language'
import Header from "../../../Components/Header";
import Alert from '../../../Components/Alert';
import { changePassword } from '../../../Redux Store/actions/user';
import { connect } from 'react-redux'
import Wrapper from "../../../Components/Wrapper";

class ChangePassword extends Component {
  state = {
    password: '',
    newPassword: '',
    cNewPassword: '',
    visible: false,
    loading: false,
  };

  showMessage = (msg, title) => {
    this.setState({
      loading: false,
      visible: true,
      title: title ? title : Language.errorTitle,
      message: msg
    })
  }


  changePassword = () => {
    this.setState({ loading: true })
    this.props.changePassword({
      old_password: this.state.password,
      new_password: this.state.newPassword,
      c_new_password: this.state.cNewPassword
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success){
          this.setState({password:'',newPassword:'',cNewPassword:'',})
          this.showMessage("Password changed successfully", 'Request successful')
        }          
        else
          this.showMessage(res.message)
      })
      .catch((err) => this.showMessage('Network failure occurred'))

  }

  validateInput = () => {
    if (this.state.password == '')
      this.showMessage(Language.enterCurrentPassword)
    else if (this.state.newPassword == '')
      this.showMessage(Language.enterNewPassword)
    else if (this.state.newPassword !== this.state.cNewPassword)
      this.showMessage(Language.passwordDidNotMatch)
    else {
      this.changePassword()
    }
  }



  render() {

    return (
      <Wrapper>
        <Header
          title={Language.changePassword}
          right='close'
          rightNavigation={() => this.props.navigation.navigate('tabBar',{screen:'Account'})}
          left='arrow-left'
          leftNavigation={() => this.props.navigation.pop()} />
        <ScrollView
          keyboardShouldPersistTaps='handled'
          style={{ flex: 1, margin: '3%',
          padding: '4%', backgroundColor: colors.background }}>
          <Alert
            visible={this.state.visible}
            title={this.state.title}
            message={this.state.message}
            onClose={() => this.setState({ visible: false })}
          />

          <InputBox
            label={Language.currentPassword}
            style={{ marginBottom: 20 }}
            type='password'
            onChange={(val) => this.setState({ password: val })}
            value={this.state.password}
          />
          <InputBox
            label={Language.newPassword}
            style={{ marginBottom: 20 }}
            type='password'
            onChange={(val) => this.setState({ newPassword: val })}
            value={this.state.newPassword}
          />
          <InputBox
            label={Language.confirmPassword}
            style={{ marginBottom: 20 }}
            type='password'
            onChange={(val) => this.setState({ cNewPassword: val })}
            value={this.state.cNewPassword}
          />

          <GradientButton
            onPress={() => this.props.navigation.navigate('profile')}
            disabled={this.state.loading}
            loading={this.state.loading}
            onPress={() => this.validateInput()}
            text={Language.done} style={{ marginTop: '3%', alignSelf: 'center' }} />
        </ScrollView>
      </Wrapper>
    );
  }
}

const styles = StyleSheet.create({
  editIcon: {
    fontSize: 38,
    position: "absolute",
    left: 15,
    top: 15,
    color: "white",
  },
});


export default connect(null, { changePassword })(ChangePassword);
