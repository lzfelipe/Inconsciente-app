import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    StatusBar,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

class RodrigoInfos extends Component {
    
    render() {
        return (
       <View style={styles.container}>
           <StatusBar backgroundColor="#000" />
           <ScrollView scrollEventThrottle={16}>

           <View style={{height: 300, width: "100%", borderRadius: 10}}>
                      <View style={{flex: 4}}>
                      <Image source={require('../../assets/rodrigo.png')} 
                          style={{flex: 20, width: null, height: null, resizeMode: 'cover', borderRadius: 8}}
                        />
                    </View>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#fff', fontSize: 28, fontFamily: "Gilroy-Light"}}>Rodrigo Costa Souza</Text>
            </View>

            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
                <Text style={{color: '#fff', fontSize: 20, fontFamily: "Gilroy-Light", textAlign: 'center'}}> 
                    25 anos
                    {"\n"} 
                    {"\n"} 
                    Investigador particular
                </Text>
            </View>

            <View style={{alignContent: 'center', marginHorizontal: 10}}>
                <Text style={{color: '#fff', fontSize: 15, textAlign: 'justify', paddingBottom: 10, fontFamily: "canela_roman"}}>
                RODRIGO COSTA SOUZA Está nas forças Policiais militares desde os 17 anos de idade, por influências de seu pai, que por sua vez era tenente coronel (RICARDO OLIVEIRA SOUZA), que sempre foi extremamente rígido com o filho, chegava a ser ditatorialista e abusivo. Através de treinamentos físicos e psicológicos, estudos rigorosos, foi direcionado sem muitas escolhas para o caminho da lei.
                {"\n"}
                {"\n"}
                Desde cedo um prodígio, durante o ano da academia com ótimos resultados dos treinamentos físicos, teóricos, e em problemas investigativos. Aos 18 anos já atuava aptamente na força, e junto de seu parceiro que mais futuramente tornou-se também seu melhor amigo EDUARDO VIEIRA. Tinham resultados impressionantes de seus desempenhos que estavam cada vez melhores.
                {"\n"}
                {"\n"}
                Aos seus 20 anos, após uma agressão a MARCELO CARDOZO FREITAS, ele foi afastado da força indefinidamente. Desde então passou a atuar como investigador particular, e depois de 2 anos e meio tratando seu TRANSTORNO EXPLOSIVO IMINENTE, passou a atuar também, como consultor da polícia em casos extremos de modo omitido da mídia.
                {"\n"}
                {"\n"}
                </Text>
            </View>
           </ScrollView>
       </View>
       )
    }
}
export default RodrigoInfos;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flex: 10,
        justifyContent: 'center',
      },
      image: {
        height: 500,
        width: '100%',
        borderBottomWidth: 20,
        borderColor: '#fff'
      }
})

