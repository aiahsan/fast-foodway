import React from "react";
import { View, Text, Image ,Dimensions} from "react-native";
import { headingstyle, size, colors, fonts } from "../assets/styletile";
import LargeHeading from './Heading/LargeHeading'
import GradientButton from "./Button/GradientButton";

const NotFound = (props) => {
  const width=Dimensions.get("window").width;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        ...props.style
      }}
    >
      <Image source={props.image} style={{ 
        height:0.6*width,
        width:0.8*width,
        resizeMode:'contain',
        alignSelf:'center',...props.imageStyle}}></Image>
      <LargeHeading text={props.title} style={{fontSize:26, ...props.headingStyle,marginTop:20}}/>
      <Text
        style={{
          fontSize: size.content,
          paddingHorizontal: '10%',
          textAlign: "center",
          paddingVertical: "5%",
          fontFamily:fonts.primary,
          lineHeight:20,
          ...props.textStyle
        }}
      >
   {props.subtitle}  
      </Text>
      {props.buttonText
      ?
      <GradientButton 
      text={props.buttonText}
      onPress={props.onPress}
      style={{width:'80%',alignSelf:'center'}}
      />
      :
      <View></View>}
    </View>
  );
};

export default NotFound;
