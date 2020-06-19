import React,{useState,useEffect} from 'react'
import { View,StyleSheet,TouchableOpacity,Text,ScrollView,Image,Alert } from "react-native";

import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import MapView,{Marker} from 'react-native-maps'
import api from '../../services/api'
import Geolocation from '@react-native-community/geolocation';

import { SvgUri} from 'react-native-svg'

interface Item{
  id:number,
  title:string,
  image_url:string
}
interface Point{
  id:number,
  name:string,
  image:string,
  latitude:number,
  longitude:number,
 
}

const Points = () =>{
    const [items,setItems] = useState<Item[]>([]);
    const [points,setPoints] = useState<Point[]>([]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [initinalPosition, setInitinalPosition] = useState<[number,number]>([0,0]);
  
  
    useEffect(() =>{

      Geolocation.getCurrentPosition(info => setInitinalPosition([info.coords.latitude,info.coords.longitude]));

    },[])
    useEffect(()=>{
      api.get('items').then(response =>{
        setItems(response.data)
      })
    },[])

    useEffect(()=>{
        api.get('points',{
          params:{
            city:'São Luís',
            uf:'MA',
            items:[1,2]
          }
        }).then(resp=>{
          setPoints(resp.data)
        })
    },[])

     function handleSelectedItem(id:number){
      const alreadySelected = selectedItems.findIndex(iten => iten === id);
      if (alreadySelected >= 0) {
          const filteredItems = selectedItems.filter(iten => iten != id);
          setSelectedItems(filteredItems)
      } else {
          setSelectedItems([...selectedItems, id])

      }
  }
    const navigation = useNavigation();
    function handleNavigateHome(){
      navigation.navigate('Home')
    }
    function handleNavigateToDetails(id:number){
      navigation.navigate('Details',{point_id:id})
    }
    return (
        <>
            <View  style={styles.container}>
                <TouchableOpacity onPress={handleNavigateHome}>
                    <Icon name="arrow-left" size={20} color="#34cb79" />
                </TouchableOpacity>

                <Text style={styles.title}>Bem Vindo</Text>
                <Text style={styles.description}>Enconte no mapa um ponto de coleta</Text>

                <View style={styles.mapContainer}>
                     <MapView style={styles.map} initialRegion={{latitude:initinalPosition[0],longitude:initinalPosition[1],latitudeDelta:0.014,longitudeDelta:0.014}}>
                       {points.map(point=>(
                          <Marker key={String(point.id)} onPress={()=>handleNavigateToDetails(point.id)} style={styles.mapMarker} coordinate={{latitude:Number(point.latitude),longitude: Number( point.longitude)}}>
                          <View style={styles.mapMarkerContainer}>
                             <Image  style={styles.mapMarkerImage} source={{uri:point.image}} />
                       <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                          </View>
                        </Marker>
                       ))}
                     </MapView>
                </View>
            </View>
            <View style={styles.itemsContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal:20}}>
                    
                    {items.map(item =>(
                        <TouchableOpacity activeOpacity={0.7} key={String(item.id)} style={[styles.item,selectedItems.includes(item.id)?styles.selectedItem:{}]} onPress={()=>handleSelectedItem(item.id)} >
                        <SvgUri width={42} height={42} uri={item.image_url}/>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                      </TouchableOpacity>
                    ))}
               </ScrollView>
            </View>
            </>
            )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 32,
      paddingTop: 30,
    },
  
    title: {
      fontSize: 20,
      fontFamily: 'Ubuntu_700Bold',
      marginTop: 24,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 4,
      fontFamily: 'Roboto_400Regular',
    },
  
    mapContainer: {
      flex: 1,
      width: '100%',
      borderRadius: 10,
      overflow: 'hidden',
      marginTop: 16,
    },
  
    map: {
      width: '100%',
      height: '100%',
    },
  
    mapMarker: {
      width: 90,
      height: 80, 
    },
  
    mapMarkerContainer: {
      width: 90,
      height: 70,
      backgroundColor: '#34CB79',
      flexDirection: 'column',
      borderRadius: 8,
      overflow: 'hidden',
      alignItems: 'center'
    },
  
    mapMarkerImage: {
      width: 90,
      height: 45,
      resizeMode: 'cover',
    },
  
    mapMarkerTitle: {
      flex: 1,
      fontFamily: 'Roboto_400Regular',
      color: '#FFF',
      fontSize: 13,
      lineHeight: 23,
    },
  
    itemsContainer: {
      flexDirection: 'row',
      marginTop: 16,
      marginBottom: 32,
    },
  
    item: {
      backgroundColor: '#fff',
      borderWidth: 2,
      borderColor: '#eee',
      height: 120,
      width: 120,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingTop: 20,
      paddingBottom: 16,
      marginRight: 8,
      alignItems: 'center',
      justifyContent: 'space-between',
  
      textAlign: 'center',
    },
  
    selectedItem: {
      borderColor: '#34CB79',
      borderWidth: 2,
    },
  
    itemTitle: {
      fontFamily: 'Roboto_400Regular',
      textAlign: 'center',
      fontSize: 13,
    },
  });
export default Points