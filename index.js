import React, { Component } from 'react'
import ReactNative, { requireNativeComponent, NativeModules, UIManager, Platform } from 'react-native'

const NativeViewManager = NativeModules.HapticViewManager
const NativeHapticView = requireNativeComponent('HapticView', null)

class HapticView extends Component {
  render() {
    return (
      <NativeHapticView {...this.props} />
    )
  }

  performHaptic(params) {
    if (Platform.OS === 'ios') {
      NativeViewManager.performHaptic(ReactNative.findNodeHandle(this), params.ios)
    } else if (Platform.OS === 'android') {
      UIManager.dispatchViewManagerCommand(
        ReactNative.findNodeHandle(this),
        UIManager.HapticView.Commands.performHaptic,
        [params.android]
      )
    }
  }
}

export const HapticFeedbackConstants = {
  ios: {
    IMPACT_FEEDBACK: 0,
    NOTIFICATION_FEEDBACK: {
      SUCCESSES: 1,
      FAILURES: 2,
      WARNINGS: 3
    },
    SELECTION_FEEDBACK: 4
  },
  android: {
    CLOCK_TICK: 'CLOCK_TICK',
    CONTEXT_CLICK: 'CONTEXT_CLICK',
    FLAG_IGNORE_GLOBAL_SETTING: 'FLAG_IGNORE_GLOBAL_SETTING',
    FLAG_IGNORE_VIEW_SETTING: 'FLAG_IGNORE_VIEW_SETTING',
    KEYBOARD_PRESS: 'KEYBOARD_PRESS',
    KEYBOARD_RELEASE: 'KEYBOARD_RELEASE',
    KEYBOARD_TAP: 'KEYBOARD_TAP',
    LONG_PRESS: 'LONG_PRESS',
    TEXT_HANDLE_MOVE: 'TEXT_HANDLE_MOVE',
    VIRTUAL_KEY: 'VIRTUAL_KEY',
    VIRTUAL_KEY_RELEASE: 'VIRTUAL_KEY_RELEASE',
  }
}

export default HapticView