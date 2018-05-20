import React from "react";
import {View,Text,StyleSheet} from "react-native";
import Video from 'react-native-af-video-player'

export default class Movie extends React.Component {
constructor(props){
  super(props);
  console.log(props.navigation.state.params.url)

}
  render() {
    return (
           <View style={{flex:1,backgroundColor:"black"}}>
          <Video style={{flex:1}} autoPlay={true} url={(this.props.navigation.state.params.url).toString()} 
          fullScreenOnly={true} rotateToFullScreen={true} />
            </View>
      )
    }
}

 