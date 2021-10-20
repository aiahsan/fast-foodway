import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { fonts, size, colors } from "../../assets/styletile";
import StarRating from "../StarRating";

const ReviewItem = ({ item }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        padding: 15,
        marginBottom: 15,
        backgroundColor: colors.background,
        shadowColor: colors.border,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41, elevation: 1
      }}
    >
      <StarRating style={styles.rating} color={colors.primary} size={20} rating={item.rating} readonly={true} />
      <View style={{ flexDirection: "column", alignSelf: 'flex-end' }}>
        <Text style={styles.name}>{item.cus}</Text>
        <Text style={styles.date}>{item.date_created.split(' ')[0]}</Text>
        <Text numberOfLines={4} style={styles.review}>
          {item.comment}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: size.content,
    paddingBottom: 5,
    fontFamily: fonts.primaryBold,
    color: colors.textPrimary

  },
  date: {
    fontSize: size.paragraph,
    paddingBottom: 5,
    fontFamily: fonts.secondaryBold,
    color: colors.textSecondary

  },
  review: {
    textAlign: 'left',
    fontSize: size.paragraph,
    fontFamily: fonts.primary
  },
  rating: {
    position: "absolute",
    right: 15,
    top: 15
  },
});

export default ReviewItem;
