import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, View, Button, FlatList, TouchableOpacity, Alert} from 'react-native';
import BookCard from './components/BookCard';
import TopBar from './components/TopBar';
import AddBookView from './components/AddBookView';
import { init, addBook, fetchBooks, setBookArchived, deleteBook } from './database/bookdb';

//Initialize database of books when the application starts
init()
.then(() => {console.log("Database succesfully created")})
.catch((err) => {console.log("Database not initialized: " + err)})

const App = () => {
  //State variable which is used to render list of books to the screen.
  const [booklist, setBooklist] = useState([]);
  //Boolean to tell if modal view to add new book should be visible or not.
  const[addModalVisibility, setAddModalVisibility] = useState(false);
  //Boolean to tell if archived (=read) books should be shown in the list of books.
  const[showRead, setShowRead] = useState(false);

  //Four asynchronous functions (getAllBooks, saveBook, archiveBook, deleteBook) will call functions in bookdb.js.
  //bookdb.js has all the functionalities related to database which is saved on the device.
  //Error message will be printed on console if something goes wrong with database handling.
  async function getAllBooks() {
    try {
      const dbresult = await fetchBooks();
      setBooklist(dbresult);
    }
    catch(err) {
      console.log("Error when fetching books: " + err)
    }
  }

  async function saveBook(author, book) {
    try {
      await addBook(author, book);
    }
    catch(err) {
      console.log("Error when saving book: " + err)
    }

    getAllBooks(); //After adding new book, an updated version of books must be fetched to the state variable which is rendered to screen.
  }

  async function archiveBook(id) {
    try {
      await setBookArchived(id);
      console.log("Archive!")
    }
    catch(err) {
      console.log("Error when archiving: " + err)
    }
    getAllBooks(); //Updated version of database is fetched to the state variable.
  }

  async function deleteBookDb(id) {
    try {
      await deleteBook(id);
    }
    catch(err) {
      console.log(err)
    }
    getAllBooks();
  }

  //Effect hook has an empty table as second parameter, so it will be called only one time when application starts.
  useEffect(() => {
    //For testing, two books will be added to the database.
    saveBook("Jane Austen", "Sense and Sensibility");
    saveBook("Haruki Murakami", "IQ84")
    //When app starts, books will be fetched from databased and saved to the state variable.
    getAllBooks();
  }, [])

  //Alert window that will pop up if flatlist's book item is pressed.
  const modifyAlert = (book) => {
    Alert.alert(
      "Do you want to delete this book from the reading list?",
      book.author + ": " + book.book, //Books information will be shown on second row
      [{
        text: "Cancel",
        onPress: () => {} //Since cancel doesn't have any action, alert will close without doing anything.
      },
    {
      text: "Ok",
      onPress: () => {deleteBookDb(book.id)}
    }, 
    {
     text: "Archive (Mark as read)",
     onPress: () => {archiveBook(book.id)}
    }]
    )
  }

  //Component that will be used as renderItem of the flatlist.
  const renderBook = (book) => {
    return(
      //Longpress will toggle an alert window.
      <TouchableOpacity onLongPress={() => {modifyAlert(book.item)}}>
        <BookCard author={book.item.author} book={book.item.book} archived={book.item.archived}/>
      </TouchableOpacity>
    )
  }

  return (
        <View style={styles.container}>
          <AddBookView 
            visible={addModalVisibility}
            saveBook={saveBook}
            setVisibility={setAddModalVisibility} 
          />
          <TopBar 
            imgsrc={require("./assets/bookpile.jpg")}
            heading="Books to read"
            subheading="So many books, so little time" 
          />
          <View style={styles.buttonview}>
            <Button onPress={() => setAddModalVisibility(true)} title="Add a new book to be read"/>
          </View>
          <View style={styles.listcontainer}>
            <Text style={{fontSize: 18, color: "black", textAlign: "center"}}>Reading list:</Text>
            {/*Button will toggle if archived books should be shown on the list or not.*/}
            <Button
              color="#5c969e"
              title={showRead ? "Hide read books" : "Show read books"} 
              onPress={() => {setShowRead(!showRead)}}
            />
            <FlatList
              style={styles.liststyle} 
              //If read books are shown, data will be booklist state variable as it is.
              //If read books are hidden, archived books will be filtered out.
              data={showRead ? booklist : booklist.filter((book) => book.archived != 1)}
              keyExtractor={(book) => book.id}
              renderItem={renderBook}
            />
          </View>
        </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    flexDirection: "column",
  },
  listcontainer: {
    marginTop: 10,
    width: "80%",
    alignItems: "center",
    flex: 1
  },
  liststyle: {
    width: "100%",
    alignContent: "center"
  }
});

export default App;