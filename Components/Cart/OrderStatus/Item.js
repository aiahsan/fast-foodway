import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { size, colors, headingstyle, fonts } from "../../../assets/styletile";


const Item = (props) => {
    const { state } = props;
    const stateColor =
      state === "inactive"
        ? "rgb(203,202,208)"
        : state === "active"
        ? colors.primary
        : "rgb(30,30,30)";

    return (
      <View
        style={{
          width: "100%",
          height: 70,
          marginLeft: 20,
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              borderLeftWidth: 4,
              height: "100%",
              alignSelf: "center",
              borderColor:
                state === "inactive" ? "rgb(203,202,208)" : "rgb(30,30,30)",
            }}
          ></View>

          <View
            style={{
              backgroundColor: stateColor,
              height: 22,
              width: 22,
              borderRadius: 50,
              position: "absolute",
              bottom: 0,
              alignSelf: "center",
            }}
          ></View>
        </View>
        <View style={{ flex: 5, justifyContent: "flex-end" }}>
          <Text
            style={{
              fontSize: 18,
              color: stateColor,

              fontFamily: fonts.secondaryBold,
            }}
          >
            {props.title}
          </Text>
        </View>
      </View>
    );
  };

export default Item
