import React from 'react';
import { View, Text, TextInput, Modal, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Alert, ScrollView} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'

export default class SettingScreen extends React.Component {
constructor(){
    super();
        this.state={
          username:'',
          firstName:'',
          lastName:'',
          address:'',
          mobilenumber:'',
          docId: ''
        }
      }

componentDidMount(){
    this.getUserDetails()
}

getUserDetails = () => {
    var user = firebase.auth().currentUser;
    var username = user.email
    db.collection("Users").where('emailID', '==', username).get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            var data = doc.data()
            this.setState({
                username: data.username,
                firstName: data.first_name,
                lastName: data.last_name,
                address: data.address,
                mobilenumber: data.mobilenumber,
                docId: doc.id
        })
     })
 })
}

updateUserDetails = () => {
    db.collection("Users").doc(this.state.docId).update({
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        mobilenumber: this.state.mobilenumber,
        address: this.state.address
    })
    Alert.alert("Profile Updated")
}

    render() {
        return(
            <View>
                <MyHeader
                title = "Settings"
                navigation = {this.props.navigation}/>
                <TextInput
                placeholder = "First Name"
                onChangeText = {(text) => {
                    this.setState({
                        firstName: text
                    })
                }}
                value = {this.state.firstName}
                />
                <TextInput
                placeholder = "Last Name"
                onChangeText = {(text) => {
                    this.setState({
                        lastName: text 
                    })
                }}
                value = {this.state.lastName}
                />
                <TextInput
                placeholder = "Mobile Number"
                keyBoardType = "numeric"
                onChangeText = {(text) => {
                    this.setState({
                        mobilenumber: text
                    })
                }}
                value = {this.state.mobilenumber}
                />
                <TextInput
                placeholder = "Address"
                onChangeText = {(text) => {
                    this.setState({
                        address: text
                    })
                }}
                value = {this.state.address}
                />
                <TouchableOpacity onPress = {()=> {this.updateUserDetails()}}>
                    <Text>Save Info</Text>
                </TouchableOpacity>
            </View>
        )
    }
}