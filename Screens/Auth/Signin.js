import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Image, SafeAreaView, Keyboard, KeyboardAvoidingView } from 'react-native';
import { colors } from '../../assets/styletile';
import GradientButton from '../../Components/Button/GradientButton';
import InputBox from '../../Components/InputBox';
import BoldText from '../../Components/BoldText';
import LargeHeading from '../../Components/Heading/LargeHeading';
import Language from "../../Localization/Language"
import Alert from '../../Components/Alert';
import logo from '../../assets/images/logo1.png';
import { ScrollView } from 'react-native-gesture-handler'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';

import { signIn } from '../../Redux Store/actions/user';
import { connect } from 'react-redux';
import Wrapper from '../../Components/Wrapper';


class SignIn extends Component {
    state = {
        Language: 'en',
        email: '',
        password: '',
        title: '',
        message: '',
        visible: false,
        loading: false,
        shown: false
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


    setLoading = (flag) => {
        this.setState({ loading: flag })
    }

    showMessage = (msg) => {
        this.setState({
            loading: false,
            visible: true,
            title: 'Error occurred',
            message: msg
        })
    }

    validateInput = () => {
        Keyboard.dismiss();
        if (this.state.email == '')
            this.setState({
                visible: true,
                title: Language.errorTitle,
                message: Language.enterEmail
            })
        else if (this.state.password == '')
            this.setState({
                visible: true,
                title: Language.errorTitle,
                message: Language.enterPassword
            })
        else {
            this.props.signIn(
                { username: this.state.email, password: this.state.password },
                'login',
                this.setLoading,
                this.showMessage,
            )
        }
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
                        <Alert
                            visible={this.state.visible}
                            title={this.state.title}
                            message={this.state.message}
                            onClose={() => this.setState({ visible: false })}
                        />

                        <LargeHeading text={Language.signIn} style={{ textTransform: 'uppercase' }} />
                        <InputBox
                            placeholder='Username or email address'
                            onChange={(val) => this.setState({ email: val })}
                            keyboardType='email-address'
                        />
                        <InputBox
                            placeholder={Language.password}
                            type="password"
                            onChange={(val) => this.setState({ password: val })}
                        />
                        <GradientButton
                            text={Language.signIn}
                            style={{ alignSelf: 'center', marginTop: 20 }}
                            onPress={() => this.validateInput()}
                            disabled={this.state.loading}
                            loading={this.state.loading}
                        />

                        <BoldText text={Language.forgotPassword} boldText={Language.clickHere} style={{ marginBottom: 100 }}
                            onPress={() => this.props.navigation.navigate('forgotPassword')}
                        />

                    </View>


                </KeyboardAwareScrollView>
                <SafeAreaInsetsContext.Consumer>
                    {(insets) => <BoldText text={Language.dontHaveAccount} boldText={Language.signUp}
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


export default connect(null, { signIn })(SignIn);