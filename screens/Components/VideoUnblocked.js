import React, { Component } from "react";
import { 
    View,
    StyleSheet,
    StatusBar,
    Dimensions
} from "react-native";
import Video from 'react-native-video';
const opening = require('../../assets/opening.mp4');

class VideoUnblocked extends Component {

     render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#000" />
                <View style={{flex: 1, backgroundColor: "#000"}}>
                <Video source={opening}   // Can be a URL or a local file.
                    ref={(ref) => {
                        this.player = ref
                    }}                                      // Store reference
                    onBuffer={this.onBuffer}                // Callback when remote video is buffering
                    onError={this.videoError}               // Callback when video cannot be loaded
                    style={styles.backgroundVideo} 
                    controls={true}
                    paused={true}
                    resizeMode={'cover'}
                    />
                </View>
            </View>
        );
    }
}
export default VideoUnblocked;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundVideo: {
        position: 'absolute',
        transform: [{ rotate: '90deg'}],
        height: Dimensions.get('window').height * 0.57,
        width: Dimensions.get('window').width * 1.42,
        top: Dimensions.get('window').height * 0.150,
        left: Dimensions.get('window').width * -0.21,
        backgroundColor: '#000'
      },
});