import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { colors,fonts } from '../assets/styletile';

class BoldText extends Component {
    render() {
        return (
            <View style={{
                flexDirection:'row', 
                justifyContent:'center', 
                marginTop:20,
                width:'100%',   
                        
                ...this.props.style
                }}>
                <Text style={{color:colors.textPrimary,fontFamily:fonts.primary}}>{this.props.text}</Text>
                <Text 
                style={{marginLeft:5, color:colors.primary,fontFamily:fonts.primaryBold}}
                onPress={this.props.onPress}
                >{this.props.boldText}</Text>
            </View>
        );
    }
}

export default BoldText;