import React from 'react'
import { View } from "react-native";
import Item from "./Item"

const StatusCard = () => {
    return (
      <View style={{ backgroundColor: "rgb(249,249,249)" ,paddingBottom:'6%' }}>
        <Item state={"done"} title="Order Confirmed"></Item>
        <Item state={"done"} title="Preparing Your Food"></Item>
        <Item state={"active"} title="Order is ready at the restaurant"></Item>
        <Item state={"inactive"} title="Rider is picking up your order"></Item>
        <Item state={"inactive"} title="Rider is nearby your place"></Item>
      </View>
    );
  };
  

export default StatusCard
