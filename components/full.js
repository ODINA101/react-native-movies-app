import React from 'react';
import { Text,View,ScrollView,StyleSheet,BackHandler,Image,Animated,TouchableOpacity,Linking,AsyncStorage} from 'react-native';
import SingleItem from './singleItem'
import Toolbar from './toolbar';
import store from './store';
import Entypo  from 'react-native-vector-icons/Entypo';
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import RNFetchBlob from 'react-native-fetch-blob';
import Ripple from "react-native-material-ripple"
import RNFS from 'react-native-fs'
import Modal from "react-native-modal";
import * as Animatable from 'react-native-animatable'
import StarRating from 'react-native-star-rating';
import Ionicons from "react-native-vector-icons/Ionicons"

import {
    AdMobInterstitial,
    PublisherBanner,
  } from 'react-native-admob'
  import downloadManager from 'react-native-simple-download-manager';

export default class Full extends React.Component {

    constructor(props) {
     super(props);
     this.state = {
         storage:0,
         isModalVisible: false,
         free:""
     }

     this.download = this.download.bind(this)
     this.openuri = this.openuri.bind(this)
   // store.dispatch({type:"OpenUri",payload:this.openuri})


    }



componentDidMount() {



    AdMobInterstitial.setAdUnitID('ca-app-pub-6370427711797263/7435578378');
    AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
    BackHandler.addEventListener('hardwareBackPress', function() {
          return false;
      });
}


openuri() {
    const url = this.props.navigation.state.params.url;
    Linking.canOpenURL(url).then(supported => {
  if (supported) {
    Linking.openURL(url);
  }

});
}

async download() {
 //////////////////////////////////
   // await AsyncStorage.removeItem('firstTime');
      
////////////////////////////////
     RNFS.getFSInfo().then(async (info) => {
   if(parseInt((info.freeSpace / 1024)/1024) > 1000) {

    const value = await AsyncStorage.getItem('firstTime');
    if (!value){
    try {
        await AsyncStorage.setItem('firstTime', 'yes');

        this.props.navigation.navigate('tut',{OpenUri:this.openuri});

      } catch (error) {
      }

    }else{
     
this.openuri()
        
    }

     



  }else{
   this.setState({free:parseInt((info.freeSpace / 1024)/1024)})
    this._toggleModal()
  
  }
    });

}





_toggleModal = () =>
this.setState({ isModalVisible: !this.state.isModalVisible });

render() {

    return(


<View style={{flex:1,backgroundColor:"#FFF"}}>
  <Toolbar home={false} nav={this.props.navigation} title={this.props.navigation.state.params.title}/>
<ScrollView style={{flex:1}}>
<View style={{height:300 }}>
<Image  animation="zoomInUp" style={{flex:1,}}  blurRadius={5} source={{uri:this.props.navigation.state.params.photo}}/>
<View style={{marginBottom:-200,backgroundColor:"#FFF",height:200,width:1000,marginLeft:-50,transform:[{rotate:"15deg"}]}}/>

 </View>
<Ripple onPress={()=> this.props.navigation.navigate("movie",{url:this.props.navigation.state.params.url})} rippleContainerBorderRadius={100} style={{elevation:5,marginTop:-75,marginRight:40,width:50,height:50,backgroundColor:"#609DE2",borderRadius:100,flexDirection:"row",justifyContent:"center",alignItems:"center",alignContent:"center",alignSelf:"flex-end"}}>
 <Entypo name="controller-play" size={32} color="#FFFFFF" />
</Ripple>
<Modal isVisible={this.state.isModalVisible}>
          <View style={{ flex: 1,justifyContent:"center",alignItems:"center" }}>
         <View style={{width:250,height:320,backgroundColor:"#FFF",flexDirection:"column"}}>
         <View style={{flex:0.6,backgroundColor:"red",justifyContent:"center",alignItems:"center"}}>
         <MaterialIcons name="error" size={50} color="#FFFFFF" />

         </View>

         <View style={{flex:1,justifyContent:"flex-start",padding:20}}>
       <Text style={{fontSize:17,color:"black"}}>მოხდა შეცდომა! </Text>
       <Text>სამწუხაროდ თქვენ არ გაქვთ საკმარისი თავისუფალი მეხსიერება</Text>


         </View>

         <TouchableOpacity onPress={this._toggleModal} style={{flex:0.3,backgroundColor:"grey",justifyContent:"center",alignItems:"center",color:"#FFF"}}>
              <Text style={{color:"#FFFFFF"}}>კარგი</Text>
            </TouchableOpacity>


         </View>
          </View>
        </Modal>
 <Ripple onPress={this.download} rippleContainerBorderRadius={100} style={{elevation:5,marginTop:-70,marginRight:110,width:50,height:50,backgroundColor:"#609DE2",borderRadius:100,flexDirection:"row",justifyContent:"center",alignItems:"center",alignContent:"center",alignSelf:"flex-end"}}>
 <Entypo name="download" size={32} color="#FFFFFF" />
</Ripple>


 <Animatable.Image animation="zoomInUp" style={{width:120,height:200,marginTop:-180,marginLeft:25 }}  source={{uri:this.props.navigation.state.params.photo}}/>
<View style={{backgroundColor:"#FFF",padding:20,marginTop:25,}}>

<View>
<StarRating


        disabled={true}
        emptyStar={'ios-star-outline'}
        fullStar={'ios-star'}
        halfStar={'ios-star-half'}
        iconSet={'Ionicons'}
        maxStars={5}
        rating={parseFloat(this.props.navigation.state.params.imdb*(1/2))}
        fullStarColor={'red'}
        starSize={50}
      />

 </View> 



<View style={{flexDirection:'row',marginTop:20}}>
  <Text style={{color:"black"}}>გამოშვების წელი: </Text>
<Text>{this.props.navigation.state.params.year}</Text>
</View> 
<Text style={{fontSize:16,color:"black",marginTop:10}} >აღწერა</Text>
<Text>{this.props.navigation.state.params.des}</Text>
</View>
</ScrollView>
</View>

    )
}

}



