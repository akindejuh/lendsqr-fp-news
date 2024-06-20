import { useNavigation } from '@react-navigation/native';
import React, { FunctionComponent, useCallback, useState } from 'react';
import { TextStyle } from 'react-native';
import { fonts } from 'src/assets/fonts/fonts';
import { Button, Divider, Icon, Screen, Text, TextField } from 'src/components';
import { colors } from 'src/design-system';
import { RegisterRequest } from 'src/domain/auth';
import { errorToast, successToast } from 'src/helpers';
import { logCrashlystics } from 'src/utils/crashlytics-handler';
import validator from 'validator';

const SignUpScreen: FunctionComponent = (): React.JSX.Element => {
  const navigation = useNavigation();

  const [registerData, setRegisterData] = useState<RegisterRequest>({
    email: '',
    phoneNumber: '',
    fullName: '',
  });

  const handleInputChange = (key: string, val: string) => {
    setRegisterData(prev => ({
      ...prev,
      [key]: val,
    }));
  };

  const registerUser = useCallback(() => {
    if (!validator.isEmail(registerData.email)) {
      logCrashlystics('User Entered an Invalid Email!');
      errorToast({
        message: 'Invalid Email!',
      });
      return;
    }

    if (validator.isEmpty(registerData.fullName)) {
      logCrashlystics('User did not input their name!');
      errorToast({
        message: 'Please input your name!',
      });
      return;
    }
    if (!validator.isMobilePhone(registerData.phoneNumber)) {
      logCrashlystics('User did not input a valid phone number!');
      errorToast({
        message: 'Please input a valid phone number!',
      });
      return;
    }

    logCrashlystics('User Registered successfully logic!');
    successToast({
      message: 'User Registered successfully logic!',
    });
    setRegisterData({
      email: '',
      fullName: '',
      phoneNumber: '',
    });
  }, [registerData]);

  const navToSignInScreen = () => {
    navigation.navigate('AuthStack', {
      screen: 'SignInScreen',
    });
  };

  return (
    <Screen preset="scroll">
      <Text
        text="Let's get you started!"
        marginTop={40}
        marginBottom={25}
        fontSize={28}
        fontFamily={fonts.primaryFont_700}
      />

      <Text
        text="Full Name"
        marginBottom={4}
        fontSize={15}
        fontFamily={fonts.primaryFont_500}
      />
      <TextField
        marginBottom={18}
        value={registerData.fullName}
        setValue={text => handleInputChange('fullName', text as string)}
        placeholder="Enter your full name"
      />

      <Text
        text="Phone Number"
        marginBottom={4}
        fontSize={15}
        fontFamily={fonts.primaryFont_500}
      />
      <TextField
        marginBottom={18}
        value={registerData.phoneNumber}
        setValue={text => handleInputChange('phoneNumber', text as string)}
        placeholder="Enter your phone number"
      />

      <Text
        text="Email"
        marginBottom={4}
        fontSize={15}
        fontFamily={fonts.primaryFont_500}
      />
      <TextField
        marginBottom={18}
        value={registerData.email}
        setValue={text => handleInputChange('email', text as string)}
        placeholder="Enter your email"
      />

      <Button
        text="Already have for an account?"
        preset="link"
        marginLeft={'auto'}
        marginTop={15}
        marginBottom={3}
        onPress={navToSignInScreen}
        textStyle={LINK_TEXT}
      />

      <Button text="Register" marginTop={8} onPress={registerUser} />

      <Divider marginTop={30} marginBottom={20} />

      <Button
        backgroundColor={colors.transparent}
        borderWidth={1}
        borderRadius={6}
        height={50}
        justifyContent="center"
        alignItems="center"
        borderColor={colors.inputBackground}
        flexDirection="row">
        <Icon name="google-logo" size={24} />
        <Text text="Sign up with Google" marginLeft={5} />
      </Button>
    </Screen>
  );
};

export default SignUpScreen;

const LINK_TEXT: TextStyle = {
  fontSize: 13,
};
