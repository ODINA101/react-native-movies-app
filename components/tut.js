import React from 'react';
import { StyleSheet, View,Dimensions } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
    width: Dimensions.get('window').width,
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
    text: 'The component is also super customizable, so you can ad wants.',

    title: 'Quick setup, good defaults',
   image: require('../scrs/scr3.png'),
    colors: ['#63E2FF', '#B066FE'],
     imageStyle: styles.image,
     textStyle:styles.text

  },
  {
    key: 'somethun1',
    title: 'Super customizable',
    text: 'The component is also super customizable, so you can adapt it to cover your needs and wants.',
    image: require('../scrs/scr1.png'),
    colors: ['#FFF', '#FFF'],
     imageStyle: styles.image,
  },
  {
    key: 'somethun2',
    title: 'No need to buy me beer',
    text: 'Usage is all free',
    image: require('../scrs/scr2.png'),
    colors: ['#29ABE2', '#4F00BC'],
     imageStyle: styles.image,
  },
];


export default class Tutorial extends React.Component {
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
      <View style={styles.buttonCircle}>
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
        renderDoneButton={this._renderDoneButton}
        renderNextButton={this._renderNextButton}
      />
    );
  }
}
