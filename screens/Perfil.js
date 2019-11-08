import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import App from '../App'

class Perfil extends Component {
    
    render() {
        this.state = {
            email: this.props.screenProps.email,
            uID: this.props.screenProps.uID,
            errMessage: '',
            isAuthenticated: this.props.screenProps.isAuthenticated,
        }

        if(this.state.isAuthenticated == true) {
        return (
            <View style={styles.container}>
                <Text>Perfil</Text>
                <Text>Email: {this.state.email}</Text>
                <Text>UID: {this.state.uID}</Text>

                <TouchableOpacity style={styles.buttonLogout} onPress={ () => {{  App.signOut()  }}  }>
                     <Text style={styles.buttonText}>Sair</Text>
                </TouchableOpacity>
            </View>
            
        );
        } else {
            return <App />
        }
    }
}
export default Perfil;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    buttonLogout: {
        height: 45,
        backgroundColor: '#b11113',
        width: 200,
        alignSelf: 'center',
        marginTop: 10,
        textAlign: 'center',
        justifyContent: "center",
        borderRadius: 5,
        alignItems: "center",
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOpacity: 0.5,
        elevation: 6,
        shadowRadius: 15 ,
        shadowOffset : { width: 1, height: 13},
      }, 
      buttonText: {
        color: "#fff",
        fontSize: 18
      },
});