import { openDatabase } from "react-native-sqlite-storage";

var db = openDatabase({name: "books.db"});
var tableName = "books";

export const init = () => {
    const promise = new Promise((resolve, reject)=> {
        db.transaction((tx) => {
            tx.executeSql('DROP TABLE IF EXISTS ' + tableName, []); //Will clear the database table for testing purposes. This line can be commented out.
            tx.executeSql("create table if not exists " + tableName + " (id integer not null primary key, author text not null, book text not null, archived bit);",
            [],
            //Function to call if transaction succeeds
            () => {
                resolve();
            },
            //Function to call if fails
            (_,err) => {
                reject(err);
            }
            );
        }
        )
    })
    return promise;
}

//Function for saving a new book to database.
//Author and book name are gotten as user input. Id will be generated automatically.
export const addBook = (author, book) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('insert into ' + tableName + " (author, book) values (?, ?);",
            [author, book],
            () => {resolve()},
            (_,err) => {reject(err)}
            )
        })
    });
    return promise;
} 

//Returns a table of all book objects in the database.
export const fetchBooks = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql("select * from " + tableName, [],
            (tx, result) => {
                resolve(result.rows.raw());
            },
            (tx, err) => {
                reject(err)
            }
            )
        })
    })
    return promise;
}

//Gives an archive flag to selected book.
//Archived is a byte and value 1 represents value true.
export const setBookArchived = (id) => {
    const promise = new Promise((resolve, reject)=> {
        db.transaction((tx) => {
            tx.executeSql("update " + tableName + " set archived=1 where id=?",
            [id],
            () => {
                resolve();
            },
            (_,err) => {
                reject(err)
            }
            )
        })
    })
    return promise;
}

//Deletes selected book from the database.
export const deleteBook = (id) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('delete from ' + tableName + ' where id=?;',
            [id],
            () => {
                resolve();
            },
            (_,err) => {
                reject(err)
            })
        })
    })
}