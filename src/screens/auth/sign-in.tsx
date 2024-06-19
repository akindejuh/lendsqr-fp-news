import { useNavigation } from '@react-navigation/native';
import React, { FunctionComponent, useState } from 'react';
import { TextStyle } from 'react-native';
import { fonts } from 'src/assets/fonts/fonts';
import { Button, Divider, Icon, Screen, Text, TextField } from 'src/components';
import { colors } from 'src/design-system';

const SignInScreen: FunctionComponent = (): React.JSX.Element => {
  const navigation = useNavigation();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navToNewsScreen = () => {
    navigation.navigate('AppStack', {
      screen: 'NewsListingScreen',
    });
  };

  const navToSignUpScreen = () => {
    navigation.navigate('AuthStack', {
      screen: 'SignUpScreen',
    });
  };

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
        value={email}
        setValue={setEmail}
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
        value={password}
        setValue={setPassword}
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

      <Button text="Login" marginTop={8} onPress={navToNewsScreen} />

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
        <Text text="Sign in to Google" marginLeft={5} />
      </Button>
    </Screen>
  );
};

export default SignInScreen;

const LINK_TEXT: TextStyle = {
  fontSize: 13,
};
