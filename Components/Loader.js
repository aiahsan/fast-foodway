import React, { Component } from 'react';
import LottieView from 'lottie-react-native';
import { View, ScrollView, Modal, StatusBar, Dimensions, FlatList } from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';
import { Text } from 'react-native';
import { colors } from '../assets/styletile'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const width = Dimensions.get("window").width;

export class AddressLoader extends Component {
    render() {
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                key={Math.random().toString()}
                data={[1, 2,3,4,5]}
                style={{ flex: 1, }}
                keyExtractor={(item) => item.id}
                horizontal={false}
                renderItem={({ item }) => (<SkeletonPlaceholder speed={2000} highlightColor={colors.lightBackground} backgroundColor={colors.border}>
                    <View style={{
                        flexDirection: "row",
                        padding: '5%',
                        borderColor: colors.border,
                        borderBottomWidth: 2
                    }}>
                        <View style={{
                            width: 50, height: 50, borderRadius: 30, marginRight: 20, alignSelf: 'flex-start'
                        }} />
                        <View>
                            <View style={{
                                width: width * 0.5, height: 20, borderRadius: 5
                            }} />
                            <View style={{
                                width: width * 0.7, height: 20, borderRadius: 5, marginVertical: 8
                            }} />
                            <View style={{
                                width: width * 0.6, height: 20, borderRadius: 5
                            }} />
                        </View>
                    </View>
                </SkeletonPlaceholder>

                )}
            />

        );
    }
}


export class OrdersLoader extends Component {
    render() {
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                key={Math.random().toString()}
                data={[1, 2, 3]}
                style={{ flex: 1, }}
                keyExtractor={(item) => item.id}
                horizontal={false}
                renderItem={({ item }) => (<SkeletonPlaceholder speed={2000} highlightColor={colors.lightBackground} backgroundColor={colors.border}>
                    <View style={{
                        padding: '5%',
                        borderColor: colors.border,
                        borderBottomWidth: 2
                    }}>
                        <View style={{ flexDirection: "row", marginBottom: 10 }}>
                            <View style={{
                                width: 60, height: 60, borderRadius: 5, marginRight: 20
                            }} />
                            <View>
                                <View style={{
                                    width: 0.4 * width, height: 30, borderRadius: 5
                                }} />
                                <View style={{
                                    width: 0.6 * width, height: 20, borderRadius: 5, marginVertical: 8
                                }} />

                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <View style={{
                                    width: 0.5 * width, height: 15, borderRadius: 5
                                }} />
                                <View style={{
                                    width: 0.3 * width, height: 15, borderRadius: 5, marginTop: 8
                                }} />
                            </View>
                            <View style={{
                                width: 0.3 * width, height: 30, borderRadius: 10, alignSelf: 'flex-end'
                            }} />

                        </View>

                    </View>
                </SkeletonPlaceholder>

                )}
            />

        );
    }
}




export class ReviewsLoader extends Component {
    render() {
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                key={Math.random().toString()}
                data={[1, 2, 3]}
                style={{ flex: 1, }}
                keyExtractor={(item) => item.id}
                horizontal={false}
                renderItem={({ item }) => (<SkeletonPlaceholder speed={2000} highlightColor={colors.lightBackground} backgroundColor={colors.border}>
                    <View style={{
                        padding: '5%',
                        borderColor: colors.border,
                        borderBottomWidth: 2
                    }}>
                        <View style={{ flexDirection: "row", marginBottom: 10 }}>
                            <View style={{
                                width: 60, height: 60, borderRadius: 5, marginRight: 20
                            }} />
                            <View>
                                <View style={{
                                    width: 0.4 * width, height: 30, borderRadius: 5
                                }} />
                                <View style={{
                                    width: 0.6 * width, height: 20, borderRadius: 5, marginVertical: 8
                                }} />

                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <View style={{
                                    width: 0.5 * width, height: 15, borderRadius: 5
                                }} />
                                <View style={{
                                    width: 0.3 * width, height: 15, borderRadius: 5, marginTop: 8
                                }} />
                            </View>
                            <View style={{
                                width: 0.3 * width, height: 30, borderRadius: 10, alignSelf: 'flex-end'
                            }} />

                        </View>

                    </View>
                </SkeletonPlaceholder>

                )}
            />

        );
    }
}




export class CategoriesLoader extends Component {
    render() {
        return (
            <FlatList
                showsHorizontalScrollIndicator={false}
                key={Math.random().toString()}
                data={[1, 2, 3]}
                style={{ flex: 1, }}
                keyExtractor={(item) => item.id}
                horizontal={true}
                renderItem={({ item, index }) => (<SkeletonPlaceholder speed={2000} highlightColor={colors.lightBackground} backgroundColor={colors.border}>
                    <View style={{
                        marginTop:20,
                        marginBottom:10,
                        width: width * 0.45,
                        height: width * 0.35,
                        marginRight: 10,
                        borderRadius: 10,
                        marginLeft: index == 0 ? 10 : 0
                    }}>
                    </View>
                </SkeletonPlaceholder>

                )}
            />

        );
    }
}



export class RestaurantLoader extends Component {
    render() {
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                key={Math.random().toString()}
                data={[1,2,3,4]}
                style={{ flex: 1, }}
                keyExtractor={(item) => item.id}
                horizontal={false}
                renderItem={({ item }) => (<SkeletonPlaceholder speed={2000} highlightColor={colors.lightBackground} backgroundColor={colors.border}>
                    <View style={{
                        margin: 10,
                        width: width,
                        alignSelf: 'center',
                        borderRadius: 20

                    }}>
                        <View style={{margin:10}}>
                        <View style={{
                            height: 150, borderRadius: 15, marginBottom: 10
                        }} />
                        <View style={{
                            width: width * 0.6, height: 30, borderRadius: 5
                        }} />
                        <View style={{
                            width: width * 0.7, height: 20, borderRadius: 5, marginVertical: 8
                        }} />
                        <View style={{
                            width: width * 0.4, height: 20, borderRadius: 5
                        }} />
                        </View>

                    </View>
                </SkeletonPlaceholder>

                )}
            />

        );
    }
}



export class ModalLoader extends Component {
    render() {
        return (<Modal
            animationType="fade"
            transparent={true}
            visible={this.props.visible}
        >
            <View style={{ flex: 1, alignItems: "center", justifyContent: 'center', backgroundColor: '#7d7d7d85' }}>
                <StatusBar backgroundColor='rgb(162,66,67)' />
                <MaterialIndicator
                    style={{ flex: 0 }}
                    count={3}
                    size={60}
                    color={colors.primary}
                />
            </View>
        </Modal>)
    }
}



export class WishlistLoader extends Component {
    render() {
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                key={Math.random().toString()}
                data={[1, 2, 3,4,5,6]}
                style={{ flex: 1, }}
                keyExtractor={(item) => item.id}
                horizontal={false}
                renderItem={({ item }) => (<SkeletonPlaceholder speed={2000} highlightColor={colors.lightBackground} backgroundColor={colors.border}>
                    <View style={{
                        padding: '5%',
                        borderColor: colors.border,
                        borderBottomWidth: 2
                    }}>
                        <View style={{ flexDirection: "row", marginBottom: 10 }}>
                            <View style={{
                                width: 60, height: 60, borderRadius: 5, marginRight: 20
                            }} />
                            <View>
                                <View style={{
                                    width: 0.4 * width, height: 30, borderRadius: 5
                                }} />
                                <View style={{
                                    width: 0.6 * width, height: 20, borderRadius: 5, marginVertical: 8
                                }} />

                            </View>
                        </View>
                    </View>
                </SkeletonPlaceholder>

                )}
            />

        );
    }
}