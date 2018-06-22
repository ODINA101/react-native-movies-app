import React, { Component } from 'react'
import { View,AsyncStorage } from 'react-native'
//import GridView  from 'react-native-super-grid';
import Toolbar from './toolbar';

export default class WatchLater extends Component {

constructor(props) {
    super(props)



//    AsyncStorage.getItem("favorites",(data)=>{
//        console.log(data)
//    })

   this.fetchData = this.fetchData.bind(this)

}


async fetchData() {
         var value = await AsyncStorage.getItem('test');
       if (value == null){
            // We have data!!
    AsyncStorage.setItem('test', 'I like to save it.');

            console.log(value + 'opaaaaaaaaaaaaaaa');
     }else{
         console.log("davsetooot")
    AsyncStorage.setItem('test', 'I like to save it.');

       }
         
      
}

 

componentDidMount(){
    this.fetchData()
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
  
  {/* <GridView
                                        itemDimension={130}
                                        items={this.state.searched}
                                        style={styles.gridView}
                                        renderItem={item => (
                                            <SingleItem
                                                views={item.VIEW}
                                                luboi={true}
                                                des={false}
                                                search={true}
                                                titleEn={item.title_en}
                                                photo={"http://staticnet.adjara.com/moviecontent/" + item.id + "/covers/214x321-" +
                                                        item.id + ".jpg"}
                                                series={false}
                                                id={item.id}
                                                title={this.checkTitle(item)}
                                                navigation={this.props.navigation}/>
                                        )}/> */}
  
      </View>
    )
  }
}