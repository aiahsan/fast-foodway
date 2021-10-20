import React, { useState } from "react";
import { View, SafeAreaView } from "react-native";
import { colors } from "../../../assets/styletile";
import { ScrollView } from "react-native-gesture-handler";
import GradientButton from "../../../Components/Button/GradientButton";
import SimpleButton from "../../../Components/Button/SimpleButton";
import Header from "../../../Components/Header";
import Language from '../../../Localization/Language'
import {
  AddressCard,
  Summary,
  OrderItems,
} from "../../../Components/Cart/OrderDetails";
import WriteReview from "../../../Components/Restaurant/WriteReview";
import Wrapper from "../../../Components/Wrapper";

const OrderDetails = (props) => {
  const [visible, setVisible] = useState(false);
  const { data } = props.route.params;
  const { currency_code, order, restaurant, shipping, statuses } = data;

  return (
    <>
      <Wrapper>
        <Header title={restaurant.display_name} left='arrow-left' leftNavigation={() => props.navigation.pop()} />
        {data && <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, backgroundColor: colors.lightBackground }}>
            <WriteReview
              visible={visible}
              onClose={() => setVisible(false)}
              id={restaurant.id}
            />
            <AddressCard data={props.route.params.data} />
            <OrderItems
              order={order}
              currency={currency_code}
            />
            <Summary data={props.route.params.data} />
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-around",
                paddingHorizontal: "3%",
                marginVertical: '5%'
              }}
            >
              <View style={{ flex: 1, marginRight: "2%" }}>
                <GradientButton
                  text={Language.rate}
                  onPress={() => setVisible(true)}
                />
              </View>
            </View>
          </View>
        </ScrollView>}
      </Wrapper>
    </>
  );
};

export default OrderDetails;
