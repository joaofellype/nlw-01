import React,{useState,useEffect} from 'react'
import { View, Image,StyleSheet,Text,ImageBackground,TextInput } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { RectButton } from "react-native-gesture-handler";
import axios from 'axios'
import RNPickerSelect from 'react-native-picker-select';

import { useNavigation } from "@react-navigation/native";

interface IbgeResponseUf{
  sigla:string,
  id:number
}
interface IbgeResponseCity{
  nome:string,
  id:number
}
interface SelectUf{
  label:string,
  value:string
}
interface SelectCity{
  label:string,
  value:string
}
const Home =()=>{
  const [uf,setUf] =useState<SelectUf[]>([])
  const [city,setCity] =useState<SelectCity[]>([])
  const [selectUf,setSelectUf] = useState('')
  const navigation = useNavigation();
  
  useEffect(()=>{
    axios.get<IbgeResponseUf[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const ufInitinal= response.data.map(function(uf){
        return {label:uf.sigla,value:uf.sigla}
      })
      setUf(ufInitinal)

    
  })
  
  },[])
  useEffect(() => {

    if (selectUf === '0') {
        return;
    }
    
    axios.get<IbgeResponseCity[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectUf}/municipios`).then(response => {

         const cityNames = response.data.map(function(cidade){
           return {label:cidade.nome,value:cidade.nome}
         });
         setCity(cityNames)
    })


}, [selectUf]);
  function handleNavigatePoints(){
    navigation.navigate('Points')
  }
  function handleChangeSelectUf(event:string){
    setSelectUf(event)
  }
    return (
    <ImageBackground 
         style={styles.container}
         source={require('../../../assets/home-background.png')}
         imageStyle={{width:274,height:368}}
                                         >
        <View style={styles.main}>
        <Image source={require('../../../assets/logo.png')} />
        <View>
        <Text style={styles.title}>Seu MarktePlace  de coleta de resíduos</Text>
        <Text style={styles.description}>Ajudamos pessoas  a encontrarem  pontos de Coleta de forma Eficente</Text>
        </View>
        </View>
      <View style={styles.footer}>
      
          <RNPickerSelect 
            onValueChange={(value)=>handleChangeSelectUf(value)}
            
            items={uf}
          />
          <RNPickerSelect 
            onValueChange={(value)=>console.log('hgh')}
            
            items={city}
          />
          
        
         <RectButton 
            style={styles.button}
            onPress={handleNavigatePoints}>
              <View style={styles.buttonIcon}>
                  <Text>
                    <Icon name="arrow-right" color="#fff" size={24} />
                  </Text>
              </View>
              <Text style={styles.buttonText}>Entrar</Text>
         </RectButton>
      </View>
    </ImageBackground>)
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
    },
  
    title: {
      color: '#322153',
      fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
      maxWidth: 260,
      marginTop: 64,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
      fontFamily: 'Roboto_400Regular',
      maxWidth: 260,
      lineHeight: 24,
    },
  
    footer: {},
  
    select: {},
  
    input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },
  
    button: {
      backgroundColor: '#34CB79',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },
  
    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    }
  });
export default Home;