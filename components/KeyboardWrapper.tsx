import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export function KeyboardWrapper({ children }: { children: React.ReactNode }) {
  // const [keyboardOpen, setKeyboardOpen] = useState(false);

  // useEffect(() => {
  //   const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardOpen(true));
  //   const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardOpen(false));

  //   return () => {
  //     showSub.remove();
  //     hideSub.remove();
  //   };
  // }, []);

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
