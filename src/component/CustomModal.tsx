import React from "react";
import { Modal, View,Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { globalStyles } from "../utils/GlobalCss";
import {
  scale as s,
  verticalScale as vh,
  moderateScale as ms,
} from 'react-native-size-matters';
import { Config } from "../utils/Config";
import { Colors } from "../utils/Colors";


interface CustomModalProps{
    visible: boolean,
    onClose:()=>void,
    title?:string;
    image?:any
} 

const CustomModal = ({visible,onClose,title,image}:CustomModalProps) =>{
    return(
        <Modal
        transparent={true}
        visible={visible}
        animationType="slide"
        onRequestClose={onClose}>
        <View style={styles.modalBackground}>
          <View style={styles.alertContainer}>
            <Text style={styles.heading}>Alert</Text>
            <View style={globalStyles.alertBorder} />
            <Image
              source={image}
              style={{
                width: s(27),
                height: vh(25),
                resizeMode: 'contain',
                marginBottom: vh(2),
                marginTop: vh(8),
              }}
            />
            <Text style={styles.title}>{title}</Text>
           
            <View style={globalStyles.alertBorder} />
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
}
export default CustomModal


const styles = StyleSheet.create({
    title: {
        fontSize: s(14),
        marginBottom: vh(15),
        fontFamily:Config.regular,
        color: Colors.black,
        textAlign:"center"
      },
      cancelButton: {
        // backgroundColor: '#007bff',
        padding: s(10),
        borderRadius: s(5),
      },
      cancelButtonText: {
        color: '#FE6725',
        fontSize: s(16),
        fontFamily:Config.regular
      },
      modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
      },
      alertContainer: {
        width: 300,
        backgroundColor: '#fff',
        borderRadius: 35,
        padding: s(20),
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
      },
      heading: {
        fontSize: s(18),
        fontFamily:Config.medium,
        marginBottom: vh(10),
        color:Colors.black
      },
       html: {
    fontSize: s(14), // Adjust as needed
    color: '#333', // Adjust as needed
  },
})


