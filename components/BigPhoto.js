import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as MediaLibrary from "expo-media-library";
import * as Sharing from 'expo-sharing';
import * as SecureStore from 'expo-secure-store';

class BigPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      uri: '',
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

  funShare = async () => {
    let url = this.props.route.params.uri
    if (!(await Sharing.isAvailableAsync())){
      console.log('afsfdasafd')
    }
    Sharing.shareAsync(url)
  }
  funDelete = async () => {
    await MediaLibrary.deleteAssetsAsync(this.props.route.params.id)
    this.props.navigation.goBack()
  }

  funUpload = async () => {
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
      uri: this.props.route.params.uri,
      type: 'image/jpeg',
      name: this.props.route.params.name
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

  render() {
    return (
      <View style={styles.vieww}>
        <Image resizeMode={'cover'} style={{...styles.img, height: this.props.route.params.height * 0.6, 
        width: this.props.route.params.width * 0.6}} source={{uri: this.props.route.params.uri}}></Image>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <View><TouchableOpacity onPress={() => this.funShare()}><Text style={styles.textt}>SHARE</Text></TouchableOpacity></View>
          <View><TouchableOpacity onPress={() => this.funDelete()}><Text style={styles.textt}>DELETE</Text></TouchableOpacity></View>
          <View><TouchableOpacity onPress={() => this.funUpload()}><Text style={styles.textt}>UPLOAD</Text></TouchableOpacity></View>
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
    vieww:{
      flex: 1,
      backgroundColor: '#5C88F2'
    },
    img:{
      margin: '7%',
      alignSelf: 'center',
      borderRadius: 15
    },
    textt:{
      fontSize: 25,
      margin: 15,
      marginTop: 30
    }
})

export default BigPhoto;
