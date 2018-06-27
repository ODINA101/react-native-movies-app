import React, { Component } from 'react'
import { Text, View, AsyncStorage } from 'react-native'
import Toolbar from './toolbar';
import {Picker, Item} from 'native-base';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected1: "შიდა",
      selected2:"არჩევითი"
    };

this.checkPlayer = this.checkPlayer.bind(this)
this.checkPlayer()


  }


  onValueChange(value) {
    this.setState({
      selected1: value,
    });
    AsyncStorage.setItem("player",value)
  }

  
  onValueChange2(value) {
    this.setState({
      selected2: value
    });
    AsyncStorage.setItem("quality",value)
  }
async checkPlayer() {
  var pl = await AsyncStorage.getItem("player");
   this.setState({selected1:pl})
   var p2 = await AsyncStorage.getItem("quality");
   this.setState({selected2:p2})
}

 
  render() {
    return (
      <View style={{flex:1}}>
          <Toolbar
                    home={false}
                    nav={this.props.navigation}
                    WatchLater={true}
                    title={"პარამეტრები"}
                    />
                    <View style={{flexDirection:"row",paddingLeft:20,paddingRight:20,alignItems:"center",marginTop:10}}>
        <Text style={{flex:0.3,fontSize:18,color:"black"}}>Player: </Text>
        <Picker
               style={{flex:1}}
              mode="dropdown"
              selectedValue={this.state.selected1}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Item label="შიდა(რეკომენდირებული)" value="შიდა" />
              <Item label="მობილურის" value="მობილურის" />
            </Picker>
            <View style={{flex:0.3}}/>
            </View>
            <View style={{flexDirection:"row",paddingLeft:20,paddingRight:20,alignItems:"center",marginTop:20}}>
        <Text style={{flex:0.3,fontSize:18,color:"black"}}>Quality: </Text>
        <Picker
               style={{flex:1}}
              mode="dropdown"
              selectedValue={this.state.selected2}
              onValueChange={this.onValueChange2.bind(this)}
            >
              <Item label="არჩევითი(რეკომენდირებული)" value="არჩევითი" />
              <Item label="sd" value="sd" />
              <Item label="hd" value="hd" />

            </Picker>
            <View style={{flex:0.2}}/>
            </View>
      </View>
    )
  }
}