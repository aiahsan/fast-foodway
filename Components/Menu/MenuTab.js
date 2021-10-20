import React, { Component } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { colors, fonts } from "../../assets/styletile";
import Menu from "../../Screens/App/Restaurant/Menu";
import { connect } from "react-redux";
import { getCategories } from "../../Redux Store/actions/restaurant";
import { FlatList } from "react-native";
import * as Animatable from "react-native-animatable";
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import {BallIndicator} from 'react-native-indicators';


class MenuTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flag: true,
      restaurant: this.props.restaurant,
      cart: [],
      categories: [],
      loading: false,
      selectedIndex: 1
    };
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (props.cartReducer !== this.props.cartReducer)
      this.setState({ cart: props.cartReducer.items });
  }

  componentDidMount(){
    const {cartReducer}=this.props;
    const {restaurant}=this.state;
    if (cartReducer.restaurant) {
      if (restaurant.id == cartReducer.restaurant.id) {
        this.setState({ flag: true, cart: cartReducer.items });
      } else {
        this.setState({ flag: false });
      }
    }
  }

  renderMenu = () => {
    const item = this.state.categories[this.state.selectedIndex]
    return (
      <GestureRecognizer
        onSwipeLeft={this.swipeLeft}
        onSwipeRight={this.swipeRight}
      >
        <Menu
          category={item}
          restaurant={this.props.restaurant}
          flag={this.state.flag}
          cart={this.state.cart}
          setFlag={(flag) => this.setState({ flag: flag })}
        />
      </GestureRecognizer>
    )
  }


  render() {
    const item = this.props.categories[this.props.selectedIndex]
    if (this.props.loading)
      return <BallIndicator color={colors.primary} size={36} style={{padding:20,marginTop:'45%'}} />
    else {
      if(this.props.categories.length!==0)
      return (
        <GestureRecognizer
        directionalOffsetThreshold={20}
          onSwipeLeft={()=>{
            this.props.swipeLeft()
            this.props.scroll({item})
          }}
          onSwipeRight={()=>{
            this.props.swipeRight()
            this.props.scroll({item})
          }}
        >
          <Menu
            category={item}
            restaurant={this.props.restaurant}
            flag={this.state.flag}
            cart={this.state.cart}
            setFlag={(flag) => this.setState({ flag: flag })}
          />
        </GestureRecognizer>
      )
      else return <View></View>
    }



    // return (
    //   <View style={{ flex: 1 }}>
    //     {this.state.categories.length !== 0 ? (
    //       <Tab.Navigator
    //       backBehavior="initialRoute"
    //         tabBarOptions={{              
    //           labelStyle: { fontSize: 12, fontFamily: fonts.primary },
    //           tabStyle: { width: 'auto' },
    //           scrollEnabled: true,
    //           style: {
    //             shadowColor: colors.border,
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.20,
    // shadowRadius: 1.41, elevation: 1,
    //             marginTop: 200,
    //           },
    //         }}
    //       >
    //         {this.state.categories.map((category) => (
    //           <Tab.Screen name={category.name}>
    //             {() => (
    // <Menu
    //   category={category}
    //   restaurant={this.props.restaurant}
    //   flag={this.state.flag}
    //   cart={this.state.cart}
    //   setFlag={(flag) => this.setState({ flag: flag })}
    // />
    //             )}
    //           </Tab.Screen>
    //         ))}
    //       </Tab.Navigator>
    //     ) : null}
    //   </View>
    // );
  }
}

const mapStateToProps = (state) => {
  const { cartReducer } = state;
  return { cartReducer };
};

export default connect(mapStateToProps, { getCategories })(MenuTab);
