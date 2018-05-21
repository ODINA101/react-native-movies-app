import React from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    BackHandler,
    Image,
    Animated,
    TouchableOpacity,
    TouchableNativeFeedback,
    Linking,
    AsyncStorage
} from 'react-native';
import SingleItem from './singleItem'
import Toolbar from './toolbar';
import store from './store';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RNFetchBlob from 'react-native-fetch-blob';
import Ripple from "react-native-material-ripple"
import RNFS from 'react-native-fs'
import Modal from "react-native-modal";
import * as Animatable from 'react-native-animatable'
import StarRating from 'react-native-star-rating';
import Ionicons from "react-native-vector-icons/Ionicons"
import Orientation from 'react-native-orientation';
import ActionSheet from 'react-native-actionsheet'
import Actor from "./SingleActor";
import {AdMobInterstitial, PublisherBanner} from 'react-native-admob'
import downloadManager from 'react-native-simple-download-manager';
var actors = [];

const options = [
    'Cancel', 'Apple', <Text style={{
            color: 'yellow'
        }}>Banana</Text>,
    'Watermelon',
    <Text style={{
            color: 'red'
        }}>Durian</Text>
]
export default class Full extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            storage: 0,
            isModalVisible: false,
            link: "",
            lang: "English",
            options: [],
            qoptions: [
                "hd", "sd", "უკან"
            ],
            isDown: false,
            actors: []
        }
        this.playMovie = this
            .playMovie
            .bind(this)
        this.download = this
            .download
            .bind(this)
        this.openuri = this
            .openuri
            .bind(this)
        // store.dispatch({type:"OpenUri",payload:this.openuri})

        const initial = Orientation.getInitialOrientation();
        if (initial === 'PORTRAIT') {
            // do something
        } else {
            Orientation.lockToPortrait();

        }
    }

    playMovie(dato) {

        if (dato) {

            this.setState({isDown: true});
        } else {
            this.setState({isDown: false});
        }

        this
            .ActionSheet
            .show()
        //

    }
    componentWillMount() {
        actors = [];

        fetch(
            "http://net.adjara.com/req/jsondata/req.php?id=" + this.props.navigation.state.params.key +
            "&reqId=getLangAndHd"
        )
            .then(res => res.json())
            .then(res => {

                info = Object
                    .keys(res)
                    .map(i => res[i])

                var noption = info[0]
                    .lang
                    .split(",")
                noption.push("უკან")
                this.setState({options: noption, link: info[0].url})

            })

        fetch(
            "http://net.adjara.com/req/jsondata/req.php?id=" + this.props.navigation.state.params.key +
            "&reqId=getInfo"
        )
            .then(res => res.json())
            .then(res => {
                console.log(res.desc[0])
                this.setState({des: res.desc[0]})

            })

        fetch(
            "http://net.adjara.com/req/jsondata/req.php?id=" + this.props.navigation.state.params.key +
            "&reqId=getLangAndHd"
        )
            .then(res => res.json())
            .then(res => {

                Object
                    .keys(res.cast)
                    .map(async index => {
                        actors.push(index)
                    })
                this.setState({actors})

                // actors.forEach(item => {   console.log(item)
                // fetch("http://net.adjara.com/req/jsondata/req.php?id=" + item +
                // "&reqId=getLangAndHd")   .then(res => res.json())   .then(res => {
                // console.log(res)   }) })

            })

        setTimeout(() => {
            AdMobInterstitial.setAdUnitID('ca-app-pub-6370427711797263/7435578378');
            AdMobInterstitial
                .requestAd()
                .then(() => AdMobInterstitial.showAd());
            BackHandler.addEventListener('hardwareBackPress', function () {
                return false;
            });
        }, 3000)
    }
    getQuality(q) {
        if (q == "sd") {
            return "300"
        } else {
            return "1500"
        }

    }

    openuri() {
        this.playMovie(true);

    }

    async download() {
        // ////////////////////////////// await AsyncStorage.removeItem('firstTime');
        // ////////////////////////////
        RNFS
            .getFSInfo()
            .then(async (info) => {
                if (parseInt((info.freeSpace / 1024) / 1024) > 1000) {

                    const value = await AsyncStorage.getItem('firstTime');
                    if (!value) {
                        try {
                            await AsyncStorage.setItem('firstTime', 'yes');
                            this
                                .props
                                .navigation
                                .navigate('tut', {OpenUri: this.openuri});

                        } catch (error) {}

                    } else {

                        this.openuri()

                    }

                } else {
                    this.setState({
                        free: parseInt((info.freeSpace / 1024) / 1024)
                    })
                    this._toggleModal()

                }
            });

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

    render() {

        return (

            <View
                style={{
                    flex: 1,
                    backgroundColor: "#FFF"
                }}>
                <Toolbar
                    home={false}
                    nav={this.props.navigation}
                    title={this.props.navigation.state.params.title}/>
                <ScrollView style={{
                        flex: 1
                    }}>
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
                        onPress={this.playMovie}
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
                        onPress={this.download}
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

                            this.props.navigation.state.params.imdb
                                ? (
                                    <View>
                                        <StarRating
                                            disabled={true}
                                            emptyStar={'ios-star-outline'}
                                            fullStar={'ios-star'}
                                            halfStar={'ios-star-half'}
                                            iconSet={'Ionicons'}
                                            maxStars={5}
                                            rating={parseFloat(this.props.navigation.state.params.imdb * (1 / 2))}
                                            fullStarColor={'red'}
                                            starSize={50}/>

                                    </View>
                                )
                                : (<View/>)

                        }

                        {
                            this.props.navigation.state.params.year
                                ? (
                                    <View>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                marginTop: 20
                                            }}>
                                            <Text
                                                style={{
                                                    color: "black"
                                                }}>გამოშვების წელი:
                                            </Text>
                                            <Text>{this.props.navigation.state.params.year}</Text>
                                        </View>
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

                        {
                            this.state.actors.length > 0
                                ? (
                                    <View>
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                color: "black",
                                                marginTop: 10
                                            }}>მსახიობები:</Text>
                                        <Actor
                                            style={{
                                                marginTop: 10
                                            }}
                                            navigation={this.props.navigation}
                                            list={this.state.actors}/>
                                    </View>
                                )
                                : (<View/>)

                        }

                    </View>
                </ScrollView>

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
                            console.log(
                                this.state.link + this.props.navigation.state.params.key + "_" + this.state.lang +
                                "_" + this.getQuality(this.state.qoptions[index]) + ".mp4"
                            )

                            if (index !== (this.state.qoptions.length - 1)) {
                                console.log(
                                    this.state.link + this.props.navigation.state.params.key + "_" + this.state.lang +
                                    "_" + this.getQuality(this.state.qoptions[index]) + ".mp4"
                                );
                                this
                                    .props
                                    .navigation
                                    .navigate("movie", {
                                        url: this.state.link + this.props.navigation.state.params.key + "_" + this.state.lang +
                                                "_" + this.getQuality(this.state.qoptions[index]) + ".mp4"
                                    })
                            }

                        } else {

                            if (index !== (this.state.qoptions.length - 1)) {
                                Linking
                                    .canOpenURL(
                                        this.state.link + this.props.navigation.state.params.key + "_" + this.state.lang +
                                        "_" + this.getQuality(this.state.qoptions[index]) + ".mp4"
                                    )
                                    .then(supported => {
                                        if (supported) {
                                            Linking.openURL(
                                                this.state.link + this.props.navigation.state.params.key + "_" + this.state.lang +
                                                "_" + this.getQuality(this.state.qoptions[index]) + ".mp4"
                                            );
                                        }

                                    });
                            };

                        }

                    }}/>

            </View>

        )
    }

}
