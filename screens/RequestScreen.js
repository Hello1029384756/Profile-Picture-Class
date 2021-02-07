import React from 'react';
import { View, Text, TextInput, Modal, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Alert, ScrollView} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'

export default class RequestScreen extends React.Component {
constructor() {
    super()
    this.state = {
        userId: firebase.auth().currentUser.email,
        bookName: "",
        requestReason: "",
        requestBookName: "",
        bookStatus: "",
        docid: "",
        activeBookRequest: false,
        userdocid: ""
    }
} 

componentDidMount() {
    this.BookRequest()
    this.getActiveBookRequest()
}

requestBook = async(bookName, requestReason) => {
    var userId = this.state.userId
    var requestID = this.uniqueID()
    db.collection('RequestBook').add({
        userId: userId,
        bookName: bookName,
        requestReason: requestReason,
        requestID: requestID,
        bookStatus: "Requested"
        })
    await this.BookRequest()
    db.collection("Users").where("emailID", "==", userId).get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            db.collection("Users").doc(doc.id).update({
                activeBookRequest: true
            })
        })
    })
    this.setState({
        bookName: "",
        requestReason: ""
    })
    Alert.alert("Book Requested Succesfully")
}

getActiveBookRequest = () => {
    db.collection('Users').where("emailID", "==", this.state.userId)
    .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
            this.setState({
                activeBookRequest: doc.data().activeBookRequest,
                userdocid: doc.id
            })
        })
    })
}

BookRequest = async() => {
    var bookRequest = db.collection("RequestBook").where("userId", "==", this.state.userId).get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            if(doc.data().bookStatus !== "Recieved"){
                this.setState({
                    requestID: doc.data().requestID,
                    requestBookName: doc.data().bookName,
                    bookStatus: doc.data().bookStatus,
                    docid: doc.id
                })
            }
        })
    })
}

updateStatusRequest = () => {
    db.collection("RequestBook").doc(this.state.docid).update({
        bookStatus: "Recieved"
    })
    db.collection("Users").where("emailID", "==", this.state.userId).get()
    .then((snapshot) =>{
        snapshot.forEach((doc) => {
            db.collection("Users").doc(doc.id).update({
                activeBookRequest: false
            })
        })
    })
}

uniqueID() {
    return(Math.random().toString(36).substring(7))
}

    render() {
                if(this.state.activeBookRequest === true) {
                    return(
                        <View>
                            <MyHeader 
                             navigation = {this.props.navigation}
                            title = "Request"/>
                            <Text>Book Name</Text>
                            <Text>{this.state.requestBookName}</Text>
                            <Text>Book Status</Text>
                            <Text>{this.state.bookStatus}</Text>
                            <TouchableOpacity onPress = {() => this.updateStatusRequest()}>
                                <Text>Book Recieved</Text>
                            </TouchableOpacity>
                        </View>
                    )
                } else {
                    
                return(
                    
                <KeyboardAvoidingView style={styles.keyBoardStyle}>
                <MyHeader 
                    navigation = {this.props.navigation}
                    title = "Request"/>
                <TextInput
                style = {styles.formTextInput}
                placeholder = "Book Name"
                onChangeText = {(text) => {
                    this.setState({
                        bookName: text
                    })
                }}/>
                <TextInput
                style = {[styles.formTextInput, {height: 300}]}
                placeholder = "Why Do You Want This Book"
                onChangeText = {(text) => {
                    this.setState({
                        requestReason: text
                    })
                }}/>
                <TouchableOpacity style={styles.button} onPress = {() => {this.requestBook(this.state.bookName, this.state.requestReason)}}>
                    <Text>Request Book</Text>
                </TouchableOpacity>
                </KeyboardAvoidingView>
                )}
    }
}

const styles = StyleSheet.create({
    keyBoardStyle : {
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
    formTextInput:{
      width:"75%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10,
    },
    button:{
      width:"75%",
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop:20
      },
    }
  )