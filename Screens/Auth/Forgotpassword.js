import React, { Component } from 'react';
import { View, Image, Keyboard, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { colors } from '../../assets/styletile';

import GradientButton from '../../Components/Button/GradientButton';
import Alert from '../../Components/Alert';
import InputBox from '../../Components/InputBox';
import logo from '../../assets/images/logo1.png';
import BoldText from '../../Components/BoldText';
import { forgotPassword } from '../../Redux Store/actions/user'
import { connect } from 'react-redux';
import Wrapper from '../../Components/Wrapper'
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';

class ForgotPassword extends Component {

    state = {
        email: '',
        loading: false,
        visible: false
    }

    forgotAction = () => {
        this.setState({ loading: true })
        this.props.forgotPassword(this.state.email)
            .then(async response => {
                var response = await response.json()
                if (response.success) {
                    console.log(response)
                    this.setState({ loading: false })
                    this.props.navigation.navigate('newPassword', { email: this.state.email })
                }
                else {
                    this.setState({
                        loading: false,
                        visible: true,
                        title: 'Error occurred',
                        message: response.message
                    })
                }
            })
            .catch(err => {
                console.log("forgotPassword", err);
                this.setState({
                    loading: false,
                    visible: true,
                    title: 'Error occurred',
                    message: 'Network request failed'
                })
            })

    }



    render() {
        return (
            <Wrapper style={{ backgroundColor: colors.background }}>
                <View style={{ paddingHorizontal: '10%', minHeight: '100%' }}>
                    <Alert
                        visible={this.state.visible}
                        title={this.state.title}
                        message={this.state.message}
                        onClose={() => {
                            this.setState({ visible: false })
                        }}
                    />
                    <Image source={logo}
                        style={{
                            resizeMode: 'contain',
                            width: '60%',
                            height: 200,
                            alignSelf: 'center',
                            margin: 30,
                            marginBottom: 50
                        }}
                    />

                    <InputBox
                        placeholder="Email or phone nummber"
                        onChange={(val) => this.setState({ email: val })}
                        keyboardType='email-address'

                    />

                    <GradientButton
                        disabled={this.state.email == '' ? true : false}
                        loading={this.state.loading}
                        text="Send verification code"
                        onPress={this.forgotAction}
                        style={{ alignSelf: 'center', marginTop: 20 }}
                    />
                </View>


                <SafeAreaInsetsContext.Consumer>
                    {(insets) => <BoldText text="Don't have an account?" boldText='Sign Up'
                        onPress={() => this.props.navigation.navigate('signUp')}
                        style={{
                            backgroundColor: colors.lightBackground,
                            padding: 15,
                            position: 'absolute',
                            bottom: insets.bottom,

                        }} />}
                </SafeAreaInsetsContext.Consumer>

            </Wrapper>
        );
    }
}

export default connect(null, { forgotPassword })(ForgotPassword);