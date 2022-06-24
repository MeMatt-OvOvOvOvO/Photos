import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
class Screen1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
        adress: ''
    };
  }


  render() {
    return (
        <TouchableOpacity 
            style={styles.touchable} 
            onPress={() => this.props.navigation.navigate("s2")}
        >
            <StatusBar animated={true} />
            {/* <View style={styles.vieww}>
                <Text style={styles.text1}>Photo App</Text>
                <Text style={styles.text2}>Mateusz Janicki</Text>
                <Text style={styles.text3}>3P1b</Text>
                <Text style={{...styles.textTakO, marginTop: 50}}> show gallery pictures </Text>
                <Text style={styles.textTakO}> delete photos from device </Text>
                <Text style={styles.textTakO}> share photoss </Text>
            </View> */}
            {/* <View style={styles.vieww}>
                <Text style={styles.text1}>Camera App</Text>
                <Text style={styles.text2}>Mateusz Janicki</Text>
                <Text style={styles.text3}>3P1b</Text>
                <Text style={{...styles.textTakO, marginTop: 50}}> take picture from camera </Text>
                <Text style={styles.textTakO}> save photo to device </Text>
                <Text style={styles.textTakO}> delete photos from device </Text>
            </View> */}
            <View style={styles.vieww}>
                <Text style={styles.text1}>Upload App</Text>
                <Text style={styles.text2}>Mateusz Janicki</Text>
                <Text style={styles.text3}>3P1b</Text>
                <Text style={{...styles.textTakO, marginTop: 40}}> upload photo </Text>
                <Text style={styles.textTakO}> upload photos </Text>
                <Text style={styles.textTakO}> use image picker </Text>
            </View>
        </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
    touchable:{
        flex: 1,
        backgroundColor: '#5C88F2',
    },
    vieww:{
        display:"flex", 
        justifyContent:'center', 
        alignItems:'center',
        marginTop: '50%'
    },
    text1:{
        alignSelf: 'center',
        fontSize: 60,
        fontWeight: 'bold'
    },
    text2:{
        alignSelf: 'center',
        fontSize: 35,
        fontWeight: 'bold',
        marginTop: '3%'
    },
    text3:{
        alignSelf: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: '3%'
    },
    textTakO:{
        alignSelf: 'center',
        marginTop: 10,
        fontSize: 17
    },
    textTakO1:{
        alignSelf: 'center',
        marginTop: 11,
        fontSize: 20
    },
    touch:{
        height: 50,
        width: 200,
        backgroundColor: '#945EDB',
        borderRadius: 15,
        alignSelf: 'center',
        marginTop: 20
    }
})
export default Screen1;
