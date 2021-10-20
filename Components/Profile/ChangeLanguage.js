import React, { Component } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar
} from "react-native";
import { setLanguage } from '../../Redux Store/actions/user';
import { connect } from 'react-redux';
import en from '../../assets/images/eng.jpg';
import it from '../../assets/images/it.jpg';
import { colors } from '../../assets/styletile';
import Icon from 'react-native-vector-icons/Entypo';
import { ModalLoader } from '../Loader';

const images={
    en:en,
    it:it
}


class ChangeLanguage extends Component {

    state={
        loading: false,
    }

    renderLanguages=()=>{
        return this.props.languages.map((lang,index)=>{
        if(index<2)        
        return <TouchableOpacity 
            key={lang.id} 
            onPress={async ()=>{
                this.setState({loading:true})
            this.props.setLanguage(lang,null,null,()=>{
                this.setState({loading:false})
                this.props.onClose()
            });            
        }} 
            activeOpacity={0.7}>
            <View style={styles.languageContainer}>
            <Text style={styles.language}>{lang.language}</Text>
            <Image source={images[lang.code]} style={styles.image}/>
            </View>
        </TouchableOpacity>
        })

    }

    render() {
        return (
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.props.visible}
                    onRequestClose={this.props.onClose}
                >
                    <ModalLoader visible={this.state.loading}/>
                    <StatusBar backgroundColor='rgb(162,66,67)'/>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.headingView}>
                            <Text style={styles.modalHeading}>Select Language</Text>
                            <Icon name='cross' style={styles.cancelIcon} onPress={this.props.onClose}/>
                            </View>
                            {this.renderLanguages()}                            
                        </View>                      
                    </View>
                </Modal>
        );
    }
}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#7d7d7d85'
    },
    modalView: {
        borderRadius:5,
        overflow:'hidden',
        minHeight: 200,
        width: '85%',
        shadowColor: colors.border,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41, elevation: 5,
        backgroundColor: 'white'
    },
    headingView:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        backgroundColor:colors.primary,
        alignItems:'center',
        padding:10,
        marginBottom:10

    },
    modalHeading: {
        fontFamily:'MS Trebuchet',
        color:'white',
        fontSize:20,
        fontWeight: 'bold',
    },
    cancelIcon:{
        fontSize:26,        
        color:'white',

    },
    text:{
        fontSize:18,
        color:colors.textPrimary,
        padding:10,
        textAlign: 'center',
    },
    languageContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:20, 
        padding:10,
        borderColor:colors.border,
        borderBottomWidth:1, 
        alignItems:'center'
    },
    language:{
        fontSize:16,
        color:colors.textPrimary

    },
    image:{
        width:40,
        height:25,
        resizeMode:'cover',
        alignSelf:'center',
    }
});


const mapStateToProps = state => {
    const {languages} = state;
    return {languages};
  };
  
  


  export default connect(mapStateToProps, {setLanguage})(ChangeLanguage);