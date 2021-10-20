import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import MenuIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors, fonts, size } from "../../assets/styletile";
import { removeFromWishlist,getWishlist } from "../../Redux Store/actions/restaurant";
import { connect } from "react-redux";
import { ModalLoader } from "../Loader";
import Language from '../../Localization/Language';
import Navigator from '../../Navigator'

class RestaurantItem extends Component {
  state = {
    loading: false,
  };

  removeFromWishlist = () => {
    this.setState({loading: true})
    this.props.removeFromWishlist({
        restaurant: this.props.item.id,
      })
      .then((res) => res.json())
      .then(res => {
        if (res.success) {
          this.props.getWishlist(()=>this.setState({loading: false}))
        }
      })
      .catch((err) => this.setState({ loading: false }));
  };

  render() {
    console.log(this.props)
    const item = this.props.item;
    return (
      <View>
  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    shadowColor: colors.border,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41, elevation: 1,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: "row",
    padding: 10,
  },

  image: {
    width: "25%",
    height: 80,
    resizeMode: "cover",
    borderRadius: 15,
    marginRight: 15,
  },
  overview: {
    width: "60%",
  },
  heading: {
    fontSize: 15,
    fontFamily: fonts.heading,
    color: colors.textPrimary,
  },
  desc: {
    fontSize: size.paragraph,
    fontFamily: fonts.primary,
    color: colors.textSecondary,
    paddingTop: 3,
  },
  ratingIcon: {
    fontSize: 16,
    color: colors.primary,
    marginRight: 5,
  },
  menuIcon: {
    fontSize: 24,
    color: colors.primary,
  },
  rating: {
    color: colors.primary,
    fontSize: 14,
    marginRight: 8,
    fontFamily: fonts.secondaryBold,
  },
  reviews: {
    fontFamily: fonts.secondary,
    fontSize: size.paragraph,
  },
  iconView: {
    position: "absolute",
    right: 10,
    top: 5,
  },
});

export default connect(null, { removeFromWishlist,getWishlist })(RestaurantItem);
