import React, {Component} from 'react';
import {Image, TouchableHighlight, StyleSheet, Text, View} from 'react-native';

export default class Item extends Component {
    render() {
        return (
            <TouchableHighlight onPress={this.props.onPress} underlayColor='green' style={{flex: 1}}>
                <View style={styles.container}>
                    <Image source={this.props.source} style={styles.itemIcon}/>
                    <Text style={styles.itemText}>{this.props.name}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    itemIcon: {height: 30, width: 30, marginTop: 3},
    itemText: {color: 'white'}
});
