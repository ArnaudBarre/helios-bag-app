import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import FullModal from './FullModal';
import Remove from './Remove';

export default class ActivityDetail extends Component {
    constructor() {
        super();
        this.state = {removeVisible: false};
    }

    setRemoveVisible(visible) {
        this.setState({removeVisible: visible});
    }

    render() {
        return (
            <FullModal visible={this.props.visible}
                       onClose={() => this.props.setDetailVisible(false)}
                       iconRight={require('./../icons/trash.png')}
                       onPressRight={() => this.setRemoveVisible(true)}
                       name="Detail">
                <View style={styles.header}>
                    <View style={styles.container}>
                        <Text>{this.props.rowData.time}</Text>
                        <Text>Duration</Text>
                    </View>
                    <View style={[styles.container, styles.containerCentral]}>
                        <Text>{this.props.rowData.distance} km</Text>
                        <Text>Distance</Text>
                    </View>
                    <View style={styles.container}>
                        <Text>{this.props.rowData.average} km/h</Text>
                        <Text>Average Speed</Text>
                    </View>
                </View>
                <Remove visible={this.state.removeVisible}
                        setVisible={this.setRemoveVisible.bind(this)}
                        remove={this.props.remove}/>
            </FullModal>
        );
    }
}

const styles = StyleSheet.create({
    container: {flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'whitesmoke',},
    containerCentral: {borderColor: 'forestgreen', borderLeftWidth: 1, borderRightWidth: 1},
    header: {flexDirection: 'row', height: 50, borderColor: 'forestgreen', borderBottomWidth: 1},
});