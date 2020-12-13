import React, { useState, useEffect, useRef } from 'react'
import { Animated, View, Text, TouchableOpacity, Modal, Dimensions } from 'react-native'
import { Fonts } from '../refs/Fonts'
import { Colors } from './../refs/Colors'
import NetInfo from '@react-native-community/netinfo'

const ModalOffline = () => {
    const {height} = Dimensions.get("window")
    const [modalOffline, setmodalOffline] = useState(false)
    const AnimatedModalTranslate = useRef(new Animated.Value(height)).current

    useEffect(() => {
        CheckConnectivity()
    }, [NetInfo])
    
    const ModalBottomView = async(isActive: boolean) => {
        if (isActive) {
            setmodalOffline(true)
            Animated.timing(AnimatedModalTranslate, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }).start()
        } else {
            setmodalOffline(false)
            Animated.timing(AnimatedModalTranslate, {
                toValue: height,
                duration: 100,
                useNativeDriver: true
            }).start()
        }
    }

    const CheckConnectivity = () => {
        NetInfo.addEventListener(state => {
            if (!state.isConnected) {
                ModalBottomView(true)
            }
        })
    }

    return (
        <Modal
            visible = {modalOffline}
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
                    Anda tidak terhubung internet
                </Text>
                <TouchableOpacity
                    onPress = {() => {
                        ModalBottomView(false)
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
                        Mengerti
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        </Modal>
    )
}

export default ModalOffline