import React, {Component} from 'react';
import {Image, TouchableHighlight, TouchableOpacity, StyleSheet, Text, View} from 'react-native';

export default class Row extends Component {
    static defaultProps = {
        text: '',
        centered: false,
        textStyle: {},
        rowPress: null,
        rowLongPress: null,
        rowStyle: {},
        borderRounded: false,
        icon: null,
        iconPress: () => {},
    };

    renderContent() {
        return (
            <View style={[styles.row, {justifyContent: this.props.centered ? 'center' : null}, this.props.rowStyle]}>
                <Text style={[!this.props.centered && styles.text, this.props.textStyle]}>
                    {this.props.text}
                </Text>
                <TouchableOpacity onPress={this.props.iconPress}>
                    <Image style={styles.icon} source={this.props.icon}/>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        if (this.props.rowPress || this.props.rowLongPress)
            return (
                <TouchableHighlight underlayColor='darkgray'
                                    onPress={this.props.rowPress}
                                    onLongPress={this.props.rowLongPress}
                                    style={{flex: 1, borderRadius: this.props.borderRounded ? 10 : null}}>
                    {this.renderContent()}
                </TouchableHighlight>
            );
        else
            return this.renderContent()
    }
}

const styles = StyleSheet.create({
    row: {flexDirection: 'row', height: 50, alignItems: 'center',},
    icon: {width: 30, height: 30, margin: 10,},
    text: {flex: 1, marginLeft: 10,},
});