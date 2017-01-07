import React, {Component} from 'react';
import {View, StatusBar, AppRegistry} from 'react-native';
import Home from './app/components/Home';

class HeliosBag extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar backgroundColor='green'/>
                <Home/>
            </View>
        );
    }
}

AppRegistry.registerComponent('HeliosBag', () => HeliosBag);
