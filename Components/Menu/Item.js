import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,TouchableOpacity,TouchableHighlight,
  StyleSheet,
} from "react-native";
import dummyimage from "../../assets/images/food2.jpg";
import { size, colors, headingstyle, fonts } from "../../assets/styletile";
import Icon from "react-native-vector-icons/AntDesign";
import SmallHeading from "../Heading/SmallHeading";
import { connect } from "react-redux";
import { addItem, deleteItem, emptyCart ,hanldeApitizer,clearApitizer} from "../../Redux Store/actions/cart";
import Alert from "../Alert";
import Language from '../../Localization/Language'
import Modal from 'react-native-modal';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import CheckBox from '@react-native-community/checkbox';
import { ScrollView } from "react-native-gesture-handler";
import _ from 'lodash';
class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      render: true,
      visableModal:false,
      isFirst:true,
      selectedAppitizers:[]
    };
  }

  addItem = (props) => {
    if (this.props.flag) {
      this.props.addItem(props);

      console.log("adddddddd",this.props.cartReducer)

        var checkLength=this.props.cartReducer.items.find(x=>x.id==props.id)
        
        
        if(this.state.isFirst==true)
      {
        this.setState({
          isFirst:false,
          visableModal:true
        })
      }

    if(!_.isEmpty(checkLength))
        {
          this.setState({
            isFirst:true,
            visableModal:false
          })
        }
      
    } else {
      this.setState({
        visible: true,
        title: Language.emptyCart,
      
        message: Language.youHaveItemsInCart,
      });
    }
  };

  renderButtons = () => {
    const { addItem, cartReducer, deleteItem, cart, ...rest } = this.props;
   
   if(cart)
   {
     if (cart.length !== 0) {
      return cart.map((item) => {
        if (item.id == rest.id) {
          return (
            <>
            <TouchableOpacity onPress={()=>this.setState({visableModal:true})}><Text style={{fontSize:12}}>Add Extra</Text></TouchableOpacity>
              <Icon
                name={"minussquare"}
                style={styles.icon}
                onPress={() => deleteItem(rest)}
              ></Icon>
              <Text>{item.quantity}</Text>
            </>
          );
        }
      });
    }
   }
  };

  emptyCart = (item) => {
    this.props.emptyCart();
    this.props.addItem(item);
    this.props.setFlag(true);
    this.setState({ visible: false, flag: true });
  };

  render() {
    const {
      addItem,
      cartReducer,
      emptyCart,
      deleteItem,
      cart,
      ...rest
    } = this.props;

  
   return (
      <>
     <Modal onBackButtonPress={()=>this.setState({visableModal:false})}  onBackdropPress={()=>this.setState({visableModal:false})} style={{flex:1}} isVisible={this.state.visableModal}>
        <ScrollView style={{paddingTop:'10%',paddingBottom:'10%'}}>
        <View style={{ flex: .5,backgroundColor:'white' }}>
        <TouchableOpacity style={{padding:10,backgroundColor:'#ca0202'}} onPress={()=>this.props.clearApitizer({
                      itemId:this.props.id,
                     })}><Text style={{fontSize:15,color:'white',textAlign:'center'}}>Clear</Text></TouchableOpacity>

          {
            this.props.extras.map(x=>{
              const itemx=this.props.cartReducer.items.find(x=>x.id==this.props.id);
              if(x.allow_multiple)
              if(x.allow_multiple==1)
          {
            return  <Collapse isCollapsed={true} >
              <CollapseHeader style={{backgroundColor:'#ca0202',padding:10}}>
                <View>
            <Text style={{color:'white'}}>{x.title}</Text>
                </View>
              </CollapseHeader>
              <CollapseBody>
               {

                 x.options.map(y=> {  
                 let foundx=false;
                  if(itemx && itemx.extras)
                  {
                    const filterd= itemx.extras.filter(x=>x.id==y.id);
                      if(filterd.length>0)
                      foundx=true
                  
                  }
                return <View style={styles.checkboxContainer}>
                  
                   <CheckBox
                    //value={filterd.length>0?true:false}
                    value={foundx}
                    style={styles.checkbox}
                     onTintColor="#ca0202"
                     onCheckColor	="#ca0202"
                     boxType="square"
                     onChange={()=>this.props.hanldeApitizer({
                      itemId:this.props.id,
                      optionId:y.id,
                      ...y,
                      type:'check'
                     })}
                     
/>
                   <View style={{display:'flex',justifyContent:'space-between',flexDirection:'row'}}>
                   <Text style={styles.label}>{y.title}</Text>
                   <Text style={styles.label}>{'\u00A3'+y.price}</Text>
                   </View>
                 </View>
                 })
               }
              </CollapseBody>
          </Collapse>
          
          }
              else if(x.allow_multiple==0)
            {
              return  <Collapse isCollapsed={true} >
              <CollapseHeader  style={{backgroundColor:'#ca0202',padding:10}}>
                <View>
            <Text style={{color:'white'}}>{x.title}</Text>
                </View>
              </CollapseHeader>
              <CollapseBody>
               {

                 x.options.map(y=> {  
                 let foundx=false;
                  if(itemx && itemx.extras)
                  {
                    const filterd= itemx.extras.filter(x=>x.id==y.id);
                      if(filterd.length>0)
                      foundx=true
                  
                  }
                return <View style={styles.checkboxContainer}>
                  
                
                <TouchableOpacity style={{marginTop:7,marginLeft:5}} onPress={()=>this.props.hanldeApitizer({
                      itemId:this.props.id,
                      optionId:y.id,
                      ...y,
                      type:'radio'
                     })}>
                <View style={[{
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#f3f3f3',
        alignItems: 'center',
        justifyContent: 'center',
      }]}>
        {
          foundx ?
            <View style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: '#000',
            }}/>
            : null
        }
      </View>
                </TouchableOpacity>
                   <Text style={styles.label}>{y.title}</Text>
                 </View>
                 })
               }
              </CollapseBody>
          </Collapse>
       
            }
            })
          }
       
       <TouchableOpacity style={{padding:10,backgroundColor:'#ca0202'}} onPress={()=>this.setState({visableModal:false})}><Text style={{fontSize:12,color:'white',textAlign:'center'}}>Close</Text></TouchableOpacity>

        </View>
 
        </ScrollView>
      </Modal>
      <TouchableWithoutFeedback>
        <View>
          <Alert
            visible={this.state.visible}
            title={this.state.title}
            message={this.state.message}
            extraButton={Language.discardCart}
            onClick={() => this.emptyCart(rest)}
            onClose={() => {
              this.setState({ visible: false });
            }}
          />
          <View
            style={{
              flexDirection: "row",
              padding: 20,
              marginTop: 5,
              marginBottom: 5,
              backgroundColor: "white",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,
              shadowColor: colors.border,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41, elevation: 1,
              ...this.props.style,
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* <Image
                source={{uri:rest.image}}
                style={{ width: 70, height: 70, borderRadius: 5 }}
              /> */}
            </View>
            <View
              style={{
                flex: 20,
                flexDirection: "column",
                paddingLeft: 15,
                justifyContent: "space-around",
              }}
            >
              <SmallHeading
                text={rest.title}
                style={{ textAlign: "left", fontSize: 18 }}
              />
              <Text
                style={{
                  fontSize: size.paragraph,
                  fontFamily: fonts.primary,
                  marginBottom: 5,
                }}
              >
                {rest.description}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: colors.textPrimary,
                  fontFamily: fonts.primary,
                }}
              >
                {rest.currency.code}{" "}              
                <Text
                  style={{
                    textDecorationLine: rest.hasDiscount
                      ? "line-through"
                      : "none",
                    textDecorationStyle: "solid",
                    color: rest.hasDiscount
                      ? colors.disabled
                      : colors.textPrimary,
                  }}
                >
                {rest.price}
                </Text>{" "}
                
                {rest.hasDiscount ?'\u00A3'+rest.discountedPrice : ""}
              </Text>
            </View>
            <View
              style={{
                position: "absolute",
                flex: 0.5,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                right: 10,
                bottom: 10,
              }}
            >
              {this.renderButtons()}
              <Icon
                name={"plussquare"}
                style={styles.icon}
                onPress={() => this.addItem(rest)}
              ></Icon>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    
      </>
     );
  }
}

const styles = StyleSheet.create({
  icon: {
    color: colors.primary,
    fontSize: 22,
    marginHorizontal: 5,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  checkbox: {
    alignSelf: "center",
    marginLeft:5,
    marginTop:5
  },
  label:{
    margin:10
  }
});

const mapStateToProps = (state) => {
  const { cartReducer } = state;
  return { cartReducer };
};

export default connect(mapStateToProps, { addItem, deleteItem, emptyCart,hanldeApitizer ,clearApitizer})(
  Item
);
