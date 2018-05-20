import React, { Component } from 'react';
import {View,Text,StyleSheet,Image,TouchableNativeFeedback,ImageBackground,TouchableOpacity,Dimensions} from "react-native";
import Ripple from 'react-native-material-ripple';
import store from './store';
import LinearGradient from 'react-native-linear-gradient';
import {Transition} from "react-navigation-fluid-transitions"

export default class SingleItem extends Component {


constructor() {
  super()

  this.openPage = this.openPage.bind(this)
}


luboi(id) {


    fetch("http://net.adjara.com/req/jsondata/req.php?id="+ id +"&reqId=getInfo").then(res => res.json()).
    then(res =>  
    {

if(res["1"]) {
    console.log("serialia")
        this.props.navigation.navigate("fullseries",{views:this.props.views,title:this.props.title,photo:this.props.photo,url:this.props.url,des:this.props.des,key:this.props.id,imdb:this.props.imdb,year:this.props.year,id:this.props.key});
    
}else{
    console.log("filmia")
        this.props.navigation.navigate("full",{views:this.props.views,title:this.props.title,photo:this.props.photo,des:this.props.des,imdb:this.props.imdb,year:this.props.year,key:this.props.id});
    
}

    }
    
    )

}

openPage() {

    if(this.props.series) {

        this.props.navigation.navigate("fullseries",{views:this.props.views,title:this.props.title,photo:this.props.photo,url:this.props.url,des:this.props.des,key:this.props.id,imdb:this.props.imdb,year:this.props.year,id:this.props.key});
    }else{
        this.props.navigation.navigate("full",{views:this.props.views,title:this.props.title,photo:this.props.photo,des:this.props.des,imdb:this.props.imdb,year:this.props.year,key:this.props.id});

    }
}


    render() {
        if(!this.props.search) {
        return(

 
            <View style={[{
                flexDirection: 'column',
                minHeight:300,
                width:150,
                borderRadius:15,
             backgroundColor:"#FFF",
             elevation:10,
            }]}>


          <View style={{flex:1}}>








   <Ripple rippleColor="#FFF" onPress={this.openPage}>
    
      <ImageBackground style={{width:150,height:250,borderTopLeftRadius:15,borderTopRightRadius:15,justifyContent:"flex-end",}}  source={{uri:this.props.photo}}>
   
   
    {
  this.props.imdb?  (
    <LinearGradient colors={['#3494e6', '#ec6ead']} style={{marginLeft:90,marginBottom:10,width:50,height:50,borderRadius:25,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
    <Text style={{color:"#FFF",fontSize:18}}>
   {parseFloat(this.props.imdb).toFixed(1)}
    </Text>
    </LinearGradient>
  ):(<View/>)

    }
    
      </ImageBackground>
      
</Ripple>
 <View style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center",padding:5}}>
<Text>{this.props.title}</Text>
 </View>
        </View>
 
            </View>

 




        )


        }else{
            return (
                 <View style={[{
                flexDirection: 'row',
                minHeight:100,
                width:Dimensions.get("window").width,
                borderRadius:15,
             backgroundColor:"#FFF",
             elevation:10,
            }]}>


          <View style={{flex:1,flexDirection:"row"}}>





{


this.props.luboi?(

   <Ripple rippleColor="#FFF" onPress={() => this.luboi(this.props.id)}>
    
      <ImageBackground style={{width:100,height:100,borderTopLeftRadius:15,borderTopRightRadius:15,justifyContent:"flex-end",}}  source={{uri:this.props.photo}}>
   
   
    {
  this.props.imdb?  (
    <LinearGradient colors={['#3494e6', '#ec6ead']} style={{marginLeft:90,marginBottom:10,width:50,height:50,borderRadius:25,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
    <Text style={{color:"#FFF",fontSize:18}}>
   {parseFloat(this.props.imdb).toFixed(1)}
    </Text>
    </LinearGradient>
  ):(<View/>)

    }
    
      </ImageBackground>
      
</Ripple>

):(


   <Ripple rippleColor="#FFF" onPress={this.openPage}>
    
      <ImageBackground style={{width:100,height:100,borderTopLeftRadius:15,borderTopRightRadius:15,justifyContent:"flex-end",}}  source={{uri:this.props.photo}}>
   
   
    {
  this.props.imdb?  (
    <LinearGradient colors={['#3494e6', '#ec6ead']} style={{marginLeft:90,marginBottom:10,width:50,height:50,borderRadius:25,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
    <Text style={{color:"#FFF",fontSize:18}}>
   {parseFloat(this.props.imdb).toFixed(1)}
    </Text>
    </LinearGradient>
  ):(<View/>)

    }
    
      </ImageBackground>
      
</Ripple>



)
}
 <View style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center",padding:5}}>
<Text>{this.props.title}</Text>
 </View>
        </View>
 
            </View>

 
            )
        }
    }
}
