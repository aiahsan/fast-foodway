import React, { Component } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { size, colors, headingstyle, fonts } from "../../../assets/styletile";
import SmallHeading from "../../../Components/Heading/SmallHeading";
import RestaurantItem from "../../../Components/Restaurant/RestaurantItem";
import GradientButton from "../../../Components/Button/GradientButton";
import StatusCard from "../../../Components/Cart/OrderStatus/StatusCard";
import Header from "../../../Components/Header";
import RiderDetail from "../../../Components/Cart/OrderStatus/RiderDetail";
import { ScrollView } from "react-native-gesture-handler";
import image from '../../../assets/images/food3.jpg'
import { getOrderDetails } from '../../../Redux Store/actions/order'
import { connect } from "react-redux";
import { ModalLoader } from "../../../Components/Loader";
import Language from '../../../Localization/Language'
import {
  AddressCard,
  Summary,
  OrderItems,
} from "../../../Components/Cart/OrderDetails";
import Wrapper from "../../../Components/Wrapper";

const restaurant = {
  id: 3,
  name: 'Kababjees',
  description: 'Karahi, Handi, BBQ',
  reviews: 237,
  rating: 4.5,
  delivery: 60,
  image: image
};


class OrderStatus extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true
    }
  }


  componentDidMount() {
    this.props.getOrderDetails({ order_id: this.props.route.params.orderId })
      .then(res => res.json())
      .then(response => {
        console.log(response.response[0].order, 'order status response')
        this.setState({ data: response.response[0], loading: false })
      })
      .catch(err => console.log("order detail", err))
  }



  render() {
    if (this.state.data !== null) {
      const { rider, order, currency, items, payment, restaurant, shipping, statuses } = this.state.data;
      return (
        <Wrapper style={{ flex: 1, backgroundColor: colors.lightBackground }}>
          <Header title={Language.orderStatus} left='arrow-left' leftNavigation={() => this.props.navigation.pop()} />
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <RestaurantItem style={{
              borderRadius: 0, shadowColor: colors.border,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.20,
              shadowRadius: 1.41, elevation: 0
            }} item={restaurant} flag={true} />
            <View style={[styles.container]}>
              <SmallHeading text={Language.estimatedDeliveryTime}></SmallHeading>
              <SmallHeading
                style={{ color: colors.primary }}
                text='45 min'
              />
            </View>
            {rider && <RiderDetail rider={rider} />}
            <StatusCard status={statuses} />
            <Text style={styles.heading}> Items: </Text>
            <OrderItems
              order={order}
              currency={'\u00A3'}
            />
            <Summary data={{ order: order, currency_code: '\u00A3' }} />
          </ScrollView>
        </Wrapper>
      );
    }
    else return (<View>
      <ModalLoader
        visible={this.state.loading}
      />
    </View>)

  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingVertical: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  ButtonStyle: {
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: "10%",
    justifyContent: "center",
  },
  heading: {
    fontFamily: fonts.primaryBold,
    fontSize: size.heading,
    padding: "3%",
    color: 'black'
  }
});

export default connect(null, { getOrderDetails })(OrderStatus)
