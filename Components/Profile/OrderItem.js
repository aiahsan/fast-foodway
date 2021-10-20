import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TouchableWithoutFeedback } from "react-native";
import img from "../../assets/images/food3.jpg";
import { colors, fonts, size } from "../../assets/styletile";
import Language from '../../Localization/Language'

export default class OrderItem extends Component {
  render() {
    const { restaurant, shipping, order, statuses, currency_code, curr_status } = this.props.data;
    var itemsArray;
    order.items.map((item, index) => {
      if (index == 0) {
        itemsArray = item.title;
      }
      else {
        itemsArray = itemsArray + ', ' + item.title;
      }
    })

    const date = statuses[statuses.length - 1]?statuses[statuses.length - 1].date:"";

    return (
      <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('orderDetails', { data: this.props.data })}>
        <View style={styles.container}>
          <View style={styles.upperView}>
            <View style={{flexDirection: 'row',flex:1}}>
            <Image source={{ uri: restaurant.image }} style={styles.image} />
            <View style={styles.nameAndAddress}>
              <Text style={styles.name}>{restaurant.display_name}</Text>
              <Text style={styles.address}>
                {shipping.address}
              </Text>
            </View>
            </View>
            <View style={styles.timeAndDate}>
              <Text style={styles.date}>{date.split(" ")[0]}</Text>
              <Text style={styles.time}>{date.split(" ")[1]}{" "}{date.split(" ")[2]}</Text>
            </View>
          </View>

          <View style={styles.lowerView}>
            <View style={styles.itemsAndTotal}>
              <View style={styles.itemsView}>
    <Text style={styles.itemHeading}>{Language.items}</Text>
                <Text numberOfLines={2} ellipsizeMode='tail' style={styles.allItems}>{itemsArray}</Text>
              </View>

              <View style={styles.itemsView}>
                <Text style={styles.totalHeading}>{Language.total} </Text>
                <Text style={styles.totalAmount}>{currency_code} {order.amount}</Text>
              </View>
            </View>

            <Text style={styles.status}>{curr_status}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: 15,
    marginBottom: 10,
    shadowColor: colors.border,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41, elevation: 1,
  },
  upperView: {
    flexDirection: "row",
    justifyContent:"space-between" ,
  },
  lowerView: {
    flexDirection: "row",
    maxWidth: "96%",
    marginHorizontal: "2%",
    justifyContent:'space-between',
    paddingTop: "4%",
    flex:1
  },
  nameAndAddress: {
    flexDirection: "column",
    maxWidth: "50%",
  },
  timeAndDate: {
    flexDirection: "column",
  },
  image: {
    height:70,
    width:70,
    borderRadius: 5,
    marginRight:15
  },
  time: {
    alignSelf: "flex-end",
    fontSize: size.paragraph,
  },
  date: {
    alignSelf: "flex-end",
    fontSize: size.paragraph,
  },
  name: {
    fontSize: size.heading,
    color: colors.textPrimary,
    fontFamily: fonts.primaryBold
  },
  address: {
    fontSize: size.paragraph,
    fontFamily: fonts.primary,
    color: colors.textSecondary,
    marginTop: 5
  },
  itemsAndTotal: {
    flexDirection: "column",
    flex:1
  },
  itemsView: {
    flexDirection: "row",
    flex:1, 
  },
  status: {
    borderWidth: 1,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
    borderColor: colors.primary,
    color: colors.primary,
    fontSize: 14,
    fontFamily: fonts.secondary,
    textTransform: 'capitalize',
  },
  totalHeading: {
    fontFamily: fonts.primaryBold,
    color: colors.textPrimary
  },
  itemHeading: {
    fontFamily: fonts.primaryBold,
    color: colors.textPrimary,
    marginRight: 5
  },
  allItems: {
    fontFamily: fonts.primary,
    color: colors.textPrimary,
    flex:1,
    marginBottom:5,
    marginRight:5
  },
  totalAmount: {
    fontFamily: fonts.primary,
    color: colors.textPrimary
  }
});
