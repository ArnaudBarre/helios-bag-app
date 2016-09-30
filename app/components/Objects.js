import React, {Component} from 'react';
import {ListView, TouchableHighlight, StyleSheet, Text, View,} from 'react-native';
import Row from './Row';
import Separator from './Separator';
import Options from './Options';
import Add from './Add';
import Remove from './Remove';
import Rename from './Rename';

export default class Objects extends Component {
    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            data: [],
            dataSource: ds.cloneWithRows([]),
            addVisible: false,
            optionsVisible: false,
            renameVisible: false,
            removeVisible: false,
            rowData: {},
            rowID: 0,
            input: '',
        }
    }

    setData(newData) {
        this.setState({data: newData, dataSource: this.state.dataSource.cloneWithRows(newData)});
    }

    setInput(input) {this.setState({input: input})}

    setOptionsVisible(visible) {this.setState({optionsVisible: visible})}

    setAddVisible(visible) {this.setState({addVisible: visible})}

    setRenameVisible(visible) {this.setState({renameVisible: visible})}

    setRemoveVisible(visible) {this.setState({removeVisible: visible})}

    rename() {
        var newData = JSON.parse(JSON.stringify(this.state.data));
        newData[this.state.rowID].name = this.state.input;
        this.setState({
            data: newData,
            dataSource: this.state.dataSource.cloneWithRows(newData)
        });
    }

    remove() {
        var newData = JSON.parse(JSON.stringify(this.state.data));
        newData.splice(this.state.rowID, 1);
        this.setState({
            data: newData,
            dataSource: this.state.dataSource.cloneWithRows(newData)
        });
    }

    iconPressed(rowID) {
        var dataTemp = JSON.parse(JSON.stringify(this.state.data));
        dataTemp[rowID].stared = !dataTemp[rowID].stared;
        var newData = [];
        for (let i in dataTemp) if (dataTemp[i].stared)
            newData.push(dataTemp[i]);
        for (let i in dataTemp) if (!dataTemp[i].stared)
            newData.push(dataTemp[i]);
        this.setState({
            data: newData,
            dataSource: this.state.dataSource.cloneWithRows(newData)
        });
    }

    rowLongPressed(rowData, rowID) {
        this.setState({optionsVisible: true, rowData: rowData, rowID: rowID, input: rowData.name});
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <Row rowLongPress={() => this.rowLongPressed(rowData, rowID)}
                 text={rowData.name ? rowData.name : 'Chip number ' + rowData.number}
                 iconPress={() => this.iconPressed(rowID)}
                 icon={rowData.stared ? require('./../icons/star.png') : require('./../icons/star-o.png')}/>
        );
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ListView dataSource={this.state.dataSource}
                          renderRow={this.renderRow.bind(this)}
                          enableEmptySections={true}
                          renderSeparator={Separator.render}/>
                <TouchableHighlight onPress={() => this.setState({addVisible: true})}
                                    style={styles.add}
                                    underlayColor='green'>
                    <Text style={{color: 'white'}}>Add</Text>
                </TouchableHighlight>
                <Options visible={this.state.optionsVisible}
                         setOptionsVisible={this.setOptionsVisible.bind(this)}
                         setRenameVisible={this.setRenameVisible.bind(this)}
                         setRemoveVisible={this.setRemoveVisible.bind(this)}
                         rowData={this.state.rowData}/>
                <Add visible={this.state.addVisible}
                     setAddVisible={this.setAddVisible.bind(this)}
                     data={this.state.data}
                     setData={this.setData.bind(this)}/>
                <Rename visible={this.state.renameVisible}
                        setRenameVisible={this.setRenameVisible.bind(this)}
                        rename={this.rename.bind(this)}
                        setInput={this.setInput.bind(this)}
                        input={this.state.input}/>
                <Remove visible={this.state.removeVisible}
                        setVisible={this.setRemoveVisible.bind(this)}
                        remove={this.remove.bind(this)}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    add: {height: 50, backgroundColor: 'forestgreen', alignItems: 'center', justifyContent: 'center'},
});