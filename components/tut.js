import React from 'react';
import { StyleSheet, View,Dimensions } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import store from './store';



const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width:  Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  text: {
   color: '#FFF',
   textAlign: 'center',
   justifyContent: 'center',
   alignSelf: "center"
 },
});

const slides = [
  {
    key: 'somethun',
   image: require('../scrs/1.png'),
    colors: ['#63E2FF', '#B066FE'],
     imageStyle: styles.image,
     textStyle:styles.text

  },
  {
    key: 'somethun1',
    image: require('../scrs/2.png'),
    colors: ['#FFF', '#FFF'],
     imageStyle: styles.image,
  },
  {
    key: 'somethun2',
    image: require('../scrs/4.png'),
    colors: ['#29ABE2', '#4F00BC'],
     imageStyle: styles.image,
  },
  {
    key: 'somethun2',
    image: require('../scrs/3.png'),
    colors: ['#29ABE2', '#4F00BC'],
     imageStyle: styles.image,
  },
];


export default class Tutorial extends React.Component {
 constructor(props) {
   super(props)

 

 }
 

  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  }
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle} >
        <Ionicons
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  }
  render() {
    return (
      <AppIntroSlider
        slides={slides}
        onDone={() =>  { this.props.navigation.pop(); this.props.navigation.state.params.OpenUri() }}
        renderDoneButton={this._renderDoneButton}
        renderNextButton={this._renderNextButton}
      />
    );
  }
}
