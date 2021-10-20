import React, { Component } from 'react';
import {TouchableOpacity, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors,fonts} from '../../assets/styletile'
import {BarIndicator} from 'react-native-indicators';

class GradientButton extends Component {
    render() {
        return (
            <TouchableOpacity 
            disabled={this.props.loading?this.props.loading:false}
            activeOpacity={0.8} 
            onPress={this.props.onPress} >
                <LinearGradient
                start={{ x: 0.0, y: 0.0 }}
                end={{ x: 1.0, y: 0.0 }}
                locations={[0, 0.5, 0.95, 1.0]}
                colors={[colors.primary,colors.third,colors.secondary,'#ed962d']}
                style={{ 
                    width:'100%',
                    minHeight:38,
                    borderRadius: 10, 
                    alignItems: 'center',
                    justifyContent:'center',
                    ...this.props.style}}
                >
                {this.props.loading?
                <BarIndicator
                style={{flex: 0}}
                count={3}
                size={20}
                color={'white'}
                />:<Text style={{
                    fontSize:17,
                    color: 'white',
                    fontFamily:fonts.primaryBold,
                    textAlign:'center',
                    ...this.props.textStyle
                }}>
                    {this.props.text}
                    </Text>}
                

            </LinearGradient>
            </TouchableOpacity>
        );
    }
}

export default GradientButton;