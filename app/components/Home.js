import React, {Component} from "react";
import {Alert, View, Button, AsyncStorage, Platform, PermissionsAndroid} from "react-native";
import AddBag from "./AddBag";
import Battery from "./Battery";
import BleManager from "react-native-ble-manager";

export default class Home extends Component {
    constructor() {
        super();
        this.state = {bleVisible: false, bag: null, connected: false}
    }

    setBleVisible(visible) {
        this.setState({bleVisible: visible})
    }

    componentDidMount() {
        AsyncStorage.getItem('bag').then(result => {
            if (result) this.setBag(JSON.parse(result));
        });
        BleManager.start({showAlert: false});
        if (Platform.OS === 'android') {
            BleManager.enableBluetooth();
            if (Platform.Version >= 23)
                PermissionsAndroid.checkPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then(result => {
                    if (!result)
                        PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
                });
        }
    }

    setBag(bag) {
        this.setState({bag: bag});
        BleManager.connect(bag.id)
            .then((peripheralInfo) => {
                Alert.alert('Info', JSON.stringify(peripheralInfo));
                this.setState({connected: true})
            })
            .catch(error => Alert.alert('Error', error));
        AsyncStorage.setItem('bag', JSON.stringify(bag));
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Battery connected={this.state.connected}/>
                <Button onPress={() => this.setState({bleVisible: true})}
                        color='green'
                        title={this.state.bag ? 'Change bag' : 'Add a bag'}/>
                <AddBag visible={this.state.bleVisible}
                        setVisible={this.setBleVisible.bind(this)}
                        setBag={this.setBag.bind(this)}/>
            </View>
        );
    }
}