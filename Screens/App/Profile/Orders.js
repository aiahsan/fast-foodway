import React, { Component } from 'react';
import { Text, View, ScrollView , SafeAreaView} from 'react-native';
import Header from '../../../Components/Header';
import OrderItem from '../../../Components/Profile/OrderItem';
import { colors } from '../../../assets/styletile';
import image from '../../../assets/images/orders.png'
import NotFound from "../../../Components/NotFound";
import Language from '../../../Localization/Language'
import { connect } from 'react-redux';
import {getOrders} from '../../../Redux Store/actions/order'
import {OrdersLoader} from '../../../Components/Loader'
import { FlatList } from 'react-native';
import Wrapper from '../../../Components/Wrapper';


class Orders extends Component {

    state={
        loading: true,
        data: []
    }


    componentDidMount = () => {
      this.fetchOrders();
      };

      fetchOrders=()=>{
        this.setState({loading: true})
        this.props.getOrders()
        .then(res=>res.json())
        .then(response=>{
          console.log("ORDERSS",response.response[0])
          this.setState({data: response.response, loading:false})
        })
        .catch(err=>console.log("orders screen",err))
      }

      showOrders=()=> {
          return(
            <FlatList
            showsVerticalScrollIndicator={false}
            key={Math.random().toString()}
            data={this.state.data}
            style={{ flex: 1, }}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <OrderItem
                data={item}
                navigation={this.props.navigation}
              />
            )}
          />
          )
      }


      showNoOrders=()=> {
        return (
            <NotFound
              title={Language.youHaveNotPlacedOrder}
              image={image}
            />
          );
      }

      renderItem=()=>{
        if(this.state.loading)
          return <OrdersLoader/>
        else{
          if (this.state.data.length!==0){
            return this.showOrders()
           }
         else {
           return this.showNoOrders()
         }
        }
      }


    render() {
        return (
            <Wrapper>
              <Header title={Language.myOrders} left='arrow-left' 
                leftNavigation={() => this.props.navigation.pop()} />               
                {this.renderItem()}
            </Wrapper>
        );
    }
}


export default connect(null, { getOrders })(Orders);