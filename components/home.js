import React from 'react';
import { View, ScrollView, StyleSheet, StatusBar} from 'react-native';
import SingleItem from './singleItem';
import Toolbar from './toolbar';
import store from "./store"
import GridView from 'react-native-super-grid';
const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
};
import {Spinner} from "native-base";
import PremireMovies from "./PremireMovies"
export default class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items: [],
            currentItems: [],
            x: 15,
            loader: false,
            maxItems: 0,
            Tag:'',
            startYear:"1900",
            endYear:"2018"
        }
        store.dispatch({type: "setNav", payload: props.navigation})

        store.subscribe(() => {
            this.setState({items: []})
            this.setState({currentItems: [],startYear:store.getState().startYear,endYear:store.getState().endYear})
             
            if (this.state.items !== store.getState().database) {
                    this.setState({
                        items: store
                            .getState()
                            .database,
                        x: 15
                    })
                    this.setState({
                        currentItems: this
                            .state
                            .items
                             
                    })
                    if (this.state.currentItems > 0) {
                        this
                            .refs
                            .scrollView
                            .scrollTo(0);

                    }
                    this.setState({
                        maxItems: store
                            .getState()
                            .databaseNum
                             ,Tag:store.getState().pageid})

                    


            }

        })

    }
   
    checkTitle(data) {
        if (data.title_ge !== "") {
            return (data.title_ge);
        } else {
            return (data.title_en);
        }
    }

    checkImdb(data) {
        if ((parseFloat(data.data_rating).toFixed(1)) !== parseFloat(0.0).toFixed(1)) {
            return (data.data_rating);
        } else {
            return (null);
        }
    }

    render() {

        if (this.state.currentItems.length == 0) {
            return (
                <View style={{
                        flex: 1
                    }}>
                    <StatusBar hidden={false}/>
                    <Toolbar
                        drawer={() => store.getState().openDrawer()}
                        nav={this.props.navigation}
                        home={true}/>
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        <Spinner/>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={{
                        flex: 1
                    }}>
                    <Toolbar
                        drawer={() => store.getState().openDrawer()}
                        nav={this.props.navigation}
                        home={true}/>
                    
                    
                   
 


                    <View
                        style={{
                            flex: 1,
                            flexDirection: "column"
                        }}>
                        <View
                            style={{
                                backgroundColor: "#EBECEE",
                                flex: 1
                            }}>
                                
                            <ScrollView
                                ref="scrollView"
                                onScroll={({nativeEvent}) => {

                                    if (isCloseToBottom(nativeEvent)) {
                                        if (store.getState().page == "სერიალები") {
                                            if (!this.state.loader) {
                                                this.setState({loader: true});

                                              //  setTimeout(() => {
                                                    var changed = this.state.currentItems;
                                              
                                                    fetch(
                                                        "http://net.adjara.com/Search/SearchResults?ajax=1&display=15&startYear=1900&endYear=2018&offset=" + (
                                                            this.state.x + 15
                                                        ) + "&isnew=0&needtags=0&orderBy=date&order%5Border%5D=data&order%5Bdata%5D=pub" +
                                                        "lished&language=false&country=false&game=0&softs=0&episode=1&trailers=0&tvshow" +
                                                        "=0&videos=0&xvideos=0&vvideos=0&dvideos=0&xphotos=0&vphotos=0&dphotos=0&flashg" +
                                                        "ames=0"
                                                    )
                                                        .then(res => res.json())
                                                        .then(res => {
                                                            changed = changed.concat(res.data);
                                                            console.log(changed)
                                                            this.setState({
                                                                currentItems: changed,
                                                                x: this.state.x + 15,
                                                                loader: false
                                                            })

                                                        });

                                               // }, 1000)
                                            }
                                        } else if(store.getState().page == "მთავარი"){
                                            if (!this.state.loader) {
                                                this.setState({loader: true});

                                             //  setTimeout(() => {
                                                    changed = this.state.currentItems;
                                                     console.log("http://net.adjara.com/Search/SearchResults?ajax=1&display=15&startYear=" + this.state.startYear + "&endYear=" + this.state.startYear + "&offset=" + (
                                                        this.state.x + 15
                                                    ) + "&isnew=0&needtags=0&orderBy=date&order%5Border%5D=desc&order%5Bdata%5D=pub" +
                                                    "lished&language=georgian&country=false&game=0&softs=0&videos=0&xvideos=0&vvide" +
                                                    "os=0&dvideos=0&xphotos=0&vphotos=0&dphotos=0&trailers=0&episode=0&tvshow=0&fla" +
                                                    "shgames=0")
                                                    fetch(
                                                        "http://net.adjara.com/Search/SearchResults?ajax=1&display=15&startYear=" + this.state.startYear + "&endYear=" + this.state.endYear + "&offset=" + (
                                                            this.state.x + 15
                                                        ) + "&isnew=0&needtags=0&orderBy=date&order%5Border%5D=desc&order%5Bdata%5D=pub" +
                                                        "lished&language=georgian&country=false&game=0&softs=0&videos=0&xvideos=0&vvide" +
                                                        "os=0&dvideos=0&xphotos=0&vphotos=0&dphotos=0&trailers=0&episode=0&tvshow=0&fla" +
                                                        "shgames=0"
                                                    ) .then(res => res.json())
                                                    .then(res => {
                                                        changed = changed.concat(res.data);
 
                                                        console.log(changed)
                                                        this.setState({
                                                            currentItems: changed,
                                                            x: this.state.x + 15,
                                                            loader: false
                                                        })
                                                        console.log(this.state.x)

                                                    });

                                                 
                                                  
                                              //  }, 1000)
                                            }

                                          
                                        }else{
                                               if (!this.state.loader) {
                                                this.setState({loader: true});

                                            //    setTimeout(() => {
                                                    changed = this.state.currentItems;
                                                  
                                                    fetch(
                                                        "http://net.adjara.com/Search/SearchResults?ajax=1&searchTags%5B%5D=" + this.state.Tag + "&display=15&startYear=1900&endYear=2018&offset=" + (
                                                            this.state.x + 15
                                                        ) + "&isnew=0&needtags=1&orderBy=date&order%5Border%5D=desc&order%5Bdata%5D=movies&order%5Bmeta%5D=desc&language=false&country=false&game=0&softs=0&georgians=1&episode=0&trailers=0&tvshow=0&videos=0&xvideos=0&vvideos=0&dvideos=0&xphotos=0&vphotos=0&dphotos=0&flashgames=0&currentPosition=1&loadedPages%5B%5D=1"
                                                    ) .then(res => res.json())
                                                    .then(res => {
                                                        changed = changed.concat(res.data);
                                                        console.log(changed)
                                                        this.setState({
                                                            currentItems: changed,
                                                            x: this.state.x + 15,
                                                            loader: false
                                                        })

                                                    });

                                                 
                                                  
                                               // }, 1000)
                                            }

                                            
                                        }

                                    }

                                }}>


                                {

store.getState()
    .page == "მთავარი"
        ? (
 <View>
            <View style={{height:200,padding:10,backgroundColor:"transparent"}}>

<PremireMovies nav={this.props.navigation}/>
</View>   
<View style={{height:1,backgroundColor:"#000",marginTop:8}} />
      </View>          

        ): (  
<View/>

        )
    }

                                {

                                    store
                                        .getState()
                                        .page == "სერიალები"
                                            ? (
                                                <GridView
                                                    itemDimension={130}
                                                    items={this.state.currentItems}
                                                    style={styles.gridView}
                                                    renderItem={item => (
                                                        <SingleItem
                                                            id={item.id}
                                                            views={item.views}
                                                            photo={item.poster}
                                                            year={item.release_date}
                                                            imdb={this.checkImdb(item)}
                                                            series={true}
                                                            des={item.description}
                                                            title={this.checkTitle(item)}
                                                            navigation={this.props.navigation}/>

                                                    )}/>

                                            )
                                            : (

                                                <View>

                                                    <GridView
                                                        itemDimension={130}
                                                        items={this.state.currentItems}
                                                        style={styles.gridView}
                                                        renderItem={item => (
                                                            <SingleItem
                                                            photo={item.poster}
                                                            imdb={this.checkImdb(item)}
                                                            year={item.release_date}
                                                            views={item.views}
                                                            titleEn={item.title_en}
                                                                series={false}
                                                                id={item.id}
                                                                des={item.description}
                                                               
                                                                title={this.checkTitle(item)}
                                                                navigation={this.props.navigation}/>
                                                        )}/>
                                                </View>

                                            )

                                }

                                <Spinner/>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            )
        }

    }

}

const styles = StyleSheet.create({
    gridView: {
        paddingTop: 25,
        flex: 1
    },
    itemContainer: {
        justifyContent: 'flex-end'
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600'
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff'
    }
});
