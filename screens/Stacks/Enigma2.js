import React, { Component } from "react";
import { 
    View,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    Text,
    Alert,
    ScrollView
} from "react-native";
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

    if(fixedResp !== "occidendum") {
        Alert.alert('Opss', "Resposta errada, continue tentando!")
    } else {
                
            if(fixedResp == "occidendum" && respondido == false) {
                await storage.save({
                    key: 'total2', 
                    data: {
                        totalAmount: 1,
                    }
                })
                
                await storage.save({
                    key: 'enigma2', 
                    data: {
                        resposta: 'occidendum',
                        respondido: true
                    }
                })
                .then(ret => {
                    this.setState({respondido: true})
                    this.setState({resposta: 'occidendum'})
                    this.props.navigation.goBack()
                })

            } else if (fixedResp == "occidendum" && respondido == true) {
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
                <ScrollView scrollEventThrottle={16}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start', marginVertical: 20}}>
                        <View style={{padding: 10}}>
                            <Text selectable={true} selectionColor='#875db0' style={styles.textEnigma}>
                            UGFyYWLDqW5zLCBqw6EgcXVlIHZvY8OqIGFjaG91IGVzc2Ugdm91IGZhY2lsaXRhciBkZXNzYSB2ZXogOykKCgoyMiBhbm9zLCBhcGFpeG9uYWRhIHBvciB1bWEgcGVzc29hIGUgcG9yIHVtYSBsw61uZ3VhIGrDoSBuw6NvIG1haXMgdml2YS4gVFVETyBmb2kgcm91YmFkbyBkZWxhIG5hcXVlbGEgbm9pdGUsIHR1ZG8gZm9pIHJvdWJhZG8gZGVsZSBuYXF1ZWxhIG5vaXRlIGUgdW0gbW9uc3RybyBuYXNjZXUgZG8gbWVkbywgZGEgw7NkaW8gZSBkYSB2aW5nYW7Dp2EuClZpb2xlbnRhbWVudGUgbyBmaW5vIGZpbyBkYSB2aWRhIGZvaSBlc3RyYcOnYWxoYWRvIGVtIHNlZ3VuZG9zIGludGVybWluw6F2ZWlzLgoKNDEuOTAyOSAxMi40NTM4IDQxIAoKQm9hIFNvcnRlLg==
                            </Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Insira aqui sua resposta"
                            placeholderTextColor="#fff"
                            value={this.state.resposta}
                            onChangeText={resposta => this.setState ({ resposta }) }>
                        </TextInput>
                        <TouchableOpacity style={styles.button} onPress={() => { this.checarResposta() }}>
                            <Text 
                            style={styles.textDefault}>Confirmar resposta</Text>
                        </TouchableOpacity>
                        
                    </View>
                </ScrollView>
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
        fontFamily: "canela_roman",
    },
    textEnigma: {
        color: '#fff',
        textAlign: 'justify',
        fontFamily: "canela_roman",
        fontSize: 18,
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
        borderRadius: 10
    }
});