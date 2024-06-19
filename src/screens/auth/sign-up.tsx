import { useNavigation } from '@react-navigation/native';
import React, { FunctionComponent, useState } from 'react';
import { TextStyle } from 'react-native';
import { fonts } from 'src/assets/fonts/fonts';
import { Button, Divider, Icon, Screen, Text, TextField } from 'src/components';
import { colors } from 'src/design-system';

const SignUpScreen: FunctionComponent = (): React.JSX.Element => {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState<string>('');
  const [phoneNo, setPhoneNo] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const navToNewsScreen = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'AppStack',
          state: {
            routes: [{ name: 'NewsListingScreen' }],
          },
        },
      ],
    });
  };

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
        value={fullName}
        setValue={setFullName}
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
        value={phoneNo}
        setValue={setPhoneNo}
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
        value={email}
        setValue={setEmail}
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

      <Button text="Register" marginTop={8} onPress={navToNewsScreen} />

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
