import React, { useState, useEffect, useRef } from 'react'
import { Animated, View, Text, TouchableOpacity, Modal, Dimensions } from 'react-native'
import { Fonts } from '../refs/Fonts'
import { Colors } from './../refs/Colors'
import NetInfo from '@react-native-community/netinfo'
import Icon from 'react-native-vector-icons/AntDesign'

const ModalOffline = () => {
    const {height,width} = Dimensions.get("window")
    const opacity = useRef(new Animated.Value(0)).current


    useEffect(() => {
        CheckConnectivity()
    }, [NetInfo])
    
    const NetDisconnect = async(isActive?: boolean) => {
        if (isActive) {
            Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }).start()
        } else {
            Animated.timing(opacity, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true
            }).start()
        }
    }

    const CheckConnectivity = () => {
        NetInfo.addEventListener(state => {
            if (!state.isConnected) {
                NetDisconnect(true)
            }
        })
    }

    return (
        <Animated.View style = {{ height: 30, position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: Colors.secondary_card, alignItems: 'center', justifyContent: "center", flexDirection: "row",opacity }} >
            <Icon name = "disconnect" size = {16} color = {Colors.primary_text} />
            <Text style = {{ fontFamily: Fonts.Lato.Regular, color: Colors.primary_text }} >
                Tidak ada koneksi
            </Text>
        </Animated.View>
    )
}

export default ModalOffline