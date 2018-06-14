import React from "react";
import { View,BackHandler,StatusBar } from "react-native";
//import Video from 'react-native-af-video-player'
//import Orientation from 'react-native-orientation';
// import KeepAwake from 'react-native-keep-awake';
import VideoPlayer from 'react-native-true-sight'
export default class Movie extends React.Component {
constructor(props){
  super(props);

  //console.log(props.navigation.state.params.url)
  //Orientation.lockToLandscape();
 

  BackHandler.addEventListener("hardwareBackPress", () => {
     // Orientation.lockToPortrait()
      this.props.navigation.pop()
      return true // do not exit app
    
  })
}


 

  render() {
    return (
          <View style={{ flex: 1, backgroundColor: 'black' }}>
        <StatusBar   hidden={true}  />
        <VideoPlayer source={this.props.navigation.state.params.url} />

      </View>
      )
    }
}

 