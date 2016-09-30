import React, {Component} from 'react';
import {View, ListView, Modal} from 'react-native';
import FullModal from './FullModal';
import Row from './Row';
import Separator from './Separator'
import ActivityDetail from './ActivityDetail'
import Remove from './Remove';

export default class History extends Component {
    constructor() {
        super();
        this.state = {
            detailVisible: false,
            removeVisible: false,
            rowData: {date: '', pressed: ''},
            rowID: null,
            deleting: false
        }
    }

    setRemoveVisible(visible) {
        this.setState({removeVisible: visible});
    }

    setDetailVisible(visible) {
        this.setState({detailVisible: visible});
    }

    remove() {
        var newData = JSON.parse(JSON.stringify(this.props.data));
        newData = newData.filter(activity => !activity.pressed);
        this.props.setData(newData);
        this.setState({deleting: false});
    }

    removeOne() {
        var newData = JSON.parse(JSON.stringify(this.props.data));
        newData.splice(this.props.rowID, 1);
        this.props.setData(newData);
        this.setState({deleting: false, detailVisible: false,});
    }


    onClose() {
        var newData = JSON.parse(JSON.stringify(this.props.data));
        newData = newData.map(row => {
            row.pressed = false;
            return row
        });
        this.props.setData(newData);
        this.setState({deleting: false});
        this.props.setHistoryVisible(false);
    }

    iconPressed(rowData, rowID) {
        if (!this.state.deleting)
            this.setState({detailVisible: true, rowData: rowData, rowID: rowID});
    }

    rowLongPress(rowID) {
        var newData = JSON.parse(JSON.stringify(this.props.data));
        newData[rowID].pressed = !newData[rowID].pressed;
        this.props.setData(newData);
        this.setState({deleting: newData.filter((item) => item.pressed).length});
    }

    rowPress(rowID) {
        if (this.state.deleting)
            this.rowLongPress(rowID);
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <Row text={rowData.date}
                 rowStyle={{backgroundColor: rowData.pressed ? 'darkgray' : null}}
                 rowPress={() => this.rowPress(rowID)}
                 rowLongPress={() => this.rowLongPress(rowID)}
                 icon={rowData.pressed ? null : require('./../icons/arrow-forward.png')}
                 iconPress={() => this.iconPressed(rowData, rowID)}/>
        );
    }

    render() {
        return (
            <FullModal visible={this.props.visible}
                       onClose={this.onClose.bind(this)}
                       name="History"
                       onPressRight={() => {this.setState({removeVisible: true})}}
                       iconRight={this.state.deleting ? require('./../icons/trash.png') : null}>
                <ListView dataSource={this.props.dataSource}
                          renderRow={this.renderRow.bind(this)}
                          enableEmptySections={true}
                          renderSeparator={Separator.render}/>
                <ActivityDetail visible={this.state.detailVisible}
                                setDetailVisible={this.setDetailVisible.bind(this)}
                                rowData={this.state.rowData}
                                remove={this.removeOne.bind(this)}/>
                <Remove visible={this.state.removeVisible}
                        setVisible={this.setRemoveVisible.bind(this)}
                        remove={this.remove.bind(this)}/>
            </FullModal>
        );
    }
}