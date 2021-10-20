import React, { Component } from "react";
import { Text, View, ScrollView, SafeAreaView } from "react-native";
import Header from "../../../Components/Header";
import RestaurantItem from "../../../Components/Restaurant/RestaurantItem";
import image from "../../../assets/images/wishlist.png";
import { FlatList } from "react-native-gesture-handler";
import { getWishlist } from "../../../Redux Store/actions/restaurant";
import { connect } from "react-redux";
import Toast from 'react-native-root-toast';
import { WishlistLoader } from "../../../Components/Loader";
import NotFound from "../../../Components/NotFound";
import Language from "../../../Localization/Language";
import Wrapper from "../../../Components/Wrapper";


class WishList extends Component {
  state = {
    loading: false,
    data: [],
  };


  componentDidMount = () => {
    this.setState({ loading: true})
    this.props.getWishlist(()=>this.setState({loading: false}));
  }


  renderLoader=()=>{
    if(this.state.loading)
    return <WishlistLoader/>
    else{
      if(this.props.wishlist.length!==0)
      return  <FlatList
      showsVerticalScrollIndicator={false}
      data={this.props.wishlist}
      style={{ flex: 1, padding: "2%" }}
      keyExtractor={(item) => item.id}
      horizontal={false}
      renderItem={({ item }) => <RestaurantItem item={item} />}
    />
    else return <NotFound
    image={image}
    title="Your wishlist is empty"
  />
    }
  }


  render() {
    return (
      <Wrapper>
        <Header
          title={Language.myFavourites}
          left="arrow-left"
          leftNavigation={() => this.props.navigation.pop()}
        />
        {this.renderLoader()}
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  const { wishlist} = state;
  return { wishlist};
};


export default connect(mapStateToProps, { getWishlist })(WishList);
