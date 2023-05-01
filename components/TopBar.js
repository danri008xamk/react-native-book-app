import React from "react"
import { StyleSheet, View, Text, Image } from "react-native"

const TopBar = (props) => {
    return (
        //All content will come as props from the App.js.
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={props.imgsrc} resizeMode="cover"/>
            </View>
            <Text style={styles.heading}>{props.heading}</Text>
            <Text style={styles.subheading}>{props.subheading}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        height: "35%",
        marginBottom: 10,
      },
    imageContainer: {
        width: "100%",
        height: "80%",
        overflow: "hidden"
      },
      heading: {
        color: "black",
        fontFamily: "serif",
        fontSize: 20,
        marginTop: 5
      },
      subheading: {
        fontFamily: "serif",
        fontStyle: "italic"
      }
});

export default TopBar;