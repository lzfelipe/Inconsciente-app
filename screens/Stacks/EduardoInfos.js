import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    StatusBar
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

class EduardoInfos extends Component {
    
    render() {
        return (
       <View style={styles.container}>
           <StatusBar backgroundColor="#000" />
           <ScrollView scrollEventThrottle={16}>

           <View style={{height: 300, width: "100%", borderRadius: 10}}>
                      <View style={{flex: 4}}>
                      <Image source={require('../../assets/elias.png')} 
                          style={{flex: 20, width: null, height: null, resizeMode: 'cover', borderRadius: 8}}
                        />
                    </View>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#fff', fontSize: 28, fontFamily: "Gilroy-Light", textAlign: 'center'}}>Eduardo Vieira</Text>
            </View>

            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
                <Text style={{color: '#fff', fontSize: 20, fontFamily: "Gilroy-Light", textAlign: 'center'}}> 
                20 anos
                {"\n"} 
                {"\n"} 
                Detetive do departamento da polícia militar</Text>
            </View>

            <View style={{alignContent: 'center', marginHorizontal: 10}}>
                <Text style={{color: '#fff', fontSize: 15, textAlign: 'justify', paddingBottom: 10, fontFamily: "canela_roman"}}>
                EDUARDO entrou na polícia militar com 18 anos, e em seu primeiro ano de academia conheceu RODRIGO COSTA SOUZA, que se tornaram melhores amigos. EDUARDO não foi um aluno exemplar como RODRIGO durante a academia, sempre foi um aluno mediano, suas notas em testes físicos não eram boas como em seus testes de problemas dedutivos ou psicológicos. EDUARDO era uma pessoa dedicada, foi se aperfeiçoando ao mesmo tempo que estreitava uma amizade e confiança com RODRIGO, confiança e amizade essas que se fortaleceram mais com os seus anos como parceiros servindo como oficiais em seu departamento.
                {"\n"}
                {"\n"}
                EDUARDO e RODRIGO trabalharam juntos por 4 anos, com o mesmo objetivo, de se tornarem Detetives do departamento de polícia militar, porem antes de alcançarem este objetivo, aos 20 anos RODRIGO é afastado da polícia devido a uma agressão a um detento recém apreendido, e EDUADO aos 24 anos, atinge seu cargo como Detetive. O contato de RODRIGO e EDUARDO se enfraqueceu durante este período, porem EDUARDO sempre manteve esse elo ligado.
                {"\n"}
                {"\n"}
                EDUARDO sempre foi uma pessoa muito dedicada e segura de si, muito envolvido com seu trabalho e sua família, esposo e filha, sempre preocupado com as pessoas ao seu redor, desde a adolescência teve este senso do que era certo dentro de si.
                {"\n"}
                {"\n"}
                </Text>
            </View>
           </ScrollView>
       </View>
       )
    }
}
export default EduardoInfos;

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

