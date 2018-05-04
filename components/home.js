import React from 'react';
import { Text,View,ScrollView,StyleSheet,StatusBar} from 'react-native';
import SingleItem from './singleItem';
import Toolbar from './toolbar';
import store from "./store"
import GridView from 'react-native-super-grid';
const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};
import {Spinner} from "native-base";
import * as Animatable from 'react-native-animatable'
var he = 50;

export default class Home extends React.Component {

    constructor(props) {
     super(props);

 this.state = {
   items:[],
   currentItems:[],
   x:18,
   loader:false,
   maxItems:0,
   
  }
 store.dispatch({type:"setNav",payload:props.navigation})


   store.subscribe(() => {
this.setState({items:[]})
this.setState({currentItems:[]})

if(this.state.items !== store.getState().database) {
setTimeout(
()=>{
  this.setState({items:store.getState().database,x:18})
  this.setState({currentItems:this.state.items.slice().splice(0,18)})
  if(this.state.currentItems > 0) {
    this.refs.scrollView.scrollTo(0);

  }
  this.setState({maxItems:store.getState().databaseNum})

if(this.state.currentItems >= this.state.maxItems) {
he=0;
}

 
},1000
)
 

}



  

  
   })

    }

render() {


if(this.state.currentItems.length == 0) {
  return(
    <View style={{flex:1}}>
    <StatusBar hidden={false}/>
      <Toolbar drawer={() => store.getState().openDrawer()} nav={this.props.navigation} home={true}/>
    <View style={{flex:1,alignItems: 'center',justifyContent: 'center'}}>
  <Spinner />
</View>
    </View>
  )
}else{
  return(
    <View style={{flex:1}}>
      <Toolbar drawer={() => store.getState().openDrawer()} nav={this.props.navigation} home={true}/>
           <View style={{flex:1,flexDirection:"column"}}>
           <View style={{backgroundColor:"#EBECEE",flex:1}}>

          <ScrollView ref="scrollView" onScroll={({nativeEvent}) => {

      if (isCloseToBottom(nativeEvent)) {
    if(!this.state.loader){
 this.setState({loader:true});

setTimeout(()=>{
 var changed = this.state.currentItems;
 this.state.items.splice(this.state.x,this.state.x+10).forEach((data1) => {
    changed.push(data1);
  })
  this.setState({currentItems:changed,x:this.state.x+10,loader:false})
},1000)
      }


if(this.state.currentItems >= this.state.maxItems) {
he=0;
}
    }
    }} >

{

store.getState().page == "სერიალები"? (
           <GridView                                                                                                                                                                                                    
           itemDimension={130}
           items={this.state.currentItems}
           style={styles.gridView}
           renderItem={item => (
                 <SingleItem photo={item.photo} series={true} id={item.key} des={item.des} url={item.sd} title={item.title} navigation={this.props.navigation}/>
          
          
           )}
         />
  
):(

  <View>
  
    <GridView
    itemDimension={130}
    items={this.state.currentItems}
    style={styles.gridView}
    renderItem={item => (
          <SingleItem photo={item.photo} imdb={item.imdb} year={item.year} series={false} id={item.key} des={item.des} url={item.sd} title={item.title} navigation={this.props.navigation}/>
    )}
  />
    </View>     
  
)

}

       <Spinner  />
       </ScrollView>
           </View>
   </View>
   </View>
  )
}




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
