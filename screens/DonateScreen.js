import React from 'react';
import {View, Text, TextInput, Modal, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Alert, ScrollView, FlatList} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import  MyHeader  from '../components/MyHeader';
import { ListItem } from 'react-native-elements';

export default class DonateScreen extends React.Component {
constructor() {
    super()
    this.state = {
        bookList: []
    }
}

componentDidMount() {
    this.BookList()
}

BookList = () => {
    var requestRef = db.collection('RequestBook')
    .onSnapshot((snapshot) => {
        var bookList = snapshot.docs.map(document => 
            document.data())
            this.setState({
            bookList: bookList
            })
        })
    }
    
keyExtractor = (item, index) => {
    index.toString()
}

renderItem = ({item, i}) => {
    return(
        <ListItem
        key = {i}
        title = {item.bookName}
        subtitle = {item.requestReason}
        rightElement = {
        <TouchableOpacity onPress = {() => {
            this.props.navigation.navigate("RequestList", {'Details': item})
        }} style = {styles.button}>
            <Text>View Request</Text>
        </TouchableOpacity>
        }
        />
    )
}

    render() {
        return (
            <View style = {{flex: 1}}>
                <MyHeader title = "Donate Book" navigation = {this.props.navigation}/>
                <View>
                <FlatList
                data = {this.state.bookList}
                renderItem = {this.renderItem}
                keyExtractor = {this.keyExtractor}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    subContainer:{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    },
    button:{
      width:100,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       }
    }
  })