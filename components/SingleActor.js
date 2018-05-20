import React, {Component} from 'react';
import {View,Text,Image,ScrollView } from 'react-native'; 
import Ripple from "react-native-material-ripple"

export default class Actor extends Component {
    constructor(props){
        super(props);
        console.log(props.list)
    }
    render() {
        return (
        
        <View style={{flex:1,height:100,marginTop:20}}>
<ScrollView style={{flex:1}} horizontal={true}>
{

    this.props.list.map(item => {
        return (
        <Ripple
        onPress={() => this.props.navigation.navigate("fullActor",{id:item})} >
        
        <Image ref={item}  source={{uri:"http://staticnet.adjara.com/cast/" + item + ".jpg"}} onError={(e) => this.refs[item].setNativeProps({src: [{uri: "http://staticnet.adjara.com/imagesNew/noThumbnail.png"}]})} style={{width:80,flex:1}}
        />
         </Ripple>
        )
     })

}
    
     

   


</ScrollView>
        </View>)
    }
}