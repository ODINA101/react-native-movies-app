import React, { Component } from 'react';
import {View,Text,StyleSheet,Image,TouchableNativeFeedback} from "react-native";
import Ripple from 'react-native-material-ripple';
import store from './store';

export default class SingleItem extends Component {


constructor() {
  super()

  this.openPage = this.openPage.bind(this)
}


openPage() {

    if(this.props.series) {

        this.props.navigation.navigate("fullseries",{title:this.props.title,photo:this.props.photo,url:this.props.url,des:this.props.des,key:this.props.id});
    }else{
        this.props.navigation.navigate("full",{title:this.props.title,photo:this.props.photo,url:this.props.url,des:this.props.des});

    }
}


    render() {
        return(
            <View style={[{
                flexDirection: 'column',
                minHeight:300,
                width:150,
                borderRadius:15,
             backgroundColor:"#FFF",
             elevation:10,
            }]}>


          <View style={{flex:1}}>








   <Ripple rippleColor="#FFF" onPress={this.openPage}>
      <Image style={{width:150,height:250,borderTopLeftRadius:15,borderTopRightRadius:15}} source={{uri:this.props.photo}} />
</Ripple>
 <View style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center",padding:5}}>
<Text>{this.props.title}</Text>
 </View>
        </View>

            </View>


        )
    }
}
