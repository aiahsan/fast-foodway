import React, { Component } from 'react';
import { View, Image, Keyboard, KeyboardAvoidingView, Text, SafeAreaView } from 'react-native';
import { colors } from '../../assets/styletile';

import GradientButton from '../../Components/Button/GradientButton';
import InputBox from '../../Components/InputBox';
import logo from '../../assets/images/logo1.png';
import BoldText from '../../Components/BoldText';
import SmallHeading from '../../Components/Heading/SmallHeading';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../../Components/Header';
import { newPassword } from '../../Redux Store/actions/user'
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import Alert from '../../Components/Alert';
import Wrapper from '../../Components/Wrapper';

class NewPassword extends Component {
    state = {
        email: this.props.route.params.email,
        code: '',
        password: '',
        cpassword: '',
        shown: false,
        visible: false
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => this.setState({ shown: true }),
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => this.setState({ shown: false }),
        );
    }


    validateInput = () => {
        if (this.state.code == '') {
            this.setState({
                visible: true,
                title: 'Error occurred',
                message: 'Please enter 4 digit code'
            })
        }
        else if (this.state.password == '') {
            this.setState({
                visible: true,
                title: 'Error occurred',
                message: 'Please enter new password'
            })
        }
        else if (this.state.cpassword !== this.state.password) {
            this.setState({
                visible: true,
                title: 'Error occurred',
                message: 'Password and confirm password do not match'
            })
        }
        else this.changePassword()
    }



    changePassword = () => {
        this.setState({ loading: true })
        this.props.newPassword({
            email: this.state.email,
            reset_pin: this.state.code,
            new_password: this.state.password,
            c_new_password: this.state.cpassword
        })
            .then(async response => {
                var response = await response.json()
                if (response.success) {
                    this.setState({
                        loading: false,
                        visible: true,
                        title: 'Request Successful',
                        message: response.message
                    })
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
                console.log("newPassword", err);
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
                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    enableOnAndroid={true}
                    extraScrollHeight={20}
                >
                    <View
                        style={{ flex: 1, marginBottom: 60, minHeight: '100%', paddingHorizontal: '10%' }}
                    >
                        <Alert
                            visible={this.state.visible}
                            title={this.state.title}
                            message={this.state.message}
                            onClose={() => {
                                this.setState({ visible: false });
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
                        <SmallHeading text='Password reset PIN sent to your registered email' style={{ padding: 10 }} />

                        <InputBox
                            placeholder="Enter reset PIN"
                            keyboardType='numeric'
                            onChange={(val) => this.setState({ code: val })} />
                        <InputBox
                            placeholder="New password"
                            type='password'
                            onChange={(val) => this.setState({ password: val })} />
                        <InputBox
                            placeholder="Confirm new password"
                            type='password'
                            onChange={(val) => this.setState({ cpassword: val })} />

                        <GradientButton
                            text="Update password"
                            onPress={this.validateInput}
                            style={{ marginTop: 20 }}
                            loading={this.state.loading}

                        />
                        <BoldText text='Remember password?' boldText='Sign In' style={{ marginBottom: this.state.shown ? 60 : 10 }}
                            onPress={() => this.props.navigation.navigate('signIn')}
                        />
                    </View>

                </KeyboardAwareScrollView>
                <SafeAreaInsetsContext.Consumer>
                    {(insets) => <BoldText text="Don't have an account?" boldText="Sign Up"
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

export default connect(null, { newPassword })(NewPassword);