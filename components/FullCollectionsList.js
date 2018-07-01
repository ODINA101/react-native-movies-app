import React, { Component } from 'react'
import { View,ScrollView,ImageBackground,Text,TouchableOpacity} from 'react-native'
import GridView  from 'react-native-super-grid';
import Toolbar from './toolbar';
export default class FullCollectionList extends Component {

constructor(props) {
    super(props)


this.state = {
  data:[]
}
//    AsyncStorage.getItem("favorites",(data)=>{
//        console.log(data)
//    })

}


 

 

  render() {
    return (
      <View style={{flex:1}}>
        <Toolbar
                    home={false}
                    nav={this.props.navigation}
                    WatchLater={true}
                    title={"მოგვიანებით სანახავი"}
                    />




  <ScrollView style={{flex:1}}>
 

</ScrollView>
  
  <GridView
                                        itemDimension={130}
                                        items={this.props.navigation.state.params.collections}
                                        renderItem={item => (
                                          <TouchableOpacity style={{paddingRight:5}} onPress={() => this.props.navigation.navigate("SingleCollectionList",{cID:item.id})}>
                                          <ImageBackground borderRadius={10} blurRadius={2} style={{marginRight:5,width:170,height:150,alignItems:"center",justifyContent:"center"}} source={{uri:"http://staticnet.adjara.com/collections/thumb/" + item.id + "_big.jpg"}} >
                                          
                                           <View style={{width:140}}>
                                          <Text style={{color:"#FFF",fontSize:17,fontWeight:"bold"}}>{item.name}</Text>
                                          </View>
                                          
                                          </ImageBackground>
                                          </TouchableOpacity>
                                        )}
                                        />
                                 
  
      </View>
    )
  }
}