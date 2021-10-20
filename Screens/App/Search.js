import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback ,
  ScrollView,
} from "react-native";
import _ from 'lodash'
import {getSearchItem} from '../../utiles'
import { size, headingstyle, fonts, colors } from "../../assets/styletile";
import Header from "../../Components/Header";
import dummyimage from "../../assets/images/food2.jpg";
import SearchBar from "../../Components/Restaurant/SearchBar";
import SearchedRestaurant from "../../Components/Restaurant/SearchedRestaurant";
import SmallHeading from "../../Components/Heading/SmallHeading";
import Item from "../../Components/Menu/Item";
import Language from "../../Localization/Language";
import { AddressLoader } from "../../Components/Loader";
import { connect } from "react-redux";
import { searchRestaurant } from "../../Redux Store/actions/restaurant";
import image from "../../assets/icons/restaurant.png";
import NotFound from "../../Components/NotFound";
import Wrapper from "../../Components/Wrapper";
import { getOrders } from "../../Redux Store/actions/order";
import { addItem, emptyCart } from "../../Redux Store/actions/cart";
import { getRestaurants ,getCategories,setcategoryItem} from "../../Redux Store/actions/restaurant";
import { getCurrentOrders } from '../../Redux Store/actions/order'
import CurrentOrder from '../../Components/Cart/OrderStatus/CurrentOrder';
var flag = false;


class Search extends Component {
  state = {
    flag: true,
    restaurants: [],
    menu: [],
    data: [],
    loading: true,
    searchText: "",
    searching: false,
    searchingTimeOut: false,
    cart: [],
    searchmenu:[],

    currentOrders: [],

  };
  componentDidMount(){
    this.getCat();
    this.getCurrentOrders()


  }
  getCurrentOrders = () => {
    this.props.getCurrentOrders()
      .then(res => res.json())
      .then(response => {
        this.setState({ currentOrders: response.response })
      })
      .catch(err => console.log("current orders", err))
  }
  UNSAFE_componentWillReceiveProps(props) {
    if (props.cartReducer !== this.props.cartReducer)
      this.setState({ cart: props.cartReducer.items });
  }
  

  getCat= ()=>{
    const dataCheck= _.isEmpty(this.props.menuItemsNew);
    if(dataCheck==true)
     {
       this.props.getCategories(1)
         .then(res => res.json())
         .then(response => {
          this.setState({ menu: response.response ,searchmenu:response.response})
           this.props.setcategoryItem(response)
         })
         .catch(err => console.log("current orders", err))
         
     }
     else
     {
      this.setState({ menu: this.props.menuItemsNew.response ,searchmenu:this.props.menuItemsNew.response})

     }
     
   }

  textChangeHandler = (val) => {
    if(val!="")
    {
      console.log(val)
   const oldValues=this.state.menu;
  const dataFinal= oldValues.filter(valx => {
    var founData=false;
    // console.log(val)
   let filterData= valx.menus.filter(x=>{
    
    const indexGet=x.title.toLowerCase().indexOf(val.toLowerCase());
    console.log("title",x.title)
    console.log("index",indexGet);
    if(indexGet>-1)
    {
      
      founData=true;
      return true;

    }
    else
    {
      return false;
    }

   });
   //valx.menus=[...filterData];

   console.log("valMx",valx.menus)

   return founData;
  })

  console.log("newData",dataFinal)

  this.setState({
    searchmenu:[...dataFinal] 
  })

    }
    else
    {
      this.setState({
        searchmenu:this.state.menu
      })
    
    }
   let newValues=[];
  //this.setState({searchmenu:newrr})
//  console.log(newrr)    
    /*

this.setState({ loading: true });
    if (this.state.searchingTimeOut) {
      clearTimeout(this.state.searchingTimeOut);
      this.setState({ searching: true });
    }

    this.setState({
      searchText: val,
      searching: false,
      searchingTimeOut: setTimeout(() => {
        if (val.length !== 0) 
        {
          const menuOld=this.state.menu;
          
          console.log(menuOld[0].menus)
//this.searchData(val);
        }
        
      }, 500),
    });
    */
  };
  mapItem = () => {
   
    if(this.state.searchmenu.length>0)
    {
 
       return this.state.searchmenu.map((itemx) =>   {
 
       return <View>
       {
         (itemx.menus.length>0?<SmallHeading
           text={itemx.name}
           style={{ marginLeft: 10, marginVertical: 10 }}
         />:<></>)
       }
       
       {
         (itemx.menus.length>0? itemx.menus.map(item=><Item
       id={item.id}
       title={item.title}
       description={item.short_desc}
       price={item.price}
       image={item.images}
       currency={item.currency}
       discount={item.price-item.discounted_price}
       hasDiscount={item.discounted_price === item.price ? false : true}
       discountedPrice={item.discounted_price}
       restaurant={this.props.restaurant}
       flag={this.state.flag}
       cart={this.state.cart}
       setFlag={this.state.setFlag}
       extras={item.extras}
     ></Item>):<View></View>)
       }
       </View>
     }
     );
    }
   };
  searchData = () => {
    const { latitude, longitude } = this.props.userLocation;
    this.props
      .searchRestaurant({
        search: this.state.searchText,
        longitude: longitude,
        latitude: latitude,
      })
      .then(async (response) => {
        var response = await response.json();
        if (response.success) {
          this.setState({ loading: false, restaurants: response.response });
        } else {
          this.setState({
            loading: false,
          });
        }
      })
      .catch((err) => {
        console.log("Search error", err);
        this.setState({
          loading: false,
        });
      });
  };

  renderRestaurants = () => {
    if (this.state.restaurants.length == 0) {
      if (this.state.loading && this.state.searchText.length !== 0)
        return <AddressLoader />;
      else if (!this.state.loading && this.state.searchText.length !== 0)
        return (
          <NotFound
            title={Language.noRestaurantFound}
            // subtitle='No Restaurants matched your search'
            image={image}
          />
        );
    } else {
      return (
        <FlatList
          listHeaderComponent={
            <SmallHeading text="Restaurants" style={styles.heading} />
          }
          showsVerticalScrollIndicator={false}
          key={Math.random().toString()}
          data={this.state.restaurants}
          renderItem={({ item }) => (
            <SearchedRestaurant
              name={item.display_name}
              imageUrl={item.images}
              rating={item.avg_rating}
              navigation={this.props.navigation}
              data={item}
            />
          )}
          keyExtractor={(item) => item.id}
          horizontal={false}
        />
      );
    }
  };
  renderItem = (title, image, id) => {
    const { width } = Dimensions.get("window");
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          this.props.navigation.navigate("categories", { title: title, id: id })
        }
      >
        <View style={{ width: width / 2.2, height: width / 2.8 }}>
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
                  textAlign: "center",
                  paddingHorizontal: 10,
                },
              ]}
            >
              {title}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <Wrapper bottom={0}>
        <View style={{ flex: 1, backgroundColor: colors.lightBackground }}>
          <SearchBar
            setFlag={(flag) => this.setState({ flag: flag })}
            onSearch={this.textChangeHandler}
          />
            <View style={{ flex: 1 }}>
                   <ScrollView
          
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, backgroundColor: colors.lightBackground }}
        >
          {this.state.currentOrders.length !== 0 &&
            <CurrentOrder data={this.state.currentOrders} navigation={this.props.navigation} />}
          {/*{this.renderRestaurants()}*/}
           <SmallHeading
          text={Language.categories}
          style={{ marginLeft: 10, marginVertical: 10 }}
        />
        
          {this.mapItem()}
        </ScrollView>
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
     
        </View>
      </Wrapper>
    );
  }
}


const mapStateToProps = (state) => {
  const { allCategories, userLocation,restaurants,cartReducer,menuItemsNew } = state;
  return { allCategories, userLocation ,restaurants,cartReducer,menuItemsNew};
};

export default connect(mapStateToProps, { searchRestaurant,  getOrders,
  addItem,  emptyCart,getCategories,  getCurrentOrders,setcategoryItem

 })(Search);


 const styles = StyleSheet.create({
  heading: {
    textAlign: "left",
    margin: 10,
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
})