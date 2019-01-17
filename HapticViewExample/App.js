/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import HapticView, { HapticFeedbackConstants } from 'react-native-haptic-view';

export default class App extends Component<Props> {
  onPress = () => {
    if (this.hapticView) {
      this.hapticView.performHaptic({
        ios: HapticFeedbackConstants.ios.IMPACT_FEEDBACK,
        android: HapticFeedbackConstants.android.CLOCK_TICK
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={{ flex: 0 }} onPress={this.onPress}>
          <HapticView style={{ padding: 30, backgroundColor: 'gray' }} ref={me => this.hapticView = me}>
            <Text>Perform Haptic Effect</Text>
          </HapticView>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
