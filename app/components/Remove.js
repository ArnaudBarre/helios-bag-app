import React, {Component} from 'react';
import {View} from 'react-native';
import TransparentModal from './TransparentModal';
import Row from './Row';

export default class Remove extends Component {
    render() {
        return (
            <TransparentModal visible={this.props.visible} setVisible={this.props.setVisible}>
                <Row text='Are you sure to delete ?' centered={true}/>
                <View style={{flexDirection: 'row'}}>
                    <Row text='Cancel'
                         centered={true}
                         borderRounded={true}
                         rowPress={() => {this.props.setVisible(false)}}/>
                    <Row text='Ok'
                         centered={true}
                         borderRounded={true}
                         textStyle={{color: 'red'}}
                         rowPress={() => {
                             this.props.remove();
                             this.props.setVisible(false)
                         }}/>
                </View>
            </TransparentModal>
        );
    }
}