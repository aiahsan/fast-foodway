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
import SimpleButton from "../../../Components/Button/SimpleButton";
import GradientButton from "../../../Components/Button/GradientButton";
import Language from "../../../Localization/Language";
import Header from "../../../Components/Header";
import { updateProfile } from '../../../Redux Store/actions/user';
import { connect } from 'react-redux'
import Alert from '../../../Components/Alert';
import Wrapper from "../../../Components/Wrapper";

class EditProfile extends Component {
  state = {
    loading: false,
    visible: false,
    fullName: this.props.userReducer.name,
    email: this.props.userReducer.email,
    phone: this.props.userReducer.phone,
    onClose: ()=> {this.setState({visible:false})}
  };

  showMessage = (msg, title) => {
    this.setState({
      loading: false,
      visible: true,
      title: title ? title : Language.errorTitle,
      message: msg
    })
  }

  validateInput = () => {
    if (this.state.fullName == '')
      this.showMessage(Language.enterFullName)
    else if (this.state.phone == '')
      this.showMessage(Language.enterPhone)
    else {
      this.updateProfile()
    }
  }



  updateProfile = () => {
    this.setState({ loading: true })
    this.props.updateProfile({
      name: this.state.fullName,
      phone: this.state.phone
    },this.showMessage,
    ()=>this.setState({onClose:()=>this.setState({visible:false},()=>this.props.navigation.pop())}));
  }

  render() { 
    return (
      <Wrapper>
        <Header
          title={Language.editProfile}
          left="arrow-left"
          leftNavigation={() => this.props.navigation.pop()}
        />
        <ScrollView
          style={{
            flex: 1,
            margin: '3%',
            padding: '4%',
            backgroundColor: colors.background,
          }}
          keyboardShouldPersistTaps='handled'
        >
          <Alert
            visible={this.state.visible}
            title={this.state.title}
            message={this.state.message}
            onClose={this.state.onClose}
          />
          <InputBox
            label={Language.fullName}
            onChange={(val) => this.setState({ fullName: val })}
            value={this.state.fullName}
            style={{ marginBottom: 20 }}
          />
          <InputBox
            label={Language.phone}
            keyboardType='numeric'
            onChange={(val) => this.setState({ phone: val })}
            value={this.state.phone}
          />
          <GradientButton
            text={Language.done}
            loading={this.state.loading}
            // onPress={() => this.props.navigation.navigate("profile")}
            onPress={() => this.validateInput()}
            style={{ width: "100%", marginTop: "3%", alignSelf: "center", marginTop: 30 }}
          />

          <SimpleButton
            text={Language.changePassword}
            onPress={() => this.props.navigation.navigate("changePassword")}
            style={{
              width: "100%",
              marginVertical: 20,
              alignSelf: "center",
            }}
          />

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


const mapStateToProps = state => {
  const { userReducer } = state;
  return { userReducer };
};

export default connect(mapStateToProps, { updateProfile })(EditProfile);
