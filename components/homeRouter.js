import React from 'react';
import { Text,View,ScrollView,StyleSheet } from 'react-native';
import SingleItem from './singleItem';
import Toolbar from './toolbar';
import {StackNavigator} from "react-navigation";
import Home from './home';
import Full from "./full"
import Movie from "./movie"
import fullseries from './seriesFull';

import Tutorial from "./tut"



export default StackNavigator({
    home:{
        screen: Home
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
    }

},{
    headerMode:"hidden",
    animationEnabled: true,
   lazy: true,
   transitionConfig: () => ({
     transitionSpec: {
       duration: 0,
     },
   }),
})
