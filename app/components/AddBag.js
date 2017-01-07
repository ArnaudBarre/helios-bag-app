import React, {Component} from "react";
import {ListView, View, Text, Button, NativeAppEventEmitter} from "react-native";
import BleManager from "react-native-ble-manager";
import FullModal from "./FullModal";
import Row from "./Row";
import Separator from "./Separator";

export default class AddBag extends Component {
    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {scanning: false, dataSource: ds.cloneWithRows([]),}
    }

    componentDidMount() {
        this.endScan = this.endScan.bind(this);
        NativeAppEventEmitter.addListener('BleManagerStopScan', this.endScan);
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <Row text={rowData.name} rowPress={() => {
                this.props.setBag(rowData);
                this.props.setVisible(false);
            }}/>
        );
    }

    scan() {
        this.setState({scanning: true});
        BleManager.scan([], 5, true);
    }

    endScan() {
        BleManager.getDiscoveredPeripherals([]).then(peripherals =>
            this.setState({dataSource: this.state.dataSource.cloneWithRows(peripherals)}));
        this.setState({scanning: false});
    }

    render() {
        return (
            <FullModal visible={this.props.visible}
                       onClose={() => this.props.setVisible(false)}
                       name='Bags available'>
                <View style={{flex: 1}}>
                    <ListView dataSource={this.state.dataSource}
                              renderRow={this.renderRow.bind(this)}
                              enableEmptySections={true}
                              renderSeparator={Separator.render}/>
                    <Button title='Scan' color='green' disabled={this.state.scanning} onPress={() => this.scan()}/>
                </View>
            </FullModal>
        );
    }
}