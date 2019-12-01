import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView
} from "react-native";
import { NavigationEvents }  from 'react-navigation';
import App from '../App'
import Icon from 'react-native-vector-icons/Ionicons';



class Perfil extends Component {
    state = {
        ep1Total: 0,
        email: this.props.screenProps.email,
        uID: this.props.screenProps.uID,
        errMessage: '',
        isAuthenticated: this.props.screenProps.isAuthenticated,
    }


update = async () => {
const storage = global.storage
//CHECAGEM SE O PRIMEIRO ENIGMA FOI CONCLUIDO 
const Completed1 = await storage.load({
key: 'total1',
})
.then(ret => {
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
    return ret.totalAmount
})
.catch(err => {

    switch (err.name) {
    case 'NotFoundError':
        return 0;
    }
})

//SOMA O TOTAL DE ENIGMAS CONCLUIDOS
const DefTotal = Completed1 + Completed2
return this.setState({ep1Total: DefTotal})
}

    
    render() {
        if(this.state.isAuthenticated == true) {
        return (
            <View style={styles.container}>
            <NavigationEvents onWillFocus={() => { this.update() }} />
                <Image style={{ width: 205, height: 65, marginTop: 20 }} source={require('../assets/logo.png')} ></Image>
                <ScrollView scrollEventThrottle={16}>
                <View style={styles.containerCards}>
                    <View style={{ flex: 1, marginHorizontal: 20, paddingTop: 28 }}>
                    <Text style={{ fontSize: 30, color: '#fff', fontFamily: "Gilroy-ExtraBold"}}>INFORMAÇÕES DA SUA CONTA</Text>
                    </View>
                    <View style={{ height: "78%", marginTop: 0, paddingHorizontal: 20 }}>
                        <Text style={styles.text}>Email: {this.state.email} {"\n"}</Text>
                        <Text style={styles.text} >Seu id: {this.state.uID} {"\n"} </Text>
                        <TouchableOpacity style={styles.buttonLogout} onPress={ () => {{  App.signOut()  }}  }>
                                <Text style={styles.buttonText}>Sair</Text>
                        </TouchableOpacity>

                        <View style={{marginVertical: 20}}>
                        <Text style={{fontSize: 30, color: '#fff', fontFamily: "Gilroy-ExtraBold"}} >PROGRESSO {"\n"} </Text>
                        <Icon 
                            style={{position: "absolute", marginTop: '16.5%', marginLeft: '34%'}} name={'md-albums'} 
                            size={50} 
                            color={'#fff'}
                        />
                        <Text selectable={true} style={styles.textTotal}> {this.state.ep1Total}/10 </Text>
                        </View>
                    </View>
                </View>
                </ScrollView>
            </View>
            
        );
        } else {
            return <App />
        }
    }
}
export default Perfil;

const styles = StyleSheet.create({
    containerCards: {
    flex: 1,
    marginTop: 20
    },
    container: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#0d0d0d'
    },
text: {
        color: '#fff',
        fontFamily: "canela_roman",
        fontSize: 20,
        textAlign:"left",
        borderBottomWidth: 2,
        borderColor: '#fff',
        marginVertical: 7,
    },
    textTotal: {
        color: '#fff',
        fontFamily: "canela_roman",
        fontSize: 25,
        textAlign:"center",
        marginTop: '-4%',
        marginLeft: '15%'
    },
    buttonLogout: {
        height: 45,
        backgroundColor: '#fff',
        width: 150,
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 10,
        justifyContent: "center",
        borderRadius: 5,
        alignItems: "center",
      }, 
      buttonText: {
        color: "#000",
        fontSize: 25,
        fontFamily: "canela_roman",
        textAlignVertical: 'center'
      },
});