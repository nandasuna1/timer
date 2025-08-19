import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export function KeyboardWrapper({ children }: { children: React.ReactNode }) {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid
      extraScrollHeight={40}
    >
      {children}
    </KeyboardAwareScrollView>
  );
}
