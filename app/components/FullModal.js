import React, {Component} from 'react';
import {Image, TouchableOpacity, Modal, StyleSheet, Text, View} from 'react-native';

export default class FullModal extends Component {
    static defaultProps = {
        visible: false,
        name: '',
        onClose: () => {},
        iconRight: null,
        onPressRight: () => {},
    };

    render() {
        return (
            <Modal animationType={"slide"}
                   transparent={false}
                   visible={this.props.visible}
                   onRequestClose={this.props.onClose}>
                <View style={styles.nav}>
                    <View style={{width: 50}}>
                        <TouchableOpacity onPress={this.props.onClose}>
                            <Image style={styles.icon} source={require('./../icons/back.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: 'white'}}>{this.props.name}</Text>
                    </View>
                    <View style={{width: 50}}>
                        <TouchableOpacity onPress={this.props.onPressRight}>
                            <Image style={styles.icon} source={this.props.iconRight}/>
                        </TouchableOpacity>
                    </View>
                </View>
                {this.props.children}
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    nav: {height: 50, flexDirection: 'row', backgroundColor: 'forestgreen',},
    icon: {width: 30, height: 30, margin: 10,},
});