import React, { Component } from 'react'
import { View,AsyncStorage } from 'react-native'
import { TouchableNativeFeedback } from 'react-native';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import Snackbar from "react-native-snackbar"
export default class LoveBtn extends Component {
  constructor(props) {
      super(props)

      this.state = {
          heartMode:"heart-outline"
      }
this.like = this.like.bind(this)
  }
  
  
  
  like() {


if(this.state.heartMode == "heart-outline") {
this.setState({heartMode:"heart"})
  AsyncStorage.setItem("favorites",(this.props.id).toString());
  Snackbar.show({
    title: 'დაემატა მოგვიანებით სანახავებში',
    duration: Snackbar.LENGTH_LONG,
});
}else{
    this.setState({heartMode:"heart-outline"})

}

  }


    render() {
    return (
        <TouchableNativeFeedback
        background={this.props.background}
        onPress={this.like}
         >

        <View
            style={{
                backgroundColor: "transparent",
                width: 50,
                marginRight:-15,
                alignItems:"center"
            }}>
            <MaterialCommunityIcons name={this.state.heartMode} color="white" size={25}/>
        </View>
    </TouchableNativeFeedback>
    )
  }
}