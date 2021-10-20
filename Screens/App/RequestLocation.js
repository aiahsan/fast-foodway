import React, { Component } from 'react';
import { View, Image ,Platform} from 'react-native';
import {connect} from 'react-redux';
import { setLocation} from '../../Redux Store/actions/user';
import { getLocation,getCurrentLocation} from '../../Redux Store/actions/map';
import { bindActionCreators } from 'redux';
import LargeHeading from '../../Components/Heading/LargeHeading'
import SmallHeading from '../../Components/Heading/SmallHeading'
import GradientButton from '../../Components/Button/GradientButton'
import SimpleButton from '../../Components/Button/SimpleButton'
import img from '../../assets/images/map2.png'
import Language from '../../Localization/Language'
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';


class RequestLocation extends Component {
    
    state={
        loading: false,
    }


    requestPermission = async => {
        if (Platform.OS == 'android') {
          request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
            switch (result) {
              case RESULTS.GRANTED:
                this.getCurrentLocation()
                break;
            case RESULTS.DENIED || RESULTS.BLOCKED:
                this.getLocation()
                break;
            }
          });
        } 
        else {
          request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
            switch (result) {
              case RESULTS.GRANTED:
                this.getCurrentLocation()
                break;
            case RESULTS.DENIED || RESULTS.BLOCKED:
                    this.getLocation()
                    break;
            }
          });
        }
      };

      
    getCurrentLocation = () => {
        this.setState({loading:true})
        this.props.getCurrentLocation(() => {
            this.setState({loading: false})
            this.props.navigation.navigate('tabBar')
        })
    }

    getLocation=()=>{
        this.setState({loading:true})
        this.props.getLocation(()=>this.setState({loading:false}))
    }

    render() {
        return (
            <View style={{flex:1,justifyContent:'space-around',padding:20}}>
                <LargeHeading text={Language.findAwesomeDealsNearYou}
                style={{
                    textTransform:'uppercase',width:'70%',alignSelf:'center'
                    }}/>
                <Image source={img} style={{
                    width:'80%',
                    resizeMode:'contain',
                    alignSelf:'center'
                }}/>
                <SmallHeading text={Language.weNeedToAccessYourLocation} style={{textAlign:'center'}}/>
                <View>
                    <GradientButton text={Language.allowAccessToMyLocation} 
                    loading={this.state.loading}
                    onPress={this.requestPermission}
                    style={{width:'80%', alignSelf:'center',marginBottom:20}}/>
                </View>
            
            </View>
        );
    }
}

  export default connect(null, {setLocation,getLocation,getCurrentLocation})(RequestLocation);
  