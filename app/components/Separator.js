import React, {Component} from 'react';
import {View} from 'react-native';

export default class Separator extends Component {
    static render(sectionID, rowID) {
        return (<View key={`${sectionID}-${rowID}`} style={{height: 1, backgroundColor: '#CCCCCC',}}/>);
    }
}