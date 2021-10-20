import React, { Component } from 'react';
import { Text, View, ScrollView, SafeAreaView, FlatList, StatusBar } from 'react-native';
import Header from '../../../Components/Header';
import ReviewItem from '../../../Components/Restaurant/ReviewItem';
import { connect } from "react-redux";
import { getReviews } from "../../../Redux Store/actions/restaurant";
import { ToastAndroid } from 'react-native';
import { OrdersLoader, AddressLoader } from '../../../Components/Loader';
import NotFound from '../../../Components/NotFound';
import image from '../../../assets/images/review2.png'
import Language from '../../../Localization/Language'
import Wrapper from '../../../Components/Wrapper';
import { colors, fonts } from '../../../assets/styletile'




class Reviews extends Component {

  state = {
    loading: false,
    data: [],
    id: this.props.route.params.id
  }


  componentDidMount = () => {
    this.getReviews()
  };

  getReviews = () => {
    this.setState({ loading: true });
    this.props.getReviews({ restaurant_id: this.state.id })
      .then(async (response) => {
        var response = await response.json();
        if (response.success) {
          this.setState({ loading: false, data: response.response });
        } else {
          this.setState({ loading: false });
        }
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
      });
  }


  renderLoader = () => {
    if (this.state.loading)
      return <AddressLoader />
    else {
      if (this.state.data.length !== 0)
        return <FlatList
          showsVerticalScrollIndicator={false}
          key={Math.random().toString()}
          data={this.state.data}
          style={{ flex: 1 }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ReviewItem item={item} />
          )}
        />
      else return <NotFound
        image={image}
        title={Language.noReviewsAvailiable}
      />
    }
  }


  render() {
    return (
      <Wrapper>
        <StatusBar
          backgroundColor={colors.statusBar}
          translucent={false}
        />
        <Header title={Language.reviews} left='arrow-left'
          leftNavigation={() => this.props.navigation.pop()} />
        {this.renderLoader()}
      </Wrapper>
    );
  }
}

export default connect(null, { getReviews })(Reviews);