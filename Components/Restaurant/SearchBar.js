import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../assets/styletile'
import Language from "../../Localization/Language"

class SearchBar extends Component {

    state = {
        search: '',
        flag: false
    }


    renderIcon = () => {
        if (this.state.flag) {
            return <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    this.setState({ flag: false, search: '' })
                    this.props.setFlag(false)
                    this.input.blur()
                }}>
                <Icon name='md-arrow-back'

                    color={colors.textSecondary}
                    style={{ fontSize: 20, margin: 15 }} />
            </TouchableOpacity>

        }
        else {
            return <Icon name='md-search'
                color={colors.textSecondary}
                style={{ fontSize: 20, margin: 15 }} />

        }
    }


    render() {
        return (
            <View style={{
                backgroundColor: colors.background,
                padding: 15,
                shadowColor: colors.border,
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.40,
                shadowRadius: 3.41,
                elevation: 1
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    backgroundColor: colors.lightBackground,
                    borderRadius: 50
                }}>
                    {this.renderIcon()}
                    <TextInput
                        ref={(ref) => this.input = ref}
                        placeholder={Language.searchForRestaurantsAndDishes}
                        onChangeText={(val) => {
                            this.setState({ search: val });
                            this.props.onSearch(val)
                        }}
                        onFocus={() => { this.props.setFlag(true); this.setState({ flag: true }) }}
                        value={this.state.search}
                        style={{ width: '75%', marginRight: 20 }} />
                    {this.state.search !== ''
                        ?
                        <Icon
                            color={colors.textSecondary}
                            onPress={() => this.setState({ search: '' })}
                            name='md-close'
                            style={{ fontSize: 20, position: 'absolute', right: 15 }} />
                        :
                        <View></View>}
                </View>
            </View>
        );
    }
}

export default SearchBar;