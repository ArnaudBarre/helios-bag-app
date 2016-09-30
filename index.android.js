import React, {Component} from 'react';
import {View, ViewPagerAndroid, StatusBar, AppRegistry,} from 'react-native';
import Item from './app/components/Item';
import Battery from './app/components/Battery';
import Objects from './app/components/Objects';
import Activity from './app/components/Activity';

class HeliosBag extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar backgroundColor={'green'}/>
                <View style={{flexDirection: 'row', backgroundColor: 'forestgreen'}}>
                    <Item name='Battery' source={require('./app/icons/battery.png')}
                          onPress={() => this.viewPager.setPage(0)}/>
                    <Item name='Objects' source={require('./app/icons/objects.png')}
                          onPress={() => this.viewPager.setPage(1)}/>
                    <Item name='Activity' source={require('./app/icons/activity.png')}
                          onPress={() => this.viewPager.setPage(2)}/>
                </View>
                <ViewPagerAndroid style={{flex: 1}} initialPage={0} ref={viewPager => {this.viewPager = viewPager;}}>
                    <View>
                        <Battery/>
                    </View>
                    <View>
                        <Objects/>
                    </View>
                    <View>
                        <Activity/>
                    </View>
                </ViewPagerAndroid>
            </View>
        );
    }
}

AppRegistry.registerComponent('HeliosBag', () => HeliosBag);