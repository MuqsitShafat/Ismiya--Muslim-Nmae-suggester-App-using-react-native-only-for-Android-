import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Splash_screen = () => {
  return (
    <View style = {styles.container}>
      <Text style = {styles.text}>Ismiya</Text>
      <Text style = {styles.text_2}>Muslim Name Suggester</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor:"black",
        alignItems : 'center',
        justifyContent : 'center'
    },
    text : {
        color : "white",
        fontSize : 65,
        fontWeight  : "bold"
    },
    text_2 : {
        color : "#999"
    }

})
export default Splash_screen