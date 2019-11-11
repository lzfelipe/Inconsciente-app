import React, { Component } from 'react';
import { StyleSheet, Text, SafeAreaView, View, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import { createAppContainer, NavigationEvents } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Perfil from './Perfil';
import Infos from './Infos';
import Icon from 'react-native-vector-icons/Ionicons';
import Episodios from './Components/Episodios'
import Episodio from './Episodio'
import Enigma from './Enigma'
import { createStackNavigator } from 'react-navigation-stack';
const storage = global.storage

export class Inicio extends Component {
  state = {
    ep1Total: 0,
    ep2Total: 0,
    ep3Total: 0
  }

  update = () => {
    storage.load({
      key: 'total',
    })
      .then(ret => {
        this.setState({ ep1Total: ret.total })
        console.log(ret.total)
        return ret.total;
      })
      .catch(err => {
        console.log(err.message);

        switch (err.name) {
          case 'NotFoundError':
            return this.setState({ ep1Total: 0 });
        }
      })
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <NavigationEvents onWillFocus={() => { this.update() }} />
        <StatusBar backgroundColor="#242626" />
        <Image style={{ width: 200, height: 60, marginTop: 20 }} source={require('../assets/logo.png')} ></Image>
        <View style={styles.containerCards}>
          <ScrollView
            scrollEventThrottle={16}
          >
            <View style={{ flex: 1, paddingTop: 20 }}>
              <Text style={{ fontSize: 34, fontWeight: '700', paddingHorizontal: 20, color: '#fff' }}>EPISÓDIOS</Text>
            </View>
            <View style={{ height: 300, marginTop: 20 }}>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Episodio')}>
                  <Episodios imageUri={require('../assets/naruto.jpg')} titulo={'1. Naruto'} coletados={this.state.ep1Total}
                    onUpdate={() => this.update()}
                  />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Episodios imageUri={require('../assets/sasuke.jpg')} titulo={'2. Sasuke'} coletados={'0'}
                  />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Episodios imageUri={require('../assets/sakura.jpg')} titulo={'3. Sakura'} coletados={'0'}
                  />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Episodios imageUri={require('../assets/pain.png')} titulo={'4. Pain'} coletados={'0'}
                  />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Episodios imageUri={require('../assets/madara.jpg')} titulo={'5. Madara'} coletados={'0'}
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

let NavToggle = true;

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
          title: `Naruto`,
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: '#242626' },
        }),

      },

      Enigma: {
        screen: Enigma,
        navigationOptions: () => ({
          headerShown: true,
        }),

      }

    },
      {
        defaultNavigationOptions: ({ navigation }) => {
          const { routeName } = navigation.state;

          if (routeName === 'Episodio' || routeName === 'Enigma') {
            NavToggle = false;
          } else {
            NavToggle = true;
          }
        }


      })
  },
  Informações: Infos,
  Perfil: Perfil,
},

  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarVisible: NavToggle,
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
      activeBackgroundColor: '#000',
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
    backgroundColor: '#242624',
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