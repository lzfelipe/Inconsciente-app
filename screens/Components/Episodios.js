import React, { Component } from "react";
import { 
    View,
    Text, 
    Image,
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

export default class Episodios extends Component {
    render() {
        return (
            
            <View style={{height: 300, width: 200, marginHorizontal: 15, borderWidth: 2, borderColor: '#aaa', borderRadius: 10}}>
                      <View style={{flex: 8}}>
                      <Image source={this.props.imageUri} 
                          style={{flex: 20, width: null, height: null, resizeMode: 'cover', borderRadius: 8}}
                        />
                      </View>
                      
                      <View 
                      style={{
                          flex: 2, flexDirection: 'row', alignItems: "flex-start", justifyContent: 'center'
                          }}>
                      <View style={{justifyContent: 'center' }}>
                            <Icon name={'md-albums'} size={25} color={'#fff'}/>
                        </View>
                        <Text style={{fontSize: 20,fontWeight: '700', color: '#fff'}}>
                            {" "+this.props.coletados}/3
                        </Text>
                      </View>
            </View>
     
            
        );
    }
}
