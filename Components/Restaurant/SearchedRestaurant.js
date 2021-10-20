import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import image from "../../assets/images/food1.jpg";
import { colors, fonts, size } from "../../assets/styletile";
import Icon from "react-native-vector-icons/AntDesign";
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class SearchedRestaurant extends Component {
  render() {

    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate("menu", { item: this.props.data })} activeOpacity={0.9}>
        <View style={styles.container}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{ uri: this.props.imageUrl }} style={styles.image}></Image>
            <Text style={styles.name}>{this.props.name}</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="star" style={styles.ratingIcon} />
            <Text style={styles.rating}>{this.props.rating ? this.props.rating.toFixed(1):0}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginBottom: 5,
    padding: 10,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 30,
    marginRight: 10
  },
  name: {
    fontSize: size.heading,
    fontFamily: fonts.secondaryBold,
    paddingHorizontal: 7,
    color: colors.textPrimary
  },
  ratingIcon: {
    fontSize: 16,
    color: colors.primary,
    marginRight: 5,
  },
  rating: {
    color: colors.primary,
    fontSize: 14,
    marginRight: 8,
    fontFamily: fonts.secondaryBold
  },
})  
