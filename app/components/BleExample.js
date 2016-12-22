import React, {Component} from 'react';
import {ListView, View, Text, Platform, PermissionsAndroid, Button, NativeAppEventEmitter} from 'react-native';
import BleManager from 'react-native-ble-manager';
import Row from './Row';
import Separator from './Separator';

export default class BleExample extends Component {
    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {scanning: false, logs: '', dataSource: ds.cloneWithRows([]),}
    }

    componentDidMount() {
        BleManager.start({showAlert: false}).then(() => this.log('Module initialized'));
        this.endScan = this.endScan.bind(this);
        NativeAppEventEmitter.addListener('BleManagerStopScan', this.endScan);
        if (Platform.OS === 'android') {
            BleManager.enableBluetooth()
                .then(() => this.log('The bluetooh is already enabled or the user confirm'))
                .catch(error => this.log('The user refuse to enable bluetooth' + error));
            if (Platform.Version >= 23)
                PermissionsAndroid.checkPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then(result => {
                    if (result) this.log("Permission is OK");
                    else PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then(result => {
                        if (result) this.log("User accept");
                        else this.log("User refuse");
                    });
                });
        }
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <Row text={rowData.id}/>
        );
    }

    log(log) {
        this.setState({logs: this.state.logs + ' ' + log})
    }

    scan() {
        this.setState({scanning: true});
        BleManager.scan([], 10, true);
    }

    endScan() {
        BleManager.getDiscoveredPeripherals([]).then(peripherals => this.setState({
            dataSource: this.state.dataSource.cloneWithRows(peripherals)
        }));
        this.setState({scanning: false});
    }

    render() {
        return (
            <View>
                <Button title='Scan' disabled={this.state.scanning} onPress={() => this.scan()}/>
                <ListView dataSource={this.state.dataSource}
                          renderRow={this.renderRow.bind(this)}
                          enableEmptySections={true}
                          renderSeparator={Separator.render}/>
                <Text>{this.state.logs}</Text>
            </View>
        );
    }
}