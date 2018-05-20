

import React, { Component } from 'react';
import {
 Platform,
 StyleSheet,
 Text,
 View,
 DrawerLayoutAndroid,
 ScrollView,
 TextInput

} from 'react-native';
import Orientation from 'react-native-orientation';
import {Provider } from "react-redux"
import HomeRouter from "./components/homeRouter";
import { Container, Header, Content, Button  } from 'native-base';
import store from "./components/store";
import Toolbar from './components/toolbar';
import * as firebase from "firebase";
import fbconfig from "./components/fbconfig";
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';





export default class App extends Component {

 constructor() {
   super();
   this.openDrawer = this.openDrawer.bind(this);
   this.closeDrawer = this.closeDrawer.bind(this);
   if (!firebase.apps.length) {
  firebase.initializeApp(fbconfig)
   }

   store.dispatch({type:"SetOpenDrawer",payload:this.openDrawer})
this.state = {
 title:"მთავარი",
 drawerlock:"unlocked",
 categories:["მთავარი",
 "სერიალები",
 "კომედია",
 "ანიმაცია",
 "ბოევიკი","ბიოგრაფიული","ისტორიული",
 "კრიმინალური"
 ,"ფანტასტიკა","თრილერი","მისტიკური","საშინელება","დრამა","მძაფრსიუჟეტიანი","სათავგადასავლო"],


 items:[],
 token:'a'
}



store.subscribe(()=>{
 this.setState({drawerlock:store.getState().drawerlock})

})


this.getData("მთავარი")


}


 getData(cat) {
  var databaseItems = [];
  store.dispatch({type:"database",payload:[]})

  firebase.database().ref().child("ALLmovies").child(cat).on("value",snapshot => {
    databaseItems = [];
   snapshot.forEach(snap => {
     databaseItems.push({
       title:snap.child("name").val(),
       des:snap.child("des").val(),
       photo:snap.child("photo").val(),
       sd:snap.child("sd").val(),
       hd:snap.child("hd").val(),
       imdb:snap.child("imdb").val(),
       year:snap.child("year").val(),
       key:snap.key
     })
   })
   store.dispatch({type:"database",payload:databaseItems.reverse()})
   store.dispatch({type:"databaseNum",payload:snapshot.numChildren()})
   
  })


}

componentWillMount() {
   Orientation.lockToPortrait();
   FCM.subscribeToTopic('/topics/news');
   FCM.requestPermissions(); // for iOS
        FCM.getFCMToken().then(token => {
            // store fcm token in your server
        });
        this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
            // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
            if(notif.local_notification){
              //this is a local notification
            }
            if(notif.opened_from_tray){
              //app is open/resumed because user clicked banner
            }

            if(Platform.OS ==='ios'){
              //optional
              //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
              //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
              //notif._notificationType is available for iOS platfrom
              switch(notif._notificationType){
                case NotificationType.Remote:
                  notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                  break;
                case NotificationType.NotificationResponse:
                  notif.finish();
                  break;
                case NotificationType.WillPresent:
                  notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
                  break;
              }
            }
        });
        this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
        });
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
        <ScrollView style={{flex:1}}>


         {
           this.state.categories.map((data)=> {
             return(


               <Button transparent light block style={{height:50}} onPress={()=>this.closeDrawer(data)}>
           <Text style={{color:"#000"}}>{data}</Text>
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



const styles = StyleSheet.create({
 container: {
   flex: 1,
 },

});
