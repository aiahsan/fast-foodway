import React, { Component } from 'react';
import { View, Text, ScrollView, SafeAreaView, AppState, RefreshControl,TouchableWithoutFeedback ,StyleSheet} from "react-native";
import { connect } from "react-redux";
import Header from "../../Components/Header";
import RestaurantCard from "../../Components/Restaurant/RestaurantCard";
import { colors, size, fonts } from "../../assets/styletile";
import { url, headers } from '../../configuration';
import TextTicker from 'react-native-text-ticker'

import Language from "../../Localization/Language";
import { getRestaurants ,getCategories,setcategoryItem,setpostalItem} from "../../Redux Store/actions/restaurant";
import { getAddresses, addAddress } from "../../Redux Store/actions/user";
import { getPlaceName } from "../../Redux Store/actions/map";
import { getOrders } from "../../Redux Store/actions/order";
import { addItem, emptyCart } from "../../Redux Store/actions/cart";
import image from "../../assets/images/reach.png";
import CategoriesList from "../../Components/Restaurant/CategoriesList";
import Item from "../../Components/Menu/Item";

import SmallHeading from "../../Components/Heading/SmallHeading";
import HorizontalStatusCard from "../../Components/Cart/OrderStatus/HorizontalStatusCard";
import LocationHeader from "../../Components/Map/LocationHeader";
import { RestaurantLoader, CategoriesLoader } from "../../Components/Loader";
import NotFound from "../../Components/NotFound";
import NetInfo from "@react-native-community/netinfo";
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/messaging';
import { requestNotifications } from 'react-native-permissions';
import AsyncStorage from "@react-native-community/async-storage";
import { registerDevice } from '../../Redux Store/actions/user'
import { getCurrentOrders } from '../../Redux Store/actions/order'
import CurrentOrder from '../../Components/Cart/OrderStatus/CurrentOrder';
import PushNotification from 'react-native-push-notification';
import Wrapper from '../../Components/Wrapper';
import AddressList from '../../Components/Map/AddressList';
import Slider from '../../Components/slider/slider'
import {useDispatch,useSelector} from 'react-redux';
import _ from 'lodash';
var flag = false;



PushNotification.configure({
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
  largeIcon: "ic_launcher",
  smallIcon: "ic_launcher"
});

function setMenuItems(id){
  /*
  return  ()=>{
    const dispatch=useDispatch();
  const menuItemsNew=useSelector(x=>x.menuItemsNew);
  const getData=async()=>
  {
  const dataGet=  await getCategories(id)
    .then(res => res)
    .then(response =>
      response
    )
    .catch(err => console.log("current orders", err))
  }

  console.log(dataGet,"dddGet");
  }
  */
 
}

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currentOrders: [],
      visible: false,
      flag: true,
      menu:[],
      cart: [],
      filterdMenu:[],
      slidder:[],
      dlvmsg:{day:'',
      openingTime:'',
      closingTime:'',
      takeAwayTime:'',
      takeawayClose:'',
      message:''
    },
    };
  }

  fetchPostal= ()=>{

    if(this.props.postalReducer && this.props.postalReducer.length<=0)
    {
      const data=async () => {
        const response=  await fetch(`${url}delivery_charges`, {
            method: 'GET',
            headers: headers
        }).then(res => res.json())
        .then(response => {
          console.log("rpr",response)
          this.props.setpostalItem(response.response)

         return response.response
        });
      
      
        
      
      }
      data(); 

    }
   
    const data1=async () => {
      const response=  await fetch(`${url}delivery_timings`, {
          method: 'GET',
          headers: headers
      }).then(res => res.json())
      .then(response => {
        console.log("rprsdsdsdsdsd",response.response.id)
        this.setState({ dlvmsg:{day:response.response.day,
        openingTime:response.response.del_time_open,
        closingTime:response.response.del_time_close,
        takeAwayTime:response.response.pick_time_open,
        takeawayClose:response.response.pick_time_close,
        message:response.message
      }})
        //this.props.setpostalItem(response.response)

       return response.response
      });
    
    
      
    
    }
    data1(); 
  }
  fetchbanner= ()=>{

    const data=async () => {
      const response=  await fetch(`${url}banners`, {
          method: 'GET',
          headers: headers
      }).then(res => res.json())
      .then(response => {
        console.log("rprdddd",response)
        this.setState({slidder:response.response})
        //this.props.setpostalItem(response.response)

       return response.response
      });
    
    
      
    
    }
    data(); 

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
        this.setState({ menu: response.response ,filterdMenu:response.response});
        this.props.setcategoryItem(response)
      })
      .catch(err => console.log("current orders", err))
      
  }
  else
  {

    this.setState({ menu: this.props.menuItemsNew.response ,filterdMenu:this.props.menuItemsNew.response});
  }
  
}
mapItem = () => {
   
   if(this.state.menu.length>0)
   {

      return this.state.menu.map((itemx) =>   {

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

  componentDidMount() {
    
    const { latitude, longitude } = this.props.userLocation;
    this.checkPermission()  //for push notifications  
    this.props.getAddresses();
    this.fetchPostal();
    this.fetchbanner()
    //this.props.getRestaurants({ longitude: longitude, latitude: latitude });
    //this.props.getCategories();
   this.getCurrentOrders()
   this.getCat();
    AppState.addEventListener("change", this.handleAppStateChange);
    if (!global.messageListener)
      global.messageListener = firebase.messaging().onMessage(async message => {
        console.log(message);
        PushNotification.localNotification({
          autoCancel: true,
          largeIcon: 'ic_launcher',
          smallIcon: 'ic_launcher',
          vibrate: true,
          vibration: 300,
          message: message.notification.title,
          playSound: true,
          soundName: 'default',
        });
      });
  
 
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this.handleAppStateChange);
  }

  onRefresh = () => {
    const { latitude, longitude } = this.props.userLocation;
    this.setState({
      refreshing: true,
      refresh: !this.state.refresh
    });
    this.props.getRestaurants({ longitude: longitude, latitude: latitude });
    this.getCurrentOrders()
    setTimeout(() => this.setState({ refreshing: false }), 1000);
  }


  handleAppStateChange = (state) => {
    const { latitude, longitude } = this.props.userLocation;
    if (state == 'active') {
      this.props.getAddresses();
      this.props.getRestaurants({ longitude: longitude, latitude: latitude });
      this.getCurrentOrders()
    }
  }

  filterMenu=(id)=>{
    if(id==0)
    {
      this.setState({menu:this.state.filterdMenu})
    }
    else
    {
      const filterdData=this.state.filterdMenu.filter(x=>x.id==id);
      this.setState({menu:filterdData})
    }
  }
  getCurrentOrders = () => {
    this.props.getCurrentOrders()
      .then(res => res.json())
      .then(response => {
        this.setState({ currentOrders: response.response })
      })
      .catch(err => console.log("current orders", err))
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    console.log("Enabled", enabled)
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async requestPermission() {
    console.log("requesting permission")
    try {
      requestNotifications(['alert', 'sound', 'badge', 'lockScreen', 'notificationCenter'])
        .then(({ status, settings }) => {
          console.log(status, "notification status");
          console.log("settings", settings);
          this.getToken();
        });

    } catch (error) {
      console.log('permission rejected');
    }
  }

  async getToken() {
    await firebase.messaging().registerDeviceForRemoteMessages().then((res) => console.log("RESULT", res));
    let fcmToken = this.props.fcmToken ? this.props.fcmToken.token : null;
    console.log("fcm", fcmToken);
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken()
        .then(res => res)
        .catch(err => console.log("fcm error", err))
      if (fcmToken) {
        console.log("FCM TOKEN", fcmToken)
        this.registerDevice(fcmToken);
      }
    }
  }

  registerDevice = async fcmToken => {
    console.log("register method called")
    this.props.registerDevice({ token: fcmToken });
  };
/*
  renderRestaurants = () => {


    if (this.props.restaurants === null) {
      return <RestaurantLoader />;
    }
    if (this.props.restaurants.length === 0) {
      return (
        <View style={{ flex: 1, marginTop: this.state.currentOrders.length !== 0 ? '10%' : '45%', marginBottom: 20 }}>
          <NotFound
            image={image}
            subtitle={
              Language.seemsLikeThereAreNoRestaurantAvailableNearYourLocation
            }
            imageStyle={{ width: 130, height: 130 }}
            title={Language.outOfReach}
            buttonText={Language.selectAnotherLocation}
            onPress={() => this.props.navigation.navigate('map', { backToHome: true })}
          />
        </View>
      );
    }
    return (
      <View>
      <Slider/>
        <SmallHeading
          text={Language.categories}
          style={{ marginLeft: 10, marginVertical: 10 }}
        />
        <CategoriesList navigation={this.props.navigation} />
        <SmallHeading
          text={Language.allRestaurant}
          style={{ marginLeft: 10, marginVertical: 10 }}
        />
        <RestaurantCard navigation={this.props.navigation} data={this.props.restaurants} />
       
      </View>
    );
  };

  */


  render() {
    return (
      <Wrapper bottom={0}>  
        <LocationHeader
          navigation={this.props.navigation}
          location={this.props.userLocation}
          visible={this.state.visible}
          setVisible={(flag) => this.setState({ visible: flag })}
        />
        <Slider slidder={this.state.slidder}/>
        <View style={{height:30,backgroundColor:'white'}}
        
        >


        <TextTicker
          style={{ fontSize: 24 }}
          duration={10000}
          loop
          bounce
          scrollSpeed={1000}
          repeatSpacer={50}
        >
        <SmallHeading
          text={"Delivery Timings: "+this.state.dlvmsg.openingTime+" - "+this.state.dlvmsg.closingTime}
          style={{ marginLeft: 10, marginVertical: 5,fontSize:16,color:colors.primary}}
        /><SmallHeading
        text={" Takeaway Timings: "+this.state.dlvmsg.takeAwayTime+" - "+this.state.dlvmsg.takeawayClose}
        style={{ marginLeft: 10, marginVertical: 5,fontSize:16,color:colors.primary}}
        />
        </TextTicker>
        </View>
        <View style={{height:30,    backgroundColor: colors.primary,}}
        
        >
         <TextTicker
          style={{ fontSize: 24 }}
          duration={4000}
          loop
          bounce
          scrollSpeed={100}
          repeatSpacer={50}
        >
          <SmallHeading
        text={this.state.dlvmsg.message}
        style={{ marginLeft: 10, marginVertical: 5,fontSize:16,color:'white'}}
        />
        </TextTicker>
        </View>
        
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
          }
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
        <CategoriesList data={this.state.filterdMenu} handleCategoryChange={this.filterMenu} navigation={this.props.navigation} />
        
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
        <AddressList
          navigation={this.props.navigation}
          visible={this.state.visible}
          onClose={() => this.setState({ visible: false })}
          location={this.props.userLocation} />
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => {
  const { cartReducer, restaurants, userLocation, fcmToken ,menuItemsNew,postalReducer} = state;
  return { cartReducer, restaurants, userLocation, fcmToken ,menuItemsNew,postalReducer};
};

export default connect(mapStateToProps, {
  addAddress,
  getAddresses,
  getOrders,
  addItem,
  getPlaceName,
  getRestaurants,
  registerDevice,
  getCurrentOrders,
  emptyCart,
  getCategories,
  setcategoryItem,
  setpostalItem
})(Home);

const styles = StyleSheet.create({
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