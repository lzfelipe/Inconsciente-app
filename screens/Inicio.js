import React, { Component } from 'react';
import { StyleSheet, Text, SafeAreaView, View, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import { createAppContainer, NavigationEvents }  from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Perfil from './Perfil';
import Infos from './Infos';
import Icon from 'react-native-vector-icons/Ionicons';
import Episodios from './Components/Episodios'
import Episodio from './Episodio'
import Enigma1 from './Stacks/Enigma1'
import Enigma2 from './Stacks/Enigma2';
import RodrigoInfos from './Stacks/RodrigoInfos'
import EduardoInfos from './Stacks/EduardoInfos'
import VideoUnblocked from './Components/VideoUnblocked';
import { createStackNavigator } from 'react-navigation-stack';
const storage = global.storage

export class Inicio extends Component {
  state = {
    ep1Total: 0,
    ep2Total: 0,
    ep3Total: 0
  }


  update = async () => {
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
  const DefTotal = await Completed1 + Completed2
  return this.setState({ep1Total: DefTotal})
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#0d0d0d" />
        <NavigationEvents onWillFocus={() => { this.update() }} />
        <Image style={{ width: 200, height: 60, marginTop: 20 }} source={require('../assets/logo.png')} ></Image>
        <View style={styles.containerCards}>
          <ScrollView
            scrollEventThrottle={16}
          >
            <View style={{ flex: 1, paddingTop: 28 }}>
              <Text style={{ fontSize: 34, paddingHorizontal: 20, color: '#fff', fontFamily: "Gilroy-ExtraBold"}}>EPISÓDIOS</Text>
            </View>
            <View style={{ height: 300, marginTop: 20 }}>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Episodio', {coletados: this.state.ep1Total})}>
                  <Episodios imageUri={require('../assets/ep1.jpg')} titulo={'1. Piloto'} coletados={this.state.ep1Total}
                    onUpdate={() => this.update()}
                  />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Episodios imageUri={require('../assets/locked.jpg')} titulo={'2. Desconfiado'} coletados={'0'}
                  />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Episodios imageUri={require('../assets/locked.jpg')} titulo={'3. Descobertas'} coletados={'0'}
                  />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Episodios imageUri={require('../assets/locked.jpg')} titulo={'4. Luta'} coletados={'0'}
                  />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Episodios imageUri={require('../assets/locked.jpg')} titulo={'5. O Inimigo'} coletados={'0'}
                  />
                </TouchableOpacity>

              </ScrollView>
            </View>
          </ScrollView>
        </View>

      </SafeAreaView>
    );
  }
}

let navToggle = true;

const TabNavigator = createBottomTabNavigator({
  Inicio: {
    screen: createStackNavigator({
      Inicio: {
        screen: Inicio,
        navigationOptions: () => ({
          headerShown: false,
        }),
      },


      Episodio: {
        screen: Episodio,
        navigationOptions: () => ({
          headerShown: true,
          title: `Piloto`,
          headerTitleStyle: {

            fontWeight: '400',
        
            color: '#fff',

            fontFamily: 'Gilroy-Light',
        
            fontSize: 22
          },
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: '#242626' },
        }),

      },

      Enigma1: {
        screen: Enigma1,
        navigationOptions: () => ({
          headerShown: true,
          title: `Enigma 1`,
          headerTitleStyle: {

            fontWeight: '400',
        
            color: '#fff',

            fontFamily: 'Gilroy-Light',
        
            fontSize: 22
          },
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: '#242626' },
        }),
      },

      Enigma2: {
        screen: Enigma2,
        navigationOptions: () => ({
          headerShown: true,
          title: `Enigma 2`,
          headerTitleStyle: {

            fontWeight: '400',
        
            color: '#fff',

            fontFamily: 'Gilroy-Light',
        
            fontSize: 22
          },
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: '#242626' },
        }),
      },

      VideoUnblocked: {
        screen: VideoUnblocked,
        navigationOptions: () => ({
          headerShown: true,
          title: `?`,
          headerTitleStyle: {

            fontWeight: '400',
        
            color: '#fff',

            fontFamily: 'Gilroy-Light',
        
            fontSize: 22
          },
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: '#242626' },
        }),
      }

    },
    {
      defaultNavigationOptions: ({ navigation }) => {
        const { routeName } = navigation.state;

        if (routeName == 'Inicio' ) {
          navToggle = true;
        } else {
          navToggle = false;
        }
      }
    }
    ), 
  
  }, 

  Informações: {
    screen: createStackNavigator({
      Informações: {
        screen: Infos,
        navigationOptions: () => ({
          headerShown: false,
        }),
      },

      RodrigoInfos: {
        screen: RodrigoInfos,
        navigationOptions: () => ({
          headerShown: true,
          headerTitleStyle: {

            fontWeight: '400',
        
            color: '#fff',

            fontFamily: 'Gilroy-Light',
        
            fontSize: 22
          },
          title: `Rodrigo`,
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: '#0d0d0d' },
        }),
      },

      EduardoInfos: {
        screen: EduardoInfos,
        navigationOptions: () => ({
          headerShown: true,
          title: `Eduardo`,
          headerTitleStyle: {

            fontWeight: '400',
        
            color: '#fff',

            fontFamily: 'Gilroy-Light',
        
            fontSize: 22
          },
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: '#0d0d0d' },
        }),
      },



  },{
    defaultNavigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state;

      if (routeName === 'Informações') {
        navToggle = true;
      } else {
        navToggle = false;
      }
    }
  }

  )},


  Perfil: Perfil,
},

  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarVisible: navToggle,
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Icon;
        let iconName;
        if (routeName === 'Inicio') {
          iconName = 'md-home';

        } else if (routeName === 'Informações') {
          iconName = 'md-information-circle';
        } else if (routeName === 'Perfil') {
          iconName = 'md-person';
        }

        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      keyboardHidesTabBar: true,
      activeBackgroundColor: '#000',

      labelStyle: {

        fontWeight: '400',
  
        fontFamily: 'Gilroy-Light',
    
        fontSize: 13
      },
      
      activeTintColor: '#fff',
      inactiveTintColor: '#000',
      style: {
        backgroundColor: '#fff',
      }
    },
  }
);


export default createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0d0d0d',
    flex: 1,
    alignItems: 'center',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
  },
  containerCards: {
    flex: 1,
    marginTop: 20
  }
});