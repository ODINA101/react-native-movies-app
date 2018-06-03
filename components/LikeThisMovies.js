import React, { Component } from 'react'
import { Text, View,ScrollView,Image } from 'react-native'
import {Spinner} from "native-base";
import  Ripple from 'react-native-material-ripple';

export default class LikeThisMovies extends Component {

    constructor(props) {
        super(props);
this.state = {
    loaded:false,
   data:[]
}
     

fetch("http://net.adjara.com/Movie/BuildSliderRelated?ajax=1&movie_id=" +  this.props.Id +"&isepisode=0&type=related&order=top&period=day&limit=25")
.then(res => res.json())
.then(res => {
    
    
    console.log(res)
   this.setState({loaded:true,data:res})

})


    }
    checkImdb(data) {
        if ((parseFloat(data.data_rating).toFixed(1)) !== parseFloat(0.0).toFixed(1)) {
            return (data.data_rating);
        } else {
            return (null);
        }
    }
    checkTitle(data) {
        if (data.title_ge !== "") {
            return (data.title_ge);
        } else {
            return (data.title_en);
        }
    }
    render() {



    return (
      <View style={{flex:1,padding:8}}>
      <View style={{padding:4,marginLeft:5}}>
     <Text style={{fontSize:15,color:"#FFF"}}>მსგავსი ფილმები</Text>
     </View>
  {
     this.state.loaded?(

         <ScrollView horizontal={true} style={{flex:1}}>
   
        {
            this.state.data.map(item => {

            return (
               <Ripple onPress={() => this.props.nav.navigate("full",{views:item.views,title:this.checkTitle(item),photo:item.poster,des:item.description,imdb:this.checkImdb(item),year:item.release_date,key:item.id,titleEn:item.title_en})}>    
                <Image   source={{uri:item.poster}}  style={{width:100,height:180,padding:10,marginLeft:15,elevation:3}}/>
              </Ripple>
            )
            })
        }
    
          
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