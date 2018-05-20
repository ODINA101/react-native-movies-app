import React, { Component } from 'react';

import {Platform, Text,View,ScrollView,StyleSheet,TouchableNativeFeedback,BackHandler,BackAndroid
,TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import store from "./store";

import { StackNavigator } from 'react-navigation';
import {connect} from "react-redux";

import Ionicons from "react-native-vector-icons/Ionicons"
import Search from "./search"
import Feather from "react-native-vector-icons/Feather"
import LinearGradient from "react-native-linear-gradient"

 class Toolbar extends Component {
constructor() {
    super();

this.state = {
    title:'',
    menu:true,
    drawerOpen:"",
    search:false

}

 this.background = TouchableNativeFeedback.SelectableBackground();

if (Platform['Version'] >= 21) {
   this.background = TouchableNativeFeedback.Ripple('#fff', true)
}

store.subscribe((data) => this.setState({title:store.getState().page,menu:store.getState().menu,search:store.getState().searching}))
}



componentDidMount() {



this.setState({title:store.getState().page})
;
}

 


render() {

return(

<View style={{height:70}}>
{

  this.props.search?(
    <LinearGradient  locations={[0,0.5,0.6]}  start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}} colors={['#ee9ca7','#00dbde']} style={{flex:1,alignItems:"center",flexDirection:"row",paddingLeft:20}}>
    <View style={{flex:0.1,marginTop:-8,}}>



    <TouchableNativeFeedback background={this.background}  onPress={() => this.props.nav.pop()}>
    <View style={{backgroundColor:"transparent",width:32}}>
    <Ionicons name="md-arrow-round-back" color="white" size={32} />
    </View>
    
    </TouchableNativeFeedback>
      </View>


      <View style={{flex:1}}>
     <Search searchChange={(text) => this.props.searchChange(text)} />
      </View>
      </LinearGradient>
  ):(
    <LinearGradient   start={{x: 1.0, y: 0.0}} end={{x: 0.5, y: 0.0}}
  locations={[0,0.5,0.6]} colors={['#ee9ca7','#00dbde']} style={{flexDirection:"row",height:70,elevation:5,padding:18,}}>


 


{

  this.props.search?(
<View />
  ):(
    <View style={{flex:0.2,marginTop:5}}>
    {
    
    this.props.home?(
    
    <TouchableNativeFeedback background={this.background} onPress={() => this.props.redux.openDrawer()} >
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
  )


}
{

this.props.search?(
<View />
):(
<View style={{flex:1,flexDirection:"row",alignItems:"center"}}>
 <Text style={{color:"white",fontSize:16,marginTop:10}}>

   {
this.props.home?(
      this.props.redux.page
):(
     this.props.title
)
  }
  
</Text>
</View>

)


}


{
  this.props.search?(
<View />
  ):(
  <View style={{marginTop:13}}>
    
{
  this.props.home?(
  <View style={{flex:0.1,flexDirection:"row",alignItems:"center",marginTop:5}}>
  
  <TouchableNativeFeedback background={this.background}  onPress={() => {this.setState({search:!this.state.search});this.props.nav.navigate("grid") }}>
  
  <View style={{backgroundColor:"transparent",width:25}}>
  <Feather name="search" color="white" size={25} />
  </View>
  </TouchableNativeFeedback>
  </View>
  
    ):(
      <View>
      </View>
    )
  }
  </View>
  )
}







</LinearGradient>


  )
  
}

</View>

);

}


}


function mapStateToProps(state) {
  return {redux:state}
} 


function mapDispatchToProps(dispatch) {
  return {
    test:()=>{}
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Toolbar)