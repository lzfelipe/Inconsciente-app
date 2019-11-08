import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import firebase from 'react-native-firebase';
import Inicio from './screens/Inicio';
import RNRestart from 'react-native-restart';



class App extends Component {
  
  state = {
    email: '',
    password: '',
    emailRegister: '',
    passwordRegister: '',
    passwordConfirm: '',
    isAuthenticated: false,
    catchError: false,
    errMessage: '',
    userEmail: '',
    userUid: '',
    registerToggle: false,

  }

  static signOut() {

    firebase.auth().signOut()
    .then( () => {
      RNRestart.Restart();
    })
    .catch((err) => {
      RNRestart.Restart();
    });
  } 




  login = async () => {
    const {email, password} = this.state;

    if (password == '') {
      this.setState({ errMessage: "Preencha suas credenciais" });
    } 


    else if (email == '') {
      this.setState({ errMessage: "Preencha suas credenciais" });
    } 

    
    else  {

      this.setState({ errMessage: "" });
      
      try {
        const user = await firebase.auth()
        .signInWithEmailAndPassword(email, password)
        this.setState({ isAuthenticated: true })
        this.setState({ userEmail: user.user.email})
        this.setState({userUid: user.user.uid })
        console.log(user)                                                                                                                                                                                                                                                                                                
      }
      catch (err) {
        this.setState({ catchError: true })
        this.setState({ errMessage: err.message })

        if (this.state.errMessage == 'The email address is badly formatted.') {
          this.setState({errMessage: "Informe um endereço de email válido."})
        }

        if (this.state.errMessage == 'There is no user record corresponding to this identifier. The user may have been deleted.') {
          this.setState({errMessage: "Não foi encontrado nenhum usuário com este email."})
        }        

        if (this.state.errMessage == 'The password is invalid or the user does not have a password.') {
          this.setState({errMessage: "Senha inválida."})
        } 

             
        console.log(err)
      }
  }}

  register = async () => {
    const {emailRegister, passwordRegister, passwordConfirm} = this.state;

    if (passwordRegister == '') {
      this.setState({ errMessage: "Preencha suas credenciais" });
    } 


    else if (emailRegister == '') {
      this.setState({ errMessage: "Preencha suas credenciais" });
    } 

    else if (passwordRegister != passwordConfirm) {
      this.setState({ errMessage: "As senhas devem ser iguais" });
    }

    else { 


        firebase.auth().createUserWithEmailAndPassword(emailRegister, passwordRegister)
        .then(() => {
          this.setState({ registerToggle: false });
          this.setState({ emailRegister: '' });
          this.setState({ passwordRegister: '' });
          this.setState({ passwordConfirm: '' });
          this.setState({ errMessage: 'Usuário registrado, faça o login com as suas credenciais!' })
          
        })
        .catch( (err) => {
          var errCode = err.code;
          var errMessage = err.message;

          this.setState({ catchError: true })
          this.setState({ errMessage: errMessage })
          if (this.state.errMessage == 'The email address is badly formatted.') {
            this.setState({errMessage: "Informe um endereço de email válido."})
          }
          if (this.state.errMessage == 'The given password is invalid. [ Password should be at least 6 characters ]') {
            this.setState({errMessage: "A senha deve ter no minímo 6 caracteres."})
          }
          if (errCode == 'auth/email-already-in-use') {
            this.setState({errMessage: "Esse email já está em uso."})
          }     
          console.log(errMessage)
        });



  
    }
  }


  render() {

    //View Login
    if(this.state.registerToggle == false) {
      if (this.state.isAuthenticated == false) { 
        return <View style={styles.container}>
            <View style={styles.purple}></View>
            <View style={styles.containerErro}>
            <Text style={styles.errorText}> {this.state.errMessage} </Text>
            </View>
  
            <View style={styles.containerButtons}>
              <TouchableOpacity style={styles.buttonsRegister} onPress={() => this.setState({ registerToggle: false })}>
                <Text style={{color: "#2C1446", marginBottom: 20, fontSize: 18}} >Login</Text>
              </TouchableOpacity>
  
              <TouchableOpacity style={styles.buttonsRegister} onPress={() => this.setState({ registerToggle: true })} >
                <Text style={{color: "#aaa", marginBottom: 20, fontSize: 18}} >Registrar</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.containerInputs}>
            <TextInput
            style={styles.input}
            placeholder="Digite seu email."
            value={this.state.email}
            onChangeText={email => this.setState ({ email }) }
            placeholderTextColor="#8A66A2"
            >
            </TextInput>
            

            <TextInput 
            style={styles.input}
            placeholder="Digite sua senha."
            value={this.state.password}
            onChangeText={password => this.setState ({ password }) }
            placeholderTextColor="#8A66A2"
            secureTextEntry={true}
            >
            </TextInput>
            </View>

            <TouchableOpacity style={styles.button} onPress={this.login}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View> 
      
    }
       else {
        return  <Inicio screenProps={{email: this.state.userEmail, uID: this.state.userUid, isAuthenticated: this.state.isAuthenticated}} />
      }  
  } 

  //View Registro
  else if (this.state.registerToggle == true) {
    return  <View style={styles.container}>
      <View style={styles.purple}></View>
      
      <View style={styles.containerErro}>
        <Text style={styles.errorText}> {this.state.errMessage} </Text>
      </View>
  
      <View style={styles.containerButtons}>

        <TouchableOpacity style={styles.buttonsRegister} onPress={() => this.setState({ registerToggle: false })}>
          <Text style={{color: "#aaa", marginBottom: 20, fontSize: 18}} >Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonsRegister} onPress={() => this.setState({ registerToggle: true })}>
          <Text style={{color: "#2C1446", marginBottom: 20, fontSize: 18}} >Registrar</Text>
        </TouchableOpacity>

      </View>
      <View style={styles.containerInputs}>
        <TextInput
        style={styles.input}
        placeholder="Digite seu email."
        value={this.state.emailRegister}
        onChangeText={emailRegister => this.setState ({ emailRegister }) }
        placeholderTextColor="#8A66A2"
        >
        </TextInput>


        <TextInput
        style={styles.input}
        placeholder="Digite sua senha."
        value={this.state.passwordRegister}
        onChangeText={passwordRegister => this.setState ({ passwordRegister }) }
        placeholderTextColor="#8A66A2"
        secureTextEntry={true}
        >
        </TextInput>

        <TextInput
        style={styles.input}
        placeholder="Confirme sua senha."
        value={this.state.passwordConfirm}
        onChangeText={passwordConfirm => this.setState ({ passwordConfirm }) }
        placeholderTextColor="#8A66A2"
        secureTextEntry={true}
        >
        </TextInput>
        </View>
        <TouchableOpacity style={styles.button} onPress={this.register}>
            <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>

    </View>
  }
}
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignContent: 'center',
  },
  purple: {
    flex: 1,
    backgroundColor: '#2C1446',
    width: "120%",
    maxHeight: "20%",
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
    elevation: 10,
    alignSelf:'flex-start',
    marginLeft: -35
  },
  containerErro: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerButtons: {
    width: "70%",
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 50,
  },
  containerInputs: {
    width: "70%",
    alignSelf: 'center',
    marginLeft: -6,
  },
  input: {
    height: 45,
    borderBottomColor: '#8A66A2',
    borderBottomWidth: 2,
    marginBottom: 20,
    marginTop: 10,
  },
  button: {
    height: 45,
    backgroundColor: '#8A66A2',
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
  buttonsRegister: {
    height: 10,
    marginRight: 20,
    borderBottomColor: '#8A66A2',
    borderBottomWidth: 1.5,
    paddingVertical: 28,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18
  },
  errorText: {
    color: "#8A66A2",
  },

});