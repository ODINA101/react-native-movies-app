import React, { Component } from 'react';

import {Platform, Text,View,ScrollView,StyleSheet,TouchableNativeFeedback,BackHandler,BackAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import store from "./store";

import { StackNavigator } from 'react-navigation';




export default class Toolbar extends Component {
constructor() {
    super();

this.state = {
    title:'',
    menu:true,
    drawerOpen:""

}

 this.background = TouchableNativeFeedback.SelectableBackground();

if (Platform['Version'] >= 21) {
   this.background = TouchableNativeFeedback.Ripple('#fff', true)
}

store.subscribe((data) => this.setState({title:store.getState().page,menu:store.getState().menu}))

}



componentDidMount() {
this.setState({title:store.getState().page})
;
}



render() {

return(

<View style={{flexDirection:"row",height:70,backgroundColor:"#00A8EA",elevation:5,padding:18,}}>
<View style={{flex:0.2,marginTop:5}}>
{

this.props.home?(

<TouchableNativeFeedback background={this.background} onPress={() => store.getState().openDrawer()} >
<View style={{backgroundColor:"transparent",width:32}}>
<Icon name="menu" color="white" size={32} />
</View>

</TouchableNativeFeedback>

): (

<TouchableNativeFeedback background={this.background} onPress={() => this.props.nav.pop()} >
<View style={{backgroundColor:"transparent",width:32}}>
<Icon name="arrow-long-left" color="white" size={32} />
</View>

</TouchableNativeFeedback>

)



}




</View>

<View style={{flex:1,flexDirection:"row",alignItems:"center"}}>
 <Text style={{color:"white",fontSize:16,marginTop:10}}>

   {

this.props.home?(
      store.getState().page
):(
     this.props.title
)
  }</Text>
</View>
</View>

);

}


}
