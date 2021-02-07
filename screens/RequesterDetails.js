import React from 'react';
import { View, Text, TextInput, Modal, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Alert, ScrollView} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'
import StackNavigator from '../components/StackNavigator'
import { Card } from 'react-native-elements'

export default class RequesterDetails extends React.Component {
constructor(props) {
    super(props)
    this.state = {
        userID: firebase.auth().currentUser.email,
        reciverID: this.props.navigation.getParam('Details')["userId"],
        requestID: this.props.navigation.getParam('Details')["requestID"],
        bookName: this.props.navigation.getParam('Details')["bookName"],
        requestReason: this.props.navigation.getParam('Details')["requestReason"],
        reciverContact: '',
        reciverName: '',
        reciverAddress: '',
        username: ''
    }
}

componentDidMount() {
    this.getReciverDetails()
}

getDonorUsername = () => {
    db.collection("Users").where("emailID", "==", this.state.userID).get()
    .then(snaphsot => {
        snaphsot.forEach((doc) => {
            this.setState({
                username: doc.data().first_name
            })
        })
    })
}

addNotification = () => {
    var message = this.state.username + " Donor Has Shown Interest in Donating the Book"
    db.collection("Notifications").add({
        reciverID: this.state.reciverID,
        donorID: this.state.userID,
        requestID: this.state.requestID,
        bookName: this.state.bookName,
        donationDate: firebase.firestore.FieldValue.serverTimestamp(),
        notificationStatus: "Unread",
        message: message
    })
}

getReciverDetails = () => {
    db.collection("Users").where("emailID", "==", this.state.reciverID).get()
    .then(snapshot => {
        snapshot.forEach((doc) => {
            this.setState({
                reciverName: doc.data().first_name,
                reciverAddress: doc.data().address,
                reciverContact: doc.data().mobilenumber
            })
        })
    })
}

updateBookStatus = () => {
    db.collection("AllDonations").add({
        bookName: this.state.bookName,
        reciverID: this.state.reciverID,
        requestID: this.state.requestID,
        donorID: this.state.userID,
        requestStatus: "Donor Interested"
    })
}

    render() {
        return(
            <View>
                <MyHeader
                navigation = {this.props.navigation}
                title = "Requester Details"
                />
                <View>
                <Card title = {"Book Information"}/>
                <Card>
                    <Text>Book Name: {this.state.bookName}</Text>
                </Card>
                <Card>
                    <Text>Request Reason: {this.state.requestReason}</Text>
                </Card>
                </View>
                <View>
                    <Card title = "Requester Information"/>
                    <Card>
                        <Text>Name: {this.state.reciverName}</Text>
                    </Card>
                    <Card>
                        <Text>Mobile Number: {this.state.reciverContact}</Text>
                    </Card>
                    <Card>
                        <Text>Address: {this.state.reciverAddress}</Text>
                    </Card>
                </View>
                <View>
                    {this.state.userID !== this.state.reciverID
                    ?(
                        <TouchableOpacity onPress = {() => {this.updateBookStatus()
                            this.addNotification()
                        this.props.navigation.navigate('Donations')}}>
                            <Text>Donate Book</Text>
                        </TouchableOpacity>
                        ): null}
                </View>
            </View>
        )
    }
}