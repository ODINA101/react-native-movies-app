import React, { Component } from 'react'
import {Platform, Text,View,ScrollView,StyleSheet,TouchableNativeFeedback,BackHandler,BackAndroid
    ,TextInput} from 'react-native';
    import Ionicons from "react-native-vector-icons/Ionicons"
    import Search from "./search"
   import store from "./store"
import GridView from 'react-native-super-grid';
import SingleItem from './singleItem';
import Toolbar from './toolbar';
  

export default class Gridlayout extends Component {

constructor() {
    super()
this.state = {
    searchTxt:'',
    items:'',
    loaded:false,
    searched:[],
    
}


 this.background = TouchableNativeFeedback.SelectableBackground();

if (Platform['Version'] >= 21) {
   this.background = TouchableNativeFeedback.Ripple('#fff', true)
}
this.fetc = this.fetc.bind(this)


}


componentWillMount() {
    
this.setState({loaded:true})
this.setData = this.setData.bind(this)
 
this.setState({items:this.setData()})
console.warn(this.state.loaded)

}

setData() {
return store.getState().database 
 }

  fetc(text)  {
    
    this.setState({searchTxt:text})
   
    var test = [];
    
    if(this.state.loaded) {
        this.state.items.forEach((itm) => { 
            
            if(itm.title.includes(text))
            {
                test.push(itm)
            
            }  })
    this.setState({searched:test})
            
    }
    
    
         
     }

    render() {

       

        return(
          <View style={{flex:1}}>
          
         <Toolbar search={true} nav={this.props.navigation} searchChange={this.fetc}/>
            <ScrollView style={{flex:1}}>

    {
this.state.loaded?(
    <View>
  <GridView
    itemDimension={130}
    items={this.state.searched}
    style={styles.gridView}
    renderItem={item => (
          <SingleItem photo={item.photo} series={false} id={item.key} des={item.des} url={item.sd} title={item.title} navigation={this.props.navigation}/>
    )}
  />  


    </View>
    
     
):(
    <View>
        <Text>loading</Text>
        </View>
)


    } 
           </ScrollView>
    
        </View>
        )
    }
}

const styles = StyleSheet.create({
    gridView: {
      paddingTop: 25,
      flex: 1,
    },
    itemContainer: {
      justifyContent: 'flex-end',
    },
    itemName: {
      fontSize: 16,
      color: '#fff',
      fontWeight: '600',
    },
    itemCode: {
      fontWeight: '600',
      fontSize: 12,
      color: '#fff',
    },
  });
