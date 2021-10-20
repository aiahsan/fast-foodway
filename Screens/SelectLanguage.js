import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  StatusBar,
  SafeAreaView
} from "react-native";
import bgimage from "../assets/backgroundImage/selectLanguage.jpg";
import englandFlag from "../assets/images/eng.jpg";
import italianFlag from "../assets/images/it.jpg";
import { colors, fonts, size, headingstyle } from "../assets/styletile";
import { setLanguage } from '../Redux Store/actions/user';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {useNavigation} from '@react-navigation/native'
const Option = (props) => {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View
        style={props.isactive ? styles.optionActive : styles.optionInactive}
      >
        <Text
          style={[
            {
              fontFamily: fonts.primaryBold,
              letterSpacing: 0.6,
              fontSize: size.paragraph,
              
            },
            props.isactive ? styles.textActive : styles.textInactive,
          ]}
        >
          {props.children}
        </Text>
        <Image
          source={props.icon}
          style={{ height: 30, width: 30, borderRadius: 50 }}
        ></Image>
      </View>
    </TouchableWithoutFeedback>
  );
};

const SelectLanguage = (props) => {
  const [language, setLanguage] = useState({id:1,code:'en',language:'English'});
  const navigation=useNavigation();
    useEffect(()=>{
      navigation.navigate("requestLocation")
    },[])
  return (
    <SafeAreaView>
      <ImageBackground source={bgimage} style={styles.container}>
        <View style={styles.subContainer}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={headingstyle}>Select Language</Text>
          </View>
          <View
            style={{
              flex: 2,
              justifyContent: "space-around",
              marginBottom:10
              
            }}
          >
            <Option
              onPress={() => setLanguage({id:1,code:'en',language:'English'})}
              isactive={language.code === "en" ? true : false}
              icon={englandFlag}
            >
              ENGLISH
            </Option>
            <Option
              onPress={() => setLanguage({id:2,code:'it',language:'Italian'})}
              isactive={language.code === "it" ? true : false}
              icon={italianFlag}
            >
              ITALIAN
            </Option>
          </View>
          <Text onPress={()=>{
            props.setLanguage(language,props.navigation)
          }} style={styles.button}>
            Next
          </Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  subContainer: {
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    backgroundColor: "white",
    minHeight:280,
    height: Dimensions.get("window").height / 3,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.border,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41, elevation:5,
  },
  optionActive: {
    height: 40,
    flexDirection: "row",
    width: Dimensions.get("window").width / 1.5,
    backgroundColor: colors.secondary,
    borderRadius: 50,
    justifyContent: "space-between",
    paddingHorizontal: "3%",
    alignItems: "center",
    marginVertical: 2,
  },
  optionInactive: {
    height: 40,
    flexDirection: "row",
    width: Dimensions.get("window").width / 1.5,
    borderColor: colors.disabled,
    borderWidth: 1,
    borderRadius: 50,
    justifyContent: "space-between",
    paddingHorizontal: "3%",
    alignItems: "center",
    marginVertical: 2,
  },
  textInactive: {
    color: "black",
  },
  textActive: {
    color: "white",
  },
  button:{
    backgroundColor: colors.secondary,
    width:100,
    paddingVertical:10,
    borderRadius:50,
    textAlign:'center',
    color:'white',
    marginBottom:20,
    textTransform:'uppercase',
    fontFamily:fonts.primaryBold

  }
});


export default connect(null, {setLanguage})(SelectLanguage);