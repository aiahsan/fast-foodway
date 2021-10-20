import React, { Component } from 'react';
import { Text } from 'react-native';
import {colors, fonts} from '../../assets/styletile'

class LargeHeading extends Component {
    render() {
        return (
        <Text style={{
            fontSize:30, 
            color:colors.primary,
            fontFamily:fonts.heading,
            textAlign:'center',
            ...this.props.style,
        }}>{this.props.text}</Text>
        );
    }
}

export default LargeHeading;