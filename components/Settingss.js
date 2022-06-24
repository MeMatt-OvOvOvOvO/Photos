import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Dialog from "react-native-dialog";
import * as SecureStore from 'expo-secure-store';
import * as WebBrowser from 'expo-web-browser';

class Settingss extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      adressIp: '',
      port: '',
      sSAdressIP: [],
      result: null,
      keyTab: []
    };
    this.first()
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

  showDialog = () => {
    this.setState({ visible: true})
  };

  handleCancel = () => {
    this.setState({ visible: false})
  };

  handleSave = async () => {
    let keyTab = await this.getItem('allKeys')
    keyTab = JSON.parse(keyTab)
    const someData = {
      adressIp: this.state.adressIp,
      port: this.state.port
    }
    console.log('stringify', JSON.stringify(someData))
    console.log('bez stringify', someData)
    await this.saveItem('allKeys', JSON.stringify(someData))
    console.log("JSON.stringify(someData)", someData)
    this.setState({ visible: false})
  };

  first = async () => {
    let secSStData = JSON.parse(await this.getItem('allKeys'))
    console.log('asdfasdf', secSStData)
    let aadressIP = secSStData.adressIp.toString()
    let pport = secSStData.port.toString()
    this.setState({
      adressIp: aadressIP,
      port: pport,
    })
  }

  _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync('https://' + this.state.adressIp + ':' + this.state.port);
    this.setState({result: result})
  };

  render() {
    return (
      <View style={styles.container}>
       <View style={styles.marginTopp}>
         <Text style={styles.centerr}>Obecnie zapisane IP to:</Text>
         <Text style={styles.centerr}>{this.state.adressIp}</Text>
         <Text style={styles.centerr}>Obecnie zapisany PORT to:</Text>
         <Text style={styles.centerr}>{this.state.port}</Text>
       </View>
       <TouchableOpacity onPress={this.showDialog} style={styles.touch}>
         <Text style={styles.textt}>Ustaw dane</Text>
       </TouchableOpacity>


       <View>
        <TouchableOpacity onPress={this._handlePressButtonAsync} style={styles.touch2}>
         <Text style={styles.textt}>Przegladarka</Text>
        </TouchableOpacity>
        <Text>{this.state.result && JSON.stringify(this.state.result)}</Text>
      </View>


       <Dialog.Container visible={this.state.visible}>
         <Dialog.Title>Ustaw IP i PORT</Dialog.Title>
         <Dialog.Input label='Adress IP' onChangeText={(adressIp) => this.setState({ adressIp: adressIp})} />
         <Dialog.Input label='PORT' onChangeText={(port) => this.setState({ port: port})} />
         <Dialog.Button label="Cancel" onPress={this.handleCancel} />
         <Dialog.Button label="Save" onPress={this.handleSave} />
       </Dialog.Container>
     </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5C88F2',
    alignItems: "center",
  },
  touch:{
    backgroundColor: '#945EDB',
    height: 50,
    width: 120,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40
  },
  touch2:{
    backgroundColor: '#945EDB',
    height: 35,
    width: 120,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 120
  },
  marginTopp:{
    marginTop: 20,
  },
  centerr:{
    alignSelf: "center",
    marginTop: 10,
    }
});

export default Settingss;
