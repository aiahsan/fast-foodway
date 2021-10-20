import React, { Component } from "react";
import { Text, View, FlatList,Image } from "react-native";
import { TouchableOpacity, Dimensions } from "react-native";
import { fonts,colors } from "../../assets/styletile";
import SmallHeading from "../../Components/Heading/SmallHeading";
import * as Animatable from "react-native-animatable";
import { getTags } from "../../Redux Store/actions/restaurant";
import { connect } from "react-redux";
import { RestaurantLoader, CategoriesLoader } from "../../Components/Loader";

class CategoriesList extends Component {
  componentDidMount = () => {
    this.props.getTags();

  };

  renderItem = (name, image, index, id) => {
    const { width } = Dimensions.get("window");
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          this.props.handleCategoryChange(id)
          //this.props.navigation.navigate("categories", { title: name, id })
        }
      >
        <Animatable.View
          style={{
            width: width / 2.2,
            height: width / 2.8,
            marginHorizontal: 10,
            marginLeft: index == 0 ? 10 : 0,
            borderRadius: 10,
            overflow: "hidden",
            shadowColor: colors.border,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41, elevation: 2,
          }}
        >
          <Image
            source={{
              uri: image,
            }}
            style={{
              resizeMode: "cover",
              width: "100%",
              height: "100%",
              alignSelf: "center",
            }}
          ></Image>
          <View
            style={{
              backgroundColor: "rgba(0,0,0,0.4)",
              width: "100%",
              height: "100%",
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={[
                {
                  color: "white",
                  letterSpacing: 1,
                  fontSize: 22,
                  fontFamily: fonts.primaryBold,
                  textAlign: 'center',
                  width:'95%'
                },
              ]}
            >
              {name}
            </Text>
          </View>
        </Animatable.View>
      </TouchableOpacity>
    );
  };


  _renderItems = () =>{
    if (this.props.allCategories === null) {
      return <RestaurantLoader></RestaurantLoader>;
    }
    if (this.props.allCategories.length === 0) {
      return (
        <Text>Something went wrong fetching categories, please try again</Text>
      );
    }
    return (
      <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          key={Math.random().toString()}
          data={[{name:'All Categories',id:0,image:'https://thumbs.dreamstime.com/b/vegetarian-food-plate-editable-vector-illustration-isolated-dark-grey-background-medical-healthcare-dietary-poster-134019735.jpg'},...this.props.data]}

          style={{ flex: 1, marginBottom: 15, marginTop: 5 }}
          renderItem={({ item, index }) =>
            {
              return this.renderItem(item.name, item.image, index, item.id)
            }
          }
          keyExtractor={(item) => item.id.toString()}
        />
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
       {this._renderItems()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { allCategories } = state;
  return { allCategories };
};

export default connect(mapStateToProps, {
  getTags,
})(CategoriesList);
