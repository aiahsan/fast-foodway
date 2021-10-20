import React, { Component } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    View,
    StatusBar
} from "react-native";
import { colors, fonts } from '../assets/styletile';


class Alert extends Component {

    renderButton = () => {
        if (this.props.extraButton) {
            return <View style={{
                flexDirection:'row',
                position: 'absolute',
                left:'5%',
                right:'5%',
                bottom:20,
                alignItems:'center',
                justifyContent: 'space-between',           
            }}>
                <Text style={styles.buttons} onPress={this.props.onClick}>
                    {this.props.extraButton}
                </Text>
                <Text style={styles.buttons} onPress={this.props.onClose}>
                    Cancel
                </Text>

            </View>

        }
        else {
            return <Text style={styles.button} onPress={this.props.onClose}>
                Ok
        </Text>

        }

    }

    render() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.visible}
                onRequestClose={this.props.onClose}
            >
                <StatusBar backgroundColor='rgb(162,66,67)'/>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalHeading}>{this.props.title}</Text>
                        <Text style={styles.text}>{this.props.message}</Text>
                        {this.renderButton()}

                    </View>
                </View>
            </Modal>
        );
    }
}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#7d7d7d85'
    },
    modalView: {
        borderRadius: 5,
        overflow: 'hidden',
        minHeight: 200,
        width: '85%',
        shadowColor: colors.border,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41, elevation: 5,
        backgroundColor: 'white'
    },
    modalHeading: {
        fontFamily: 'MS Trebuchet',
        color: 'white',
        fontSize: 20,
        fontFamily: fonts.heading,
        backgroundColor: colors.primary,
        padding: 10,
        marginBottom: 10

    },
    button: {
        backgroundColor: colors.primary,
        textAlign: 'center',
        fontSize: 18,
        color: 'white',
        fontFamily: fonts.secondary,
        textTransform: 'uppercase',
        paddingHorizontal: 30,
        paddingVertical: 5,
        position: 'absolute',
        bottom: 10,
        right: 10,
        borderRadius: 5

    },
    text: {
        fontSize: 16,
        color: colors.textSecondary,
        padding: 10,
        textAlign: 'center',
        fontFamily: fonts.primary
    },
    buttons:{
        backgroundColor: colors.primary,
        textAlign: 'center',
        fontSize: 16,
        color: 'white',
        fontFamily: fonts.secondary,
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
        marginHorizontal:10,
        width:'45%'

    }
});


export default Alert;