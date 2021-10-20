import React from "react";
import { fonts, colors } from "../../../assets/styletile";
import { View, Text, Image } from "react-native";

const Item = (props) => {
  const { state } = props;
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* =============== dandi =========== */}
      <View
        style={{
          borderTopWidth: 2,
          width: props.index == 1 || props.index == 5 ? "50%" : "100%",
          position: "absolute",
          left: props.index == 1 ? "50%" : 0,
          right: props.index == 5 ? "50%" : 0,
        }}
      ></View>
      {/* =============== dandi =========== */}

      <View
        style={{
          width: 40,
          height: 40,
          borderColor:
            state === "active" ? "red" : state === "done" ? "black" : "grey",
          borderRadius: 50,
          borderWidth: 2,

          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          style={{
            width: 38,
            height: 38,
            overflow: "hidden",
            borderRadius: 50,
          }}
          source={{
            uri: props.image,
          }}
        ></Image>
      </View>
      <Text
        style={{
          top: 40,
          alignSelf: "center",
          textAlign: "center",
          fontSize:12,
          color:
            state === "done"
              ? "black"
              : state === "active"
              ? colors.primary
              : colors.disabled,
        }}
      >
        {props.title}
      </Text>
    </View>
  );
};

export default function HorizontalStatusCard() {
  return (
    <>
      <Text
        style={{
          textAlign: "center",
          fontSize: 18,
          paddingLeft: "3%",

          fontFamily: fonts.secondaryBold,
          color: colors.primary,
          textShadowColor: colors.disabled,
          textShadowOffset: { width: 1.2, height: 1.2 },
          textShadowRadius: 1,
          shadowOpacity: 0.2,
        }}
      >
        Rider is Picking Your Order
      </Text>
      <View style={{ height: 80, flexDirection: "row" }}>
        <Item
          image="https://cdn1.iconfinder.com/data/icons/file-and-folder-10/65/76-512.png"
          index={1}
          state={"done"}
          title="Confirmed"
        ></Item>
        <Item
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTBgKWL1p-QAiUA2m9w-fMbSaS_Ii2f7gp_qH8fOi_yqmplPLOJ&usqp=CAU"
          index={2}
          state={"done"}
          title="Preparing"
        ></Item>
        <Item
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRo-FDrjtqVZ4sNmSSESQco6AND_6E6_-WACZBWhR9ejyys3g1O&usqp=CAU"
          index={3}
          state={"done"}
          title="Order ready"
          icon={{}}
        ></Item>
        <Item
          image="data:image/jpeg;base64,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"
          index={4}
          state={"active"}
          title="Rider is picking"
        ></Item>
        <Item
          image="https://i7.pngguru.com/preview/646/430/406/check-mark-computer-icons-clip-art-green-tick.jpg"
          index={5}
          state={"inactive"}
          title="Completed"
        ></Item>
      </View>
    </>
  );
}
