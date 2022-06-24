import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, TextInput } from 'react-native';
import { Dimensions } from "react-native"
import * as MediaLibrary from "expo-media-library"
import PhotoItem from './PhotoItem';
import * as Device from 'expo-device';
import * as SecureStore from 'expo-secure-store';

class Screen2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
        flatListRows: 1,
        photoList: [],
        photoH: Dimensions.get("window").height / 5,
        photoW: Dimensions.get("window").width,
        arr: [],
        arrUpload: [],
        arrHelp: [],
    };
    this.componentDidMount()
    this.props.navigation.addListener("focus", () => {this.componentDidMount()})
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

  funChangeRows = async () => {
    if(this.state.flatListRows == 1){
      this.setState({
        flatListRows: 5,
        photoH: Dimensions.get("window").height / 6,
        photoW: Dimensions.get("window").width / 5
      })

    }else{
      this.setState({
        flatListRows: 1,
        photoH: Dimensions.get("window").height / 5,
        photoW: Dimensions.get("window").width
      })
    }
    while(this.state.arr.length > 0){
      this.state.arr.pop()
    }
    while(this.state.arrUpload.length > 0){
      this.state.arrUpload.pop()
    }
  }
  componentDidMount = async () => {
      let { status } = await MediaLibrary.requestPermissionsAsync()
      if (status !== 'granted') {
          alert('brak uprawnień do czytania image-ów z galerii')
      }
      let album = await MediaLibrary.getAlbumAsync("DCIM")
      let obj = await MediaLibrary.getAssetsAsync({
          album: album,
          first: 100,           // ilość pobranych assetów
          mediaType: 'photo'    // typ pobieranych danych, photo jest domyślne
      })
      let photoList =  JSON.stringify(obj.assets, null, 4)
      photoList = JSON.parse(photoList)
      if(Device.brand == 'Apple'){
        photoList
      }else{
        photoList.reverse()
      }
      this.setState({
        photoList: photoList
      })
    // console.log('photolist',this.state.photoList)
    // console.log('arr',this.state.arr)
    // console.log('arrUpload',this.state.arrUpload )

  }
  showBigImg = async (id, uri) => {
    // console.log('id', id, uri)
    this.props.navigation.navigate("Wybrane zdjęcie", {id: id, uri: uri});
  }

  funOpenCamera = async () => {
    // console.log(Dimensions.get("window").height)
    this.props.navigation.navigate("Camera");
  }

  funSelectSome = async (id, uri, name) => {
    console.log('id',id)
    console.log('uri i name',uri, name)
    if(!this.state.arr.includes(id)){
      this.state.arr.push(id)
    }

    let myObj = {}
    myObj.id = id
    myObj.name = name
    myObj.uri = uri
    
    console.log('myObj',myObj)
    if(this.state.arrUpload)
    this.state.arrUpload.push(myObj)
    
    console.log('arrUpload',this.state.arrUpload)
    console.log('arrHelp',this.state.arrHelp)
  }


  funRemoveSel = async () => {
    // console.log('remove')
    while(this.state.arr.length > 0){
      await MediaLibrary.deleteAssetsAsync(this.state.arr[0])
      this.state.arr.shift()
    }
    // console.log(this.state.arr)
    this.componentDidMount()
  }

  funUploadSel = async () => {
    // console.log(this.state.arrUpload)
    if(this.state.arrUpload.length === 0){
      alert('Select pictures!!')
    }else{
      let secStData = JSON.parse(await this.getItem('allKeys'))
      // console.log('asdfasdf', secStData)
      let aadressIP = secStData.adressIp.toString()
      let pport = secStData.port.toString()
      //console.log('IP and port', aadressIP, pport)
  
      this.setState({ ip: aadressIP})
  
      if(this.state.ip === ''){
        alert('Ustaw IP i port')
      }


      // for(let a = 0; a <= this.state.arrUpload.length; a++){
      //   if(!this.state.arrUpload[a].includes(id)){
      //     this.state.arrHelp.push(id)
      //   }
      // }

      const data = new FormData();

      for(let m of this.state.arrUpload){
        data.append('photo', {
          uri: m.uri,
          type: 'image/jpeg',
          name: m.name
        });
      }

      try{
        await fetch('http://' + aadressIP + ':' + pport + "/upload", {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data;',
        },
      });
  
      alert('Gallery- all files uploaded and saved!')

      while(this.state.arrUpload.length > 0){
        this.state.arrUpload.pop()
      }
      }catch (e){
        alert('Gallery- something wrong!!!')
        // console.error(e)
      }
    }
  }

  funOpenSet = async () => {
    this.props.navigation.navigate("Settingss");
  }

  render() { 
    return (
      <View style={styles.vieww}>
        <View style={styles.viewww}>
          <TouchableOpacity style={styles.butekLayout}
              onPress={() => this.funChangeRows()}>
            <Text style={styles.textTou}>Grid/List</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.butekLayout}
              onPress={() => this.funOpenCamera()}>
            <Text style={styles.textTou}>Open camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.butekLayout}
              onPress={() => this.funRemoveSel()}>
            <Text style={styles.textTou}>Remove selected</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.butekLayout}
              onPress={() => this.funUploadSel()}>
            <Text style={styles.textTou}>Upload selected</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.butekLayout}
              onPress={() => this.funOpenSet()}>
            <Text style={styles.textTou}>Set</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.flatview}>
          <FlatList
            data={
              this.state.photoList
            } 
            style={styles.flatt}
            numColumns={this.state.flatListRows}
            key={this.state.flatListRows}
            renderItem={({ item }) => 
              <PhotoItem 
                id={item.id}
                uri={item.uri}
                name={item.filename}
                photoW={this.state.photoW}
                photoH={this.state.photoH}
                navigation={this.props.navigation}
                selectSome={this.funSelectSome}
              /> 
            }
          />
        </View>
        
      </View>
    );
  }
}
const styles = StyleSheet.create({
    vieww:{
        flex: 1,
        backgroundColor: '#5C88F2',
        alignItems: 'center'
    },
    flatt:{
      marginBottom: 52,
    },
    flatview:{
      width: '100%'
    },
    butekLayout:{
      flexDirection: 'column',
      height: 40,
      width: '17%',
      margin: 6,
      backgroundColor: '#344CFF',
      borderRadius: 10,
      display:"flex", 
      justifyContent:'center', 
      alignItems:'center',
    },
    shadow:{
      shadowOffset:{width:120, height:120},
      shadowOpacity: 0.9,
      shadowRadius: 10,
      shadowColor: 'red'
    },
    butekLayout1:{
      flexDirection: 'column',
      height: 40,
      margin: 6,
      width: '30%',
      backgroundColor: '#344CFF',
      borderRadius: 10,
    },
    textTou:{
      alignSelf: 'center',
      alignContent: 'center',
      fontSize: 13
    },
    textTou1:{
      alignSelf: 'center',
      marginTop: -1
    },
    viewww:{
      flexDirection: 'row'
    }
})

export default Screen2;
