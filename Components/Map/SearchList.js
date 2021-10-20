import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image, Text, TextInput, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, fonts } from '../../assets/styletile'
import * as Animatable from 'react-native-animatable';
import { UIActivityIndicator } from 'react-native-indicators';
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native';

class SearchList extends Component {

    state={
        visible:true
    }

    renderList = (props, index) => {
        return <TouchableNativeFeedback
            onPress={()=>this.props.onSelectPlace(props.place_id)}
            background={TouchableNativeFeedback.Ripple(colors.lightBackground, false)}>
            <View style={{ ...styles.listView, borderTopWidth: index == 0 ? 0 : 1 }}>
                <Icon name='location-on' style={styles.listIcon} />
                <Text style={styles.listText} numberOfLines={1}
                    ellipsizeMode='tail'>{props.description}</Text>
            </View>
        </TouchableNativeFeedback>

    }


    renderIndicator = () => {
        if (this.props.searchText !== '') {
            return <UIActivityIndicator color={colors.darkBackground} size={24} style={styles.indicator} />

        }
    }

    render() {
        return (
            <View style={styles.container}>
                {(this.props.places.length !== 0 && this.props.searchText !== '')
                    ?
                    <Animatable.View style={styles.listContainer}>
                        <FlatList
                        keyboardShouldPersistTaps='handled'
                            showsVerticalScrollIndicator={false}
                            key={Math.random().toString()}
                            data={this.props.places}
                            style={{ flex: 1 }}
                            contentContainerStyle={styles.itemContainer}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item, index }) => (this.renderList(item))}
                        />
                    </Animatable.View>
                    :
                    this.renderIndicator()
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        minHeight: '50%',
        paddingBottom: 20
    },
    listContainer: {
        flex: 1,
        overflow: 'hidden',
    },
    itemContainer: {
        backgroundColor: colors.background,
        alignSelf: 'center',
        borderColor: colors.border,
        borderTopWidth: 1,
        paddingBottom: 10,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        shadowColor: colors.border,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41, elevation: 2,
    },
    indicator: {
        flex: 0,
        paddingVertical: 20,
        backgroundColor: colors.background,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        shadowColor: colors.border,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41, elevation: 2
    },
    listView: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 15,
        borderColor: colors.border,
        borderTopWidth: 1,
        paddingHorizontal: 15

    },
    listIcon: {
        fontSize: 20,
        color: colors.textSecondary,
        marginRight: 15

    },
    listText: {
        fontFamily: fonts.secondary,
        color: colors.textSecondary,
        width: '90%'

    }
})



export default SearchList;