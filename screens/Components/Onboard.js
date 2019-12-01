import React, { Component } from "react";
import { 
    View,
    StatusBar,
    Text,
    Image,
    Alert,
    TouchableOpacity
} from "react-native";
import Onboarding from 'react-native-onboarding-swiper';
import Icon from 'react-native-vector-icons/Ionicons';



class Onboard extends Component {
    
    render() {
        const Done = ({...props }) => (
            <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('Inicio')}
            style={{backgroundColor: '#000', marginRight: 20, borderRadius: 5, padding: 8}}>
                            <Text style={{color: '#fff', textAlign: 'center', fontFamily: 'Gilroy-Light'}}>Começar!</Text>
            </TouchableOpacity>
          );

        return (
            <Onboarding
            showDone={true}
            DoneButtonComponent={Done}
            showSkip={false}
            nextLabel={<Icon name={'md-arrow-forward'} size={30} color={'#000'}/>}
            pages={[
                {
                    backgroundColor: '#fff',
                    image: ( <View style={styles.containerImg}>
                    <Image style={styles.img} resizeMode={'contain'} resizeMethod={'resize'} source={require('../../assets/video.jpg')} />
                    </View> ) ,
                    title: <Text style={styles.title}>Assista os Episódios</Text>,
                    subtitle: <Text style={styles.subtitle}>Acesse nosso canal no youtube, e assista os episódios!</Text>,
                },
                {
                    backgroundColor: '#fff',
                    image: ( <View style={styles.containerImg}>
                        <Image style={styles.img} resizeMode={'contain'} resizeMethod={'resize'} source={require('../../assets/postit.png')} />
                        </View> ) ,
                    title: <Text style={styles.title}>Ache os itens indicados</Text>,
                    subtitle: <Text style={styles.subtitle}>Os itens estarão espalhados durante as cenas dos episódios, anote o tempo em que os viu e insira de acordo com os que serão solicitados para liberar os desafios.</Text>,
                },
                {
                    backgroundColor: '#fff',
                    image: ( <View style={styles.containerImg}>
                        <Image style={styles.img} resizeMode={'contain'} resizeMethod={'resize'} source={require('../../assets/completed.png')} />
                        </View> ) ,
                    title: <Text style={styles.title}>Complete os desafios</Text>,
                    subtitle: <Text style={styles.subtitle}>A cada item que você achar, você terá que resolver um enigma para completar o desafio.</Text>,
                },
                {
                    backgroundColor: '#fff',
                    image: ( <View style={styles.containerImg}>
                        <Image style={styles.img} resizeMode={'contain'} resizeMethod={'resize'} source={require('../../assets/unlocked.png')} />
                        </View> ) ,
                    title: <Text style={styles.title}>Libere o conteúdo adicional</Text>,
                    subtitle: <Text style={styles.subtitle}>Ao completar todos os desafios do episódio, você liberará um segredo que te ajudará a desvendar os mistérios da série junto com o protagonista!</Text>,
                }
                ]}
                
            >
            <StatusBar backgroundColor="#fff" />
            </Onboarding>

        );
    }
}
export default Onboard;

const styles = {
    containerImg: {
        height: 200, 
        marginBottom: '-5%',
        marginTop: '-30%' ,
        alignItems: 'baseline', 
        justifyContent: 'flex-start'
    },
    img: {
        height: 200
    },
    title: {
        fontFamily: 'Gilroy-ExtraBold',
        fontSize: 25,
        textAlign: 'center',
        color: '#000'
    },
    subtitle: {
        fontFamily: 'canela_roman',
        fontSize: 18,
        textAlign: 'center',
        color: '#000',
        marginHorizontal: 10
    }
}