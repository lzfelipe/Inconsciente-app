import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

class Infos extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Infos</Text>
            </View>
        );
    }
}
export default Infos;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});