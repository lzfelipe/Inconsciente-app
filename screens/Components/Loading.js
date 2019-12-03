import React, { Component } from "react";
import { 
    View,
    StatusBar,
    Image,
} from "react-native";
import Lottie from 'lottie-react-native';
import loading from '../../assets/loading.json'

class Loading extends Component {
    render() {
        return (
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000'}} >
            <StatusBar backgroundColor="#000"/>
                <Image style={{width: 205, height: 65}} source={require('../../assets/logo.png')} ></Image>
                <Lottie style={{height: 300, width: 300}} source={loading} autoPlay loop />
            </View>
        );
    }
}
export default Loading;