import React, { Component } from "react";
import { Text, View, Image ,TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { colors, fonts } from "../../assets/styletile";
import eng from "../../assets/images/eng.jpg"
import it from '../../assets/images/it.jpg'
import { connect } from 'react-redux';

const flags = {
  en: eng,
  it: it
};


// It takes props IconName, Name
class IconWithText extends Component {

  state = {
    image: flags["en"]
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (props !== this.props)
      this.setState({
        image: flags[props.userLanguage.code]
      })
  }


  render() {
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={this.props.onPress}>
        <View style={{
        flexDirection: "row",
        paddingVertical: 8,
        padding: 5,
        marginHorizontal: 15,
        borderColor: colors.border,
        borderBottomWidth: 1,
        alignItems: "center",
      }}>
        <Icon
          name={this.props.iconName}
          style={{
            alignSelf: "center",
            padding: "2%",
            fontSize: 24,
            color: colors.primary
          }}
        ></Icon>
        <Text style={{ alignSelf: "center", padding: "2%", fontSize: 16, marginLeft: 5,fontFamily:fonts.primary,color:colors.textSecondary }}>
          {this.props.name}
        </Text>
        {this.props.flag ? <Image
          source={this.state.image}
          style={{
            height: 20,
            width: 28,
            position: 'absolute',
            right: 20
          }}></Image> : <View />}
      </View>
      </TouchableOpacity>
    );
  }
}


const mapStateToProps = state => {
  const { userLanguage } = state;
  return { userLanguage };
};



export default connect(mapStateToProps)(IconWithText);
