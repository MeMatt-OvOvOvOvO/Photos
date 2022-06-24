import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native';
import BigPhoto from './BigPhoto';
import { Dimensions } from "react-native";
import * as MediaLibrary from "expo-media-library"


class PhotoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoList: [],
      photoUri: [],
      backColor: '',
      setVisible: 'false',
      disp: '',
      opac: 10,
      opacity: 1,
    };
  }
  showBigImg = async (id, uri) => {
    console.log('showBigImg')
    this.props.navigation.navigate("Wybrane zdjęcie", {id: id, uri: uri});
  }
  funCHangeColor() {
    if(this.state.setVisible == 'false'){
      this.setState({
        setVisible: 'true',
        backColor: '#945EDB',
        opac: 20,
        opacity: 0.17
      })
      console.log('true', this.state.setVisible)
    }else{
      this.setState({
        setVisible: 'false',       
      })
      console.log(this.state.setVisible)
    }
    
  }

  render() {
    return (
      <View style={{backgroundColor: this.state.backColor, opacity: this.state.opac, height: this.props.photoH, width: this.props.photoW, position: 'relative', zIndex: this.state.index}}>
        <ImageBackground style={{height: this.props.photoH, width: this.props.photoW}} source={require('../components/check.png')}>
        <TouchableOpacity 
        onPress={() => {this.props.navigation.navigate("Wybrane zdjęcie", 
          {id: this.props.id, name: this.props.name, uri: this.props.uri, height: Dimensions.get("window").height, width: Dimensions.get("window").width},
            console.log(this.props.id, this.props.uri))}}
            onLongPress={() => {this.props.selectSome(this.props.id, this.props.uri, this.props.name); this.funCHangeColor()}}
            >   
              <Image style={{height: this.props.photoH, width: this.props.photoW, opacity: this.state.opacity}} source={{uri: this.props.uri}} />     
        </TouchableOpacity>
        </ImageBackground>
      </View>   
    );
  }
}
const styles = StyleSheet.create({
  img:{
    
  },
  imageee:{
    color: '#945EDB',
    opacity: 5
  }
})

export default PhotoItem;
