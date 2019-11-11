import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,	
} from "react-native";
import VideoUnblocked from './Components/VideoUnblocked'
import AsyncStorage from '@react-native-community/async-storage';

class Episodio extends Component {
    state = {
        total: 0,
        Item1Time: '',
        Item2Time: '',
        Item3Time: '',
        loading: false
    }

    getAllKeys = async () => {
        let keys = []
        try {
          keys = await AsyncStorage.getAllKeys()
          console.log(keys)
          //await AsyncStorage.multiRemove(keys)
          //console.log("remove" + keys)

        } catch(e) {
          // read key error
        }
        // example console.log result:
        // ['@MyApp_user', '@MyApp_key']
      }

      getItens = async () => {
        try {
          const Item1Time = await AsyncStorage.getItem('Item1Time')
          const total = await AsyncStorage.getItem('total')
          console.log("Total: " + total)
          this.setState({ Item1Time });
          
          if(this.state.total == 0) {
            this.setState({ total });
          } 
          else {
            this.setState({ total: total.length });
          }

         
          
        } catch(e) {
          console.log(e)
        }
        
      }
    
      componentWillMount() {
        this.getAllKeys()
        this.getItens();
      }

      

    checkItem1 = async () => {
        let {Item1Time, total} = this.state;
        increment = async () => {
            await this.setState({ total: this.state.total + 1 })
            console.log(this.state.total)
          }
    
        async function Store() {
            try {
              await this.increment();             
              await AsyncStorage.setItem('Item1Time', Item1Time)
              console.log("Salvo Tempo")
              total += 1;
              await AsyncStorage.setItem('total', total.toString())
              console.log("Salvo Total " + total.toString())
              
            } catch (e) { 
              console.log(e)
            } 
        }

        if(Item1Time == "11") {
                await Store()
               // this.props.navigation.navigate('Enigma')

            }
        }
    

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.main}>
                <Text style={{fontSize: 18, textAlign: 'center', marginTop: 10, color: "#aaa"}}>Você coletou {this.state.total} item(s) de 3 deste episódio!</Text>
                    <View style={styles.containerContent}>
                        <Text style={{fontSize: 16, color: '#48cefa'}}>Primeiro item(1:52):</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Min."
                            value={this.state.Item1Time}
                            onChangeText={Item1Time => this.setState ({ Item1Time }) }
                            placeholderTextColor="#fff"
                            >
                        </TextInput>

                        <View style={{flexDirection: 'column'}}>
                            <TouchableOpacity style={{backgroundColor: "#8A66A2", padding: 15, borderRadius: 10}} onPress={this.checkItem1}>
                                <Text style={{color: "#fff"}}>-></Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{backgroundColor: "#8A66A2", padding: 15, borderRadius: 10}} onPress={this.increment}>
                                <Text style={{color: "#fff"}}>-></Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.containerContent}>
                        <Text style={{fontSize: 16, color: '#f5a845'}}>Segundo item(3:20):</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Min."
                            value={this.state.Item2Time}
                            onChangeText={Item2Time => this.setState ({ Item2Time }) }
                            placeholderTextColor="#fff"
                            >
                        </TextInput>

                        <View style={{flexDirection: 'column'}}>
                            <TouchableOpacity style={{backgroundColor: "#8A66A2", padding: 15, borderRadius: 10}}>
                                <Text style={{color: "#fff"}}>-></Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.containerContent}>
                        <Text style={{fontSize: 16, color: '#51f542'}}>Terceiro item(4:40):</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Min."
                            value={this.state.Item3Time}
                            onChangeText={Item3Time => this.setState ({ Item3Time }) }
                            placeholderTextColor="#fff"
                            >
                        </TextInput>

                        <View style={{flexDirection: 'column'}}>
                            <TouchableOpacity style={{backgroundColor: "#8A66A2", padding: 15, borderRadius: 10}}>
                                <Text style={{color: "#fff"}}>-></Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

            </SafeAreaView>
            
        );
    } 
}

export default Episodio;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#242626'
    },
    main: {
        flex: 2, 
        flexDirection: 'column',
        alignSelf: 'stretch',
    },
    containerContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#242626',
    },
    input: {
        textAlign: 'center',
        width: 60,
        borderBottomColor: '#8A66A2',
        borderBottomWidth: 2,
        marginBottom: 20,
        color: '#fff'
      },
});