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
import { KeyboardAwareScrollView  } from 'react-native-keyboard-aware-scroll-view'
import { NavigationEvents }  from 'react-navigation';



const storage = global.storage

export default class Enigma2 extends Component {
    state = {
        resposta: "",
        respondido: false,
    }

checarResposta = async () => {
    const { resposta, respondido } = this.state;
    const fixedResp = resposta.toLowerCase()
    console.log(fixedResp)

    if(fixedResp !== "ma") {
        Alert.alert('Opss', "Resposta errada, continue tentando!")
    } else {
                
            if(fixedResp == "ma" && respondido == false) {
                await storage.save({
                    key: 'total2', 
                    data: {
                        totalAmount: 1,
                    }
                })
                
                await storage.save({
                    key: 'enigma2', 
                    data: {
                        resposta: 'ma',
                        respondido: true
                    }
                })
                .then(ret => {
                    this.setState({respondido: true})
                    this.setState({resposta: 'ma'})
                    this.props.navigation.goBack()
                })

            } else if (fixedResp == "ma" && respondido == true) {
                this.props.navigation.goBack()
            }
        }
}

getData = async () => {
    await storage.load({
        key: 'enigma2'
    }).then(ret => {
        console.log(ret)
        this.setState({respondido: ret.respondido})
        this.setState({resposta: ret.resposta})
    }).catch(err => {
        switch (err.name) {
            case 'NotFoundError':
                return this.setState({respondido: false});
            }
    }) 
}


render() {
        return (
                <View style={styles.container}>
                <NavigationEvents onWillFocus={() => { this.getData() }} />
                <KeyboardAwareScrollView>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start', marginVertical: 20}}>
                        <Image style={{width: 340, height: 150, backgroundColor: "#aaa"}}></Image>
                        <TextInput
                            style={styles.input}
                            placeholder="Insira aqui sua resposta"
                            placeholderTextColor="#fff"
                            value={this.state.resposta}
                            onChangeText={resposta => this.setState ({ resposta }) }>
                        </TextInput>
                        <TouchableOpacity style={styles.button} onPress={() => { this.checarResposta() }}>
                            <Text style={styles.textDefault}>Guess</Text>
                        </TouchableOpacity>
                        
                    </View>
                </KeyboardAwareScrollView>
                </View>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0d0d0d',
    },
    textDefault: {
        color: "#000",
    },
    input: {
        width: 200,
        borderBottomColor: '#fff',
        borderBottomWidth: 2,
        marginBottom: 20,
        color: '#fff',
        textAlign: 'center'
      },
    button: {
        backgroundColor: "#fff", 
        padding: 15, 
        borderRadius: 10
    }
});