import React, { Component } from "react";
import { View, Text, Image, ScrollView, SafeAreaView } from "react-native";
import Item from "../../../Components/Menu/Item";
import { size, colors, headingstyle } from "../../../assets/styletile";
import SmallHeading from "../../../Components/Heading/SmallHeading";



class Menu extends Component {
  state = {
    items: [],
    loading: false,
  };

  mapItem = () => {
    return this.props.category.menus.map((item) =>   {
      console.log(item,"item")

      return <Item
      id={item.id}
      title={item.title}
      description={item.short_desc}
      price={item.price}
      image={item.images}
      currency={item.currency}
      discount={item.price-item.discounted_price}
      hasDiscount={item.discounted_price === item.price ? false : true}
      discountedPrice={item.discounted_price}
      restaurant={this.props.restaurant}
      flag={this.props.flag}
      cart={this.props.cart}
      setFlag={this.props.setFlag}
    ></Item>
    }
    );
  };

  render() {
    return (
        <ScrollView
          onScroll={this.props.onScroll}
          style={{ backgroundColor: colors.lightBackground, flex: 1 }}
        >
          <SmallHeading
            text={this.props.category.name}
            style={{ textAlign: "left", padding: 10 }}
          />
          {this.mapItem()}
        </ScrollView>
    );
  }
}

export default Menu;
