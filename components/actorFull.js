import React, { Component } from 'react'
import { Text, View,Image,Dimensions } from 'react-native'

export default class ActorFull extends Component {
constructor(props) {
    super(props);
this.state = {
    photo:""
}



fetch("http://net.adjara.com/req/jsondata/req.php?id=" + this.props.navigation.state.params.id + "&reqId=getLangAndHd")
.then(res => res.json())
.then(res => {
    console.log(res)
})
 


}






  render() {
    return (
      <View style={{flex:1,backgroundColor:"black",flexDirection: 'column',justifyContent:"center",alignItems:"center"}}>
     
       <Image ref={this.props.navigation.state.params.id}  source={{uri:"http://staticnet.adjara.com/cast/" + this.props.navigation.state.params.id + ".jpg"}}  onError={(e) => this.refs[this.props.navigation.state.params.id].setNativeProps({src: [{uri: "http://staticnet.adjara.com/imagesNew/noThumbnail.png"}]})} style={{width:Dimensions.get("window").width/1.5,height:Dimensions.get("window").width}} />
      


      </View>
    )
  }
}