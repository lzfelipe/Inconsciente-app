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
import Icon from 'react-native-vector-icons/Ionicons';


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
        console.log(ret)
        this.setState({Item1Time: ret.Item1Time})
        this.setState({Item1Check: ret.Item1Check})
        this.setState({colorDefault: '#7dfa9e'})
    })
    .catch(err => {
        console.log(err)

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
                    <Icon name={'md-list-box'} size={40} color={'#8A66A2'}/>
                        <TextInput
                            style={styles.input}
                            placeholder="Min."
                            value={this.state.Item1Time}
                            onChangeText={Item1Time => this.setState ({ Item1Time }) }
                            placeholderTextColor="#fff"
                            >
                        </TextInput>

                        <View style={{flexDirection: 'column'}}>
                            <TouchableOpacity
                            onPress={() => this.checkItem1() }
                            style={{backgroundColor: "#fff", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5}}>
                                <Icon name={'md-arrow-dropright'} size={25} color={'#000'}/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.containerContent}>
                        <Icon name={'md-list-box'} size={40} color={'#8A66A2'}/>
                        <TextInput
                            style={styles.input}
                            placeholder="Min."
                            value={this.state.Item2Time}
                            onChangeText={Item2Time => this.setState ({ Item2Time }) }
                            placeholderTextColor="#fff"
                            >
                        </TextInput>

                        <View style={{flexDirection: 'column'}}>
                            <TouchableOpacity style={{backgroundColor: "#fff", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5}}>
                                <Icon name={'md-arrow-dropright'} size={25} color={'#000'}/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.containerContent}>
                        <Icon name={'md-square'} size={40} color={'#8A66A2'}/>
                        <TextInput
                            style={styles.input}
                            placeholder="Min."
                            value={this.state.Item3Time}
                            onChangeText={Item3Time => this.setState ({ Item3Time }) }
                            placeholderTextColor="#fff"
                            >
                        </TextInput>

                        <View style={{flexDirection: 'column'}}>
                            <TouchableOpacity style={{backgroundColor: "#fff", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5}}>
                                <Icon name={'md-arrow-dropright'} size={25} color={'#000'}/>
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
        borderBottomColor: '#fff',
        borderBottomWidth: 2,
        marginBottom: 20,
        color: '#fff'
      },
});