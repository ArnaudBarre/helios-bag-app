import React, {Component} from 'react';
import TransparentModal from './TransparentModal';
import Row from './Row';

export default class Options extends Component {
    render() {
        return (
            <TransparentModal visible={this.props.visible} setVisible={this.props.setOptionsVisible}>
                <Row textStyle={{fontWeight: 'bold'}}
                     text={this.props.rowData.name ? this.props.rowData.name : '(No name)'}/>
                <Row text={'Number: ' + this.props.rowData.number}/>
                <Row text='Rename'
                     rowPress={() => {
                         this.props.setOptionsVisible(false);
                         this.props.setRenameVisible(true);
                     }}/>
                <Row text='Remove'
                     rowPress={() => {
                         this.props.setOptionsVisible(false);
                         this.props.setRemoveVisible(true);
                     }}/>
                <Row text='Cancel'
                     borderRounded={true}
                     rowPress={() => {this.props.setOptionsVisible(false)}}/>
            </TransparentModal>
        )
    }
}