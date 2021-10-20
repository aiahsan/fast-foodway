import React, { Component } from "react";
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";
import InputBox from "../../../Components/InputBox";
import GradientButton from "../../../Components/Button/GradientButton";
import Language from "../../../Localization/Language";
import Header from "../../../Components/Header";
import { colors, size, fonts } from "../../../assets/styletile";
import LocationIcon from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { addAddress, getAddresses, editAddress,setLocation } from '../../../Redux Store/actions/user';
import { connect } from 'react-redux'
import Alert from "../../../Components/Alert";
import Wrapper from "../../../Components/Wrapper";

const icons = [
  {
    id: 1,
    name: Language.home,
    icon: "home-outline",
  },
  {
    id: 2,
    name: Language.work,
    icon: "briefcase-outline",
  },
  {
    id: 3,
    name: Language.other,
    icon: "map-marker-outline",
  },
];


class AddAddress extends Component {

  constructor(props) {
    super(props);

    const data = this.props.route.params.data;
    const edit = this.props.route.params.edit;
    const map = this.props.route.params.map;   

    this.state = {
      addressId: data.id ? data.id : '',
      address: data.address?data.address : '',
      location: data.address ? data.address.split(',')[0] : '',
      instructions: data.instructions ? data.instructions : '',
      latitude: data.latitude ? data.latitude : '',
      longitude: data.longitude ? data.longitude : '',
      city: data.city ? data.city : '',
      state: data.state ? data.state : '',
      country: data.country ? data.country : '',
      type: data.type ? data.type : icons[0].name,
      visible: false,
      loading: false,
      onClose: () => this.setState({ visible: false }),
      edit: edit,
    };

  }


  UNSAFE_componentWillReceiveProps(props) {
    const data = props.route.params.data;
    const edit = props.route.params.edit;
    const map = props.route.params.map;

    this.setState({
      address: data.address?data.address : '',
      location: data.address ? data.address.split(',')[0] : '',
      latitude: data.latitude ? data.latitude : '',
      longitude: data.longitude ? data.longitude : '',
      city: data.city ? data.city : '',
      state: data.state ? data.state : '',
      country: data.country ? data.country : '',
      edit: edit,
    })

  }


  showMessage = (msg, title) => {
    this.setState({
      loading: false,
      visible: true,
      title: title ? title : Language.errorTitle,
      message: msg
    })
  }

  validateInput = () => {
    if (this.state.address == '')
      this.showMessage(Language.enterAddress)
    else if (this.state.city == '')
      this.showMessage(Language.enterCity)
    else if (this.state.state == '')
      this.showMessage(Language.enterState)
    else if (this.state.country == '')
      this.showMessage(Language.enterCountry)
    else {
      this.state.edit ? this.editAddress() : this.addAddress();

    }
  }

  addAddress = () => {
    const backToHome = this.props.route.params.backToHome;   
    this.setState({ loading: true })
    this.props.addAddress({
      address: this.state.address,
      city: this.state.city,
      country: this.state.country,
      state: this.state.state,
      instructions: this.state.instructions,
      type: this.state.type,
      latitude: this.state.latitude,
      longitude: this.state.longitude
    })
      .then((res) => res.json())
      .then(async (res) => {
        if (res.success) {
        this.props.setLocation({
            latitude:res.response.latitude,
            longitude:res.response.longitude,
            title:res.response.type,
            type:res.response.type,
            city:res.response.city,
            country:res.response.country,
            state:res.response.state,
            address:res.response.address,
            id:res.response.id
        })
          await this.props.getAddresses(() => {
            this.showMessage(res.message, Language.requestSuccessfull)
            this.setState({ onClose: () => this.setState({ visible: false }, 
              () => this.props.navigation.navigate(backToHome?'Home':'addresses',{selectable:false})) })
          })
        }
        else
          this.showMessage(res.message)
      })
      .catch((err) => this.showMessage('Network request failed'))
  }


  editAddress = () => {
    this.setState({ loading: true })
    this.props.editAddress({
      address_id: this.state.addressId,
      address: this.state.address,
      city: this.state.city,
      country: this.state.country,
      state: this.state.state,
      instructions: this.state.instructions,
      type: this.state.type,
      latitude: this.state.latitude,
      longitude: this.state.longitude
    })
      .then((res) => res.json())
      .then(async (res) => {
        if (res.success) {
          await this.props.getAddresses(() => {
            this.showMessage(res.message, Language.requestSuccessfull)
            this.setState({ onClose: () => this.setState({ visible: false }, 
              () => this.props.navigation.pop()) })
          })
        }
        else
          this.showMessage(res.message)
      })
      .catch((err) => this.showMessage('Network request failed'))
  }


  renderIcon = () => {
    return icons.map((item) => {
      return (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            this.setState({ type: item.name });
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Icon
              name={item.icon}
              style={{
                fontSize: 30,
                color:
                  this.state.type === item.name
                    ? colors.third
                    : colors.textSecondary,
              }}
            />
            <Text
              style={{
                color:
                  this.state.type === item.name
                    ? colors.third
                    : colors.textSecondary,
              }}
            >
              {item.name}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  render() {

    return (
      <Wrapper>
        <Header
          title={this.state.edit ? Language.editAddress : Language.addAddress}
          left="arrow-left"
          leftNavigation={() => this.props.navigation.pop()}
        />
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
          <View
            style={{
              margin: '3%',
              padding: '4%',
              backgroundColor: colors.background,
            }}
          >
            <Alert
              visible={this.state.visible}
              title={this.state.title}
              message={this.state.message}
              onClose={() => this.state.onClose()}
            />
            <TouchableOpacity activeOpacity={0.9}
              onPress={() => this.props.navigation.navigate('map', {
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                edit: this.state.edit,
                home:false
              })}>
              <View
                style={{
                  flexDirection: "column",
                  alignSelf: "center",
                  alignItems: "center",
                  paddingBottom: "8%",
                }}
              >
                <Icon
                  name="map-marker-outline"
                  style={{ fontSize: 36 }}
                  color={colors.primary}
                ></Icon>
                <Text
                  style={{
                    fontSize: size.heading,
                    color: colors.textSecondary,
                    fontFamily: fonts.primaryBold,
                    marginVertical: "2%",
                    textAlign: 'center'
                  }}
                >
                  {this.state.location}
                </Text>
                <Text
                  style={{
                    fontSize: size.content,
                    fontFamily: fonts.secondary,
                    textAlign: 'center'
                  }}
                >
                  {this.state.city}
                </Text>
              </View>
            </TouchableOpacity>

            <InputBox
              onChange={(val) => this.setState({ address: val })}
              value={this.state.address}
              label={Language.address}
              style={{ marginBottom: 20 }}
              placeholder={Language.enterAddress}
            />
            <InputBox
              onChange={(val) => this.setState({ city: val })}
              value={this.state.city}
              label={Language.city}
              style={{ marginBottom: 20 }}
            />
            <InputBox
              onChange={(val) => this.setState({ state: val })}
              value={this.state.state}
              label={Language.state}
              style={{ marginBottom: 20 }}
            />
            <InputBox
              onChange={(val) => this.setState({ country: val })}
              value={this.state.country}
              label={Language.country}
              style={{ marginBottom: 20 }}
            />
            <InputBox
              onChange={(val) => this.setState({ instructions: val })}
              value={this.state.instructions}
              label={Language.deliveryInstructions}
              style={{ marginBottom: 20 }}
              placeholder='Near ABC shop / Behind ABC lawn'
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginVertical: "2%",
              }}
            >
              {this.renderIcon()}
            </View>

            <GradientButton
              loading={this.state.loading}
              text={Language.done}
              onPress={this.validateInput}
              style={{ marginTop: "7%", alignSelf: "center" }}
            ></GradientButton>
          </View>
        </ScrollView>
      </Wrapper>
    );
  }
}

export default connect(null, { addAddress, getAddresses, editAddress,setLocation })(AddAddress);
