import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors, fonts } from '../assets/styletile';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

class InputBox extends Component {


    constructor(props) {
        super(props);
        this.state = { hidePassword: this.props.type === 'password' ? true : false }
    }

    static defaultProps={
        value:null,
        placeholderColor:colors.placeholder,
        keyboardType:'default'

    }

    render() {
        return (
            <View>
                {this.props.label ? <Text style={[styles.text, this.props.textStyle]}>
                    {this.props.label}
                </Text> : <View></View>}
                <View style={[styles.container, this.props.style]}>
                    <TextInput                        
                        ref={component => this._textInput = component}
                        style={{ ...styles.input, width: this.props.type === 'password' ? '90%' : '100%' }}
                        value={this.props.value}
                        placeholder={this.props.placeholder}
                        secureTextEntry={this.state.hidePassword}
                        placeholderTextColor={this.props.placeholderColor}
                        onChangeText={this.props.onChange}
                        keyboardType={this.props.keyboardType}
                        blurOnSubmit={true}
                        multiline={this.props.multiline}
                        textAlignVertical='center'
                    />
                    {this.props.type == 'password' ?
                        <Icon
                            name={!this.state.hidePassword ? 'eye-off-outline' : 'eye-outline'}
                            style={styles.icon}
                            size={20}
                            color={colors.textLight}
                            onPress={() => this.setState({ hidePassword: !this.state.hidePassword })}
                        /> : <View></View>}
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 5,
        marginTop: 10,
        height: 40,
        borderColor: colors.border,
        borderWidth: 1,
        backgroundColor: colors.lightBackground
    },

    input: {
        paddingLeft: 15,
        paddingRight: 15,
        color: colors.primary,
        paddingVertical:10,
        textTransform:'lowercase'


    },
    text: {
        fontSize: 16,
        fontFamily: fonts.primary,
        color: colors.textSecondary
    },
    icon: {
        position: 'absolute',
        alignSelf: 'flex-end',
        top: 8,
        right: 10
    }
});


export default InputBox;