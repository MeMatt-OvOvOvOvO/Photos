import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Camera } from "expo-camera";
import CircleButtons from './CircleButtons';
import * as MediaLibrary from "expo-media-library"
import { ToastAndroid } from "react-native"
import * as Device from 'expo-device';

class CameraScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        hasCameraPermission: null,         // przydzielone uprawnienia do używania kamery
        type: Camera.Constants.Type.back,  // typ kamery
        onePhotoUri: '',
        visibleModal: 'flex',
        index: -2
    };
  }
  componentDidMount = async () => {
    let { status } = await Camera.requestCameraPermissionsAsync();
    this.setState({ hasCameraPermission: status == 'granted' });
  }

  funRotateCamera = async () => {
    this.setState({
        type: this.state.type === Camera.Constants.Type.back
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back,
    })
  }
  funHidePhoto = async () => {
    this.setState({ index: 2 })
    setTimeout(() => {
        this.setState({ visibleModal: 'none', index: -2});
        }, 3000) // 3 seconds
    if(this.state.visibleModal == 'none'){
        this.setState({ visibleModal: 'flex' })
    }
  }

  funDoPhoto = async () => {
    if (this.camera) {
        let foto = await this.camera.takePictureAsync();
        let asset = await MediaLibrary.createAssetAsync(foto.uri);
            // alert(JSON.stringify(asset, null, 4))
            var someInfo = JSON.stringify(asset, null, 4)
            someInfo = JSON.parse(someInfo)
            var uri = someInfo.uri
            this.setState({
                onePhotoUri: uri,
            })
            this.funHidePhoto()
            console.log(this.state.onePhotoUri)  
    }
  }
  

  render() {
    const { hasCameraPermission } = this.state; // podstawienie zmiennej ze state
    if (hasCameraPermission == null) {
        return <View />;
    } else if (hasCameraPermission == false) {
        return <Text>brak dostępu do kamery</Text>;
    } else {
        return (
            <View style={{ flex: 1 }}>
                <Image style={{height: 140, width: 110, position: 'absolute', zIndex: this.state.index, alignSelf: 'center', marginTop: '5%', display: this.state.visibleModal}} source={{uri: this.state.onePhotoUri}}/>
                <Camera
                    ref={ref => {
                        this.camera = ref; // Uwaga: referencja do kamery używana później
                    }}
                    style={{ flex: 1 }}
                    type={this.state.type}>
                    <View style={{ flex: 1 }}>
                        <CircleButtons 
                            doPhoto={this.funDoPhoto}
                            changeType={this.funRotateCamera}
                        />
                    </View>
                </Camera>
            </View>
        );
    }
}
}

export default CameraScreen;
