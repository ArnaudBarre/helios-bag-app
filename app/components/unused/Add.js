import React, {Component} from 'react';
import {ListView} from 'react-native';
import FullModal from './FullModal';
import Row from './Row';
import Separator from './Separator';

export default class Add extends Component {
    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let data = [];
        for (let i = 0; i < 6; i++)
            data.push({name: '', number: Math.floor(Math.random() * 100000), stared: false});
        this.state = {data: data, dataSource: ds.cloneWithRows(data),}
    }

    iconPressed(rowData, rowID) {
        let newData = JSON.parse(JSON.stringify(this.props.data));
        newData.push(rowData);
        this.props.setData(newData);
        let availableChips = JSON.parse(JSON.stringify(this.state.data));
        availableChips.splice(rowID, 1);
        this.setState({data: availableChips, dataSource: this.state.dataSource.cloneWithRows(availableChips)})
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <Row text={'Chip number ' + rowData.number}
                 icon={require('./../icons/add.png')}
                 iconPress={() => this.iconPressed(rowData, rowID)}/>
        );
    }

    render() {
        return (
            <FullModal visible={this.props.visible}
                       onClose={() => this.props.setVisible(false)}
                       name="Chips available">
                <ListView dataSource={this.state.dataSource}
                          renderRow={this.renderRow.bind(this)}
                          enableEmptySections={true}
                          renderSeparator={Separator.render}/>
            </FullModal>
        );
    }
}