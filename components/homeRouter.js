import {createStackNavigator} from "react-navigation";
import Home from './home';
import Full from "./full"
import Movie from "./movie"
import fullseries from './seriesFull';
import Gridlayout from "./grid"
import Tutorial from "./tut"
import Actor from "./SingleActor";
import ActorFull from "./actorFull"
import WatchLater from './watchLater';
import Settings from "./settings"
import FullCollectionList from './FullCollectionsList';
import SingleCollectionList from './SingleCollectionList';

export default createStackNavigator({
 
    home:{
        screen:Home
    },
    SingleActor:{
    screen:Actor
    },
    Fullcollectionlist:{
        screen:FullCollectionList
    },
    SingleCollectionList:{
       screen:SingleCollectionList
    },
    Settings:{
        screen:Settings
    },
   
    full:{
        screen:Full,
    },
   
    WatchLater:{
        screen:WatchLater
    },
    movie:{
      screen:Movie
    },
    fullseries:{
        screen:fullseries
    },
    tut:{
      screen:Tutorial
    },
    grid:{
        screen:Gridlayout
    },
        fullActor:{
screen:ActorFull
    },

},{
    headerMode:"hidden",
  
})
