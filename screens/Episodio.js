import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
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

  global.storage = storage;

class Episodio extends Component {
    state = {
        total: 0,

        Item1Time: '',
        Item1Check: false,
        IconDefault: 'md-arrow-dropright',
        ColorDefault: '#fff',

        Item2Time: '',
        Item2Check: false,
        IconDefault2: 'md-arrow-dropright',
        ColorDefault2: '#fff',

        displayVideo: 'none'
        
    }


checkItem1 = async () => {
        const item1PossibleTimes = ["a", "0:30", "0:31", "0:32", "0:33", "0:34", "0:35", "0:39", "0:40", "0:41", "0:42", "0:43", "0:49",
        "0:50", "0:51", "0:52", "0:53", "0:54", "0:55", "0:56", "1:06", "1:07", "1:08", "1:09", "1:10", "1:11", "1:12", "1:13"]

        const RightTime1 = item1PossibleTimes.includes(this.state.Item1Time)

        if (RightTime1 == true && this.state.Item1Check == false) {
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
    else if (RightTime1 == true && this.state.Item1Check == true) {
        this.props.navigation.navigate('Enigma1')
    }

}

checkItem2 = async () => {
    
    const item2PossibleTimes = ["a", "2:02", "2:03", "2:04", "2:05", "2:06", "2:07", "2:08", "2:09"]

    const RightTime2 = item2PossibleTimes.includes(this.state.Item2Time)

    if (RightTime2 == true && this.state.Item2Check == false) {
    {
    await storage.save({
        key: 'item2Time', // Note: Do not use underscore("_") in key!
        data: {
            Item2Time: this.state.Item2Time,
            Item2Check: true
        }
    })
    await storage.load({
        key: 'item2Time'
    }).then(ret => {
        this.setState({Item2Time: ret.Item2Time})
        this.setState({Item2Check: ret.Item2Check})
        this.props.navigation.navigate('Enigma2')
    })

    
    }
}
else if (RightTime2 == true && this.state.Item2Check == true) {
    this.props.navigation.navigate('Enigma2')
}

}

getItem1 = async () => {
    await storage.load({
        key: 'item1Time',
    })
    .then(ret => {
        this.setState({Item1Time: ret.Item1Time})
        this.setState({Item1Check: ret.Item1Check})
        this.setState({ColorDefault: "#8A66A2"})
        this.setState({IconDefault: 'md-checkmark-circle-outline'})
    })
    .catch(err => {


        switch (err.name) {
            case 'NotFoundError':
              this.setState({Item1Time: ''})
              this.setState({Item1Check: false})
              this.setState({ColorDefault: "#fff"})
              this.setState({IconDefault: "md-arrow-dropright"})
              break;
    }})
 }

getItem2 = async () => {
    await storage.load({
        key: 'item2Time',
    })
    .then(ret => {
        this.setState({Item2Time: ret.Item2Time})
        this.setState({Item2Check: ret.Item2Check})
        this.setState({ColorDefault2: "#8A66A2"})
        this.setState({IconDefault2: 'md-checkmark-circle-outline'})
    })
    .catch(err => {
        switch (err.name) {
            case 'NotFoundError':
              this.setState({Item2Time: ''})
              this.setState({Item2Check: false})
              this.setState({ColorDefault2: "#fff"})
              this.setState({IconDefault2: "md-arrow-dropright"})
              break;
    }})
}

getTotal = async () => {

   //CHECAGEM SE O PRIMEIRO ENIGMA FOI CONCLUIDO 
   const Completed1 = await storage.load({
        key: 'total1',
      })
        .then(ret => {
            this.getItem1()
            return ret.totalAmount
        })
        .catch(err => {

          switch (err.name) {
            case 'NotFoundError':
              return 0;
          }
        })

    //CHECAGEM SE O SEGUNDO ENIGMA FOI CONCLUIDO     
    const Completed2 = await storage.load({
        key: 'total2',
      })
        .then(ret => {
            this.getItem2()
          return ret.totalAmount
        })
        .catch(err => {

          switch (err.name) {
            case 'NotFoundError':
              return 0;
          }
        })
    
    //SOMA O TOTAL DE ENIGMAS CONCLUIDOS
    const DefTotal = await Completed1 + Completed2

    //CHECAGEM SE O PRIMEIRO ITEM FOI ACHADO
    await storage.load({
        key: 'item1Time',
    })
    .then(ret => {
        this.setState({Item1Time: ret.Item1Time})
        this.setState({Item1Check: ret.Item1Check})
    }).catch(err => {

        switch (err.name) {
          case 'NotFoundError':
            return 0;
        }
      })

    //CHECAGEM SE O SEGUNDO ITEM FOI ACHADO 
    await storage.load({
        key: 'item2Time',
    })
    .then(ret => {
        this.setState({Item2Time: ret.Item2Time})
        this.setState({Item2Check: ret.Item2Check})
    }).catch(err => {

        switch (err.name) {
          case 'NotFoundError':
            return 0;
        }
      })

    if(DefTotal == 2) {
        this.setState({displayVideo: 'flex'})
    }
    //RETORNA O TOTAL DE ENIMGAS CONCLUIDOS
    return this.setState({total: DefTotal})
}

async componentWillMount() {
    await this.getTotal()
}

removeData = async () => {
    storage.remove({
        key: 'item1Time'
      }).then(() => {
          this.setState({Item1Time: ''})
          this.setState({Item1Check: false})
          this.setState({ColorDefault: "#fff"})
          this.setState({IconDefault: "md-arrow-dropright"})
      });

      storage.remove({
        key: 'item2Time'
      }).then(() => {
          this.setState({Item2Time: ''})
          this.setState({Item2Check: false})
          this.setState({ColorDefault2: "#fff"})
          this.setState({IconDefault2: "md-arrow-dropright"})
      });

      storage.remove({
        key: 'total1'
      }).then(() => {
        this.setState({total: 0})
      });

      storage.remove({
        key: 'total2'
      }).then(() => {
        this.setState({total: 0})
      });

      storage.remove({
        key: 'enigma1'
      }).then(() => {
        this.setState({total: 0})
      });

      storage.remove({
        key: 'enigma2'
      }).then(() => {
        this.setState({total: 0})
      });

}



render() {
        return (
        <View style={styles.container}>
        <NavigationEvents onWillFocus={() => {  this.getTotal() }} />
            <View style={styles.main}>
            <Text style={{fontSize: 18, textAlign: 'center', marginTop: 10, color: "#fff"}}>
                Você completou um total de {this.state.total} enigma(s) de 2 neste episódio.
                </Text>

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
                        style={{backgroundColor: this.state.ColorDefault, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5}}>
                            <Icon name={this.state.IconDefault} size={25} color={'#000'}/>
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
                        <TouchableOpacity 
                        onPress={() => this.checkItem2() }
                        style={{backgroundColor: this.state.ColorDefault2, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5}}>
                            <Icon name={this.state.IconDefault2} size={25} color={'#000'}/>
                        </TouchableOpacity>
                    </View>
                </View>


            </View>
            <TouchableOpacity 
            onPress={() => {this.removeData()} } 
            style={{padding: 5, backgroundColor: 'red', alignSelf: 'center', marginBottom: 10, borderRadius: 10, display: 'none'}}>
                <Text style={{color: "#fff"}}>Resetar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            onPress={() => {this.props.navigation.navigate('VideoUnblocked')}}
            style={{
                    display: this.state.displayVideo, padding: 20, 
                    backgroundColor: '#000', 
                    alignSelf: 'center', 
                    marginBottom: 10, 
                    borderRadius: 10, 
                }}>
                <Icon name={'md-help'} size={40} color={'#fff'}/>
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
        backgroundColor: '#0d0d0d',
    },
    main: {
        flex: 1, 
        flexDirection: 'column',
        alignSelf: 'stretch',
        backgroundColor: '#0d0d0d',
        justifyContent: 'flex-start'
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
    mistery: {
        
    }
});