import React, {Component} from 'react';
import {View, TextInput} from 'react-native';
export default class Search extends Component {

    componentDidMount() {
        this.refs.searchbar.focus();
    }
    render() {
        return (
            <View style={{
                    flex: 1
                }}>
                <TextInput
                    style={{
                        paddingLeft: 15,
                        flex: 1,
                        color: "#FFF",
                        fontSize: 15,
                        textAlignVertical: 'center'
                    }}
                    placeholder="ძიება"
                    underlineColorAndroid={"transparent"}
                    placeholderTextColor="#F5F5F5"
                    tintColor={"#FFF"}
                    onChangeText={(text) => this.props.searchChange(text)}/>
            </View>
        )
    }
}