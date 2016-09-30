import React, {Component} from 'react';
import {View, TextInput} from 'react-native';
import TransparentModal from './TransparentModal';
import Row from './Row';

export default class Rename extends Component {
    render() {
        return (
            <TransparentModal visible={this.props.visible} setVisible={this.props.setRenameVisible}>
                <TextInput style={{height: 50}}
                           onChangeText={(input) => this.props.setInput(input)}
                           value={this.props.input}
                           maxLength={40}
                           autoFocus={true}/>
                <View style={{flexDirection: 'row'}}>
                    <Row text='Cancel'
                         centered={true}
                         borderRounded={true}
                         rowPress={() => {this.props.setRenameVisible(false)}}/>
                    <Row text='Ok'
                         centered={true}
                         borderRounded={true}
                         rowPress={() => {
                             this.props.rename();
                             this.props.setRenameVisible(false);
                         }}/>
                </View>
            </TransparentModal>
        );
    }
}