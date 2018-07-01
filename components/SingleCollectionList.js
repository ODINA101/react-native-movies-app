import React, { Component } from 'react'
import { View,AsyncStorage } from 'react-native'
import GridView  from 'react-native-super-grid';
import Toolbar from './toolbar';
import SingleItem from './singleItem';
import { Spinner } from 'native-base';
export default class  SingleCollectionList extends Component {

constructor(props) {
    super(props)


this.state = {
  data:[],
  loaded:false
}
 

fetch("http://adjaranet.com/req/jsondata/req.php?reqId=getCollections&id=" + this.props.navigation.state.params.cID)
.then(res => res.json())
.then(res => 
{

  this.setState({loaded:true,data:res})
  console.log(res)
}


)
}


 
checkTitle(data) {
  if (data.title_ge !== "") {
      return (data.title_ge);
  } else {
      return (data.title_en);
  }
}

checkImdb(data) {
  if ((parseFloat(data.data_rating).toFixed(1)) !== parseFloat(0.0).toFixed(1)) {
      return (data.data_rating);
  } else {
      return (null);
  }
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
                    {
                      this.state.loaded?(
                        <GridView
                        itemDimension={130}
                        items={this.state.data}
                        renderItem={item => (
                            <SingleItem
                                luboi={true}
                                photo={"http://staticnet.adjara.com/moviecontent/" + item.id + "/covers/214x321-" +
                                        item.id + ".jpg"}
                                        imdb={this.checkImdb(item)}
                                        year={item.release_date}
                                        views={item.views}
                                        titleEn={item.title_en}
                                            series={false}
                                            id={item.id}
                                            des={item.description}
                                            title={this.checkTitle(item)}
                                            navigation={this.props.navigation}/>
                        )}/> 
                      ):(
<View style={{flex:1,alignItems:"center",justifyContent:"center"}}>

<Spinner />
  </View>

                      )
                    }
            
   
      </View>
    )
  }
}