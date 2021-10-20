import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image, Text, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, fonts } from '../../assets/styletile'
import * as Animatable from 'react-native-animatable';
import SearchList from './SearchList'
import { getCurrentLocation, getPlaceName,getPlaces,getPlaceDetail } from '../../Redux Store/actions/map';
import { connect } from 'react-redux'
import Language from '../../Localization/Language'


class SearchBar extends Component {

    state = {
        searchBar: this.props.searchBar,
        searchText: '',
        searching:false,
        searchingTimeOut:false,
        places:[],
        placeId:''
    }

    UNSAFE_componentWillReceiveProps(props) {
        if (props.searchBar !== this.state.searchBar)
            this.setState({ searchBar: props.searchBar })
    }

    textChangeHandler=(val)=>{
        if (this.state.searchingTimeOut) {
            clearTimeout(this.state.searchingTimeOut);
            this.setState({searching:true,places:[]})
         }
     
         this.setState({
            searchText:val,
            searching: false,
            searchingTimeOut: setTimeout(()=>{
                this.searchPlaces(val);
              }, 500)
         });
        
    }

    searchPlaces=()=>{
        this.props.getPlaces(this.state.searchText)
        .then(res=>res.json())
        .then(res=>{
            this.setState({places:res.predictions})
        })
        .catch(err=>console.log("Search places",err))

    }


    getPlaceDetail=(id)=>{
        this.setState({searchBar: false })
        this.props.getPlaceDetail(id)
        .then(res=>res.json())
        .then(res=>{
            const location =res.result.geometry.location;
            this.props.changeLocation({
                latitude:location.lat,longitude:location.lng
            })
        })
        .catch(err=>console.log("Place detail",err))
    }


    render() {
        if (!this.state.searchBar)
            return (
                <View style={styles.searchBar}>
                    <Icon name='arrow-back' style={styles.headerIcon} onPress={() => {
                        if (this.state.searchBar) this.setState({ searchBar: false })
                        else this.props.navigation.pop()
                    }} />
                    <Text
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        style={{ color: 'white', fontSize: 16, fontFamily: fonts.primary, width: '76%', alignSelf: 'center' }}>
                        {this.props.location}
                    </Text>
                    <Icon name='search' style={styles.headerIcon}
                        onPress={() => this.setState({ searchBar: true })} />
                </View>
            );
        else
            return (
                <View style={{ zIndex: 5, width: '100%' }}>
                    <Animatable.View                        
                        style={{ ...styles.searchBar, backgroundColor: colors.background }}>
                        <Icon name='arrow-back' style={{ ...styles.headerIcon, color: colors.primary }} onPress={() => {
                            if (this.state.searchBar) this.setState({ searchBar: false })
                            else this.props.navigation.navigate('tabBar')
                        }} />
                        <TextInput
                            autoFocus={true}
                            placeholder={Language.searchForLocation}
                            onChangeText={this.textChangeHandler}
                            value={this.state.searchText}
                            style={{
                                color: colors.primary,
                                fontSize: 14,
                                backgroundColor: 'white',
                                width: '76%',
                                alignSelf: 'center',
                                padding: 10
                            }} />

                        {this.state.searchText !== ''
                            ?
                            <Icon name='close'
                                style={{ ...styles.headerIcon, color: colors.primary }}
                                onPress={() => this.setState({ searchText: '',searching:false })} />
                            : <View />

                        }
                    </Animatable.View>
                    <SearchList 
                    searching={this.state.searching} 
                    searchText={this.state.searchText} 
                    places={this.state.places}
                    onSelectPlace={this.getPlaceDetail}
                    />
                </View>
            );
    }
}



const styles = StyleSheet.create({
    searchBar: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        height: 60,
        width: '100%',
        zIndex: 5,
        backgroundColor: colors.primary,
        padding: 10,
        shadowColor: colors.border,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41, elevation: 2
    },
    headerIcon: {
        color: 'white',
        fontSize: 24,
        marginHorizontal: '2%',
        width: '10%',
        alignSelf: 'center'
    }
});

export default connect(null, { getCurrentLocation, getPlaceName,getPlaces,getPlaceDetail })(SearchBar);