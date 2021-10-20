import React, { Component } from "react";
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  TouchableWithoutFeedback,
  StatusBar,
  FlatList,
} from "react-native";
import { colors, fonts } from "../../../assets/styletile";
import { connect } from "react-redux";
import Menu from "../Restaurant/Menu";
import Language from "../../../Localization/Language";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MenuTab from "../../../Components/Menu/MenuTab";
import { getCategories } from "../../../Redux Store/actions/restaurant";
import Wrapper from '../../../Components/Wrapper'

const WIDTH = Dimensions.get("window").width;
const HEADER_MAX_HEIGHT = 220
const HEADER_MIN_HEIGHT = 60 + (StatusBar.currentHeight || 33);
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
var flag = false;

class RestaurantMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
      flag: false,
      item: this.props.route.params.item,
      categories: [],
      loading: false,
      selectedIndex: 0,
      statusBarHeight: StatusBar.currentHeight || 33,
    };
  }

  componentDidMount() {
    const { cartReducer } = this.props;
    const { item } = this.state;
    this.setState({ loading: true });
    this.props
      .getCategories(item.id)
      .then((res) => res.json())
      .then((response) => {
        console.log(response.response, "data from main screen");
        this.setState({ categories: response.response, loading: false });
      })
      .catch((err) => console.log("get categories", err));

    if (cartReducer.restaurant) {
      if (item.id == cartReducer.restaurant.id) {
        this.setState({ flag: true, cart: cartReducer.items });
      } else {
        this.setState({ flag: false });
      }
    }
  }

  swipeLeft = () => {
    const { selectedIndex } = this.state;
    if (selectedIndex < this.state.categories.length) {
      this.setState({ selectedIndex: selectedIndex + 1 });
    }
  };

  swipeRight = () => {
    const { selectedIndex } = this.state;
    if (selectedIndex > 0) {
      this.setState({ selectedIndex: selectedIndex - 1 });
    }
  };

  renderItem = (item, index) => {
    const flag = this.state.selectedIndex == index;
    return (
      <View>
        <Text
          onPress={() =>
            this.setState({ selectedIndex: index }, () =>
              this.list.scrollToItem({ item })
            )
          }
          style={{
            paddingHorizontal: 20,
            paddingVertical: 15,
            fontFamily: flag ? fonts.primaryBold : fonts.primary,
            fontSize: 15,
            color: flag ? colors.primary : colors.textSecondary,
            borderColor: colors.primary,
            borderBottomWidth: flag ? 2 : 0,
          }}
        >
          {item.name}
        </Text>
      </View>
    );
  };

  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: "clamp",
    });

    const imageOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: "clamp",
    });
    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -50],
      extrapolate: "clamp",
    });
    const textTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [50, 10 + this.state.statusBarHeight / 2],
      extrapolate: "clamp",
    });
    const textSize = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [34, 22],
      extrapolate: "clamp",
    });
    const textBackground = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: ["rgba(0,0,0,0.3)", "transparent"],
      extrapolate: "clamp",
    });

    const menuTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, 60 + this.state.statusBarHeight],
      extrapolate: "clamp",
    });

    return (
<Wrapper top={0}>
      <View style={styles.fill}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="transparent"
          translucent={true}
        />
        <ScrollView
          style={styles.fill}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            {
              useNativeDriver: false,
            }
          )}
        >
          <View style={{ marginTop: 270 }}>
            <MenuTab
              loading={this.state.loading}
              categories={this.state.categories}
              restaurant={this.state.item}
              selectedIndex={this.state.selectedIndex}
              changeIndex={(index) => {
                this.list.scrollToIndex({ index });
              }}
              swipeRight={this.swipeRight}
              swipeLeft={this.swipeLeft}
              scroll={(item) => this.list.scrollToItem(item)}
            />
          </View>
        </ScrollView>
        <Animated.View
          style={{
            position: "absolute",
            top: menuTranslate,
            zIndex: 5,
            width: "100%",
          }}
        >
          <FlatList
            ref={(ref) => (this.list = ref)}
            showsHorizontalScrollIndicator={false}
            style={{
              flex: 1,
              backgroundColor: "white",
              borderColor: colors.border,
              shadowColor: colors.border,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41, elevation: 1,
              width: "100%",
            }}
            data={this.state.categories}
            keyExtractor={(item) => item.id}
            horizontal={true}
            renderItem={({ item, index }) => this.renderItem(item, index)}
          />
        </Animated.View>
        <Animated.View style={[styles.header, { height: headerHeight }]}>
          <Animated.View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 10,
              position: "absolute",
              backgroundColor: textBackground,
              height: "100%",
              top: 0,
              zIndex: 1,
              width: "100%",
              paddingTop: 20 + this.state.statusBarHeight,
            }}
          >
            <Icon
              name="arrow-left"
              style={{ zIndex: 2 }}
              size={25}
              color="white"
              onPress={() => this.props.navigation.pop()}
            />

            <Animated.Text
              style={{
                position: "absolute",
                color: "white",
                fontSize: textSize,
                textAlign: "center",
                height: headerHeight,
                fontFamily: fonts.primaryBold,
                paddingTop: textTranslate,
                transform: [{ translateY: textTranslate }],
                width: WIDTH,
              }}
            >
              {this.state.item.display_name}
            </Animated.Text>
            <Icon
              name="comment-text-outline"
              size={25}
              color="white"
              onPress={() =>
                this.props.navigation.navigate("reviews", {
                  id: this.state.item.id,
                })
              }
            />
          </Animated.View>
          <Animated.Image
            style={[
              styles.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }],
              },
            ]}
            source={{
              uri: this.state.item.images
                ? this.state.item.images
                : "https://www.fsrmagazine.com/sites/default/files/styles/story_image_720x430/public/feature-images/restaurant-profitability-and-failure-rates-what-you-need-know-1554383028.jpg?itok=YlCem74r",
            }}
          />

        </Animated.View>
        {this.props.cartReducer.items.length !== 0 && (
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.navigate("Cart")}
          >
            <View style={styles.cartView}>
              <View style={styles.cartNo}>
                <Text style={styles.cartText}>
                  {this.props.cartReducer.items.length}
                </Text>
              </View>
              <Text style={styles.cartHeading}>{Language.viewYourCart}</Text>
              <Text style={styles.cartPrice}>
                {this.props.cartReducer.currency.code}{" "}
                {this.props.cartReducer.totalPrice.toFixed(2)}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
</Wrapper>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: "#D3D3D3",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.primary,
    overflow: "hidden",
  },
  bar: {
    marginTop: 28,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    backgroundColor: "transparent",
    color: "white",
    fontSize: 18,
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: 320,
    resizeMode: "cover",
  },
  cartView: {
    flexDirection: "row",
    minHeight: 45,
    backgroundColor: colors.primary,
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: colors.border,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41, elevation: 2,
  },
  cartPrice: {
    color: "white",
    fontFamily: fonts.secondaryBold,
  },
  cartNo: {
    color: "white",
    backgroundColor: colors.third,
    width: 28,
    height: 28,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  cartText: {
    color: "white",
    fontSize: 12,
    fontFamily: fonts.secondaryBold,
  },
  cartHeading: {
    color: "white",
    fontSize: 16,
    fontFamily: fonts.primaryBold,
    textTransform: "uppercase",
  },
});

const mapStateToProps = (state) => {
  const { cartReducer } = state;
  return { cartReducer };
};

export default connect(mapStateToProps, { getCategories })(RestaurantMenu);
