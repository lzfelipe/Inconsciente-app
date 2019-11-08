import React, { Component } from "react";
import { 
    View,
    Text, 
    Image,
} from "react-native";

export default class Episodios extends Component {
    render() {
        return (
            
            <View style={{height: 300, width: 200, marginHorizontal: 15, borderWidth: 2, borderColor: '#aaa', borderRadius: 10}}>
                      <View style={{flex: 2}}>
                        <Image source={this.props.imageUri} 
                          style={{flex: 1, width: null, height: null, resizeMode: "cover", borderRadius: 8}}
                        />
                      </View>

                      <View style={{flex: 1, paddingLeft: 10, paddingTop: 10, alignItems: "center"}}>
                        <Text style={{fontSize: 20, color: '#fff'}}>{this.props.titulo}</Text>
                        <Text style={{fontSize: 18, fontWeight: '700', color: '#fff'}}>{this.props.coletados}/3</Text>
                      </View>
            </View>
     
            
        );
    }
}
