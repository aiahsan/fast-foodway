import React from 'react'
import { View } from "react-native";
import Item from "./Item"
import Language from '../../../Localization/Language'





const StatusCard = (props) => {
  const list =[
    {
      id:0,
      text:Language.orderConfirmed
    },
    {
      id:1,
      text:Language.riderIsPicking
    },
    {
      id:2,
      text:Language.riderIsNearby
    },
  ]
  const length=props.status.length;
  const status=props.status[length-1].status_code;
    return (
      <View style={{ backgroundColor: "rgb(249,249,249)" ,paddingBottom:'6%' }}>
        {list.map(item=>{
          return <Item state={item.id==status?'active':item.id<status?'done':'inactive'} title={item.text}/>
        })}
      </View>
    );
  };
  

export default StatusCard
