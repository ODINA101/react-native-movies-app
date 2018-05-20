import React from 'react';
import { Text,View,ScrollView,StyleSheet } from 'react-native';
import SingleItem from './singleItem';
import Toolbar from './toolbar';
import {StackNavigator} from "react-navigation";
import Home from './home';
import Full from "./full"
import Movie from "./movie"
import fullseries from './seriesFull';
import Gridlayout from "./grid"
import Tutorial from "./tut"
import Actor from "./SingleActor";
import ActorFull from "./actorFull"

export default StackNavigator({
 
    home:{
        screen:Home
    },
    SingleActor:{
    screen:Actor
    },


   
    full:{
        screen:Full,
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
