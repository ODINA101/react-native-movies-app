import React, { Component } from 'react'
import { Text, View,ScrollView,ImageBackground,Button } from 'react-native'
import {Spinner} from "native-base";
import Ripple from 'react-native-material-ripple';

export default class Collections extends Component {

    constructor() {
        super();
this.state = {
    loaded:false,
   data:[]
}


fetch("http://adjaranet.com/req/jsondata/req.php?reqId=getCollections").then(res => res.json())
.then(res => {
   var FinalData = [];
     

    Object.values(res).forEach((item,i) => {
        FinalData.push({
            name:item.name,
            id:Object.keys(res)[i]
        })
    })



    console.log(FinalData)
     this.setState({loaded:true,data:FinalData})

})



}
 
    render() {



    return (
      <View style={{flex:1}}>
      <View style={{padding:4,marginLeft:5}}>
       <Text style={{fontSize:15,color:"#7E7E7E"}}> კოლექციები</Text>
     </View>
  {
     this.state.loaded?(

         <ScrollView horizontal={true} style={{flex:1}}>
   
        {
            this.state.data.slice(0,5).map((item) => {

            return (
               <Ripple key={item.id}  style={{padding:10,marginLeft:15}} onPress={() => { 
                this.props.nav.navigate("SingleCollectionList",{cID:item.id})

                }}>    
                <View style={{borderRadius:90,width:184,height:120}}>
                <ImageBackground blurRadius={2}   source={{uri:"http://staticnet.adjara.com/collections/thumb/" + item.id + "_big.jpg"}}   borderRadius={10}  style={{flex:1,width:null,height:null,alignItems:"center",justifyContent:"center"}}>
                
                <View style={{width:161}}>
                 <Text style={{color:"#FFF",fontWeight:"bold",fontSize:17}} >{item.name}</Text>
                </View> 
                
                </ImageBackground>
               </View>
              </Ripple>
            )
            })
        }
     
<View style={{width:70,justifyContent: 'center',alignItems:"center"}}>
     <Button onPress={() => this.props.nav.navigate("Fullcollectionlist",{collections:this.state.data})} style={{height:30,borderWidth:0,elevation:0}} title={"მეტი"} color="#3494e6" />
</View>
         </ScrollView>   
     ):(
         <View style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
         <Spinner />
        </View>
     )
 }
      </View>
    )
  }
}