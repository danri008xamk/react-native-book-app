import React from "react"
import { View, Text, StyleSheet } from "react-native"

//Component is used when rendering flatlist items.
const BookCard = (props) => {
    return (
        //Card style will depend on whether book is archived or not.
        <View style={props.archived == 1 ? styles.archivedCard : styles.card}>
            <Text style={styles.cardtext}>{props.book}</Text> 
            <Text style={styles.bytext}>by</Text>
            <Text style={styles.cardtext}>{props.author}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        marginTop:10,
        alignItems: "center",
        borderBottomWidth: 1,
        borderStyle: "dashed",
        width: "100%",
        backgroundColor: "#bfd8ff",
        padding: 5
    },
    cardtext: {
        color: "black",
        fontSize: 15
    },
    bytext: {
        fontStyle: "italic"
    },
    archivedCard: {
        marginTop:10,
        alignItems: "center",
        borderBottomWidth: 1,
        borderStyle: "dashed",
        width: "100%",
        backgroundColor: "#dbf5d0",
        padding: 5
    }
})

export default BookCard;