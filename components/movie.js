import React from "react";
import {View,Text,StyleSheet,BackHandler,StatusBar} from "react-native";
import Video from 'react-native-af-video-player'
import VideoPlayer from 'awesome-react-native-video-controls';
import Orientation from 'react-native-orientation';
export default class Movie extends React.Component {
constructor(props){
  super(props);
  console.log(props.navigation.state.params.url)
  Orientation.lockToLandscape();

  BackHandler.addEventListener("hardwareBackPress", () => {
      Orientation.lockToPortrait()
      this.props.navigation.pop()
      return true // do not exit app
    
  })
}


 

  render() {
    return (
           <View style={{flex:1,backgroundColor:"black"}}>
           <StatusBar hidden={true} />
          {/* <Video style={{flex:1}} autoPlay={true} url={(this.props.navigation.state.params.url).toString()} 
          fullScreenOnly={true} rotateToFullScreen={true} /> */}
          <VideoPlayer
        source={{ uri: (this.props.navigation.state.params.url).toString() }}
       navigator={ this.props.navigation }
       disableFullscreen={true}
       onBack={() => {Orientation.lockToPortrait();this.props.navigation.pop()}}
/>
            </View>
      )
    }
}

 