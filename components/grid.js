import React, {Component} from 'react'
import {
    Platform,
    Text,
    View,
    ScrollView,
    StyleSheet,
    TouchableNativeFeedback,
} from 'react-native';
import store from "./store"
import GridView from 'react-native-super-grid';
import SingleItem from './singleItem';
import Toolbar from './toolbar';

export default class Gridlayout extends Component {

    constructor() {
        super()
        this.state = {
            searchTxt: '',
            items: '',
            loaded: false,
            searched: []
        }

        this.background = TouchableNativeFeedback.SelectableBackground();

        if (Platform['Version'] >= 21) {
            this.background = TouchableNativeFeedback.Ripple('#fff', true)
        }
        this.fetc = this
            .fetc
            .bind(this)

    }

    componentWillMount() {

        this.setState({loaded: true})
        this.setData = this
            .setData
            .bind(this)

        this.setState({items: this.setData()})
        console.warn(this.state.loaded)

    }

    setData() {
        return store
            .getState()
            .database
    }
    checkTitle(data) {
        if (data.title_ge !== "") {
            return (data.title_ge);
        } else {
            return (data.title_en);
        }
    }
    fetc(text) {

        this.setState({searchTxt: text})

        // var test = []; if (this.state.loaded) {     this         .state
        // .items         .forEach((itm) => {             if (itm.title.includes(text))
        // {                 test.push(itm)             }         }) }

        fetch("http://net.adjara.com/Home/quick_search?ajax=1&search=" + text)
            .then(
                res => res.json()
            )
            .then(res => {
                console.log(res.movies.data)
                this.setState({searched: res.movies.data})
            })

    }

    render() {

        return (
            <View style={{
                    flex: 1
                }}>

                <Toolbar search={true} nav={this.props.navigation} searchChange={this.fetc}/>
                <ScrollView style={{
                        flex: 1
                    }}>

                    {
                        this.state.loaded
                            ? (
                                <View>
                                    <GridView
                                        itemDimension={130}
                                        items={this.state.searched}
                                        style={styles.gridView}
                                        renderItem={item => (
                                            <SingleItem
                                                views={item.VIEW}
                                                luboi={true}
                                                des={false}
                                                search={true}
                                                titleEn={item.title_en}
                                                photo={"http://staticnet.adjara.com/moviecontent/" + item.id + "/covers/214x321-" +
                                                        item.id + ".jpg"}
                                                series={false}
                                                id={item.id}
                                                title={this.checkTitle(item)}
                                                navigation={this.props.navigation}/>
                                        )}/>

                                </View>

                            )
                            : (<View>
                                <Text>loading</Text>
                            </View>)

                    }
                </ScrollView>

            </View>
        )
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
