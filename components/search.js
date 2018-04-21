import React, { Component } from 'react';

import {Platform, Text,View,ScrollView,StyleSheet,TouchableNativeFeedback,BackHandler,BackAndroid
,TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import store from "./store";
import Toolbar from "./toolbar"





export default class Search extends Component {

componentDidMount() {
    this.refs.searchbar.focus();
}


    render() {
        return(
            <View style={{flex:1}} >

            <TextInput 
            style={{paddingLeft:15,flex:1,color:"#FFF",fontSize:15, textAlignVertical: 'center'}}
            placeholder="ძიება"
            ref="searchbar"
            underlineColorAndroid="transparent"
            placeholderTextColor="#F5F5F5"
            tintColor={"#FFF"}
            onChangeText={(text) => this.props.searchChange(text)}
           />

           </View>
        )
    }
}