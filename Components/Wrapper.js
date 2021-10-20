import React, { Component } from "react";
import { View, StatusBar } from "react-native";
import { colors } from "../assets/styletile";
import { SafeAreaView, SafeAreaInsetsContext } from 'react-native-safe-area-context';

class Wrapper extends Component {
  render() {
    const { top, bottom } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: colors.primary }}>
      <StatusBar barStyle="light-content"/>
        <SafeAreaInsetsContext.Consumer>
          {(insets) => <View style={{
            flex: 1,
            marginTop: top==0 ? top : insets.top,
            paddingBottom: bottom==0 ? bottom : insets.bottom,
            backgroundColor: colors.lightBackground,
            ...this.props.style
          }} >
            {this.props.children}
          </View>}
        </SafeAreaInsetsContext.Consumer>

      </View>
    );
  }
}

export default Wrapper;
