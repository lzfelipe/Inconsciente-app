import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    StatusBar
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

class EduardoInfos extends Component {
    
    render() {
        return (
       <View style={styles.container}>
           <StatusBar backgroundColor="#000" />
           <ScrollView scrollEventThrottle={16}>

           <View style={{height: 300, width: "100%", borderRadius: 10}}>
                      <View style={{flex: 4}}>
                      <Image source={require('../../assets/elias.png')} 
                          style={{flex: 20, width: null, height: null, resizeMode: 'cover', borderRadius: 8}}
                        />
                    </View>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#fff', fontSize: 28}}>Eduardo n sei o nome inteiro</Text>
            </View>

            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
                <Text style={{color: '#fff', fontSize: 20}}>vários anos </Text>
                <Text style={{color: '#fff', fontSize: 20}}> um profissional</Text>
            </View>

            <View style={{alignContent: 'center', marginHorizontal: 10}}>
                <Text style={{color: '#fff', fontSize: 15, textAlign: 'justify', paddingBottom: 10}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce commodo facilisis fermentum. Aliquam ullamcorper pulvinar commodo. Fusce et pellentesque ipsum. Donec molestie pellentesque consectetur. Ut venenatis, purus vitae facilisis feugiat, ipsum nisi aliquam purus, eu placerat massa ex id turpis. Integer vehicula tortor vitae luctus consectetur. Nunc mollis, lacus a accumsan pretium, dui enim viverra ipsum, sit amet convallis leo odio eget nisl. Mauris aliquam velit vitae ante sagittis dignissim. Sed tellus nisl, dictum quis dui laoreet, malesuada aliquam ex. Praesent iaculis condimentum efficitur. Donec porttitor elit id commodo finibus.
                {"\n"}
                {"\n"}
                Integer neque diam, convallis eu arcu eu, ultricies molestie erat. Curabitur ac elit a lacus porttitor aliquam. Curabitur consectetur eros quis lorem bibendum, quis varius lectus scelerisque. Morbi vehicula cursus lectus sit amet consectetur. Pellentesque sagittis lectus turpis, sit amet posuere erat maximus at. Etiam a nulla quis lectus ultrices tincidunt. Nunc id mi eu eros bibendum consequat. Etiam arcu diam, auctor in sem quis, temddd dsadsadasdas
                {"\n"}
                {"\n"}
                Integer neque diam, convallis eu arcu eu, ultricies molestie erat. Curabitur ac elit a lacus porttitor aliquam. Curabitur consectetur eros quis lorem bibendum, quis varius lectus scelerisque. Morbi vehicula cursus lectus sit amet consectetur. Pellentesque sagittis lectus turpis, sit amet posuere erat maximus at. Etiam a nulla quis lectus ultrices tincidunt. Nunc id mi eu eros bibendum consequat. Etiam arcu diam, auctor in sem quis, temddd dsadsadasdas
                {"\n"}
                {"\n"}
                </Text>
            </View>
           </ScrollView>
       </View>
       )
    }
}
export default EduardoInfos;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flex: 10,
        justifyContent: 'center',
      },
      image: {
        height: 500,
        width: '100%',
        borderBottomWidth: 20,
        borderColor: '#fff'
      }
})

