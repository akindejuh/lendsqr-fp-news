import { useNavigation } from '@react-navigation/native';
import React, { FunctionComponent, useCallback, useState } from 'react';
import { ActivityIndicator, TextStyle } from 'react-native';
import { fonts } from 'src/assets/fonts/fonts';
import {
  Button,
  Divider,
  Icon,
  Screen,
  Text,
  TextField,
  View,
} from 'src/components';
import { colors } from 'src/design-system';
import { LoginUserRequest, SignInUserWithGoogle } from 'src/domain/auth';
import { errorToast, successToast } from 'src/helpers';
import { logCrashlystics } from 'src/utils/crashlytics-handler';
import validator from 'validator';

const LoginScreen: FunctionComponent = (): React.JSX.Element => {
  const navigation = useNavigation();
  const [isSignInLoading, setIsSignInLoading] = useState<boolean>(false);

  const [loginData, setLoginData] = useState<LoginUserRequest>({
    email: '',
    password: '',
  });

  const handleInputChange = (key: string, val: string) => {
    setLoginData(prev => ({
      ...prev,
      [key]: val,
    }));
  };

  const loginUser = useCallback(() => {
    if (!validator.isEmail(loginData.email)) {
      logCrashlystics('User Entered an Invalid Email!');
      errorToast({
        message: 'Invalid Email!',
      });
      return;
    }

    if (!loginData.password) {
      logCrashlystics('User did not input a password!');
      errorToast({
        message: 'Invalid Password!',
      });
      return;
    }

    logCrashlystics('User Logged in successfully logic!');
    successToast({
      message: 'User Logged in successfully logic!',
    });
    setLoginData({
      email: '',
      password: '',
    });
  }, [loginData]);

  const initGoogleSignInUser = async () => {
    setTimeout(() => {
      setIsSignInLoading(true);
    }, 5000);
    await SignInUserWithGoogle();
    setIsSignInLoading(false);
  };

  const navToSignUpScreen = () => {
    navigation.navigate('AuthStack', {
      screen: 'SignUpScreen',
    });
  };

  if (isSignInLoading) {
    return (
      <Screen preset="fixed">
        <View flex={1} justifyContent="center" alignItems="center">
          <Text
            text="Signing In..."
            marginBottom={4}
            color={colors().linkText}
          />
          <ActivityIndicator color={colors().grayText} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen preset="scroll">
      <Text
        text="Welcome Back!"
        marginTop={40}
        marginBottom={25}
        fontSize={28}
        fontFamily={fonts.primaryFont_700}
      />

      <Text
        text="Email"
        marginBottom={7}
        fontSize={15}
        fontFamily={fonts.primaryFont_500}
      />
      <TextField
        marginBottom={15}
        value={loginData.email}
        setValue={text => handleInputChange('email', text as string)}
        placeholder="Enter your email"
      />

      <Text
        text="Password"
        marginBottom={7}
        fontSize={15}
        fontFamily={fonts.primaryFont_500}
      />
      <TextField
        marginBottom={15}
        value={loginData.password}
        setValue={text => handleInputChange('password', text as string)}
        placeholder="Enter your password"
        secureTextEntry
        isPassword
      />

      <Button
        text="Don't have an account?"
        preset="link"
        marginLeft={'auto'}
        marginTop={15}
        marginBottom={3}
        onPress={navToSignUpScreen}
        textStyle={LINK_TEXT}
      />

      <Button text="Login" marginTop={8} onPress={loginUser} />

      <Divider marginTop={30} marginBottom={20} />

      <Button
        onPress={initGoogleSignInUser}
        backgroundColor={colors().transparent}
        borderWidth={1}
        borderRadius={6}
        height={50}
        justifyContent="center"
        alignItems="center"
        borderColor={colors().inputBackground}
        flexDirection="row">
        <Icon name="google-logo" size={24} />
        <Text text="Sign in to Google" marginLeft={5} />
      </Button>
    </Screen>
  );
};

export default LoginScreen;

const LINK_TEXT: TextStyle = {
  fontSize: 13,
};
