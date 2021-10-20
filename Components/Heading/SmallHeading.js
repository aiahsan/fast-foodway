import React, { Component } from 'react';
import { Text } from 'react-native';
import {colors,fonts} from '../../assets/styletile'

class SmallHeading extends Component {
    render() {
        return (
        <Text style={{
            fontSize:22, 
            color:colors.textPrimary,
            fontFamily:fonts.primaryBold,
            textAlign:'left',
            lineHeight:30,
            ...this.props.style
    }}>{this.props.text}</Text>
        );
    }
}

export default SmallHeading;