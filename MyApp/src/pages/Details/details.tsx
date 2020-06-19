import React,{useEffect,useState} from 'react'
import { View,StyleSheet,Text,TouchableOpacity, Image, Linking } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation,useRoute } from "@react-navigation/native";
import api from '../../services/api'
import email from 'react-native-email'
interface Params {
  point_id:number
}
interface Data{
  resposta:{
    image:string;
    name:string;
    email:string;
    whatsapp:string;
    city:string;
    uf:string;
  };

  items:{
    title:string;
  }[];
}
const Details = () =>{
    const [data,setData] = useState<Data>({} as Data)
    const navigation = useNavigation();
    const route =useRoute()
    const routParams = route.params as Params;

    useEffect(()=>{
      api.get(`points/${routParams.point_id}`).then(response=>{
        console.log(response.data)
        setData(response.data)
      })
    },[])
    function handleEmail (){
      const to = data.resposta.email// string or array of email addresses
      email(to, {
          // Optional additional arguments

          subject: 'Show how to use',
          body: 'Some body right here'
      }).catch(console.error)
  }
    function handleWhatsapp(){
      Linking.openURL(`whatsapp://send?phone=${data.resposta.whatsapp}&text=Tenho interesse na coleta dos Residuos`)
    }
    
    function handleNavigateBack(){
        navigation.navigate('Points')

    }
    if(!data.resposta){
      return null
    }
    return (
        <>
             <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Icon name="arrow-left" size={20} color="#34cb79" />
                 </TouchableOpacity>
                    <Image style={styles.pointImage} source={{uri:data.resposta.image}} />
                     <Text style={styles.pointName}>{data.resposta.name}</Text>
                    <Text style={styles.pointItems}>{data.items.map(item=> item.title).join(', ')}</Text>
                    <View style={styles.address}>
                        <Text style={styles.addressTitle}>Endereços</Text>
                        <Text style={styles.addressContent}>{data.resposta.city}, {data.resposta.uf}</Text>
                    </View>
                    
             </View>    
             <View style={styles.footer}>
                        <RectButton onPress={handleWhatsapp} style={styles.button}>
                            <FontAwesome name="whatsapp" size={20} color="#fff" />
                            <Text style={styles.buttonText}>Whatsapp</Text>
                        </RectButton>
                        <RectButton onPress={handleEmail} style={styles.button}>
                            <Icon name="mail" size={20} color="#fff" />
                            <Text style={styles.buttonText}>E-mail</Text>

                        </RectButton>
                    </View>
             </>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
      paddingTop: 30,
    },
  
    pointImage: {
      width: '100%',
      height: 120,
      resizeMode: 'cover',
      borderRadius: 10,
      marginTop: 32,
    },
  
    pointName: {
      color: '#322153',
      fontSize: 28,
      fontFamily: 'Ubuntu_700Bold',
      marginTop: 24,
    },
  
    pointItems: {
      fontFamily: 'Roboto_400Regular',
      fontSize: 16,
      lineHeight: 24,
      marginTop: 8,
      color: '#6C6C80'
    },
  
    address: {
      marginTop: 32,
    },
    
    addressTitle: {
      color: '#322153',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    },
  
    addressContent: {
      fontFamily: 'Roboto_400Regular',
      lineHeight: 24,
      marginTop: 8,
      color: '#6C6C80'
    },
  
    footer: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: '#999',
      paddingVertical: 20,
      paddingHorizontal: 32,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    
    button: {
      width: '48%',
      backgroundColor: '#34CB79',
      borderRadius: 10,
      height: 50,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      marginLeft: 8,
      color: '#FFF',
      fontSize: 16,
      fontFamily: 'Roboto_500Medium',
    },
  });
export default Details