import React from 'react';
import {View, Text, TextInput, Modal, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Alert, ScrollView, FlatList} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import  MyHeader  from '../components/MyHeader';
import { Icon, ListItem } from 'react-native-elements'
import { SwipeListView } from 'react-native-swipe-list-view'
import SwipeList from '../components/SwipeList'

export default class NotificationsScreen extends React.Component {
constructor(props){
    super(props)
    this.state = {
        userID: firebase.auth().currentUser.email,
        allNotifications: []
    }
}

componentDidMount() {
    this.getNotifications()
}

getNotifications = () => {
    this.notification = db.collection("Notifications").where("notificationStatus", "==", "Unread").where("reciverID", "==", this.state.userID)
    .onSnapshot((snapshot) => {
        var allNotifications = []
        snapshot.docs.map((doc) => {
            var notification = doc.data()
            notification["doc_ID"] = doc.id
            allNotifications.push(notification)
        })
        this.setState({
            allNotifications: allNotifications
        })
    })
}

keyExtractor = (item, index) => index.toString()
renderItem = ({item, i}) => (
    <ListItem
    key = {i}
    title = {item.bookName}
    subtitle = {item.messsage}
    leftElement = {<Icon name = "book" />}
    bottomDivider
    />
)

    render() {
        return(
        <View>
            <View>
            <MyHeader navigation = {this.props.navigation}
            title = "Notifications"/>
            <View>

                {
                    this.state.allNotifications.length === 0
                    ?(<Text>Notifications</Text>)
                    :(<SwipeList
                    allNotifications = {this.state.allNotifications}/>)
                }
            </View>
            </View>
        </View>
        )
    }
}