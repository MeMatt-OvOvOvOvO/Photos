import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Dimensions } from "react-native"
import { ToastAndroid } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';

class CircleButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
        type: this.props.type,
        ip: ''
    };
  }
  async saveItem(key, value){
    await SecureStore.setItemAsync(key, value);
  }
  
  async getItem(key){
    return await SecureStore.getItemAsync(key);
  }
  
  async deleteItem(key){
    await SecureStore.deleteItemAsync(key);
  }
  funPicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
   });
   
   if (!result.cancelled) {
   
    let secStData = JSON.parse(await this.getItem('allKeys'))
    console.log('asdfasdf', secStData)
    let aadressIP = secStData.adressIp.toString()
    let pport = secStData.port.toString()
    //console.log('IP and port', aadressIP, pport)

    this.setState({ ip: aadressIP})

    if(this.state.ip === ''){
      alert('Ustaw IP i port')
    }

    const data = new FormData();

    data.append('photo', {
      uri: result.uri,
      type: 'image/jpeg',
      name: result.uri
    });
    //console.log('photoData', data)

    try{
      await fetch('http://' + aadressIP + ':' + pport + "/upload", {
      method: 'POST',
      body: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data;',
      },
    });

      alert('Photo- file uploaded and saved!')
    }catch (e){
      alert('Photo- something wrong!!!')
      console.error(e)
    }        
   }
  }

  render() {
    return (
      <View>
        <TouchableOpacity style={{...styles.circle11, marginTop: Dimensions.get("window").height - (0.35 * Dimensions.get("window").height)}} 
            onPress={() => this.props.doPhoto()}>
            <Image style={styles.circle1} source={require('../components/plusCircle.png')}></Image>
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.circle22, marginLeft: '10%',
            marginTop: Dimensions.get("window").height - (1.08 * Dimensions.get("window").height)}} 
            onPress={() => this.props.changeType()}>
            <Image style={styles.circle2} source={require('../components/rotateCamera.png')}></Image>
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.circle33, marginTop: Dimensions.get("window").height - (1.084 * Dimensions.get("window").height),
        marginLeft: Dimensions.get("window").width - (0.26 * Dimensions.get("window").width)}}
        onPress={() => this.funPicker()}
        >
          <Image style={styles.circle3} source={require('../components/edit.png')}></Image>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    circle1:{
        height: 120,
        width: 120,
    },
    circle11:{
        alignSelf: 'center',
        backgroundColor: '#945EDB',
        borderRadius: 60
    },
    circle2:{
        height: 60,
        width: 60,
    },
    circle22:{
        backgroundColor: '#945EDB',
        borderRadius: 60,
        width: 60,
        height: 60
    },
    circle3:{
      height: 60,
      width: 60,
      alignSelf: 'center'
    },
    circle33:{
      backgroundColor: '#945EDB',
      borderRadius: 60,
      width: 60,
      height: 60
  },
})

export default CircleButtons;
