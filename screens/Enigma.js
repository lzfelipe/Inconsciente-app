import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class Enigma extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Enigma</Text>
            </View>
        );
    }
}
export default Enigma;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});