import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,	
} from "react-native";
import Storage from 'react-native-storage';
import { NavigationEvents }  from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
const storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
  });

class Episodio extends Component {
    state = {
        total: 0,
        Item1Time: '',
        Item1Check: false,
        colorDefault: '#fff',
        colorPicked: '#7dfa9e',
        Item2Time: '',
        Item3Time: '',
        loading: true
        
    }

checkItem1 = async () => {
        if (this.state.Item1Time == "1:52" && this.state.Item1Check == false) {
        {
        await storage.save({
            key: 'item1Time', // Note: Do not use underscore("_") in key!
            data: {
                Item1Time: this.state.Item1Time,
                Item1Check: true
            }
        })

        await storage.load({
            key: 'item1Time'
        }).then(ret => {
            this.setState({Item1Time: ret.Item1Time})
            this.setState({Item1Check: ret.Item1Check})
        })
        
        this.props.navigation.navigate('Enigma1')
        }
    }
    else if (this.state.Item1Time == "1:52" && this.state.Item1Check == true) {
        this.props.navigation.navigate('Enigma1')
    }

}

getItem1 = async () => {
    await storage.load({
        key: 'item1Time',
    })
    .then(ret => {
        this.setState({Item1Time: ret.Item1Time})
        this.setState({Item1Check: ret.Item1Check})
        this.setState({colorDefault: '#7dfa9e'})
    })
    .catch(err => {


        switch (err.name) {
            case 'NotFoundError':
              this.setState({Item1Time: ''})
              this.setState({Item1Check: false})
              this.setState({colorDefault: "#fff"})
              break;
    }})
 }

componentWillMount() {
 this.getItem1();
}

removeData = async () => {

    const Gstorage = global.storage;

    storage.remove({
        key: 'item1Time'
      }).then(() => {
          this.setState({Item1Time: ''})
          this.setState({Item1Check: false})
          this.setState({colorDefault: "#fff"})
      });

      Gstorage.remove({
        key: 'total'
      }).then(() => {
        this.setState({total: 0})
      });

}

getTotal = async () => {
    this.getItem1();
    const Gstorage = global.storage;

    Gstorage.load({
        key: 'total',
      })
        .then(ret => {
          this.setState({ total: ret.totalAmount })
          return ret.totalAmount;
        })
        .catch(err => {

          switch (err.name) {
            case 'NotFoundError':
              return this.setState({ total: 0 });
          }
        })
 }

    render() {
            return (
            <View style={styles.container}>
            <NavigationEvents onWillFocus={() => { this.getTotal() }} />
                <View style={styles.main}>
                <Text style={{fontSize: 18, textAlign: 'center', marginTop: 10, color: "#fff"}}>Você coletou {this.state.total} item(s) de 3 deste episódio!</Text>

                    <View style={styles.containerContent}>
                        <Text style={{fontSize: 16, color: this.state.colorDefault }}>Primeiro item(1:52):</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Min."
                            value={this.state.Item1Time}
                            onChangeText={Item1Time => this.setState ({ Item1Time }) }
                            placeholderTextColor="#fff"
                            >
                        </TextInput>

                        <View style={{flexDirection: 'column'}}>
                            <TouchableOpacity style={{backgroundColor: "#8A66A2", padding: 15, borderRadius: 10}} onPress={() => this.checkItem1() }>
                                <Text style={{color: "#fff"}}>-></Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.containerContent}>
                        <Text style={{fontSize: 16, color: '#FFF'}}>Segundo item(m:ss):</Text>
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
                        <Text style={{fontSize: 16, color: '#FFF'}}>Terceiro item(m:ss):</Text>
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
                <TouchableOpacity onPress={() => {this.removeData()} } style={{padding: 5, backgroundColor: 'red', alignSelf: 'center', marginBottom: 10, borderRadius: 10}}>
                    <Text style={{color: "#fff"}}>Resetar</Text>
                </TouchableOpacity>
            </View> 
            
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
        backgroundColor: '#0d0d0d'
    },
    main: {
        flex: 2, 
        flexDirection: 'column',
        alignSelf: 'stretch',
        backgroundColor: '#0d0d0d'
    },
    containerContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#0d0d0d',
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