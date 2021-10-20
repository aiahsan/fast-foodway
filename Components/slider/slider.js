import React,{useEffect} from 'react';
import { StyleSheet, View, Text,Image,Dimensions } from 'react-native';
import Carousel from 'simple-carousel-react-native';

const DATA = [
  { id: '#1',image:'https://i.pinimg.com/originals/2c/90/9b/2c909b88a8678b09f0cb98198e2fcd1b.jpg' },
  { id: '#2',image:'https://img.freepik.com/free-psd/fast-food-web-banner-template_202595-117.jpg?size=626&ext=jpg' },
  { id: '#3',image:'https://i.pinimg.com/originals/2c/90/9b/2c909b88a8678b09f0cb98198e2fcd1b.jpg' },
];
 const windowWidth = Dimensions.get('screen').width;

export default ({slidder}) => {

  const renderItem = data => (
    <View key={data.id} style={styles.item}>
	<Image
      style={{width: '100%', height: 220,resizeMode:'stretch'}}
      source={{uri:data.image
    }}/>
    </View>
  );
  return (
    <View style={styles.container}>
    <Carousel height={200} width={windowWidth} showBubbles={false}>
    {slidder.map(x=>renderItem(x))}
    </Carousel>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    
 
  }});