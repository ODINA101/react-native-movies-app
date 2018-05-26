import React, {Component} from 'react';
import {View,Text,Image,ScrollView } from 'react-native'; 
import Ripple from "react-native-material-ripple"

export default class Actor extends Component {
    constructor(props){
        super(props);
      
    }
    render() {
        return (
        
     
 



            <View style={{flex:1,alignItems:"center"}}>
            {
            
                this.props.list.map(item => {
                    return (
                  
                  
                     <View style={{marginTop:15,flexDirection:"row",}}>
                 <Image ref={item.id}  source={{uri:"http://staticnet.adjara.com/cast/" + item.id + ".jpg"}} onError={(e) => this.refs[item.id].setNativeProps({src: [{uri: "http://staticnet.adjara.com/imagesNew/noThumbnail.png"}]})} style={{width:80,height:80,borderRadius:40}}/>
              <View style={{flex:0.5,justifyContent:"center",}}>   
                 <Text style={{marginLeft:10,color:"#FFF"}}> 
                 {item.name}
                </Text>
                  </View>
                  </View>
                    )
                 })
            
            }
            </View>    
                 
            
               
            
            
          


)
    }
}