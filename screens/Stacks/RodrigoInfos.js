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

class RodrigoInfos extends Component {
    
    render() {
        return (
       <View style={styles.container}>
           <StatusBar backgroundColor="#0d0d0d" />
           <ScrollView scrollEventThrottle={16} style={{width: '100%', height: 100}} >
            <View style={{flex: 1, width: '100%', height: 200, alignItems: 'center', justifyContent: 'flex-start', marginBottom: "30%"}}>
                <Image source={require('../../assets/rodrigo.jpg')} resizeMode='contain'></Image>
            </View>

            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#fff', fontSize: 28}}>Rodrigo Costa Souza</Text>
            </View>

            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
                <Text style={{color: '#fff', fontSize: 20}}>25 anos </Text>
                <Text style={{color: '#fff', fontSize: 20}}> Investigador</Text>
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
export default RodrigoInfos;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0d0d0d',
        flex: 10,
        justifyContent: 'center'
      },
})

