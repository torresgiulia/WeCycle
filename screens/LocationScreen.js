//REACT
import { Text, View, StyleSheet } from "react-native";
import { useEffect, useState, useRef } from "react";

//LOCATION
import { requestForegroundPermissionsAsync, getLastKnownPositionAsync, watchPositionAsync, LocationAccuracy } from 'expo-location';
import MapView, {Marker} from "react-native-maps";

//FIREBASE
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";


const LocationScreen = () => {
    const [currentPosition, setCurrentPosition] = useState(null);
    const [markers, setMarkers] = useState([])
    const mapRef = useRef(MapView);
  
    async function requestLocationPermission() {
      const { granted } = await requestForegroundPermissionsAsync();
  
      if (granted) {
        const lastKnownPosition = await getLastKnownPositionAsync();
        setCurrentPosition(lastKnownPosition);
        console.log(lastKnownPosition);
      }
    }
    //request permission
    useEffect(() => {
      requestLocationPermission();
    }, []);
    //watch movement
    useEffect(()=>{
        watchPositionAsync({
            accuracy: LocationAccuracy.Highest,
            timeInterval: 1000,
            distanceInterval: 1
        }, (response) => {
            setCurrentPosition(response);
            mapRef.current?.animateCamera({
                center: response.coords
            })
        })
    }, [])

    useEffect(() => {            
      getEcopontos();
    }, []);

    const getEcopontos = async () => {
      console.log("location");
      const ecopontoRef = collection(db, "ecopontos");
      const ecoData = await getDocs(ecopontoRef);
      setMarkers(ecoData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
  
    return (
      <View style={styles.container}>
        {currentPosition && (
          <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: currentPosition.coords.latitude,
            longitude: currentPosition.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            coordinate={{
              latitude: currentPosition.coords.latitude,
              longitude: currentPosition.coords.longitude,
            }}
          />
          {markers.map((data, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: data.latitude,
                longitude: data.longitude,
              }}
              // title="Marker Title"
              // description="Marker Description"
              pinColor="green"
            />
          ))}
        </MapView>
        )}
      </View>
    );
  };
  

export default LocationScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'top',
  },
  map:{
    marginTop: '10%',
    width: '90%',
    height:'80%'
  }
});
