import React, {Component} from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity, ListView} from 'react-native';
import History from './History';

export default class Activity extends Component {
    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            inActivity: false, historyVisible: false, start: 0, time: '00:00', distance: 0.00,
            data: [], dataSource: ds.cloneWithRows([]),
        }
    }

    setData(newData) {
        this.setState({data: newData, dataSource: this.state.dataSource.cloneWithRows(newData)});
    }

    setHistoryVisible(visible) {
        this.setState({historyVisible: visible});
    }

    startActivity() {
        var interval = setInterval(() => this.setState({time: this.displayTime()}), 1000);
        this.setState({inActivity: true, start: new Date().getTime(), interval: interval});
    }

    stopActivity() {
        clearInterval(this.state.interval);
        var newData = JSON.parse(JSON.stringify(this.state.data));
        newData.unshift({
            time: this.state.time,
            distance: this.state.distance,
            date: new Date(this.state.start).toLocaleString(),
            average: (this.state.distance / ((new Date().getTime() - this.state.start) / 3600000)).toFixed(1),
            pressed: false,
        });
        this.setData(newData);
        this.setState({inActivity: false, time: '00:00', distance: 0.00});
    }

    displayTime() {
        time = new Date().getTime() - this.state.start;
        var seconds = Math.floor(time / 1000) % 60;
        var minutes = Math.floor(time / 60000) % 60;
        var hours = Math.floor(time / 3600000);
        if (minutes < 10) minutes = "0" + minutes;
        if (seconds < 10) seconds = "0" + seconds;
        return hours ? hours + ":" + minutes + ":" + seconds : minutes + ":" + seconds;
    }

    render() {
        if (this.state.inActivity)
            return (
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => {this.stopActivity()}}>
                        <Image source={require('./../icons/stop.png')} style={styles.icon}/>
                    </TouchableOpacity>
                    <Text style={styles.name}>Stop the activity</Text>
                    <Text style={[styles.name, styles.nameCentral]}>Time: {this.state.time}</Text>
                    <Text style={styles.name}>Distance: {this.state.distance}</Text>
                </View>
            );
        else
            return (
                <View style={{flex: 1}}>
                    <View style={styles.page}>
                        <View style={styles.container}>
                            <TouchableOpacity onPress={() => {this.startActivity()}}>
                                <Image source={require('./../icons/play.png')} style={styles.icon}/>
                            </TouchableOpacity>
                            <Text style={styles.name}>Start an activity</Text>
                        </View>
                        <View style={styles.container}>
                            <TouchableOpacity onPress={() => {this.setHistoryVisible(true)}}>
                                <Image source={require('./../icons/history.png')} style={styles.icon}/>
                            </TouchableOpacity>
                            <Text style={styles.name}>History</Text>
                        </View>
                    </View>
                    <History visible={this.state.historyVisible}
                             setHistoryVisible={this.setHistoryVisible.bind(this)}
                             setData={this.setData.bind(this)}
                             data={this.state.data}
                             dataSource={this.state.dataSource}/>
                </View>
            );
    }
}

const styles = StyleSheet.create({
    page: {flexDirection: 'row', flex: 1, alignItems: 'center',},
    container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    name: {fontSize: 30, fontWeight: 'bold', textAlign: 'center'},
    nameCentral: {marginVertical: 50},
    icon: {marginBottom: 20, height: 70, width: 70},
});