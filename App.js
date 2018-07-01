

import React, { Component } from 'react';
import {
 Text,
 View,
 DrawerLayoutAndroid,
 ScrollView,
 StatusBar,
 AsyncStorage

} from 'react-native';
import { Provider } from "react-redux"
import HomeRouter from "./components/homeRouter";
import { Button  } from 'native-base';
import store from "./components/store";
import  Orientation  from 'react-native-orientation';
import {AdMobInterstitial,  AdMobRewarded } from 'react-native-admob'





export default class App extends Component {

 constructor() {
   super();
  Orientation.unlockAllOrientations()
  console.disableYellowBox = true;
   this.openDrawer = this.openDrawer.bind(this);
   this.closeDrawer = this.closeDrawer.bind(this);
 

   store.dispatch({type:"SetOpenDrawer",payload:this.openDrawer})
this.state = {
 title:"მთავარი",
 drawerlock:"unlocked",
 categories:[
 "მთავარი",
 "სერიალები",
 "კომედია",
 "ქართული",
 "ანიმაცია",
 "დეტექტივი",
 "დოკუმენტური",
 "ისტორიული",
 "კრიმინალური",
 "ბიოგრაფიული",
 "ფანტასტიკა",
 "თრილერი",
 "მისტიკა",
 "საშინელებათა",
 "ვესტერნი",
 "დრამა",
 "მიუზიკლი",
 "სპორტული",
 "მძაფრ-სიუჟეტიანი",
 "საომარი",
 "სათავგადასავლო",
 "მუსიკალური",
 "მოკლემეტრაჟიანი",
 "სამოყვარულო",
 "ფენტეზი",
 "საოჯახო"],
 

 items:[],
 token:'a'
}



store.subscribe(()=>{
 this.setState({drawerlock:store.getState().drawerlock})

})


this.getData("მთავარი")
this.checkIsFirstime()
this.checkIsFirstime1()
this.checkIsFirstime2()


}
async checkIsFirstime(){

var val = await AsyncStorage.getItem("favorites");
if (val == null){
AsyncStorage.setItem("favorites","[]")
}


}

async checkIsFirstime1(){

  var val = await AsyncStorage.getItem("player");
  if (val == null){
  AsyncStorage.setItem("player","შიდა")
  }
  }

  async checkIsFirstime2(){

    var val = await AsyncStorage.getItem("quality");
    if (val == null){
    AsyncStorage.setItem("quality","არჩევითი")
    }
    }
  

 getData(cat) {
var Tag = "";


switch(cat) {
  case "მთავარი":
  break;
  case "ფანტასტიკა":
  Tag = 878;
  break;
  case "ისტორიული":
  Tag = 881;
  break;
  case "კომედია":
  Tag = 876;
  break;
  case "ანიმაცია":
  Tag = 882;
  break;
  case "თრილერი":
  Tag = 872;
  break;
  case "დეტექტივი":
  Tag = 728;
  break;
  case "მძაფრ-სიუჟეტიანი":
  Tag = 871;
  break;
  case "კრიმინალური":
  Tag = 873;
  break;
  case "მისტიკა":
  Tag = 874;
  break;
  case "სათავგადასავლო":
  Tag = 877;
  break;
  case "დოკუმენტური":
  Tag = 883;
  break;
  case "ვესტერნი":
  Tag = 884;
  break;
  case "საშინელებათა":
  Tag = 890;
  break;
  case "მიუზიკლი":
  Tag = 885;
  break;
  case "მუსიკალური":
  Tag = 886;
  break;
  case "ფენტეზი":
  Tag = 887;
  break;
  case "დრამა":
  Tag = 875;
  break;
  case "საომარი":
  Tag = 888;
  break;
  case "საოჯახო":
  Tag = 889;
  break;
  case "სპორტული":
  Tag = 891;
  break;
  case "სამოყვარულო":
  Tag = 893;
  break;
  case "მოკლემეტრაჟიანი":
  Tag = 963;
  break;
  case "ბიოგრაფიული":
  Tag = 965;
  break;
  default:
  Tag = "მთავარი"
  break;

}

  var databaseItems = [];
  // store.dispatch({type:"database",payload:[]})

  // firebase.database().ref().child("ALLmovies").child(cat).on("value",snapshot => {
  //   databaseItems = [];
  //  snapshot.forEach(snap => {
  //    databaseItems.push({
  //      title:snap.child("name").val(),
  //      des:snap.child("des").val(),
  //      photo:snap.child("photo").val(),
  //      sd:snap.child("sd").val(),
  //      hd:snap.child("hd").val(),
  //      imdb:snap.child("imdb").val(),
  //      year:snap.child("year").val(),
  //      key:snap.key
  //    })
  //  })
  //  store.dispatch({type:"database",payload:databaseItems.reverse()})
  //  store.dispatch({type:"databaseNum",payload:snapshot.numChildren()})
   
  // })



if(cat == "მთავარი") {


fetch("http://net.adjara.com/Search/SearchResults?ajax=1&display=15&startYear=1900&endYear=2018&offset=0&isnew=0&needtags=0&orderBy=date&order%5Border%5D=desc&order%5Bdata%5D=published&language=georgian&country=false&game=0&softs=0&videos=0&xvideos=0&vvideos=0&dvideos=0&xphotos=0&vphotos=0&dphotos=0&trailers=0&episode=0&tvshow=0&flashgames=0")
.then(res => res.json()).then(res => 
{
  databaseItems = res.data;
  store.dispatch({type:"database",payload:databaseItems})
  console.log(databaseItems)
  store.dispatch({type:"startYear",payload:this.state.startYear})
  store.dispatch({type:"endYear",payload:this.state.endYear})
})




}else if(cat == "ქართული") {
fetch("http://net.adjara.com/Search/SearchResults?ajax=1&display=15&startYear=1900&endYear=2018&offset=0&isnew=0&needtags=0&orderBy=country&order%5Border%5D=desc&order%5Bdata%5D=published&language=georgian&country=ge&game=0&softs=0&videos=0&xvideos=0&vvideos=0&dvideos=0&xphotos=0&vphotos=0&dphotos=0&trailers=0&episode=0&tvshow=0&flashgames=0")
  .then(res => res.json()).then(res => 
    {
      databaseItems = res.data;
      store.dispatch({type:"database",payload:databaseItems})
      console.log(databaseItems)
      store.dispatch({type:"startYear",payload:this.state.startYear})
      store.dispatch({type:"endYear",payload:this.state.endYear})
    })
    
}else{

  fetch("http://net.adjara.com/Search/SearchResults?ajax=1&searchTags%5B%5D=" + Tag + "&display=15&startYear=1900&endYear=2018&offset=0&isnew=0&needtags=1&orderBy=date&order%5Border%5D=desc&order%5Bdata%5D=movies&order%5Bmeta%5D=desc&language=false&country=false&game=0&softs=0&georgians=1&episode=0&trailers=0&tvshow=0&videos=0&xvideos=0&vvideos=0&dvideos=0&xphotos=0&vphotos=0&dphotos=0&flashgames=0&currentPosition=1&loadedPages%5B%5D=1")
  .then(res => res.json()).then(res => {
  databaseItems = res.data;
  store.dispatch({type:"database",payload:databaseItems})
  store.dispatch({type:"pageid",payload:Tag})
  
  console.log(databaseItems)
  })  
}







/////////http://adjaranet.com/req/jsondata/req.php?reqId=getCollections
//http://adjaranet.com/req/jsondata/req.php?reqId=getCollections&id=
//http://adjaranet.com/req/jsondata/req.php?reqId=getCollections&id=
}



getDataSeries() {
  var databaseItems = [];
  fetch("http://net.adjara.com/Search/SearchResults?ajax=1&display=16&startYear=1900&endYear=2018&offset=0&isnew=0&needtags=0&orderBy=date&order%5Border%5D=data&order%5Bdata%5D=published&language=false&country=false&game=0&softs=0&episode=1&trailers=0&tvshow=0&videos=0&xvideos=0&vvideos=0&dvideos=0&xphotos=0&vphotos=0&dphotos=0&flashgames=0")
  .then(res => res.json())
  .then(res => {
   databaseItems = res.data;
    store.dispatch({type:"database",payload:databaseItems})
    console.log(databaseItems)
  })

 

}

componentDidMount() {
  AdMobInterstitial.setAdUnitID('ca-app-pub-6370427711797263/7435578378');
  AdMobRewarded.setAdUnitID('ca-app-pub-6370427711797263/5458913307');
}


 closeDrawer(title) {
 store.dispatch({type:"page",payload:title})
 if(title == "სერიალები") {
this.getDataSeries();

 }else{
this.getData(title)

 }
 this.drawer.closeDrawer();

 }
 openDrawer() {
   this.drawer.openDrawer();
}


 render() {
   var navigationView = (
     <View style={{flex: 1, backgroundColor: '#fff'}}>
     <StatusBar backgroundColor="#3460e6" />
        <ScrollView style={{flex:1}}>


         {
           this.state.categories.map((data)=> {
             return(


               <Button key={data} transparent light block style={{height:50,justifyContent: "flex-start"}} onPress={()=>this.closeDrawer(data)}>
           <Text style={{color:"#000",marginLeft:20}}>{data}</Text>
         </Button>


         )
           })
         }

         </ScrollView>
     </View>
   )
   return (


     <DrawerLayoutAndroid
      ref={(_drawer) => this.drawer = _drawer}
     drawerWidth={300}
     drawerLockMode = {this.state.drawerlock}

     drawerPosition={DrawerLayoutAndroid.positions.Left}
     renderNavigationView={() => navigationView}>
     <Provider store={store}>
     <View style={{flex: 1,}}>
     <HomeRouter title={this.state.title} func={this.openDrawer}/>
      </View>
      </Provider>
   </DrawerLayoutAndroid>
   );
 }
}



 