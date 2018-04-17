import React from "react";
import {View,Text,StyleSheet} from "react-native";
import Video from 'react-native-af-video-player'

export default class Movie extends React.Component {
  render() {
    return (
        <View style={styles.container}>
          <Video style={{flex:1}} autoPlay={true} url={this.props.navigation.state.params.url} fullScreenOnly={true} rotateToFullScreen={true} />
        </View>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
