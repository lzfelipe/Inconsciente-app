import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, Image} from 'react-native';
import firebase from 'react-native-firebase';
import Inicio from './screens/Inicio';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-community/async-storage';
import Loading from './screens/Components/Loading';
import { KeyboardAwareScrollView  } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/Ionicons';


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
    loading: true,
    timePassed: false,
  }

  getData = async () => {
    try {
      const email = await AsyncStorage.getItem('email')
      const password = await AsyncStorage.getItem('password')
      this.setState({ email });
      this.setState({ password });

      if (email) {
        await this.login()
        this.setState({loading: false})
      } else {
        this.setState({email: '' });
        this.setState({password: ''});
      }
      
    } catch(e) {
      console.log(e)
    }
    
  }

  componentWillMount() {
    this.setState({loading: true})

    this.getData()
  }  

  componentDidMount() {
    setTimeout( () => {
          this.setTimePassed();
          this.setState({loading: false});
      },3000);
    }

    setTimePassed() {
      this.setState({timePassed: true});
   }
   
  static signOut() {
    removeData = async () => {
      try {
        await AsyncStorage.removeItem('email')
        await AsyncStorage.removeItem('password')
      } catch(e) {
      }
    }

    firebase.auth().signOut()
    .then( () => {
      removeData();
      RNRestart.Restart();
    })
    .catch((err) => {
      removeData();
      RNRestart.Restart();
    });
  } 

  login = async () => {
    const {email, password} = this.state

    if (email == '') {
      this.setState({ errMessage: "Preencha suas credenciais" });
    } 
    
    if (password == '') {
      this.setState({ errMessage: "Preencha suas credenciais" });
    } 

    else  {
      async function storeData() {
        try {
          await AsyncStorage.setItem('email', email)
          await AsyncStorage.setItem('password', password)
          
        } catch (e) { 
          console.log(e)
        }
      }

      this.setState({ errMessage: "" });

      try {
        const user = await firebase.auth()
        .signInWithEmailAndPassword(email, password)
        

        this.setState({ isAuthenticated: true })
        this.setState({ userEmail: user.user.email})
        this.setState({userUid: user.user.uid })
        
        await storeData()       
        this.setState({loading: false})                                                                                                                                                                                                                                                                                       
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
        });



  
    }
  }


  render() {

    if(!this.state.timePassed) {return  <Loading />}
    else {
    //View Login
    if(this.state.registerToggle == false) {
     
      if (this.state.isAuthenticated == false) { 
        return <View style={styles.container}>
            <StatusBar backgroundColor="#000"/>
            <View style={{flex: 0, backgroundColor: '#000', width: '100%', height: '20%', justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('./assets/logo.png')} style={{width: '60%', height: '60%', resizeMode: 'contain'}}></Image>
            </View>
            <View style={styles.containerErro}>
            <Text style={styles.errorText}> {this.state.errMessage} </Text>
            </View>
  
            <View style={styles.containerButtons}>
              <TouchableOpacity style={styles.buttonsRegister} onPress={() => this.setState({ registerToggle: false })}>
                <Text style={{color: "#000", marginBottom: 20, fontSize: 18}} >Login</Text>
              </TouchableOpacity>
  
              <TouchableOpacity style={styles.buttonsRegister} onPress={() => this.setState({ registerToggle: true })} >
                <Text style={{color: "#aaa", marginBottom: 20, fontSize: 18}} >Registrar</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.containerInputs}>
            <Icon name={'ios-mail'} size={23} color={'#000'} style={{position: "absolute", marginTop: "8.5%"}}/>
            <TextInput
            style={styles.input}
            value={this.state.email}
            onChangeText={email => this.setState ({ email }) }
            >
            </TextInput>
            
            <Icon name={'md-lock'} size={25} color={'#000'} style={{position: "absolute", marginTop: "38%"}}/>
            <TextInput 
            style={styles.input}
            value={this.state.password}
            onChangeText={password => this.setState ({ password }) }
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
  if (this.state.registerToggle == true) {
    return <View style={styles.container}>
       <StatusBar backgroundColor="#000"/>
       <View style={{flex: 0, backgroundColor: '#000', width: '100%', height: '20%', justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('./assets/logo.png')} style={{width: '60%', height: "60%", resizeMode: 'contain'}}></Image>
        </View>
      
      <View style={styles.containerErro}>
        <Text style={styles.errorText}> {this.state.errMessage} </Text>
      </View>
      <KeyboardAwareScrollView>
      <View style={styles.containerButtons}>

        <TouchableOpacity style={styles.buttonsRegister} onPress={() => this.setState({ registerToggle: false })}>
          <Text style={{color: "#aaa", marginBottom: 20, fontSize: 18}} >Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonsRegister} onPress={() => this.setState({ registerToggle: true })}>
          <Text style={{color: "#000", marginBottom: 20, fontSize: 18}} >Registrar</Text>
        </TouchableOpacity>

      </View>
      
      <View style={styles.containerInputs}>
        <Icon name={'ios-mail'} size={23} color={'#000'} style={{position: "absolute", marginTop: "8.5%"}}/>
        <TextInput
        style={styles.inputRegister}
        placeholder="Digite um email válido."
        value={this.state.emailRegister}
        onChangeText={emailRegister => this.setState ({ emailRegister }) }
        placeholderTextColor="#919191"
        >
        </TextInput>

        <Icon name={'md-lock'} size={25} color={'#000'} style={{position: "absolute", marginTop: "38%"}}/>
        <TextInput
        style={styles.inputRegister}
        placeholder="Digite uma senha."
        value={this.state.passwordRegister}
        onChangeText={passwordRegister => this.setState ({ passwordRegister }) }
        placeholderTextColor="#919191"
        secureTextEntry={true}
        >
        </TextInput>

        <Icon name={'md-lock'} size={25} color={'#000'} style={{position: "absolute", marginTop: "67.5%"}}/>
        <TextInput
        style={styles.inputRegister}
        placeholder="Confirme sua senha."
        value={this.state.passwordConfirm}
        onChangeText={passwordConfirm => this.setState ({ passwordConfirm }) }
        placeholderTextColor="#919191"
        secureTextEntry={true}
        >
        </TextInput>
        </View>
        <TouchableOpacity style={styles.button} onPress={this.register}>
            <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
        </KeyboardAwareScrollView>
    </View>
    
  }
}
}
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignContent: 'center',
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
    marginLeft: -9,
  },
  input: {
    height: 45,
    borderBottomColor: '#000',
    borderBottomWidth: 2,
    marginBottom: 20,
    marginTop: 10,
    paddingLeft: 25,
  },
  inputRegister: {
    height: 45,
    borderBottomColor: '#000',
    borderBottomWidth: 2,
    marginBottom: 20,
    marginTop: 10,
    paddingLeft: 25,
  },
  button: {
    height: 45,
    backgroundColor: '#000',
    width: 200,
    alignSelf: 'center',
    marginTop: 10,
    textAlign: 'center',
    justifyContent: "center",
    borderRadius: 5,
    alignItems: "center",
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOpacity: 0.5,
    elevation: 6
  },
  buttonsRegister: {
    height: 10,
    marginRight: 20,
    borderBottomColor: '#000',
    borderBottomWidth: 1.5,
    paddingVertical: 28,
    marginTop: 0,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18
  },
  errorText: {
    color: "#000",
    fontSize: 14,
    textAlign: 'center',
    justifyContent: 'center'
  },

});