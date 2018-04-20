import React, { Component } from 'react'
import { Text,View,StyleSheet,ScrollView,Image} from 'react-native';
import Toolbar from './toolbar';
import Ripple from 'react-native-material-ripple';
import Icon  from 'react-native-vector-icons/Entypo';
import { Picker,List,ListItem } from 'native-base';
import  firebase  from 'firebase';
import {
    AdMobInterstitial,
    PublisherBanner,
  } from 'react-native-admob'




export default class fullseries extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selected1: "key1",
          seasons:[],
          series:[]

        };

           this.getSeason = this.getSeason.bind(this)

      }




    componentDidMount() {
      AdMobInterstitial.setAdUnitID('ca-app-pub-6370427711797263/7435578378');
      AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());


      firebase.database().ref().child("series").child(this.props.navigation.state.params.key).child("parts").on("value",snapshot => {
        databaseItems = [];

        for(var i=1;i<=snapshot.numChildren();i++) {
     databaseItems.push("სეზონი " + i);

        }
        })
        this.setState({seasons:databaseItems})
        this.getSeason("სეზონი 1");

    }



getSeason(season) {
     var datiko = [];
      firebase.database().ref().child("series").child(this.props.navigation.state.params.key).child("parts").child(season).on('value',(snapshot) => {
     snapshot.forEach(da => {
        datiko.push({
          sd:da.child("sd").val()
        })

     })
    this.setState({series:datiko})
    console.warn(this.state.series)

      })

    }


      onValueChange(value) {
        console.warn(value)
        this.getSeason(value)
        this.setState({
          selected1: value
        });
    }
    render() {
        return(
            <View style={{flex:1,backgroundColor:"#FFF"}}>
            <Toolbar home={false} nav={this.props.navigation} title={this.props.navigation.state.params.title}/>
          <ScrollView style={{flex:1}}>
          <View style={{height:300 }}>
          <Image style={{flex:1,}}  blurRadius={5} source={{uri:this.props.navigation.state.params.photo}}/>
          <View style={{marginBottom:-200,backgroundColor:"#FFF",height:200,width:1000,marginLeft:-50,transform:[{rotate:"15deg"}]}}/>

           </View>


           <Image style={{width:120,height:200,marginTop:-180,marginLeft:25 }}  source={{uri:this.props.navigation.state.params.photo}}/>
          <View style={{backgroundColor:"#FFF",padding:20,marginTop:25,}}>

          <Text style={{fontSize:16,color:"black"}}>აღწერა</Text>
          <Text>{this.props.navigation.state.params.des}</Text>
          </View>
          <View style={{flexDirection:'row',justifyContent:"center",alignItems:"center",padding:8}}>
          <View style={{flex:0.8}}>
          <Text>აირჩიეთ სეზონი</Text>
          </View>
          <Picker
              mode="dropdown"
              style={{ flex:1 }}
              selectedValue={this.state.selected1}
              onValueChange={this.onValueChange.bind(this)}
            >

            {
        this.state.seasons.map((data) => {
            return(
              <Picker.Item label={data} value={data} />

            )
        })


            }

            </Picker>
          </View>
          <ScrollView>
          {


            this.state.series.map((item,index) => {
              return(
                <Ripple onPress={() => this.props.navigation.navigate("movie",{url:item.sd})}>
                <ListItem>
                <Text>სერია {index + 1}</Text>
                </ListItem>
              </Ripple>
              )
            })
          }


          </ScrollView>
          </ScrollView>
          </View>
        )
    }
}
