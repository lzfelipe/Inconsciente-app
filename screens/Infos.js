import React, { Component } from "react";
import { Alert, View, Text, Dimensions, StyleSheet, TouchableOpacity, StatusBar, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

class Infos extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={{ width: 200, height: 60, marginTop: 20 }} source={require('../assets/logo.png')} ></Image>
                </View>

                <View style={styles.containerPersonagens}>
                    <StatusBar backgroundColor="#0d0d0d" />
                        <Text style={{ fontSize: 32, fontWeight: '700', paddingHorizontal: 20, color: '#fff'}}>PERSONAGENS</Text>
                <ScrollView style={{marginTop: 20}} scrollEventThrottle={16}>
                <View style={styles.containerButtons}>

                    <TouchableOpacity
                        style = {styles.buttonCircle}
                        underlayColor = '#ccc'
                        onPress = { () => this.props.navigation.navigate('RodrigoInfos') }
                        >
                            <Image style={styles.buttonContent} source={require('../assets/rodrigo.png')} ></Image>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style = {styles.buttonCircle}
                        underlayColor = '#ccc'
                        onPress = { () => this.props.navigation.navigate('EduardoInfos') }
                        >
                            <Image style={styles.buttonContent} source={require('../assets/elias.png')} ></Image>
                    </TouchableOpacity>
                 
                 </View>
                 <View style={styles.containerButtons}>
                    <TouchableOpacity
                        style = {styles.buttonCircle}
                        underlayColor = '#ccc'
                        onPress = { () => Alert.alert('Espere um pouco...', 'Você ainda não viu esse personagem!') }
                        >
                            <Image style={styles.buttonContent} source={require('../assets/homem.png')} ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style = {styles.buttonCircle}
                        underlayColor = '#ccc'
                        onPress = { () => Alert.alert('Espere um pouco...', 'Você ainda não viu esse personagem!') }
                        >
                            <Image style={styles.buttonContent} source={require('../assets/homem.png')} ></Image>
                    </TouchableOpacity>
                 </View>

                 <View style={styles.containerButtons}>
                    <TouchableOpacity
                        style = {styles.buttonCircle}
                        underlayColor = '#ccc'
                        onPress = { () => Alert.alert('Espere um pouco...', 'Você ainda não viu esse personagem!') }
                        >
                            <Image style={styles.buttonContent} source={require('../assets/homem.png')} ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style = {styles.buttonCircle}
                        underlayColor = '#ccc'
                        onPress = { () => Alert.alert('Espere um pouco...', 'Você ainda não viu esse personagem!') }
                        >
                            <Image style={styles.buttonContent} source={require('../assets/homem.png')} ></Image>
                    </TouchableOpacity>
                 </View>
                 </ScrollView>
                 </View>
            </View>
        );
    }
}
export default Infos;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0d0d0d',
        flex: 1,
        justifyContent: 'center'
      },
    containerPersonagens: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 48,
      },
      logoContainer: {
          alignItems: 'center'
      },
      buttonCircle: {
        zIndex: 10,
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.45,
        height: Dimensions.get('window').width * 0.45,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: Dimensions.get('window').width * 0.025,
      },
      buttonContent: {
        zIndex: 1,
        //flexWrap: 'wrap',
        width: Dimensions.get('window').width * 0.435, 
        borderBottomLeftRadius: 75,
        borderBottomRightRadius: 75,
        borderTopLeftRadius: 71,
        borderTopRightRadius: 71,
        height: '97%', 
        resizeMode: 'cover' ,
      },
      containerButtons: {
          marginVertical: 25,
          flexDirection: 'row',
          marginHorizontal: 5,
      }
      
});