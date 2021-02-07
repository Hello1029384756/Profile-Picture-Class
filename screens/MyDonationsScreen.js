import React from 'react';
import { View, Text, TextInput, Modal, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Alert, ScrollView} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'
import { ListItem, Icon } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';

export default class MyDonationsScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            userID: firebase.auth().currentUser.email,
            allDonations: []
        }
        this.requestRef = null
    }

componentDidMount() {
    this.getAllDonations()
}

getAllDonations = () => {
    this.requestRef = db.collection("AllDonations").where("donorID", "==", this.state.userID)
    .onSnapshot(snapshot => {
        var allDonations = []
        snapshot.docs.map((document) => {
            var donation = document.data()
            donation["doc_id"] = document.id
            allDonations.push(donation)
            this.setState({
                allDonations: allDonations
            })
        })
    })
}

sendNotifications = (bookDetails, requestStatus) => {
    var requestID = bookDetails.requestID
    var donorID = bookDetails.donorID
    db.collection("Notifications").where("requestID", "==", requestID).where("donorID", "==", donorID).get()
    .then((snapshot)=> {
        snapshot.forEach((doc) => {
            if(requestStatus === "Book Sent"){
                message = this.state.donorName + "Wants to send you the book"
            } else {
                message = this.state.donorName + "Has shown interest in donating the book"
            }
            db.collection("Notifications").doc(doc.id).update({
                message: message,
                donationDate: firebase.firestore.FieldValue.serverTimestamp(),
                notificationStatus: "Unread"
            })
        })
    })
}

sendBook = (item) => {
    if(item.requestStatus === "Book Sent") {
        var requestStatus = "Donor Interested"
        db.collection("AllDonations").doc(item.doc_id).update({
            requestStatus: "Donor Interested"
        })
        this.sendNotifications(item, requestStatus)
    } else {
        var requestStatus = "Book Sent"
        db.collection("AllDonations").doc(item.doc_id).update({
            requestStatus: "Book Sent"
        })
        this.sendNotifications(item, requestStatus)
    }
}

keyExtractor = (item, index) => index.toString()
renderItem = ({item, i}) => (
    <ListItem
    key = {i}
    title = {item.bookName}
    subtitle = {"Requested By: " + item.reciverID + "\nStatus: " + item.requestStatus}
    rightElement = {<TouchableOpacity onPress = {()=> {this.sendBook(item)}}><Text>{item.requestStatus === "Book Sent"?"Book Sent": "Send Book"}</Text></TouchableOpacity>}
    />
)

render() {
    return(
        <View>
            <View>
            <MyHeader navigation = {this.props.navigation}
            title = "My Donations"/>
            <View>
                {
                    this.state.allDonations.length === 0
                    ?(<Text>Book Donations</Text>)
                    :(<FlatList
                        keyExtractor = {this.keyExtractor}
                        data = {this.state.allDonations}
                        renderItem = {this.renderItem}
                        />)
                }
            </View>
            </View>
        </View>
    )
}

}