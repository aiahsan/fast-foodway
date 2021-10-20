import React, { Component } from "react";
import { Text, View, ScrollView, FlatList, TouchableOpacity, TouchableWithoutFeedback, SafeAreaView } from "react-native";
import Header from "../../../Components/Header";
import AddressItem from "../../../Components/Profile/AddressItem";
import { colors, fonts } from "../../../assets/styletile";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import image from '../../../assets/images/home.png'
import NotFound from "../../../Components/NotFound";
import Language from '../../../Localization/Language'
import { connect } from 'react-redux';
import { getAddresses } from '../../../Redux Store/actions/user'
import {AddressLoader} from "../../../Components/Loader";
import Wrapper from "../../../Components/Wrapper";


class Addresses extends Component {
  state = {
    addresses: this.props.userAddresses,
    loading: true,
  };

  async componentDidMount() {
    this.props.getAddresses(() => this.setState({ loading: false }));
  }




  renderCurrentAddress = () => {
    if(!this.props.userLocation.id)
    return <AddressItem
      selectable={this.props.route.params.selectable}
      data={this.props.userLocation}
      navigation={this.props.navigation}
      current={true}
    />
    else return <View></View>
  }


  showAddresses = () => {
    return (
        <View style={{flex:1}}>
          <FlatList
          ListHeaderComponent={this.renderCurrentAddress}
          showsVerticalScrollIndicator={false}
          key={Math.random().toString()}
          data={this.props.userAddresses}
          style={{ flex: 1, }}
          keyExtractor={(item) => item.id}
          horizontal={false}
          renderItem={({ item }) => (
            <AddressItem
              selectable={this.props.route.params.selectable}
              data={item}
              navigation={this.props.navigation}
              selectedId={this.props.userLocation.id}
            />
          )}
        />
        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('map', { edit: false, home: false })}>
          <View style={{
            backgroundColor: colors.primary,
            width: 50,
            height: 50,
            borderRadius: 50,
            position: 'absolute',
            bottom: 10,
            right: 10,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: colors.border,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41, elevation: 3
          }}>
            <Icon name='plus' color='white' style={{
              zIndex: 2,
              fontSize: 35
            }} />
          </View>

        </TouchableWithoutFeedback>
        </View>

    );
  };

  showNoAddress = () => {
    return (
      <NotFound
        title={Language.noAddressFound}
        image={image}
        buttonText={Language.addNewAddress}
        onPress={() => this.props.navigation.navigate('map', { edit: false })}
      />
    );
  };


  renderItem = () => {
    if (this.props.userAddresses.length !== 0)
      return this.showAddresses()
    else {
      if (this.state.loading)
        return <AddressLoader />
      else return this.showNoAddress()
    }
  }


  render() {
    return (
        <Wrapper>
           <Header
          title={Language.myAddresses}
          left="arrow-left"
          leftNavigation={() => this.props.navigation.pop()}
        />
        {this.renderItem()}
        </Wrapper>
       );
  }
}

const mapStateToProps = state => {
  const { userAddresses, userLocation } = state;
  return { userAddresses, userLocation };
};


export default connect(mapStateToProps, { getAddresses })(Addresses);
