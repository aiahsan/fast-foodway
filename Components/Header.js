import React from 'react';
import { Button, View, Text, StyleSheet,TouchableOpacity,StatusBar,Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors, fonts} from '../assets/styletile';

export default class Header extends React.Component {
  render() {
    return (
        <View
          style={[styles.container, this.props.style]}
        >
        <View style={{width:'15%'}}>
          <TouchableOpacity  onPress={this.props.leftNavigation} activeOpacity={0.7}>
            <Icon name={this.props.left} style={[styles.icon,this.props.iconStyle]}/>
            </TouchableOpacity>
        </View>
        <View style={{width:'70%',...this.props.headerStyle}}>
          <Text ellipsizeMode='tail' numberOfLines={1} style={{ color: 'white',  fontSize: 22,textAlign:'center',fontFamily:fonts.primaryBold }}>{this.props.title}</Text>
        </View>
        <View style={{width:'15%'}}>
          <TouchableOpacity  onPress={this.props.rightNavigation}  activeOpacity={0.7}>
            <Icon name={this.props.right} style={[styles.icon,this.props.iconStyle]} />
            </TouchableOpacity>
        </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width:'100%',
    flexDirection: 'row',
    height: 60,
    backgroundColor: colors.primary,
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex:2,
    shadowColor: colors.border,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41, elevation:5
  },
  icon: {
    color:'white',
    fontSize: 24,
    marginLeft: 10,
    marginRight: 10,
  }
});
