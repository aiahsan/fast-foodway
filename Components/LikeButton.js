import React, { Component } from "react";
import { Text, View, ScrollView, TouchableWithoutFeedback } from "react-native";
import LottieView from "lottie-react-native";
import Icon from "react-native-vector-icons/Foundation";
import { addToWishlist, removeFromWishlist } from "../Redux Store/actions/restaurant";
import { connect } from "react-redux";
import Toast from "react-native-root-toast";
import { colors } from '../assets/styletile'


class LikeButton extends Component {
  state = {
    flag: this.props.isFav,
    loading: false,
  };

  showMessage = (msg) => {
    Toast.show(msg, {
      backgroundColor: 'white',
      textColor: colors.textPrimary,
      opacity: 0.9,
      position: -60,
      shadowColor: colors.lightBackground
    });
  };

  addToWishlist = () => {
    this.props.addToWishlist({
      restaurant: this.props.id,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          this.showMessage(res.message);
        }
        else {
          this.showMessage(res.message);
        }
      })
      .catch((err) => this.showMessage("Network request failed"));
  };



  removeFromWishlist = () => {
    this.props.removeFromWishlist({
      restaurant: this.props.id,
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          this.showMessage(res.message);
        }
        else {
          this.showMessage(res.message);
        }
      })
      .catch((err) => this.showMessage("Network request failed"));
  }



  showAnimation = () => {
    this.setState({ flag: !this.state.flag }, () => {
      if (this.state.flag) {
        this.animation.play(1, 60);
        this.addToWishlist();
      } else {
        this.removeFromWishlist()
      }
    });
  };

  render() {
    const { flag } = this.state;
    return (
      <TouchableWithoutFeedback onPress={this.showAnimation}>
        <View>
          {flag ?
            <LottieView
              ref={(animation) => {
                this.animation = animation;
              }}
              source={require("../assets/animations/like.json")}
              loop={false}
              style={{ width: 70, zIndex: 1 }}
              speed={1.2}
              progress={flag ? 1 : 0}
            />
            :
            <View
              style={{
                marginRight:25, 
                marginTop:23                
              }}
            >
              <Icon
                name="heart"
                color="white"
                size={25}
                style={{ zIndex: 5 }}
              />
            </View>
          }
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default connect(null, { addToWishlist, removeFromWishlist })(LikeButton);
