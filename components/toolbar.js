import React, {Component} from 'react';

import {
    Platform,
    Text,
    View,
    ScrollView,
    StyleSheet,
    TouchableNativeFeedback,
    BackHandler,
    BackAndroid,
    TextInput,
    TouchableHighlight,
    Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import store from "./store";

import {StackNavigator} from 'react-navigation';
import {connect} from "react-redux";
import  Slider from 'react-native-slider';
import Ionicons from "react-native-vector-icons/Ionicons"
import Search from "./search"
import Feather from "react-native-vector-icons/Feather"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { MaterialDialog } from 'react-native-material-dialog';
import LinearGradient from "react-native-linear-gradient"
import {Picker, List, ListItem,Item} from 'native-base';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Entypo from "react-native-vector-icons/Entypo"
import Share, {ShareSheet, Button} from 'react-native-share';


var lens = [{
    name:"ინგლისური",
    real:"english"
},

{
    name:"ქართული",
    real:"georgian"
},
{
    name:"რუსული",
    real:"russian"
}


]


 class Toolbar extends Component {
    constructor() {
        super();

        this.state = {
            title: '',
            menu: true,
            drawerOpen: "",
            search: false,
            visible:false,
            startYear:1900,
            endYear:2018,
            lenguage:"georgian",
            value:0,
            value1:10,
            imdbIsChanged:false
            

        }



        this.background = TouchableNativeFeedback.SelectableBackground();

        if (Platform['Version'] >= 21) {
            this.background = TouchableNativeFeedback.Ripple('#fff', true)
        }

        store.subscribe((data) => this.setState({
            title: store
                .getState()
                .page,
            menu: store
                .getState()
                .menu,
            search: store
                .getState()
                .searching
        }))
    }

    componentDidMount() {

        this.setState({
            title: store
                .getState()
                .page
        });
    }
    onValueChange(dat) {
        this.setState({selected1:dat})
        console.log(dat)
  var year = 1900 + (parseInt(dat.replace("key",""))+1)
  console.log(year)

  this.setState({startYear:year})


    }
    onValueChange2(dat) {
        this.setState({selected2:dat})


        console.log(dat)
  var year = 2018 - (parseInt(dat.replace("key","")))
  console.log(year)

  this.setState({endYear:year})
    }
    onValueChange3(dat) {
        this.setState({selected3:dat})

        console.log(dat)


    }
    onValueChange4(dat) {
        this.setState({selected4:dat})
    }
    render() {

        return (

            <View style={{
                    height: 70
                }}>
                {

                    this.props.search
                        ? (
                            <View
                                style={{
                                    flex: 1,
                                    alignItems: "center",
                                    backgroundColor: "#3494e6",
                                    flexDirection: "row",
                                    paddingLeft: 20,
                                    elevation: 5,
                                    
                                }}>
                                <View
                                    style={{
                                        flex: 0.1,
                                        marginTop: 4
                                    }}>

                                    <TouchableNativeFeedback
                                        background={this.background}
                                        onPress={() => this.props.nav.pop()}>
                                        <View
                                            style={{
                                                backgroundColor: "transparent",
                                                width: 50,
                                                marginLeft:-10,
                                                justifyContent:"center",
                                                alignItems:"center"
                                            }}>
                                            <Ionicons name="md-arrow-round-back" color="white" size={32}/>
                                        </View>

                                    </TouchableNativeFeedback>
                                </View>

                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent:"center",
                                        marginTop: 10

                                        
                                        
                                    }}>
                                    <Search style={{marginTop:16}} searchChange={(text) => this.props.searchChange(text)}/>
                                </View>
                            </View>
                        )
                        : (
                            <View
                                style={{
                                    flexDirection: "row",
                                    backgroundColor: "#3494e6",
                                    height: 70,
                                    elevation: 5,
                                    padding: 18
                                }}>

                                {

                                    this.props.search
                                        ? (<View/>)
                                        : (
                                            <View
                                                style={{
                                                    flex: 0.2,
                                                    marginTop: 5
                                                }}>
                                                {

                                                    this.props.home
                                                        ? (

                                                            <TouchableNativeFeedback
                                                                background={this.background}
                                                                onPress={() => this.props.redux.openDrawer()}>
                                                                <View
                                                                    style={{
                                                                        backgroundColor: "transparent",
                                                                        width: 50,
                                                                        marginLeft:-10,
                                                                        justifyContent:"center",
                                                                        alignItems:"center"
                                                                    }}>
                                                                    <Icon name="menu" color="white" size={32}/>
                                                                </View>

                                                            </TouchableNativeFeedback>

                                                        )
                                                        : (

                                                            <TouchableNativeFeedback
                                                                background={this.background}
                                                                onPress={() => this.props.nav.pop()}>
                                                                <View
                                                                    style={{
                                                                        backgroundColor: "transparent",
                                                                        width: 50,
                                                                        marginLeft:-10,
                                                                        justifyContent:"center",
                                                                        alignItems:"center"
                                                                    }}>
                                            <Ionicons name="md-arrow-round-back" color="white" size={32}/>
                                                                </View>

                                                            </TouchableNativeFeedback>

                                                        )

                                                }
                                            </View>
                                        )

                                }
                                {

                                    this.props.search
                                        ? (<View/>)
                                        : (
                                            <View
                                                style={{
                                                    flex: 1,
                                                    flexDirection: "row",
                                                    alignItems: "center"
                                                }}>
                                                <Text
                                                    style={{
                                                        color: "white",
                                                        fontSize: 16,
                                                        marginTop: 5
                                                    }}>

                                                    {
                                                        this.props.home
                                                            ? (this.props.redux.page)
                                                            : (this.props.title)
                                                    }

                                                </Text>
                                            </View>

                                        )

                                }

                                {
                                    this.props.search
                                        ? (<View/>)
                                        : (
                                            <View
                                                style={{
                                                    marginTop: 13
                                                }}>

                                                {
                                                    this.props.home
                                                        ? (
                                                            <View
                                                                style={{
                                                                    flex: 0.1,
                                                                    flexDirection: "row",
                                                                    alignItems: "center",
                                                                    marginTop: 5
                                                                }}>
                                                                {
this.state.title == "მთავარი"?(
<TouchableNativeFeedback
                                                                    background={this.background}
                                                                    onPress={() => {
                                                                        this.setState({visible:true});
                                                                      }}>
                                                                         


                                                                    <View
                                                                        style={{
                                                                            backgroundColor: "transparent",
                                                                            width: 50,
                                                                            marginRight:-15,
                                                                            width: 50,
                                                                            alignItems:"center"
                                                                        }}>
                                                                        <MaterialIcons name="filter-list" color="white" size={25}/>
                                                                    </View>
                                                                </TouchableNativeFeedback>

):(
    <View />
)

                                                                }
                                                                
                                                                <TouchableNativeFeedback
                                                                    background={this.background}
                                                                    onPress={() => {
                                                                        this.setState({
                                                                            search: !this.state.search
                                                                        });
                                                                        this
                                                                            .props
                                                                            .nav
                                                                            .navigate("grid")
                                                                    }}>

                                                                    <View
                                                                        style={{
                                                                            backgroundColor: "transparent",
                                                                            width: 50,
                                                                            marginRight:-15,
                                                                            width: 50,
                                                                            alignItems:"center"
                                                                        }}>
                                                                        <Feather name="search" color="white" size={25}/>
                                                                    </View>
                                                                </TouchableNativeFeedback>
                                                            </View>

                                                        )
                                                        : (<View
                                                            style={{
                                                                flex: 0.1,
                                                                flexDirection: "row",
                                                                alignItems: "center",
                                                                marginTop: 5
                                                            }}>
                                                            {
this.state.title == "მთავარი"?(
<TouchableNativeFeedback
                                                                background={this.background}
                                                                onPress={() => {
                                                                    Share.open({
                                                                        title: "გაზიარება",
                                                                        message: this.props.title,
                                                                        url: "http://net.adjara.com/Movie/main?id=" + this.props.id,
                                                                        subject: "Share Link" //  for email
                                                                      }, {
                                                                        "social": "facebook"
                                                                      }).catch((err) => { err && console.log(err); })
                                                                  }}>
                                                                     


                                                                <View
                                                                    style={{
                                                                        backgroundColor: "transparent",
                                                                        width: 50,
                                                                        marginRight:-15,
                                                                        width: 50,
                                                                        alignItems:"center"
                                                                    }}>
                                                                    <Entypo name="share" color="white" size={25}/>
                                                                </View>
                                                            </TouchableNativeFeedback>

):(
<View />
)

                                                            }
                                                            
                                                            <TouchableNativeFeedback
                                                                background={this.background}
                                                                 >

                                                                <View
                                                                    style={{
                                                                        backgroundColor: "transparent",
                                                                        width: 50,
                                                                        marginRight:-15,
                                                                        width: 50,
                                                                        alignItems:"center"
                                                                    }}>
                                                                    <MaterialCommunityIcons name="dots-vertical" color="white" size={25}/>
                                                                </View>
                                                            </TouchableNativeFeedback>
                                                        </View>)
                                                }
                                                         

                                            </View>
                                        )
                                }

                            </View>

                        )

                }
<MaterialDialog
 title="გაფილტვრა"
visible={this.state.visible}
  onOk={() => {this.setState({ visible: false });  
  store.dispatch({type:"database",payload:null})
// if(!this.state.imdbIsChanged) {




  fetch("http://net.adjara.com/Search/SearchResults?ajax=1&display=15&startYear=" + this.state.startYear + "&endYear=" + this.state.endYear +"&offset=0&isnew=0&needtags=0&orderBy=date&order%5Border%5D=desc&order%5Bdata%5D=relised&language=georgian&country=false&game=0&softs=0&videos=0&xvideos=0&vvideos=0&dvideos=0&xphotos=0&vphotos=0&dphotos=0&trailers=0&episode=0&tvshow=0&flashgames=0")
  .then(res => res.json()).then(res => 
  {
    databaseItems = res.data;
    store.dispatch({type:"database",payload:databaseItems})
    store.dispatch({type:"startYear",payload:this.state.startYear})
    store.dispatch({type:"endYear",payload:this.state.endYear})
    
    console.log(databaseItems)
  })
// }else{
//     fetch("http://net.adjara.com/Search/SearchResults?ajax=1&display=15&startYear=1900&endYear=2018&offset=15&isnew=0&needtags=0&orderBy=date&order%5Border%5D=desc&order%5Bdata%5D=rating&order%5Bstart%5D=" + parseInt(this.state.value) + "&order%5Bend%5D=" + parseInt(this.state.value1) +"&order%5Bmeta%5D=imdb&language=georgian&country=false&game=0&softs=0&videos=0&xvideos=0&vvideos=0&dvideos=0&xphotos=0&vphotos=0&dphotos=0&trailers=0&episode=0&tvshow=0&flashgames=0"
//     ).then(res => res.json()).then(res => 
//         {
//           databaseItems = res.data;
//           store.dispatch({type:"database",payload:databaseItems})
//           store.dispatch({type:"startYear",payload:this.state.startYear})
//           store.dispatch({type:"endYear",payload:this.state.endYear})
          
//           console.log(databaseItems)
//         })
// }



}
 
 
}
  onCancel={() => this.setState({ visible: false })}>
  <Text>
   წელი
  </Text>
  <View style={{flexDirection:"row"}}>
 
  <Picker
 style={{flex:1}}                  
 mode='dropdown'
selectedValue={this.state.selected1}
onValueChange={this.onValueChange.bind(this)}>


{
     Array.apply(null,Array(118)).map((item,i) => {
return (
<Item label={(1900 + i + 1).toString()} value={"key" + i} />
);    

})

}

</Picker>
<View style={{flex:0.5,justifyContent:"center",alignItems:"center"}}>
<Text style={{color:"#000"}}>
   დან
  </Text>
</View>
</View>

  <View style={{flexDirection:"row"}}>
 
 <Picker
style={{flex:1}}                  
mode='dropdown'
selectedValue={this.state.selected2}
onValueChange={this.onValueChange2.bind(this)}>


{
    Array.apply(null,Array(118)).map((item,i) => {
return (
<Item label={(2018 - i).toString()} value={"key" + i} />
);    

})

}

</Picker>
<View style={{flex:0.5,justifyContent:"center",alignItems:"center"}}>
<Text style={{color:"#000"}}>
  მდე
 </Text>
</View>
</View>

  <Text>
   ენა
  </Text>
  <Picker
mode='dropdown'
selectedValue={this.state.selected3}
onValueChange={this.onValueChange3.bind(this)}>

{
    lens.map((item,i) => {
return (
<Item label={item.name} value={item.real} />
    
)
})
}

</Picker>


  {/* <Text>
   ქვეყანა
  </Text>
  <Picker
mode='dropdown'
selectedValue={this.state.selected4}
onValueChange={this.onValueChange4.bind(this)}>


<Item label="გერმანია" value="key0" />
<Item label="იტალია" value="key1" />
<Item label="იაპონია" value="key2" />
<Item label="საფრანგეთი" value="key3" />
<Item label="აშშ" value="key4" />
<Item label="საქართველო" value="key5" />
<Item label="კორეა" value="key6" />
<Item label="რუსეთი" value="key7" />
<Item label="ინდოეთი" value="key8" />
<Item label="დიდი ბრიტანეთი" value="key9" />

</Picker>

 */}
 {/* <Text>imdb:{(this.state.value).toFixed(1)}: დან</Text>  */}
 {/* <Slider
 maximumValue={10}
          value={this.state.value}
          onValueChange={(value) => this.setState({value,imdbIsChanged:true})} />

<Text>imdb:{(this.state.value1).toFixed(1)}: მდე</Text> 
 <Slider
 maximumValue={10}
          value={this.state.value1}
          onValueChange={(value) => this.setState({value1:value,imdbIsChanged:true})} /> */}
</MaterialDialog>
            </View>

        );

    }

}

function mapStateToProps(state) {
    return {redux: state}
}

function mapDispatchToProps(dispatch) {
    return {
        test: () => {}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)