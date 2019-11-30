import React, { Component } from "react";
import { 
    View,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    Text,
    Alert
} from "react-native";
import qrcode from '../../assets/qrcode.png'
import { KeyboardAwareScrollView  } from 'react-native-keyboard-aware-scroll-view'
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationEvents }  from 'react-navigation';

const Gstorage = new Storage({
    size: 1000,

    storageBackend: AsyncStorage, 

    defaultExpires: null,
  
    enableCache: true,
  });

  global.storage = Gstorage;

class Enigma extends Component {
    state = {
        resposta: "",
        respondido: false,
    }

checarResposta = async () => {
        const { resposta, respondido } = this.state;
        const fixedResp = resposta.toLowerCase()

        if(fixedResp !== "kuringa") {
            Alert.alert('Opss', "Resposta errada, continue tentando!")
        } else {
                    
                if(fixedResp == "kuringa" && respondido == false) {

                    await Gstorage.save({
                        key: 'total1', // Note: Do not use underscore("_") in key!
                        data: {
                            totalAmount: 1,
                        }
                    })

                    await Gstorage.save({
                        key: 'enigma1', // Note: Do not use underscore("_") in key!
                        data: {
                            resposta: 'kuringa',
                            respondido: true
                        }
                    })
                    .then(ret => {
                        this.setState({respondido: true})
                        this.setState({resposta: 'kuringa'})
                        this.props.navigation.goBack()
                    })

                } else if (fixedResp == "kuringa" && respondido == true) {
                    this.props.navigation.goBack()
                }
            }

        }


getData = async () => {
    await Gstorage.load({
        key: 'enigma1'
    }).then(ret => {
        this.setState({respondido: ret.respondido})
        this.setState({resposta: ret.resposta})
    }).catch(err => {
        switch (err.name) {
            case 'NotFoundError':
                return this.setState({respondido: false});
            }
    }) }

    render() {
        return (
                <View style={styles.container}>
                <NavigationEvents onWillFocus={() => { this.getData() }} />
                <KeyboardAwareScrollView>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start', marginVertical: 20}}>
                        <Image source={qrcode} style={{width: 340, height: 350}}></Image>
                        <TextInput
                            style={styles.input}
                            placeholder="Insira aqui sua resposta"
                            placeholderTextColor="#fff"
                            value={this.state.resposta}
                            onChangeText={resposta => this.setState ({ resposta }) }>
                        </TextInput>
                        <TouchableOpacity style={styles.button} onPress={() => {this.checarResposta()}}>
                            <Text style={styles.textDefault}>Confirmar Resposta</Text>
                        </TouchableOpacity>
                        
                    </View>
                </KeyboardAwareScrollView>
                </View>
            
        );
    }
}
export default Enigma;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0d0d0d',
    },
    textDefault: {
        color: "#000",
        fontFamily: "canela_roman"
    },
    input: {
        width: 200,
        borderBottomColor: '#fff',
        borderBottomWidth: 2,
        marginBottom: 20,
        color: '#fff',
        textAlign: 'center',
        fontFamily: "canela_roman"
      },
    button: {
        backgroundColor: "#fff", 
        padding: 15, 
        borderRadius: 10,
    }
});