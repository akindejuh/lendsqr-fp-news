import { useNavigation } from '@react-navigation/native';
import React, { FunctionComponent } from 'react';
import { Button, Screen, Text } from 'src/components';

const SignInScreen: FunctionComponent = (): React.JSX.Element => {
  const navigation = useNavigation();

  const navToNewsScreen = () => {
    navigation.navigate('AppStack', {
      screen: 'NewsStack',
      params: {
        screen: 'NewsListingScreen',
      },
    });
  };

  const navToSignUpScreen = () => {
    navigation.navigate('AuthStack', {
      screen: 'SignUpScreen',
    });
  };

  return (
    <Screen preset="fixed" baseAllowance={10}>
      <Text text="SignIn Screen" marginTop={20} fontSize={40} />
      <Button
        text="Sign Up"
        preset="link"
        marginLeft={'auto'}
        marginTop={'auto'}
        onPress={navToSignUpScreen}
      />
      <Button text="News Screen" marginTop={20} onPress={navToNewsScreen} />
    </Screen>
  );
};

export default SignInScreen;
