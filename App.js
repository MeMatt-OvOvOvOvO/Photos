import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Settings, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Screen1 from "./components/Screen1"
import Screen2 from "./components/Screen2"
import PhotoItem from './components/PhotoItem';
import BigPhoto from './components/BigPhoto';
import CameraScreen from './components/CameraScreen';
import Settingss from './components/Settingss';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="s1" component={Screen1} 
            options={{
              title: 'screen1',
              headerShown: false,
              headerTintColor: '#ffffff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              
            }}
            
            />
            <Stack.Screen name="s2" component={Screen2} 
            options={{
              headerStyle:{
                backgroundColor: '#945EDB'
              }}
            } />    
            <Stack.Screen name="Wybrane zdjęcie" component={BigPhoto}
            options={{
              headerStyle:{
                backgroundColor: '#945EDB'
              }}
            }/>       
            <Stack.Screen name="Camera" component={CameraScreen}
            options={{
              headerStyle:{
                backgroundColor: '#945EDB'
              }}
            }/>  
            <Stack.Screen name="Settingss" component={Settingss}
            options={{
              headerStyle:{
                backgroundColor: '#945EDB'
              }}
            }/>   
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
