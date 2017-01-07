import React, {Component} from 'react';
import {View, Modal, TouchableHighlight, TouchableWithoutFeedback, StyleSheet,} from 'react-native';

export default class TransparentModal extends Component {
    render() {
        return (
            <Modal animationType={"slide"}
                   transparent={true}
                   visible={this.props.visible}
                   onRequestClose={() => this.props.setVisible(false)}>
                <TouchableHighlight underlayColor='transparent'
                                    style={styles.container}
                                    onPress={() => this.props.setVisible(false)}>
                    <View style={styles.innerContainer}>
                        <TouchableWithoutFeedback onPress={null}>
                            <View>
                                {this.props.children}
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableHighlight>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', padding: 20,},
    innerContainer: {borderRadius: 10, backgroundColor: '#fff', borderWidth: 1, borderColor: 'forestgreen'},
});