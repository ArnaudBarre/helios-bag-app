import React, {Component} from 'react';
import {View, ViewPagerAndroid, StatusBar, AppRegistry, Button} from 'react-native';
import Item from './app/components/Item';
import Battery from './app/components/Battery';
import Objects from './app/components/Objects';

class HeliosBag extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar backgroundColor={'green'}/>
                <View style={{height:50, flexDirection: 'row', backgroundColor: 'forestgreen'}}>
                    <Item name='Battery' source={require('./app/icons/battery.png')}
                          onPress={() => this.viewPager.setPage(0)}/>
                    <Item name='Objects' source={require('./app/icons/objects.png')}
                          onPress={() => this.viewPager.setPage(1)}/>
                </View>
                <ViewPagerAndroid style={{flex: 1}} initialPage={0} ref={viewPager => {this.viewPager = viewPager;}}>
                    <View>
                        <Battery/>
                    </View>
                    <View>
                        <Objects/>
                    </View>
                </ViewPagerAndroid>
            </View>
        );
    }
}

AppRegistry.registerComponent('HeliosBag', () => HeliosBag);