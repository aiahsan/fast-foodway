import React, { Component } from 'react';
import { View, SafeAreaView } from 'react-native';
import LargeHeading from '../../../Components/Heading/LargeHeading';
import SmallHeading from '../../../Components/Heading/SmallHeading';
import error from '../../../assets/images/error.png'
import { Image } from 'react-native';
import GradientButton from '../../../Components/Button/GradientButton';
import Language from '../../../Localization/Language'
import Wrapper from '../../../Components/Wrapper';

class NotPlaced extends Component {

    render() {
        return (
            <Wrapper style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
                <LargeHeading text={Language.somethingWentWrong} />
                <Image source={error} style={{
                    width: 200,
                    height: 200,
                    resizeMode: 'contain',
                    marginVertical: 40,
                    alignSelf: "center"
                }} />
                <SmallHeading text={this.props.route.params.text} style={{ textAlign: 'center' }} />
                <GradientButton
                    text={Language.tryAgain}
                    style={{ marginVertical: 30, width: '90%', alignSelf: 'center' }}
                    onPress={() => this.props.navigation.pop()}

                />
            </Wrapper>
        );
    }
}

export default NotPlaced;