import React, {Component} from 'react'
import {
  Text,
  View,
  ScrollView,
  Image,
  AsyncStorage,
  Dimensions
} from 'react-native';
import Toolbar from './toolbar';
import Ripple from 'react-native-material-ripple';
import {Picker, ListItem,} from 'native-base';
import {Spinner} from "native-base";
import StarRating from 'react-native-star-rating';
import ActionSheet from 'react-native-actionsheet'
import VideoPlayer from 'react-native-native-video-player';

import {AdMobInterstitial } from 'react-native-admob'

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
      des:'',
      player:"",
      quality:"sd",
      saved:Boolean,
      savedSelectedIndex:'',
      savedSelectedIndexSzn:''

    };
 
    this.getPlayerData = this.getPlayerData.bind(this)
   this.getPlayerData()
    //  this.getSeason = this.getSeason.bind(this)
    this.playSerie = this
      .playSerie
      .bind(this)
      this.save = this.save.bind(this)
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
        myarr.forEach((item) => {
          if (item[1]) {
            if (typeof(item) == "object") {
              if (Object.keys(item).length > 1) {

                seasons.push(item)

              }

            }

          }  

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

  } 

});

}
        szn = szns;

        this.setState({series: szn, isLoading: false, seasons: seasons})



      

      })

  }
  
  
  
async save(sezoni,ind,indSezon) { 
 
  this.setState({selected1:sezoni,savedSelectedIndex:ind,savedSelectedIndexSzn:indSezon})
  await AsyncStorage.setItem((this.props.navigation.state.params.key).toString(),JSON.stringify({season:sezoni,serie:{ind:ind,season:indSezon}}))

 

  }




  SeriePlay(lang)
  {
    this.setState({lang})


   this.setState({lang})
        if(this.state.quality == "არჩევითი") {
        this.qActionSheet.show();
        }else if(this.state.quality == "sd"){
         
            if(this.state.player == "შიდა") {
                this
                    .props
                    .navigation
                    .navigate("movie", {
                        url: "http://" + this.state.link +  this.props.navigation.state.params.key+ "_" + this.getNum(parseInt(this.state.selected1.substr(this.state.selected1.length - 1))) + "_" + this.getNum(this.state.serieI) + "_" + this.state.lang + "_" + 300 + ".mp4"
                    })
                }else{
                    VideoPlayer.showVideoPlayer("http://" + this.state.link +  this.props.navigation.state.params.key+ "_" + this.getNum(parseInt(this.state.selected1.substr(this.state.selected1.length - 1))) + "_" + this.getNum(this.state.serieI) + "_" + this.state.lang + "_" + 300 + ".mp4")
                }


        }else{
          
            if(this.state.player == "შიდა") {
                this
                    .props
                    .navigation
                    .navigate("movie", {
                        url: "http://" + this.state.link +  this.props.navigation.state.params.key+ "_" + this.getNum(parseInt(this.state.selected1.substr(this.state.selected1.length - 1))) + "_" + this.getNum(this.state.serieI) + "_" + this.state.lang + "_" + 1500 + ".mp4"
                    })
                }else{
                    VideoPlayer.showVideoPlayer("http://" + this.state.link +  this.props.navigation.state.params.key+ "_" + this.getNum(parseInt(this.state.selected1.substr(this.state.selected1.length - 1))) + "_" + this.getNum(this.state.serieI) + "_" + this.state.lang + "_" + 1500 + ".mp4")
                }

        }







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
  var nqoption = quality.split(",")
   nqoption.push("უკან")
   nqoption.map(item => {
     qualitiesObjs.push({q:item})
     nnqu.push(this.getq(item))
    })

    
    
    this.setState({qoptions: nqoption,qualitiesObjs:qualitiesObjs,nnqu:nnqu,serieI})
    
    this.save(this.state.selected1,serieI,this.state.selected1)







    this.setState({options: noption})
    this
      .ActionSheet
      .show()

  }
  async getPlayerData() {
    var data = await AsyncStorage.getItem("player")
     this.setState({player:data})
     var data2 = await AsyncStorage.getItem("quality")
     this.setState({quality:data2})
     var data3 = await AsyncStorage.getItem((this.props.navigation.state.params.key).toString())
   // alert(data3)
    var asyncdat = JSON.parse(data3)
        this.setState({selected1:asyncdat.season,savedSelectedIndex:asyncdat.serie.ind,savedSelectedIndexSzn:asyncdat.serie.season})
        this.getSeason(asyncdat.season)
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
    if(this.state.savedSelectedIndex) {
   if(this.state.savedSelectedIndexSzn) {
    this.save(value,this.state.savedSelectedIndex,this.state.savedSelectedIndexSzn)

   }else{
    this.save(value,this.state.savedSelectedIndex,null)

   }
    }else{

      this.save(value,null,null)
    }
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
          title={this.props.navigation.state.params.title}
          id={this.props.navigation.state.params.key}
          views={this.props.navigation.state.params.views}
          photo={this.props.navigation.state.params.photo}
          des={this.props.navigation.state.params.des}
          imdb={this.props.navigation.state.params.imdb}
          year={this.props.navigation.state.params.year}
          
          
          
          />
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
              {
                            this.props.navigation.state.params.title?(
                              <View style={{padding:20}}>
                             <Text style={{color:"#000",fontSize:20}}>{this.props.navigation.state.params.title}</Text>
                             </View>
                            ):(<View/>)
                        }

          <View
            style={{
            backgroundColor: "#FFF",
            padding: 20,
            alignItems:"center"
          }}>
            {this.props.navigation.state.params.imdb
              ? (
                <View  style={{padding:10,width:Dimensions.get("window").width/1.5,}}>
                  <StarRating
                    disabled={true}
                    emptyStar={'star-o'}
                                            fullStar={'star'}
                                            halfStar={'star-half'}
                                            iconSet={'FontAwesome'}
                    maxStars={5}
                    rating={parseFloat(this.props.navigation.state.params.imdb * (1 / 2))}
                    fullStarColor={'red'}
                    starSize={40}/>
                            
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
                    flex: 1
                  }}>
                    <Text style={{marginLeft:10}}>    აირჩიე სეზონი</Text>
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
                        return (
                          <Picker.Item key={0} label={"სეზონი " + (index + 1)} value={"key" + index}/>
                      

                      )
                      })
}

                  </Picker>
                </View>
                <ScrollView>

                  {this
                    .state
                    .series
                    .map((item, index) => {
          
                      if(this.state.savedSelectedIndex !== '') {
                        if(this.state.savedSelectedIndexSzn == this.state.selected1) {
                        
                        if(index == this.state.savedSelectedIndex) {
                          return (
                            <Ripple key={index}   onPress={() => this.playSerie(item.lang,index,item.quality)}>
                            <ListItem  style={{backgroundColor:"#3494e6",borderRadius:10,paddingLeft:10}}>
                              <Text style={{color:"#FFF"}}>{(index + 1) + "." + item.name}</Text>
                            </ListItem>
                          </Ripple>
                         )
                        }else{
                          return(
                            <Ripple key={index} onPress={() => this.playSerie(item.lang,index,item.quality)}>
                            <ListItem>
                              <Text>{(index + 1) + "." + item.name}</Text>
                            </ListItem>
                          </Ripple>
                          )
                        } 
                    
                     }else{
                      return(
                        <Ripple key={index} onPress={() => this.playSerie(item.lang,index,item.quality)}>
                        <ListItem>
                          <Text>{(index + 1) + "." + item.name}</Text>
                        </ListItem>
                      </Ripple>
                      )
                     } 
                    }else{
                      return(
                        <Ripple key={index} onPress={() => this.playSerie(item.lang,index,item.quality)}>
                        <ListItem>
                          <Text>{(index + 1) + "." + item.name}</Text>
                        </ListItem>
                      </Ripple>
                      )
                    }

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
            } 
        }}/>

        <ActionSheet
          ref={o => this.qActionSheet = o}
          title={'აირჩიეთ ხარისხი'}
          options={this.state.nnqu}
          cancelButtonIndex={this.state.qoptions.length - 1}
          onPress={(index) => {
            if(index !== (this.state.qoptions.length - 1)) {
              if(this.state.player == "შიდა") {
                
                this.props.navigation.navigate("movie", {url: "http://" + this.state.link +  this.props.navigation.state.params.key+ "_" + this.getNum(parseInt(this.state.selected1.substr(this.state.selected1.length - 1))) + "_" + this.getNum(this.state.serieI) + "_" + this.state.lang + "_" + qualitiesObjs[index].q + ".mp4"})
              }else{
                VideoPlayer.showVideoPlayer("http://" + this.state.link +  this.props.navigation.state.params.key+ "_" + this.getNum(parseInt(this.state.selected1.substr(this.state.selected1.length - 1))) + "_" + this.getNum(this.state.serieI) + "_" + this.state.lang + "_" + qualitiesObjs[index].q + ".mp4")

              }
            } 
        }}/>
      </View>
    )
  }
}
