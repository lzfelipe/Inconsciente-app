import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    ScrollView
} from "react-native";
import Video from 'react-native-video';
const opening = require('../../assets/opening.mp4');

class VideoUnblocked extends Component {
    render() {
        return (
            <View style={{alignItems: "center"}}>
            <Video source={opening}   // Can be a URL or a local file.
            ref={(ref) => {
                this.player = ref
            }}                                      // Store reference
            onBuffer={this.onBuffer}                // Callback when remote video is buffering
            onError={this.videoError}               // Callback when video cannot be loaded
            style={styles.backgroundVideo} 
            controls={true}
            paused={true}
            resizeMode={"cover"}

            />
            <ScrollView style={{marginTop: '69%', height: "52%" ,width: '100%', backgroundColor: '#242626'}}>
                <Text style={{fontSize: 24, fontWeight: '500', color: 'white', textAlign: 'center'}}>  Naruto Opening 2 | Haruka Kanata (HD) </Text>
                <Text style={{fontSize: 14.5, fontWeight: '200', color: 'white', textAlign: 'justify', padding: 10}}> 
                O individuo cujo nome "Naruto" em alguns momentos pode ser considerado um pouco rigido, há a possibilidade de a sua pessoa não conhecer esta informação, porém o mesmo igualmente cresceu desprovido da companhia de um responsável legal vulgo pai. Verdade seja dita o individuo desde sempre nunca conheceu nem ao menos um de seus procriadores, nunca obteve ao menos um indivíduo com quem se teve uma relação de amizade em nossa povoação de pequenas proporções. Entretanto este mesmo nunca foi de se derramar em prantos, experimentar cólera ou aborrecimento ou se dar por derrotado, ele sempre preparado e disposto a se mudar para um estado, situação ou condição melhor, ele apenas quer ter respeito pelas qualidades que apresenta, este é o seu sonho e o Naruto daria a sua vida por isso sem permanecer em um estado irresoluto. Meu conhecimento intuitivo é que este fatigou-se de cair em prantos e resolveu tomar uma atitude a respeito.
                 </Text>
            </ScrollView>

            </View>
        );
    }
}
export default VideoUnblocked;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundVideo: {
        flex: 1,
        position: 'absolute',
        height: 250,
        width: '100%',
        top: 0,
        left: 0,
        bottom: 20,
        right: 0,
      },
});