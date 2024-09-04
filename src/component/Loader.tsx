import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import {View} from "react-native"
import { Colors } from "../utils/Colors";


const Loader = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator color={Colors.Orange} size={"large"}/>
        </View>
    )
}

export default Loader

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        zIndex: 1000,
    }
})