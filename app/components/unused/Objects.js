import React, {Component} from 'react';
import {ListView, View, Button, AsyncStorage,} from 'react-native';
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

    componentDidMount() {
        AsyncStorage.getItem('objects').then(obj => {if (obj) this.setData(JSON.parse(obj))})
    }

    setData(newData) {
        this.setState({data: newData, dataSource: this.state.dataSource.cloneWithRows(newData)});
        AsyncStorage.setItem('objects', JSON.stringify(newData))
    }

    setInput(input) {this.setState({input: input})}

    setOptionsVisible(visible) {this.setState({optionsVisible: visible})}

    setAddVisible(visible) {this.setState({addVisible: visible})}

    setRenameVisible(visible) {this.setState({renameVisible: visible})}

    setRemoveVisible(visible) {this.setState({removeVisible: visible})}

    rename() {
        let newData = JSON.parse(JSON.stringify(this.state.data));
        newData[this.state.rowID].name = this.state.input;
        this.setData(newData)
    }

    remove() {
        let newData = JSON.parse(JSON.stringify(this.state.data));
        newData.splice(this.state.rowID, 1);
        this.setData(newData)
    }

    iconPressed(rowID) {
        let dataTemp = JSON.parse(JSON.stringify(this.state.data));
        dataTemp[rowID].stared = !dataTemp[rowID].stared;
        let newData = [];
        for (let i in dataTemp) if (dataTemp[i].stared)
            newData.push(dataTemp[i]);
        for (let i in dataTemp) if (!dataTemp[i].stared)
            newData.push(dataTemp[i]);
        this.setData(newData)
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
                <Button onPress={() => this.setState({addVisible: true})}
                        color='green'
                        title='Add'/>
                <View style={{height:1, backgroundColor:'#CCCCCC'}}/>
                <ListView dataSource={this.state.dataSource}
                          renderRow={this.renderRow.bind(this)}
                          enableEmptySections={true}
                          renderSeparator={Separator.render}/>
                <Options visible={this.state.optionsVisible}
                         setOptionsVisible={this.setOptionsVisible.bind(this)}
                         setRenameVisible={this.setRenameVisible.bind(this)}
                         setRemoveVisible={this.setRemoveVisible.bind(this)}
                         rowData={this.state.rowData}/>
                <Add visible={this.state.addVisible}
                     setVisible={this.setAddVisible.bind(this)}
                     data={this.state.data}
                     setData={this.setData.bind(this)}/>
                <Rename visible={this.state.renameVisible}
                        setVisible={this.setRenameVisible.bind(this)}
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
