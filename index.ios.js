import React, {Component} from 'react';
import {AppRegistry, View, StatusBar} from 'react-native';
import Home from './app/components/Home';

class HeliosBag extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar hidden={true}/>
                <Home/>
            </View>
        );
    }
}

AppRegistry.registerComponent('HeliosBag', () => HeliosBag);
