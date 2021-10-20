import React, { Component } from "react";
import { View, Text, SafeAreaView } from "react-native";
import Header from "../../../Components/Header";
import RestaurantCard from "../../../Components/Restaurant/RestaurantCard";
import image from "../../../assets/icons/restaurant.png";
import { connect } from "react-redux";
import { getRestaurantByTag } from "../../../Redux Store/actions/restaurant";
import NotFound from "../../../Components/NotFound";
import {RestaurantLoader} from "../../../Components/Loader"
import Language from "../../../Localization/Language";
import Wrapper from "../../../Components/Wrapper";




class Categories extends Component {
  state = {
    title: this.props.route.params.title,
    loading: false,
    data: [],
  };

  componentDidMount = () => {
    this.setState({ loading: true });
    let id = this.props.route.params.id;
    const {latitude,longitude}=this.props.userLocation;
    this.props
      .getRestaurantByTag({ tag: id })
      .then(async (response) => {
        var response = await response.json();
        if (response.success) {
          this.setState({ loading: false, data: response.response });
          console.log("data",data)

        } else {
          this.setState({
            loading: false,
          });
        }
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
      });
  };

  renderLoader=()=>{
    if (this.state.loading) {
      return <RestaurantLoader/>
    }
    //agar loading false hai or data array empty hai tw notfound dikhao
    if (!this.state.loading && this.state.data.length === 0) {
      return (
        <NotFound
          title={Language.noRestaurantFound}
          subtitle={Language.currentlyRestaurantsFromThisCategoryAreUnavailable}
          image={image}
        ></NotFound>
      );
    } else {
      return (
        <View style={{ flex: 1,marginTop:20}}>
          <RestaurantCard
        navigation={this.props.navigation}
        data={this.state.data}
      />
        </View>
      );
  }
}



  render() {
    return (
      <Wrapper>
        <Header
          title={this.state.title}
          left="arrow-left"
          leftNavigation={() => this.props.navigation.pop()}
        />
          {this.renderLoader()}    
      </Wrapper>
    );
    }
  }

const mapStateToProps=(state)=>{
  const {userLocation} = state;
  return {userLocation}
}


export default connect(mapStateToProps, { getRestaurantByTag })(Categories);
