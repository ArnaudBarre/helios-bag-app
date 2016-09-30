import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

export default class Battery extends Component {
    render() {
        return (
            <View style={styles.page}>
                <View style={styles.container}>
                    <Image source={require('./../icons/battery-2.png')} style={styles.icon}/>
                    <Text style={styles.value}>56%</Text>
                    <Text style={styles.description}>Battery full in 2h30</Text>
                </View>
                <View style={styles.container}>
                    <Image source={require('./../icons/sun.png')} style={styles.icon}/>
                    <Text style={styles.value}>45W</Text>
                    <Text style={styles.description}>80% of maximal capabilities</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page: {flexDirection: 'row', flex: 1, alignItems: 'center',},
    container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    value: {fontSize: 30, fontWeight: 'bold'},
    description: {fontSize: 20, textAlign: 'center'},
    icon: {marginBottom: 20, height: 70, width: 70}
});