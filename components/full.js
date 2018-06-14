import React from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Linking,
    Dimensions,
} from 'react-native';
import Toolbar from './toolbar';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ripple from "react-native-material-ripple"
import Modal from "react-native-modal";
import StarRating from 'react-native-star-rating';
import Ionicons from "react-native-vector-icons/Ionicons"
import Orientation from 'react-native-orientation';
import ActionSheet from 'react-native-actionsheet'
import Actor from "./SingleActor";
import { AdMobInterstitial } from 'react-native-admob'
import downloadManager  from 'react-native-simple-download-manager';
import { Tab, Tabs, Spinner } from 'native-base';
var actors = [];
//import Video from 'react-native-af-video-player'
//import VideoPlayer1 from "react-native-native-video-player";
import NestedScrollView from 'react-native-nested-scroll-view';
 //var WebViewAndroid = require('react-native-webview-android');
 import movieTrailer  from 'movie-trailer';
 import LikeThisMovies from "./LikeThisMovies"
//import AutoHeightWebView from 'react-native-autoheight-webview';
export default class Full extends React.Component {

 constructor(props) {
        super(props);
        // setInterval(() => {
        //     const initial = Orientation.getInitialOrientation();
        //     if (initial === 'PORTRAIT') {
        //         // do something
        //     } else {
        //         Orientation.lockToPortrait();
        
        //     }
        //  },1000)
         
        
        this.state = {
            storage: 0,
            isModalVisible: false,
            link: "",
            lang: "English",
            options: [],
            video:"",
            qoptions: [
                "hd", "sd", "უკან"
            ],
            isDown: false,
            actors: "",
            types:[],
            enabled:true,
            he:200,
            pageIsLoaded:false
            
        }
        this.playMovie = this
            .playMovie
            .bind(this)
        this.download = this
            .download
            .bind(this)
        
        // store.dispatch({type:"OpenUri",payload:this.openuri})

        // const initial = Orientation.getInitialOrientation();
        // if (initial === 'PORTRAIT') {
        //     // do something
        // } else {
        //     Orientation.lockToPortrait();

        // }


        this.openTrailer = this.openTrailer.bind(this)
    }


    openTrailer() {
        Linking.openURL(this.state.video).catch(err => console.error('An error occurred', err));
    }



dsc() {
    this.setState({enabled:false });
}

    componentWillMount() {
        actors = [];
        Orientation.addOrientationListener(this._orientationDidChange);
 
        movieTrailer('Crash').then(console.log)


        movieTrailer((this.props.navigation.state.params.titleEn).toString(), {year: this.props.navigation.state.params.year, multi: false} )
        .then( response => {
            this.setState({video:response})


        } )
            



        fetch(
            "http://net.adjara.com/req/jsondata/req.php?id=" + this.props.navigation.state.params.key +
            "&reqId=getLangAndHd"
        )
        .then(res => res.json())
        .then(res => {
            
            var info = Object
            .keys(res)
            .map(i => res[i])

            var noption = info[0]
                    .lang
                    .split(",")
                noption.push("უკან")
                this.setState({options: noption, link: info[0].url})
                Object
                .keys(res.cast)
                .map(async (item) => {
                    actors.push({id:item,name:res.cast[item]})
                })
             this.setState({actors})
console.log(actors)
               
           
                
               

                fetch(
                    "http://net.adjara.com/req/jsondata/req.php?id=" + this.props.navigation.state.params.key +
                    "&reqId=getInfo"
                )
                .then(res => res.json())
                .then(res => {
                        console.log(res)
                        
                        
                        var genres = Object.keys(res.genres).map(i => res.genres[i])
                        
                        this.setState({des: res.desc[0],types:genres})
                        
                        setTimeout(() => {
                            AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
                                
                            }, 2000)

                            this.setState({pageIsLoaded:true})
                    })
                    
            


                
            })
            
      
          

            
        }
        getQuality(q) {
            if (q == "sd") {
            return "300"
        } else {
            return "1500"
        }
        
    }
    
        playMovie(dato) {
      console.log(dato)
            if (dato == false) {
    
                this.setState({isDown: true});
            } else {
                this.setState({isDown: false});
            }
    

                this
                .ActionSheet
                .show()
             
     
        }
    
    
        
        
    download() {
        
        
        
        
        //downloadManager.download({url:""})
        
        // var url1 = 'https://www.optoma.co.uk/images/ProductApplicationFeatures/4kuhd/banner.jpg';
        // var headers = {'Authorization': 'Bearer abcsdsjkdjskjdkskjd'};
        // const config = {
        //   downloadTitle: 'Title that should appear in Native Download manager',
        //   downloadDescription: 'Description that should appear in Native Download manager',
        //   saveAsName: 'File name to save',
        //   allowedInRoaming: true,
        //   allowedInMetered: true,
        //   showInDownloads: true,
        //   external: true, //when false basically means use the default Download path (version ^1.3)
        //   path: "Download/" //if "external" is true then use this path (version ^1.3)
        // };
        
        // downloadManager.download(url1, headers, config).then((response)=>{
        //   console.log('Download success!');
        // }).catch(err=>{
        //   console.log('Download failed!');
        //   console.error(err)
        // })
        // ////////////////////////////// await AsyncStorage.removeItem('firstTime');
        // // ////////////////////////////
        // RNFS
        //     .getFSInfo()
        //     .then(async (info) => {
        //         if (parseInt((info.freeSpace / 1024) / 1024) > 1000) {

        //             const value = await AsyncStorage.getItem('firstTime');
        //             if (!value) {
        //                 try {
        //                     await AsyncStorage.setItem('firstTime', 'yes');
        //                     this
        //                         .props
        //                         .navigation
        //                         .navigate('tut', {OpenUri: this.openuri});

        //                 } catch (error) {}

        //             } else {

        //                 

        //             }

        //         } else {
        //             this.setState({
        //                 free: parseInt((info.freeSpace / 1024) / 1024)
        //             })
        //             this._toggleModal()

        //         }
        //     });

    }

    MoviePlay(lang) {
        this.setState({lang})
        this
            .qActionSheet
            .show();

    }

    _toggleModal = () => this.setState({
        isModalVisible: !this.state.isModalVisible
    });
  
    _orientationDidChange = () => {
       this.setState({dem:Dimensions.get("window").width})
      }
    

    render() {
if(this.state.pageIsLoaded) {
        return (

            <View
                style={{
                    flex: 1,
                    backgroundColor: "#FFF"
                }}>
                <Toolbar
                    home={false}
                    nav={this.props.navigation}
                    title={this.props.navigation.state.params.title}
                    id={this.props.navigation.state.params.key}/>
                <NestedScrollView style={{
                        flex: 1
                    }} 	scrollEnabled={this.state.enabled}>
                    <View
                        style={{
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
                    <Ripple
                        onPress={() => this.playMovie(false)}
                        rippleContainerBorderRadius={100}
                        style={{
                            elevation: 5,
                            marginTop: -75,
                            marginRight: 40,
                            width: 50,
                            height: 50,
                            backgroundColor: "#609DE2",
                            borderRadius: 100,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: "center",
                            alignSelf: "flex-end"
                        }}>
                        <Entypo name="controller-play" size={32} color="#FFFFFF"/>
                    </Ripple>
                    <Modal isVisible={this.state.isModalVisible}>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                            <View
                                style={{
                                    width: 250,
                                    height: 320,
                                    backgroundColor: "#FFF",
                                    flexDirection: "column"
                                }}>
                                <View
                                    style={{
                                        flex: 0.6,
                                        backgroundColor: "red",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                    <MaterialIcons name="error" size={50} color="#FFFFFF"/>

                                </View>

                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: "flex-start",
                                        padding: 20
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 17,
                                            color: "black"
                                        }}>მოხდა შეცდომა!
                                    </Text>
                                    <Text>სამწუხაროდ თქვენ არ გაქვთ საკმარისი თავისუფალი მეხსიერება</Text>

                                </View>

                                <TouchableOpacity
                                    onPress={this._toggleModal}
                                    style={{
                                        flex: 0.3,
                                        backgroundColor: "grey",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                    <Text
                                        style={{
                                            color: "#FFFFFF"
                                        }}>კარგი</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </Modal>
                    <Ripple
                        onPress={() => this.playMovie(true)}
                        rippleContainerBorderRadius={100}
                        style={{
                            elevation: 5,
                            marginTop: -70,
                            marginRight: 110,
                            width: 50,
                            height: 50,
                            backgroundColor: "#609DE2",
                            borderRadius: 100,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: "center",
                            alignSelf: "flex-end"
                        }}>
                        <Entypo name="download" size={32} color="#FFFFFF"/>
                    </Ripple>

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

                        {
                            this.props.navigation.state.params.title?(
                             <Text style={{color:"#000",fontSize:20}}>{this.props.navigation.state.params.title}</Text>
                            ):(<View/>)
                        }

                            <View style={{alignItems:"center"}}>
                        {

                            this.props.navigation.state.params.imdb
                                ? (
                                    <View style={{marginTop:10,paddong:10,width:Dimensions.get("window").width/1.5,}}>
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
                        {
                            this.props.navigation.state.params.year
                                ? (
                                    <View>
                                        <View
                                            style={{
                                                marginTop: 20
                                            }}>
                                            <Text
                                                style={{
                                                    color: "black"
                                                }}>გამოშვების წელი:
                                            </Text>
                                            <Text>{this.props.navigation.state.params.year}</Text>
                                        </View>

                                        {
                                             this.state.types?(
                                                 <View>
                                                <View
                                                style={{
                                                    flexDirection: 'row',
                                                    marginTop: 20,
                                                    width:200,
                                                }}>
                                                <Text
                                                    style={{
                                                        color: "black"
                                                    }}>ჟანრი:
                                                </Text>
                                                    </View>
                                                <View
                                            style={{
                                            }}>
                                                {
                                                   this.state.types.map(itm => {
                                                       return (
                                                   <Text key={itm}> {itm} </Text>
                                                       )
                                                   })
    
                                                }
                                                </View>
                                                </View>
                                                
                                             ):(<View />)
                                        }
                                       
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                marginTop: 20
                                            }}>
                                            <Text
                                                style={{
                                                    color: "black"
                                                }}>ნახვა:
                                            </Text>
                                            <Text>{this.props.navigation.state.params.views}</Text>
                                        </View>
                                    </View>
                                )
                                : (<View/>)
                        }

                        <Text
                            style={{
                                fontSize: 16,
                                color: "black",
                                marginTop: 10
                            }}>აღწერა</Text>

                        {
                            this.props.des
                                ? (<Text>{this.props.navigation.state.params.des}</Text>)
                                : (<Text>{this.state.des}</Text>)

                        }

                       

                    </View>
                    <Tabs initialPage={0} locked={false} style={{flex:1,marginTop: 10}}>
          <Tab heading="მსახიობები" >
          {
                            
                  <NestedScrollView style={{flex:1,height:300}}>
              <View style={{backgroundColor:'#3494e6'}}>
              {
                  this.state.actors? (
                                             
                                            <Actor
                                            navigation={this.props.navigation}
                                            list={this.state.actors}/>
                                            
                                        ):(<View />)
                                        
                                    }
                                
                              
                                            </View>

                        </NestedScrollView>
                        }
                        
          </Tab>
          <Tab heading="Trailer" style={{height:300}}>
            <View style={{flex:1}}>
       {
           this.state.video? (
                
                 <View style={{backgroundColor:"black",flex:1,justifyContent:"center",alignItems:"center"}}>
                 <Ripple onPress={() =>  { this.openTrailer() }} >
 
                  <View style={{width:70,height:70,backgroundColor:"#FFF",borderRadius:35,opacity:0.6,justifyContent:"center",alignItems:"center"}}>
                  <Ionicons name="md-play" color="#FFF" size={40} style={{marginLeft:10}}/>
                  
                  </View>
                </Ripple>
                 </View>    
        
        ):(
               <View>
               <Spinner />
               </View>
           )
       }
                </View>
          </Tab>
        {/* <Tab  heading="კომები">
      
        <WebView
         javaScriptEnabled={true}
         javaScriptEnabledAndroid={true}
          source={{uri:'https://www.facebook.com/plugins/comments.php?api_key=376429472422698&channel_url=http%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter%2Fr%2FRQ7NiRXMcYA.js%3Fversion%3D42%23cb%3Df3aef1ab184469%26domain%3Dnet.adjara.com%26origin%3Dhttp%253A%252F%252Fnet.adjara.com%252Ffc677a2078d1a%26relation%3Dparent.parent&href=http%3A%2F%2Fadjaranet.com%2FMovie%2Fmain%3Fid%3D' +  this.props.navigation.state.params.key + ' &locale=en_US&numposts=6&order_by=reverse_time&sdk=joey&width=956'}}     
          
          injectedJavaScript='var ika = document.querySelector("body.plugin");ika.style.overflow = "scrosll"'
          />
          </Tab> 
           */}
        </Tabs>
        <View style={{height:200,backgroundColor:"#9b59b6"}}>
                
                <LikeThisMovies nav={this.props.navigation} Id={this.props.navigation.state.params.key}/>

              </View>   
             
              </NestedScrollView>
            
             
             
             
             
             
             
             
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={'აირჩიეთ ენა'}
                    options={this.state.options}
                    cancelButtonIndex={this.state.options.length - 1}
                    onPress={(index) => {

                        if (index !== (this.state.options.length - 1)) {

                            this.MoviePlay(this.state.options[index])
                        }
                    }}/>

                <ActionSheet
                    ref={o => this.qActionSheet = o}
                    title={'აირჩიეთ ხარისხი'}
                    options={this.state.qoptions}
                    cancelButtonIndex={this.state.qoptions.length - 1}
                    onPress={(index) => {

                        if (this.state.isDown) {
                           

                            if (index !== (this.state.qoptions.length - 1)) {
                                 
                                //  VideoPlayer1.showVideoPlayer(this.state.link + this.props.navigation.state.params.key + "_" + this.state.lang +
                                //  "_" + this.getQuality(this.state.qoptions[index]) + ".mp4")
                                 this
                                    .props
                                    .navigation
                                    .navigate("movie", {
                                        url: this.state.link + this.props.navigation.state.params.key + "_" + this.state.lang +
                                                "_" + this.getQuality(this.state.qoptions[index]) + ".mp4"
                                    })
                            }

                        } else {
               console.log("gadmowera")
                            if (index !== (this.state.qoptions.length - 1)) {
                                 
           
                                    const url = this.state.link + this.props.navigation.state.params.key + "_" + this.state.lang +
                                    "_" + this.getQuality(this.state.qoptions[index]) + ".mp4";
                                    const headers = {'Authorization': 'movie is downloading'};
                                    const config = {
                                      downloadTitle:this.props.navigation.state.params.title,
                                      downloadDescription: 'მიმდინარეობს გადმოწერა',
                                      saveAsName: this.props.navigation.state.params.title,
                                      allowedInRoaming: true,
                                      allowedInMetered: true,
                                      showInDownloads: true,
                                      external: false, //when false basically means use the default Download path (version ^1.3)
                                      path: "Download/" //if "external" is true then use this path (version ^1.3)
                                    };
                                    
                                    
                                    downloadManager.download(url, headers, config).then(()=>{
                                      console.log('Download success!');
                                    }).catch(err=>{
                                      console.log(err);
                                      if(err.reason == "ERROR_INSUFFICIENT_SPACE") {
                                          this._toggleModal()
                                      }
                                    })





                            }

                        }

                    }}/>

            </View>

        )
    }else{
        return( <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
          
          <Spinner />
        
    </View> )
    }
    }

}
