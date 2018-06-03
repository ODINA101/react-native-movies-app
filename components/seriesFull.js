import React, {Component} from 'react'
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';
import Toolbar from './toolbar';
import Ripple from 'react-native-material-ripple';
import Icon from 'react-native-vector-icons/Entypo';
import {Picker, List, ListItem} from 'native-base';
import {Spinner} from "native-base";
import StarRating from 'react-native-star-rating';
import Ionicons from "react-native-vector-icons/Ionicons"
import Orientation from 'react-native-orientation';
import ActionSheet from 'react-native-actionsheet'
import Video from 'react-native-af-video-player'
var VideoPlayer = require('react-native-native-video-player');

import {AdMobInterstitial, PublisherBanner} from 'react-native-admob'

var seasons = [];
var szn = [];
var qualitiesObjs = [];
var nnqu = [];   
export default class fullseries extends Component {
  constructor(props) {
    super(props);
   
    seasons = []
    szn = [];
      console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed','Setting a timer'];

    this.state = {
      selected1: "key0",
      seasons: [],
      series: [],
      isLoading: true,
      options: [
        "English", "Russian", "Georgian", "უკან"
      ],
      qoptions: [
        "hd", "sd", "უკან"
      ],
      nnqu:[],
      qualitiesObjs:[],
      lang: '',
      link: '',
      serieI:'',
      downloadLink:'',
      des:''

    };
 


    //  this.getSeason = this.getSeason.bind(this)
    this.playSerie = this
      .playSerie
      .bind(this)
  }
  seasonCompability(testSznNum) {
  
   
    
  }
  componentWillMount() {
    setTimeout(() => {
      AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());     
      }, 3000)






    // firebase.database().ref().child("series").child(this.props.navigation.state.p
    // a rams.key).child("parts").on("value",snapshot => {     databaseItems = [];
    // for(var i=1;i<=snapshot.numChildren();i++) { databaseItems.push("სეზონი " +
    // i);     }     }) this.setState({seasons:databaseItems})
    // this.getSeason("სეზონი 1");

    fetch("http://net.adjara.com/req/jsondata/req.php?id=" + this.props.navigation.state.params.key + "&reqId=getInfo")
      .then(res => res.json())
      .then(res => {
        if(!this.props.navigation.state.params.des) {
          this.setState({des:res.desc})
        }else{
          this.setState({des:this.props.navigation.state.params.des})
        } 




        const myarr = Object
          .keys(res)
          .map(i => res[i])
        this.setState({link:myarr[myarr.length-1]})
        myarr.forEach((item, index) => {
          if (item[1]) {
            if (typeof(item) == "object") {
              if (Object.keys(item).length > 1) {

                seasons.push(item)

              }

            }

          } else {}

        })



var testSznNum = 0;


var szns;

if(seasons[testSznNum][testSznNum+1].lang) {
szns =  Object
.keys(seasons[testSznNum])
.map(i => {
  if (seasons[testSznNum][i].quality || seasons[testSznNum][i].lang || typeof(seasons[testSznNum][i]) !== "undefined") {
  if(seasons[testSznNum][i].lang) {
    
    return seasons[testSznNum][i]

  }else{
    return "";
  }

  }else{
  }

});

}else{
  testSznNum++;
  szns =  Object
.keys(seasons[testSznNum])
.map(i => {
  if (seasons[testSznNum][i].quality || seasons[testSznNum][i].lang || typeof(seasons[testSznNum][i]) !== "undefined") {
  if(seasons[testSznNum][i].lang) {
    
    return seasons[testSznNum][i]

  }else{
    return "";
  }

  }else{
  }

});

}
        szn = szns;

        this.setState({series: szn, isLoading: false, seasons: seasons})



      

      })

  }
 
  SeriePlay(lang)
  {
    this.setState({lang})
    this
      .qActionSheet
      .show();

  }
  getq(data) {
  if(data !== "უკან") {
    if(data < 1000) {
      return "sd"
    }else{
      return "hd"
    }
  }else{
    return "უკან"
  }
  }
  getNum(num) {
    if (num < 10) {
      return ("0" + (num+1)).toString()
    } else {
      return (num+1).toString();
    }
  }

  playSerie(lang,serieI,quality) {
    var noption = lang.split(",")
    this.setState({serieI});
    noption.push("უკან")
  // if(quality == "300,1500") {

  // }else if(quality == "1500") {
  //   this.setState({})
  // }
  qualitiesObjs = [];
  nnqu = [];
   nqoption = quality.split(",")
   nqoption.push("უკან")
   nqoption.map(item => {
     qualitiesObjs.push({q:item})
     nnqu.push(this.getq(item))
    })
   



  this.setState({qoptions: nqoption,qualitiesObjs:qualitiesObjs,nnqu:nnqu})








    this.setState({options: noption})
    this
      .ActionSheet
      .show()

  }

  getSeason(value) {
    var datiko = [];
    var sss = seasons[parseInt(value.substr(value.length - 1))];
    datiko = Object
      .keys(sss)
      .map(i => {

        if (sss[i].quality || sss[i].lang || typeof(sss[i]) !== "undefined") {

          return sss[i]

        }

      })
    this.setState({series: datiko, isLoading: false})

  }
  onValueChange(value) {
    this.getSeason(value)
    this.setState({selected1: value});
  }
  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: "#FFF"
      }}>
        <Toolbar
          home={false}
          nav={this.props.navigation}
          title={this.props.navigation.state.params.title}/>
        <ScrollView style={{
          flex: 1
        }}>
          <View style={{
            height: 300
          }}>
            <Image
              style={{
              flex: 1
            }}
              blurRadius={5}
              source={{
              uri: this.props.navigation.state.params.photo
            }}/>
            <View
              style={{
              marginBottom: -200,
              backgroundColor: "#FFF",
              height: 200,
              width: 1000,
              marginLeft: -50,
              transform: [
                {
                  rotate: "15deg"
                }
              ]
            }}/>

          </View>

          <Image
            style={{
            width: 120,
            height: 200,
            marginTop: -180,
            marginLeft: 25
          }}
            source={{
            uri: this.props.navigation.state.params.photo
          }}/>

          <View
            style={{
            backgroundColor: "#FFF",
            padding: 20,
            marginTop: 25
          }}>
            {this.props.navigation.state.params.imdb
              ? (
                <View>
                  <StarRating
                    disabled={true}
                    emptyStar={'ios-star-outline'}
                    fullStar={'ios-star'}
                    halfStar={'ios-star-half'}
                    iconSet={'Ionicons'}
                    maxStars={5}
                    rating={parseFloat(this.props.navigation.state.params.imdb * (1 / 2))}
                    fullStarColor={'red'}
                    starSize={50}/>

                </View>
              )
              : (<View/>)
}
 

          </View>
          <View
            style={{
            backgroundColor: "#FFF",
            padding: 20,
            marginTop: 25
          }}>

            <Text
              style={{
              fontSize: 16,
              color: "black"
            }}>აღწერა</Text>

 
            <Text>{this.state.des}</Text>
          
          
          
          
          </View>

          {this.state.isLoading
            ? (
              <View>
                <Spinner/>
              </View>
            )
            : (
              <View>
                <View
                  style={{
                  flexDirection: 'row',
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 8
                }}>
                  <View style={{
                    flex: 0.8
                  }}>
                    <Text>აირჩიეთ სეზონი</Text>
                  </View>
                  <Picker
                    mode="dropdown"
                    style={{
                    flex: 1
                  }}
                    selectedValue={this.state.selected1}
                    onValueChange={this
                    .onValueChange
                    .bind(this)}>

                    {this
                      .state
                      .seasons
                      .map((data, index) => {
                        return (<Picker.Item key={0} label={"სეზონი " + (index + 1)} value={"key" + index}/>)
                      })
}

                  </Picker>
                </View>
                <ScrollView>

                  {this
                    .state
                    .series
                    .map((item, index) => {
                      return (
                        <Ripple key={index} onPress={() => this.playSerie(item.lang,index,item.quality)}>
                          <ListItem>
                            <Text>{(index + 1) + "." + item.name}</Text>
                          </ListItem>
                        </Ripple>
                      )
                    })
}

                </ScrollView>
              </View>
            )
}
        </ScrollView>
        <ActionSheet
          ref={o => this.ActionSheet = o}
          title={'აირჩიეთ ენა'}
          options={this.state.options}
          cancelButtonIndex={this.state.options.length - 1}
          onPress={(index) => {

            if(index !== (this.state.options.length - 1)) {

              this.SeriePlay(this.state.options[index])
            }else{

            }
        }}/>

        <ActionSheet
          ref={o => this.qActionSheet = o}
          title={'აირჩიეთ ხარისხი'}
          options={this.state.nnqu}
          cancelButtonIndex={this.state.qoptions.length - 1}
          onPress={(index) => {
            if(index !== (this.state.qoptions.length - 1)) {
              VideoPlayer.showVideoPlayer("http://" + this.state.link +  this.props.navigation.state.params.key+ "_" + this.getNum(parseInt(this.state.selected1.substr(this.state.selected1.length - 1))) + "_" + this.getNum(this.state.serieI) + "_" + this.state.lang + "_" + qualitiesObjs[index].q + ".mp4")

             // this.props.navigation.navigate("movie", {url: "http://" + this.state.link +  this.props.navigation.state.params.key+ "_" + this.getNum(parseInt(this.state.selected1.substr(this.state.selected1.length - 1))) + "_" + this.getNum(this.state.serieI) + "_" + this.state.lang + "_" + qualitiesObjs[index].q + ".mp4"})
            }else{

            }
        }}/>
      </View>
    )
  }
}
