import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import image from "../../assets/images/food1.jpg";
import image2 from "../../assets/images/food2.jpg";
import image3 from "../../assets/images/food3.jpg";
import Icon from "react-native-vector-icons/AntDesign";
import { colors, fonts } from "../../assets/styletile";
import LikeButton from "../LikeButton";
import { FlatList } from "react-native";
import * as Animatable from "react-native-animatable";
import Language from '../../Localization/Language';

class RestaurantCard extends Component {
  renderItem = (item) => {
    const { width } = Dimensions.get("window");

    return (
      <Animatable.View>
        <TouchableWithoutFeedback
          onPress={() => this.props.navigation.navigate("menu", { item: item })}
        >
          <View style={styles.container}>
            <View style={styles.likeButton}>
              <LikeButton id={item.id} isFav={item.is_fav}/>
            </View>
            {item.extra ? (
              <View style={styles.promotion}>
                {item.extra.map((val) => (
                  <Text style={styles.promotionText}>{val}</Text>
                ))}
              </View>
            ) : (
              <View></View>
            )}
            <Image
              source={{
                uri:
                  item.images
                    ? item.images
                    : "https://www.fsrmagazine.com/sites/default/files/styles/story_image_720x430/public/feature-images/restaurant-profitability-and-failure-rates-what-you-need-know-1554383028.jpg?itok=YlCem74r",
              }}
              style={styles.image}
            />
            <View
              style={{
                padding: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <View style={{ justifyContent: "space-between",flex:1 }}>
                <Text style={styles.heading}>{item.display_name}</Text>
                <Text style={styles.desc} numberOfLines={3} ellipsizeMode='tail'>{item.info}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 5,
                  }}
                >
                  <Icon name="star" style={styles.ratingIcon} />
                  <Text style={styles.rating}>{item.avg_rating ? item.avg_rating.toFixed(1):0}</Text>
                  <Text style={styles.reviews}>
                    ({item.total_reviews} {Language.reviews})
                  </Text>
                </View>
              </View>
              <View style={{ position: "absolute", right: 10, top: 10 }}>
                <Text style={styles.time}>45 min</Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Animatable.View>
    );
  };

  render() {
    const item = this.props.item;
    console.log("datat",this.props.data)
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        key={Math.random().toString()}
        data={this.props.data}
        style={{ flex: 1, marginHorizontal: 10 }}
        renderItem={({ item }) => this.renderItem(item)}
        keyExtractor={(item) => Math.random().toString()}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderColor: colors.border,
    backgroundColor: "white",
    shadowColor: colors.border,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.41, elevation: 1,
    borderRadius: 10,
    marginBottom: 20,
  },
  likeButton: {
    position: "absolute",
    zIndex: 2,
    right: -10,
    top: -10,
    shadowColor: colors.border,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41, elevation: 5,
  },
  promotion: {
    position: "absolute",
    zIndex: 2,
    top: 20,
    overflow: "hidden",
  },
  promotionText: {
    backgroundColor: colors.third,
    color: "white",
    textTransform: "uppercase",
    fontSize: 12,
    fontFamily: fonts.primary,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  image: {
    width: "100%",
    height: 160,
    resizeMode: "cover",
  },
  heading: {
    fontSize: 18,
    fontFamily: fonts.heading,
    color: colors.textPrimary,
    width:'80%',
    maxWidth:280,
  },
  desc: {
    fontSize: 13,
    fontFamily: fonts.primary,
  },
  ratingIcon: {
    fontSize: 16,
    color: colors.primary,
    marginRight: 8,
  },
  rating: {
    color: colors.textPrimary,
    fontSize: 16,
    marginRight: 5,
    fontFamily: fonts.primaryBold,
  },
  reviews: {
    fontFamily: fonts.secondary,
  },
  time: {
    marginTop: 2,
    backgroundColor: colors.secondary,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 20,
    fontSize: 12,
    color: "white",
    fontFamily: fonts.secondary,
  },
});

export default RestaurantCard;
