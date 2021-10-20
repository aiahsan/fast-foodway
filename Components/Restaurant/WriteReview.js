import React, { Component } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { colors } from "../../assets/styletile";
import Icon from "react-native-vector-icons/Entypo";
import { TextInput } from "react-native-gesture-handler";
import GradientButton from "../Button/GradientButton";
import Rating from "../StarRating";
import { writeReview } from "../../Redux Store/actions/restaurant";
import { connect } from "react-redux";
import Toast from 'react-native-root-toast'
import Language from '../../Localization/Language';

class WriteReview extends Component {
  state = {
    rating: 1,
    comment: "",
    visible: true,
    loading: false,
  };

  showMessage = (msg, title) => {
    this.setState({
      loading: false,
    });
    Toast.show(msg,{
      backgroundColor:'white',
      textColor:colors.textPrimary,
      opacity:0.9,
      position:-60,
      shadowColor:colors.lightBackground
    })
  };

  writeReview = () => {
    this.setState({ loading: true });
    this.props
      .writeReview({
        restaurant_id: this.props.id,
        rating: this.state.rating,
        comment: this.state.comment,
      })
      .then((res) => res.json())
      .then(async (res) => {
        if (res.success) {
          this.props.onClose()
          this.showMessage(res.message)
        } else this.showMessage(res.message);
      })
      .catch((err) => this.showMessage("Network request failed"));
  };

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={this.props.onClose}
      >
        <StatusBar backgroundColor="rgb(162,66,67)" />
        <View style={styles.centeredView} keyboardShouldPersistTaps='handled'>
          <View style={styles.modalView}>
            <View style={styles.headingView}>
    <Text style={styles.modalHeading}>{Language.writeReview}</Text>
              <Icon
                name="cross"
                style={styles.cancelIcon}
                onPress={this.props.onClose}
              />
            </View>
            <View style={styles.reviewContainer}>
              <Rating updateRating={(val) => this.setState({ rating: val })} />
              <TextInput
                style={styles.input}
                textAlignVertical={"top"}
                multiline={true}
                placeholder="Write your review..."
                onChangeText={(val) => this.setState({ comment: val })}
              />
              <GradientButton
                loading={this.state.loading}
                text={Language.submit}
                onPress={() => {
                  this.writeReview();
                }}
              />
            </View>
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
    backgroundColor: "#7d7d7d85",
  },
  modalView: {
    borderRadius: 5,
    overflow: "hidden",
    minHeight: 200,
    width: "85%",
    shadowColor: colors.border,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41, elevation: 5,
    backgroundColor: "white",
  },
  headingView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: colors.primary,
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
  },
  modalHeading: {
    fontFamily: "MS Trebuchet",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  cancelIcon: {
    fontSize: 26,
    color: "white",
  },
  text: {
    fontSize: 18,
    color: colors.textPrimary,
    padding: 10,
    textAlign: "center",
  },
  reviewContainer: {
    padding: 20,
  },
  input: {
    minHeight: 100,
    backgroundColor: colors.lightBackground,
    borderRadius: 10,
    padding: 10,
    borderWidth: 0.5,
    borderColor: colors.border,
    marginBottom: 20,
  },
});

export default connect(null, { writeReview })(WriteReview);
