import React, { Component } from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Linking
} from "react-native";
import Header from "../../../Components/Header";
import IconWithText from "../../../Components/Profile/IconWithText";
import LinearGradient from "react-native-linear-gradient";
import { colors, fonts } from "../../../assets/styletile";
import Icon from "react-native-vector-icons/FontAwesome";
import Language from "../../../Localization/Language";
import eng from "../../../assets/images/eng.jpg"
import it from '../../../assets/images/it.jpg'
import { connect } from 'react-redux';
import { logOut } from '../../../Redux Store/actions/user'
import ChangeLanguage from "../../../Components/Profile/ChangeLanguage";
import Wrapper from "../../../Components/Wrapper";

const flags = {
  en: eng,
  it: it
};


class Profile extends Component {

  state = {
    userName: this.props.userReducer.username,
    fullName: this.props.userReducer.name,
    email: 'ab',
    phone: this.props.userReducer.phone,
    languageVisible: false,
    image: flags["en"]
  };

  makeCall = () => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
        phoneNumber = `tel:`;
    } else {
        phoneNumber = `telprompt:`;
    }

    Linking.openURL(phoneNumber);
};



  render() {
    const {userReducer} =this.props;
    return (
      <Wrapper bottom={0}>
        <ScrollView>
        
          <LinearGradient
            style={{ marginBottom: 20 }}
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 1.0, y: 3.0 }}
            locations={[0, 0.5, 0.95, 1.0]}
            colors={[colors.primary, colors.third, colors.secondary, "#ed962d"]}
          >
            <Icon
              onPress={() => {
                this.props.navigation.navigate('editProfile')
              }}
              name="edit"
              style={styles.editIcon}
            ></Icon>

            <View style={{ paddingHorizontal: "5%", paddingVertical: "10%", }}>
              <View style={styles.orangeView}>
                <View style={styles.alphabetView}>
                  <Text style={styles.alphabet}>
                    {this.state.userName.charAt(0)}
                  </Text>
                </View>
                <View style={styles.detailsView}>
                  <Text style={styles.nameHeading}>{this.state.userName}</Text>
                  <Text style={styles.smallText}>{userReducer.name}</Text>
                  <Text style={styles.smallText}>{userReducer.email}</Text>
                  <Text style={styles.smallText}>{userReducer.phone}</Text>
                </View>
              </View>
            </View>
          </LinearGradient>

          <IconWithText
            onPress={() => {this.props.navigation.navigate('addresses',{selectable:false})}}
            iconName="home"
            name={Language.deliveryAddresses}
          />

          <IconWithText
            onPress={() => {this.props.navigation.navigate('orders')}}
            iconName="profile"
            name={Language.myOrders}
          />

          <IconWithText
            onPress={() => {this.props.navigation.navigate('wishlist')}}
            iconName="hearto"
            name={Language.favourites}
          />

          <IconWithText
            onPress={() => this.makeCall()}
            iconName="phone"
            name={Language.callHelpCenter}
          />

         

          <IconWithText
            onPress={() => {this.props.logOut()}}
            iconName="logout"
            name={Language.logout}
          />
        </ScrollView>
      </Wrapper>
    );
  }
}
const styles = StyleSheet.create({
  smallText: {
    color: "white",
    fontSize: 16,
    marginTop: 2,
    fontFamily: fonts.primary,
    paddingVertical: 1,
  },
  alphabet: {
    fontSize: 42,
    padding: 2,
    paddingBottom: 4,
    alignSelf: "center",
    color: "white",
    textTransform: 'uppercase',
    fontFamily: 'RobotoSlab-Regular'
  },

  detailsView: {
    paddingHorizontal: "5%",
    flex:1
  },
  nameHeading: {
    fontFamily: fonts.heading,
    fontSize: 25,
    borderBottomWidth: 1,
    color: 'white',
    borderColor: "#ffffffaa",
    marginBottom: 5,


  },
  alphabetView: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10
  },
  orangeView: {
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: "center",
    paddingHorizontal: 10

  },
  editIcon: {
    fontSize: 28,
    position: "absolute",
    right: 15,
    top: 15,
    color: "white",
    zIndex:10
  },
});

const mapStateToProps = state => {
  const { userReducer, userLanguage } = state;
  return { userReducer, userLanguage };
};



export default connect(mapStateToProps, { logOut })(Profile);
