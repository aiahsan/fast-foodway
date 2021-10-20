import React, { Component } from 'react';
import { Rating, AirbnbRating } from 'react-native-elements';
import { colors } from '../assets/styletile';

class StarRating extends Component {

    render() {
        return (

            <Rating
                type="custom"
                imageSize={this.props.size?this.props.size:28}
                readonly={this.props.readonly?this.props.readonly:false}
                ratingCount={5}
                startingValue={this.props.rating?this.props.rating:1}
                minValue={1}
                ratingColor={this.props.color?this.props.color:colors.third}
                ratingBackgroundColor={this.props.backgroundColor?this.props.backgroundColor:colors.darkBackground}
                tintColor={this.props.tintColor?this.props.tintColor:'white'}
                onFinishRating={this.props.updateRating}
                style={{ marginBottom: 20 ,...this.props.style}}
            />

        );
    }
}

export default StarRating;