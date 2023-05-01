import React, { useEffect, useState } from "react";
import { Button, Modal, Text, TextInput, View, StyleSheet } from "react-native";

const AddBookView = (props) => {
    //Form input will be saved into these state variables.
    const[author, setAuthor] = useState("");
    const[book, setBook] = useState("");
    
    //This state variable will be used in the disable property of the input button.
    //Save button will be disabled until input is ok (meaning that both input fields have strings in them).
    const[inputOk, setInputOk] = useState(false)

    const closeView = () => {
        //Clear input data from the form
        setAuthor("");
        setBook("");
        //Close updating modal
        props.setVisibility(false)
    }

    const addBook = () => {
        //Call function to save book into device database
        props.saveBook(author, book);

        //Clear data in the form
        setAuthor("");
        setBook("");

        //Close updating modal
        props.setVisibility(false);
    }

    //Effect hook checks the values of author and book.
    useEffect(() => {
        //If both author and book have some input in them, inputOk variable will be set to true. This enable the use of save button.
        if(author.trim().length > 0 && book.trim().length > 0) {
            setInputOk(true)
        } else {
            setInputOk(false) //If author or book value is empty, save-button will be disabled.
        }
    }, [author, book])

    return(
        <Modal visible={props.visible}>
            <View style={styles.formcontainer}>
                <Text style={styles.heading}>Add a new book to the reading list</Text>
                <Text>Author:</Text>
                <TextInput value={author} style={styles.inputfield} onChangeText={(value) => setAuthor(value)}/>
                <Text>Book name:</Text>
                <TextInput value={book} style={styles.inputfield} onChangeText={(value) => setBook(value)}/>
                <View style={styles.buttonrow}>
                    <Button style={styles.button} title="Cancel" onPress={closeView} color="red"/>
                    <Button style={styles.button} title="Save" disabled={!inputOk} onPress={addBook}/>
                </View>
            </View>
        </Modal>    
    )
}

const styles = StyleSheet.create({
    formcontainer: {
        alignItems: "center"
    },
    inputfield: {
        backgroundColor: "lightgrey",
        borderWidth: 1,
        width: "90%",
        marginBottom: 10
    },
    buttonrow: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around",
        margin: 10
    },
    heading: {
        fontSize: 20
    }
})

export default AddBookView;