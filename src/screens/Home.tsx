import React, { useEffect, useRef, useState } from 'react'
import { 
    View, 
    Text, 
    Image, 
    Animated, 
    ScrollView, 
    SafeAreaView, 
    FlatList, 
    Dimensions, 
    Platform, 
    ActivityIndicator, 
    RefreshControl, 
    Modal, 
    TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { API } from './../refs/API'
import { Fonts } from './../refs/Fonts'
import { Colors } from './../refs/Colors'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { NavigationType } from '../types/navigation'
import Indicator from './../components/Indicator'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableRipple } from 'react-native-paper'
import ModalOffline from './../components/ModalOffline'

type PropsList = {
    navigation: StackNavigationProp<NavigationType, "Home">,
    route: RouteProp<NavigationType, "Home">
}

type recipesType = {
    title: string,
    thumb: string,
    key: string,
    times: string,
    portion: string,
    dificulty: string
}

type categoriesType = {
    category: string,
    key: string,
    url: string
}

const { width, height } = Dimensions.get("window")

const Loading = () => {
    return (
        <>
        <Text
            style = {{
                fontFamily: Fonts.Lato.Bold,
                fontSize: 20,
                margin: 20,
                color: Colors.primary_text
            }}
        >
            Kategori
        </Text>
        <View style = {{ flexDirection: "row" }} >
            <View
                style = {{
                    height: 200,
                    width: width - 40,
                    backgroundColor: Colors.secondary_card,
                    borderRadius: 8,
                    marginHorizontal: 20,
                }}
            />
        </View>

        <Text
            style = {{
                fontFamily: Fonts.Lato.Bold,
                fontSize: 20,
                margin: 20,
                color: Colors.primary_text
            }}
        >
            Resep Makanan
        </Text>
        <View style = {{ flexDirection: "row", flexWrap: "wrap" }} >
            <View
                style = {{
                    height: 200,
                    width: width / 2 - 30,
                    backgroundColor: Colors.secondary_card,
                    borderRadius: 8,
                    marginLeft: 20,
                    marginRight: 10,
                    marginBottom: 20
                }}
            />
            <View
                style = {{
                    height: 200,
                    width: width / 2 - 30,
                    backgroundColor: Colors.secondary_card,
                    borderRadius: 8,
                    marginLeft: 10,
                    marginRight: 20,
                    marginBottom: 20
                }}
            />
            <View
                style = {{
                    height: 200,
                    width: width / 2 - 30,
                    backgroundColor: Colors.secondary_card,
                    borderRadius: 8,
                    marginLeft: 20,
                    marginRight: 10,
                    marginBottom: 20
                }}
            />
            <View
                style = {{
                    height: 200,
                    width: width / 2 - 30,
                    backgroundColor: Colors.secondary_card,
                    borderRadius: 8,
                    marginLeft: 10,
                    marginRight: 20,
                    marginBottom: 20
                }}
            />
        </View>
        </>
    )
}

const Home = (props: PropsList) => {
    const {navigation, route} = props
    useEffect(() => {
        getCategories()
        getRecipes()
        animatedViewMore()
    }, [])
    const [categories, setCategories] = useState([] as categoriesType[])
    const [recipes, setRecipes] = useState([] as recipesType[])
    const [isTryingLoadData, setIsTryingLoadData] = useState(false)    
    const [anyOtherData, setAnyOtherData] = useState(true)
    const [viewMoreVisible, setViewMoreVisible] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [scrollUp, setScrollUp] = useState(false)
    const [modalItem, setModalItem] = useState<recipesType>()

    const scrollX = useRef(new Animated.Value(0)).current
    const scrollY = useRef(new Animated.Value(0)).current
    const scale = useRef(new Animated.Value(1)).current
    const opacity = useRef(new Animated.Value(1)).current
    const AnimatedModalTranslate = useRef(new Animated.Value(height)).current
    const scrollViewRef = useRef<ScrollView>()


    let page = 1

    const animatedViewMore = () => {
        Animated.timing(scale, {
            toValue: 0.75,
            duration: 500,
            useNativeDriver: true
        }).start(() => {
            Animated.timing(scale, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }).start(() => {
                animatedViewMore()
            })
        })
    }

    const ModalBottomView = async(isActive: boolean, item?: any) => {
        if (isActive) {
            setModalItem(item)
            setModalVisible(true)
            Animated.timing(AnimatedModalTranslate, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }).start()
        } else {
            setModalVisible(false)
            Animated.timing(AnimatedModalTranslate, {
                toValue: height,
                duration: 100,
                useNativeDriver: true
            }).start(() => {
                setModalItem(undefined)
            })
        }
    }

    const getCategories = () => {
        API.CategoryRecipes({
            callback: {
                onSuccess: resJson => {
                    setCategories(resJson.results)
                    setIsRefreshing(false)
                },
                onFailed: results => {
                    setIsRefreshing(false)
                }
            }
        })        
    }
    const getRecipes = () => {
        API.RecipesByPage({
            params: {
                page
            },
            callback: {
                onSuccess: resJson => {
                    const results = resJson.results
                    const newData = JSON.parse(JSON.stringify(recipes)).concat(results)

                    setRecipes(newData)

                    setIsTryingLoadData(false)
                    if(resJson.results.length == 10) {
                        page += 1
                    } else {
                        setAnyOtherData(false)
                    }
                    setIsRefreshing(false)
                },
                onFailed: results => {
                    setIsTryingLoadData(false)
                    setIsRefreshing(false)
                }
            }
        })
    }

    const onRefresh = () => {
        setIsRefreshing(true)
        setCategories([])
        setRecipes([])

        getCategories()
        getRecipes()
    }

    return (
        <>
        <SafeAreaView
            style = {{
                backgroundColor: Colors.background,
                flex: 1
            }}
        >
            {
                categories.length == 0 ?
                <Loading />
                :
                <>
                    <Animated.ScrollView
                        ref = {scrollViewRef}
                        onScroll = {Animated.event(
                            [{nativeEvent: { contentOffset: { x: scrollY }}}],
                            {
                                listener: (event: any) => {
                                    const contentY = event.nativeEvent.contentOffset.y
                                    if (contentY > ( height / 3 )) {
                                        setScrollUp(true)
                                    } else {
                                        setScrollUp(false)
                                    }
                                    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize} : any) => {
                                        const paddingToBottom = 20
                                        return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom
                                    }
                                    if (isCloseToBottom(event.nativeEvent)) {
                                        if(!isTryingLoadData && anyOtherData) {
                                            setIsTryingLoadData(true)
                            
                                            getRecipes()
                                        }
                                    }
                                    setTimeout(() => {
                                        Animated.timing(opacity, {
                                            toValue: 0,
                                            duration: 500,
                                            useNativeDriver: true
                                        }).start(() => {
                                            setViewMoreVisible(false)
                                        })
                                    }, 400)
                                },
                                useNativeDriver: true
                            }
                            // {useNativeDriver: true}
                        )}
                        refreshControl = {
                            <RefreshControl
                                refreshing = {isRefreshing}
                                onRefresh = {onRefresh}
                                progressBackgroundColor = {Colors.secondary_card}
                                colors = {[Colors.primary_text]}
                            />
                        }
                    >
                        <Text
                            style = {{
                                fontFamily: Fonts.Lato.Bold,
                                fontSize: 20,
                                margin: 20,
                                color: Colors.primary_text
                            }}
                        >
                            Kategori
                        </Text>
                        <Animated.FlatList
                            data = {categories}
                            keyExtractor = {(item, index) => String(index)}
                            horizontal
                            showsHorizontalScrollIndicator = {false}
                            scrollEventThrottle = {16}
                            pagingEnabled
                            // snapToInterval = {width}
                            onScroll = {Animated.event(
                                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                                {useNativeDriver: true}
                            )}
                            renderItem = {({item, index}) => {
                                const inputRange = [
                                    (index - 1) * width,
                                    index * width,
                                    (index + 1) * width
                                ]
                                
                                const translateX = scrollX.interpolate({
                                    inputRange,
                                    outputRange: [
                                        -width, 0, width
                                    ]
                                })
                                const opacity = scrollX.interpolate({
                                    inputRange,
                                    outputRange: [
                                        0, 1, 0
                                    ]
                                })

                                return (
                                    <View
                                        style = {{
                                            height: 200,
                                            width: width - 40,
                                            // backgroundColor: "gainsboro",
                                            borderRadius: 8,
                                            marginHorizontal: 20,
                                            overflow: "hidden"
                                        }}
                                    >
                                        <Animated.Image
                                            source = {{uri: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=631&q=80"}}
                                            style = {{
                                                position: "absolute",
                                                top: 0, left: 0, bottom: 0, right: 0,
                                                transform: [{translateX}]
                                            }}
                                        />
                                        <LinearGradient
                                            colors = {["rgba(0,0,0,0)", "rgba(0,0,0,0.5)"]}
                                            style = {{
                                                position: "absolute",
                                                top: 0, left: 0, bottom: 0, right: 0,
                                                opacity: 0.5
                                            }}
                                        />
                                        <TouchableRipple
                                            underlayColor = "rgba(255, 255, 255, 0.3)"
                                            rippleColor = "rgba(255, 255, 255, 0.3)"
                                            onPress = {() => {}}
                                            style = {{
                                                width: "100%",
                                                height: "100%",
                                                justifyContent: "flex-end"
                                            }}
                                        >
                                            <Animated.Text
                                                style = {{
                                                    color: "white",
                                                    fontFamily: Fonts.Lato.Bold,
                                                    fontSize: 24,
                                                    margin: 20,
                                                    opacity
                                                    // position: "absolute",
                                                    // bottom: 20,
                                                    // left: 20,
                                                    // right: 20
                                                }}
                                            >
                                                {item.category}
                                            </Animated.Text>
                                        </TouchableRipple>
                                    </View>
                                )
                            }}
                        />
                        <View
                            style = {{
                                alignSelf: "center",
                                margin: 20
                            }}
                        >
                            <Indicator ScrollX = {scrollX} data = {categories} color = {Colors.secondary_text} />
                        </View>
                        <Text
                            style = {{
                                fontFamily: Fonts.Lato.Bold,
                                fontSize: 20,
                                marginHorizontal: 20,
                                color: Colors.primary_text,
                                marginBottom: 20
                            }}
                        >
                            Resep Makanan
                        </Text>
                        <View style = {{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", alignContent: "center" }} >
                            {
                                recipes.map((item, index) => {
                                    return (
                                        <View
                                            key = {index}
                                            style = {{
                                                width: width / 2 - 30,
                                                backgroundColor: Colors.background,
                                                marginLeft: index % 2 == 0 ? 20 : 10,
                                                marginRight: index % 2 == 0 ? 10 : 20,
                                                marginBottom: 20,
                                                overflow: "hidden",
                                                borderRadius: 8
                                            }}
                                        >
                                            <TouchableRipple
                                                rippleColor = "rgba(255,255,255,0.15)"
                                                underlayColor = "rgba(255,255,255,0.15)"
                                                borderless = {Platform.Version < 28 ? false : true}
                                                onPress = {() => {
                                                    ModalBottomView(true, item)
                                                }}
                                                style = {{
                                                    width: "100%",
                                                    backgroundColor: Colors.background,
                                                    borderRadius: 8
                                                }}
                                            >
                                                <>
                                                    <Image
                                                        source = {{uri: item.thumb}}
                                                        style = {{
                                                            height: 200,
                                                            width: "100%",
                                                            backgroundColor: Colors.secondary_text,
                                                            borderRadius: 8
                                                        }}
                                                    />
                                                    <Text
                                                        style = {{
                                                            fontFamily: Fonts.Lato.Bold,
                                                            marginTop: 10,
                                                            marginHorizontal: 10,
                                                            fontSize: 12,
                                                            color: Colors.secondary_text
                                                        }}
                                                    >
                                                        {item.dificulty}
                                                    </Text>
                                                    <Text
                                                        style = {{
                                                            fontFamily: Fonts.Lato.Regular,
                                                            margin: 10,
                                                            color: Colors.primary_text
                                                        }}
                                                    >
                                                        {item.title}
                                                    </Text>
                                                </>
                                            </TouchableRipple>
                                        </View>
                                    )
                                })
                            }
                        </View>
                        {
                            isTryingLoadData ?
                            <View
                                style = {{
                                    margin: 20,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flex: 1
                                }}
                            >
                                <ActivityIndicator
                                    size = 'large'
                                    color = {Colors.secondary_text}
                                />
                            </View>
                            : null
                        }
                    </Animated.ScrollView>
                    {
                        viewMoreVisible ?
                        <Animated.View
                            style = {{
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                                backgroundColor: Colors.blue,
                                borderRadius: 20,
                                position: "absolute",
                                bottom: 20,
                                alignSelf: "center",
                                flexDirection: "row",
                                alignItems: "center",
                                transform: [{scale}],
                                opacity
                            }}
                        >
                            <Icon
                                size = {14}
                                name = "arrowdown"
                                color = "white"
                            />
                            <Text
                                style = {{
                                    color: "white",
                                    fontFamily: Fonts.Lato.Regular,
                                    marginLeft: 5
                                }}
                            >
                                More
                            </Text>
                        </Animated.View>
                        : null
                    }
                    {
                        scrollUp ?
                        <View
                            style = {{
                                position: "absolute",
                                bottom: 20,
                                right: 20,
                                backgroundColor: Colors.secondary_card,
                                padding: 10,
                                borderRadius: 8,
                                shadowColor: Colors.secondary_text,
                                shadowOffset: {
                                    width: 0,
                                    height: 5,
                                },
                                shadowOpacity: 0.36,
                                shadowRadius: 6.68,

                                elevation: 11,
                            }}
                        >
                            <TouchableOpacity
                                onPress = {() => {
                                    setScrollUp(false)
                                    scrollViewRef.current?.scrollTo({x: 0, y: 0, animated: true})
                                }}
                                style = {{
                                    width: "100%",
                                    height: "100%"
                                }}
                            >
                                <Icon
                                    name = "totop"
                                    size = {24}
                                    color = {Colors.primary_text}
                                />
                            </TouchableOpacity>
                        </View>
                        : null
                    }
                </>
            }
            <Modal
                visible = {modalVisible}
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
                    <ScrollView
                        showsVerticalScrollIndicator = {false}
                    >
                        <Image
                            source = {{uri: modalItem?.thumb}}
                            style = {{
                                width: '100%',
                                height: 200,
                                backgroundColor: Colors.secondary_text,
                                borderRadius: 8
                            }}
                        />
                        <Text
                            style = {{
                                fontFamily: Fonts.Lato.Bold,
                                color: Colors.primary_text,
                                fontSize: 20,
                                marginTop: 20
                            }}
                        >
                            {modalItem?.title}
                        </Text>
                        <Text
                            style = {{
                                fontFamily: Fonts.Lato.Bold,
                                color: Colors.secondary_text,
                                fontSize: 15,
                                marginTop: 10
                            }}
                        >
                            Kesulitan
                        </Text>
                        <Text style = {{ fontFamily: Fonts.Lato.Regular, fontSize: 13, color: Colors.primary_text }} >{modalItem?.dificulty}</Text>

                        <Text
                            style = {{
                                fontFamily: Fonts.Lato.Bold,
                                color: Colors.secondary_text,
                                fontSize: 15,
                                marginTop: 10
                            }}
                        >
                            Waktu
                        </Text>
                        <Text style = {{ fontFamily: Fonts.Lato.Regular, fontSize: 13, color: Colors.primary_text }} >{modalItem?.times}</Text>
                        <Text
                            style = {{
                                fontFamily: Fonts.Lato.Bold,
                                color: Colors.secondary_text,
                                fontSize: 15,
                                marginTop: 10
                            }}
                        >
                            Porsi
                        </Text>
                        <Text style = {{ fontFamily: Fonts.Lato.Regular, fontSize: 13, color: Colors.primary_text }} >{modalItem?.portion}</Text>
                    </ScrollView>
                    <TouchableRipple
                        style = {{
                            backgroundColor: Colors.blue,
                            width: "100%",
                            padding: 20,
                            borderRadius: 8,
                            marginTop: 20,
                            shadowColor: Colors.secondary_text,
                            shadowOffset: {
                                width: 0,
                                height: 5,
                            },
                            shadowOpacity: 0.36,
                            shadowRadius: 6.68,

                            elevation: 11,
                        }}
                        onPress = {() => {
                            navigation.navigate("RecipesDetail", { key: modalItem?.key, thumb: modalItem?.thumb })
                            ModalBottomView(false)
                        }}
                        rippleColor = "rgba(0,0,0,0.15)"
                        underlayColor = "rgba(0,0,0,0.15)"
                        borderless = {Platform.Version < 28 ? false : true}
                    >
                        <Text
                            style = {{
                                textAlign: "center",
                                fontFamily: Fonts.Lato.Regular,
                                fontSize: 16,
                                color: Colors.primary_text
                            }}
                        >
                            Detail
                        </Text>
                    </TouchableRipple>
                </Animated.View>
            </Modal>
            <ModalOffline />
        </SafeAreaView>
        </>
    )

}

export default Home
