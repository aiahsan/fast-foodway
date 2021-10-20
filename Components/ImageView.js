import React from 'react';
import FastImage from 'react-native-fast-image'
import defaultImage from '../assets/images/default.png';


export default ImageView = (props) => {
    const { style, imageUrl, children, resizeMode, localImage } =props; 
    let image = localImage || defaultImage;
    let url ={ uri: imageUrl, priority: FastImage.priority.normal }
    return (
        <FastImage
            style={style}
            resizeMode={!resizeMode ? FastImage.resizeMode.center : resizeMode}
            source={imageUrl ? url :image}>
            {children}
        </FastImage>
    )
};
