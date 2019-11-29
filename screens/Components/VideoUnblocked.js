import React, { Component } from "react";
import { 
    View,
    StyleSheet,
    StatusBar
} from "react-native";
import Video from 'react-native-video';
const opening = require('../../assets/opening.mp4');

class VideoUnblocked extends Component {
    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#000"}}>
                <Video source={opening}   // Can be a URL or a local file.
                ref={(ref) => {
                    this.player = ref
                }}                                      // Store reference
                onBuffer={this.onBuffer}                // Callback when remote video is buffering
                onError={this.videoError}               // Callback when video cannot be loaded
                style={styles.backgroundVideo} 
                controls={true}
                paused={false}
                resizeMode={"cover"}
                fullscreen={true}
                />
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
        rotation: 90,
        height: 360,
        width: 530,
        top: 98,
        left: -85,
        backgroundColor: '#000'
      },
});