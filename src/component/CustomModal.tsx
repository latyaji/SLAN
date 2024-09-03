import React from "react";
import { Modal, View,Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { globalStyles } from "../utils/GlobalCss";
import {
  scale as s,
  verticalScale as vh,
  moderateScale as ms,
} from 'react-native-size-matters';


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
                width: s(10),
                height: vh(10),
                resizeMode: 'contain',
                marginBottom: vh(2),
                marginTop: vh(1),
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
        fontSize: 16,
        marginBottom: 20,
      },
      cancelButton: {
        // backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
      },
      cancelButtonText: {
        color: '#FE6725',
        fontSize: 16,
      },
      modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      alertContainer: {
        width: 300,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: s(20),
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
      },
      heading: {
        fontSize: s(18),
        fontWeight: 'bold',
        marginBottom: vh(10),
      },
       html: {
    fontSize: s(14), // Adjust as needed
    color: '#333', // Adjust as needed
  },
})


