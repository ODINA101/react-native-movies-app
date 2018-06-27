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
this.checkIfLiked = this.checkIfLiked.bind(this)


this.checkIfLiked()
  }
  
async checkIfLiked() {
    var favorites = await AsyncStorage.getItem('favorites');
  favorites = JSON.parse(favorites)
  favorites.forEach(item => {
      if(this.props.id == item.id) {
          this.setState({heartMode:"heart"})
      }
  })
}  

async getFavorites() {
    var value = await AsyncStorage.getItem('favorites');
   // alert(value.toString())
    var added = JSON.parse(value)

    added.push({id:this.props.id,views:this.props.views,photo:this.props.photo,des:this.props.des,imdb:this.props.imdb,year:this.props.year,title:this.props.title,titleEn:this.props.titleEn})
 AsyncStorage.setItem("favorites",JSON.stringify(added));
}
async removeFavorite() {
    var favorites = await AsyncStorage.getItem('favorites');
  favorites = JSON.parse(favorites)
  favorites.forEach((item,i) => {
      if(this.props.id == item.id) {
         favorites.splice(i,1); 
        AsyncStorage.setItem("favorites",JSON.stringify(favorites));
        this.setState({heartMode:"heart-outline"})
      }
  })
    
}
  
  like() {


if(this.state.heartMode == "heart-outline") {
this.setState({heartMode:"heart"})



 this.getFavorites(this.props.id) 
Snackbar.show({
    title: 'დაემატა მოგვიანებით სანახავებში',
    duration: Snackbar.LENGTH_LONG,
});
 


}else{
    this.removeFavorite();

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