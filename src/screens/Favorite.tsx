import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Animated, SafeAreaView, ScrollView, Platform, Image, RefreshControl, TouchableOpacity, Modal, ActivityIndicator, Dimensions } from 'react-native'
import { Fonts } from './../refs/Fonts'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { NavigationType } from '../types/navigation'
import { Colors } from './../refs/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TouchableRipple } from 'react-native-paper'
import Icon from 'react-native-vector-icons/AntDesign'

type PropsList = {
    navigation: StackNavigationProp<NavigationType, "Favorite">
}

type recipeType = {
    key?: string,
    title: string,
    thumb: string,
    servings?: string,
    times?: string,
    dificulty?: string,
    author?: {
        user?: string,
        datePublished?: string
    },
    desc?: string,
    needItem: [],
    ingredient: [],
    step: [],
    secondary_thumb: string
}

const Favorite = (props: PropsList) => {
    const { height, width } = Dimensions.get("window")
    const { navigation } = props
    navigation.addListener('focus', () => {
        getFavoritData()
    })
    const [favoritData, setFavoritData] = useState([] as recipeType[])
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [selectedItem, setSelectedItem] = useState([] as recipeType[])
    const [isSelectedItem, setisSelectedItem] = useState(false)
    const [isTryingDelete, setIsTryingDelete] = useState(false)
    const [questionModal, setquestionModal] = useState(false)

    const AnimatedModalTranslate = useRef(new Animated.Value(height)).current
    useEffect(() => {
        // getFavoritData()
    }, [navigation])

    const getFavoritData = async() => {
        const stringData = await AsyncStorage.getItem('bookmark')
        if (stringData != null) {
            const parseData = JSON.parse(stringData) as recipeType[]
            parseData.reverse()
            setFavoritData(parseData)
        }
    }

    const onRefresh = () => {
        setIsRefreshing(true)
        setIsRefreshing(false)
        getFavoritData()
    }

    const ModalBottomView = async(isActive: boolean) => {
        if (isActive) {
            setquestionModal(true)
            Animated.timing(AnimatedModalTranslate, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }).start()
        } else {
            setquestionModal(false)
            Animated.timing(AnimatedModalTranslate, {
                toValue: height,
                duration: 100,
                useNativeDriver: true
            }).start()
        }
    }

    return (
        <SafeAreaView
            style = {{
                flex: 1,
                backgroundColor: Colors.background
            }}
        >
            <View style = {{ flexDirection: "row", padding: 20, alignItems: "center", justifyContent: "space-between" }} >
                {
                    !isSelectedItem ?
                    <Text
                        style = {{
                            fontFamily: Fonts.Lato.Bold,
                            color: Colors.primary_text,
                            fontSize: 20
                        }}
                    >
                        Favorit
                    </Text>
                    :
                    <>
                        <TouchableOpacity
                            onPress = {() => {
                                setSelectedItem([])
                                setisSelectedItem(false)
                            }}
                        >
                            <Icon name = "closecircleo" size = {20} color = "white" />
                        </TouchableOpacity>
                        <Text
                            style = {{
                                fontSize: 14,
                                fontFamily: Fonts.Lato.Bold,
                                color: Colors.primary_text,
                            }}
                        >
                            Dipilih {selectedItem.length} item
                        </Text>
                        <TouchableOpacity
                            onPress = {() => {
                                setSelectedItem(selectedItem.length == favoritData.length ? [] : favoritData)
                            }}
                        >
                            <Icon name = "menufold" size = {20} color = {selectedItem.length == favoritData.length ? Colors.blue : "white"} />
                        </TouchableOpacity>
                    </>
                }
            </View>
            <ScrollView
                refreshControl = {
                    <RefreshControl
                        refreshing = {isRefreshing}
                        onRefresh = {onRefresh}
                        progressBackgroundColor = {Colors.secondary_card}
                        colors = {[Colors.primary_text]}
                    />
                }
            >
                {
                    favoritData.map((item, index) => {
                        return (
                            <TouchableRipple
                                key = {index}
                                rippleColor = "rgba(255,255,255,0.15)"
                                underlayColor = "rgba(255,255,255,0.15)"
                                borderless = {Platform.Version < 28 ? false : true}
                                style = {{
                                    flexDirection: "row",
                                    marginHorizontal: 20,
                                    marginBottom: 10,
                                    borderBottomColor: Colors.background,
                                    borderBottomWidth: 1,
                                    borderRadius: 8,
                                    backgroundColor: Colors.secondary_card
                                }}
                                onPress = {() => {
                                    if (!isSelectedItem) {
                                        navigation.navigate("RecipesDetail", { key: item.key, thumb: item.secondary_thumb })
                                    } else {
                                        const newSelectedItem = selectedItem.includes(item) ? selectedItem.filter(value => value !== item) : selectedItem.concat(item)

                                        setSelectedItem(newSelectedItem)
                                    }
                                }}
                                onLongPress = {() => {
                                    setisSelectedItem(true)
                                    const newSelectedItem = selectedItem.includes(item) ? selectedItem.filter(value => value !== item) : selectedItem.concat(item)

                                    setSelectedItem(newSelectedItem)
                                }}
                            >
                                <>
                                    <Image
                                        source = {{uri: item.thumb != null ? item.thumb : item.secondary_thumb}}
                                        style = {{
                                            borderRadius: 8,
                                            width: "35%",
                                            height: 100,
                                            backgroundColor: Colors.secondary_text
                                        }}
                                    />
                                    <View
                                        style = {{
                                            padding: 5,
                                            width: "65%"
                                        }}
                                    >
                                        <Text
                                            style = {{
                                                fontSize: 12,
                                                color: Colors.secondary_text,
                                                fontFamily: Fonts.Lato.Bold,
                                                paddingBottom: 10
                                            }}
                                        >
                                            {item.dificulty}
                                        </Text>
                                        <Text
                                            numberOfLines = {3}
                                            style = {{
                                                color: Colors.primary_text,
                                                fontFamily: Fonts.Lato.Bold
                                            }}
                                        >
                                            {item.title}
                                        </Text>
                                    </View>
                                    {
                                        isSelectedItem ?
                                        <View
                                            style = {{
                                                position: "absolute",
                                                right: 5, bottom: 5,
                                                width: 28, height: 28,
                                                borderRadius: 24,
                                                borderColor: Colors.blue,
                                                borderWidth: 1,
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            {
                                                selectedItem.includes(item) ?
                                                <Icon
                                                    name = "checkcircle"
                                                    size = {24}
                                                    color = {Colors.blue}
                                                />
                                                : null
                                            }
                                        </View>
                                        : null
                                    }
                                </>
                            </TouchableRipple>
                        )
                    })
                }
            </ScrollView>
            {
                isSelectedItem ?
                <View
                    style = {{
                        backgroundColor: Colors.primary_card,
                        padding: 20,
                        borderTopStartRadius: 8,
                        borderTopEndRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        position: "absolute",
                        bottom: 0, left: 0, right: 0
                    }}
                >
                    <TouchableOpacity 
                        disabled = {selectedItem.length == 0 ? true : false} 
                        onPress = {async() => {
                            ModalBottomView(true)
                        }}
                    >
                        <Icon name = "delete" size = {24} color = {selectedItem.length == 0 ? Colors.secondary_text : "white"} />
                    </TouchableOpacity>
                    <Text
                        style = {{
                            color: Colors.primary_text,
                            fontSize: 12,
                            fontFamily: Fonts.Lato.Regular
                        }}
                    >
                        Hapus
                    </Text>
                </View>
                : null
            }
            <Modal
                visible = {isTryingDelete}
                transparent
            >
                <View style = {{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", alignItems: "center", justifyContent: "center" }} >
                    <View style = {{ padding: 20, borderRadius: 8, backgroundColor: Colors.secondary_card }} >
                        <ActivityIndicator size = "large" color = "white" />
                    </View>
                </View>
            </Modal>
            <Modal
                visible = {questionModal}
                onRequestClose = {() => ModalBottomView(false)}
                transparent
            >
                <TouchableOpacity
                    activeOpacity = {1}
                    style = {{
                        position: "absolute",
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: "rgba(0,0,0,0.75)"
                    }}
                    onPress = {() => ModalBottomView(false)}
                />
                <Animated.View
                    style = {{
                        borderTopEndRadius: 20,
                        borderTopStartRadius: 20,
                        backgroundColor: Colors.secondary_card,
                        padding: 20,
                        position: "absolute",
                        bottom: 0,
                        right: 0, left: 0,
                        transform: [{
                            translateY: AnimatedModalTranslate
                        }]
                    }}
                >
                    <Text
                        style = {{
                            fontFamily: Fonts.Lato.Bold,
                            fontSize: 20,
                            color: Colors.primary_text,
                            textAlign: "center",
                            marginBottom: 20
                        }}
                    >
                        Apakah anda yakin ingin menghapus?
                    </Text>
                    <TouchableOpacity
                        onPress = {async() => {
                            setIsTryingDelete(true)
                            const newData = []
                            for (const data of (favoritData || [])) {
                                if (!selectedItem.includes(data)) {
                                    newData.push(data)
                                }
                            }
                            await AsyncStorage.setItem('bookmark', JSON.stringify(newData))
                            setisSelectedItem(false)
                            setSelectedItem([])
                            getFavoritData()
                            ModalBottomView(false)
                            setIsTryingDelete(false)
                        }}
                        style = {{
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 20,
                            backgroundColor: Colors.blue,
                            marginVertical: 10,
                            padding: 15,
                        }}
                    >
                        <Text
                            style = {{
                                fontFamily: Fonts.Lato.Regular,
                                color: Colors.primary_text
                            }}
                        >
                            Hapus
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress = {async() => {
                            setSelectedItem([])
                            setisSelectedItem(false)
                            ModalBottomView(false)
                        }}
                        style = {{
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 20,
                            backgroundColor: Colors.secondary_text,
                            padding: 15
                        }}
                    >
                        <Text
                            style = {{
                                fontFamily: Fonts.Lato.Regular,
                                color: Colors.primary_text
                            }}
                        >
                            Batal
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
            </Modal>
        </SafeAreaView>
    )
}

export default Favorite