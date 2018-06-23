import React, { Component } from 'react'
import { View,AsyncStorage } from 'react-native'
import GridView  from 'react-native-super-grid';
import Toolbar from './toolbar';
import SingleItem from './singleItem';
export default class WatchLater extends Component {

constructor(props) {
    super(props)


this.state = {
  data:[]
}
//    AsyncStorage.getItem("favorites",(data)=>{
//        console.log(data)
//    })


}


 

 
async componentDidMount(){
  //AsyncStorage.setItem('favorites',"[]")
  var value = await AsyncStorage.getItem('favorites');
  this.setState({data:JSON.parse(value)})
 // alert(value)
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
            
  
  <GridView
                                        itemDimension={130}
                                        items={this.state.data}
                                        renderItem={item => (
                                            <SingleItem
                                                views={item.VIEW}
                                                luboi={true}
                                                des={false}
                                                 
                                                titleEn={item.title_en}
                                                photo={"http://staticnet.adjara.com/moviecontent/" + item.id + "/covers/214x321-" +
                                                        item.id + ".jpg"}
                                                series={false}
                                                id={item.id}
                                                title={item.title}
                                                navigation={this.props.navigation}/>
                                        )}/>  
  
      </View>
    )
  }
}