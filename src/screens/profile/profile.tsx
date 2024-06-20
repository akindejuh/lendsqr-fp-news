import React, { FunctionComponent, useState } from 'react';
import { Alert, Platform, TextStyle } from 'react-native';
import { fonts } from 'src/assets/fonts/fonts';
import { Button, Image, Screen, Text, View } from 'src/components';
import { useAuth } from 'src/context/auth-config/interfaces';
import { colors } from 'src/design-system';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import analytics from '@react-native-firebase/analytics';
import { images } from 'src/assets/images/images';
import { useAppDispatch } from 'src/redux/store';
import { IThemeState, setTheme } from 'src/redux/slice/theme/theme-slice';

const ProfileScreen: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const authState = useAuth();
  const userInfo = authState?.user;

  const [changedTheme, setChangedTheme] = useState<boolean>(false);

  const signUserOut = async () => {
    // await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    await analytics().resetAnalyticsData();
    auth().signOut();
    authState?.setUser(null);
  };

  const onLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to log out?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yhup',
          style: 'destructive',
          onPress: async () => {
            await signUserOut();
          },
        },
      ],
      { cancelable: false },
    );
  };

  const onChangeTheme = (theme: IThemeState['theme']) => {
    dispatch(setTheme(theme));
    setChangedTheme(true);
  };

  return (
    <Screen preset="fixed">
      <View
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        marginTop={Platform.OS === 'ios' ? 20 : 10}>
        <Text
          text="Your Profile"
          fontSize={20}
          fontFamily={fonts.primaryFont_700}
        />

        <Button
          preset="link"
          text="Logout"
          textStyle={LOG_OUT}
          onPress={onLogout}
        />
      </View>
      <View
        width={200}
        height={200}
        alignSelf="center"
        marginTop={80}
        borderWidth={2}
        borderRadius={200}
        padding={3}
        borderColor={colors().primary}>
        <Image
          sourceFile={
            userInfo?.photoURL
              ? {
                  uri: userInfo?.photoURL || '',
                }
              : images.defaultUser
          }
          borderRadius={200}
          width={190}
          height={190}
        />
      </View>

      <Text
        text={userInfo?.displayName || ''}
        textAlign="center"
        marginTop={10}
        fontFamily={fonts.primaryFont_500}
        fontSize={18}
      />
      <Text
        text={userInfo?.email || ''}
        textAlign="center"
        marginTop={1}
        fontFamily={fonts.primaryFont_400}
        fontSize={14}
      />

      <Text
        text="Select Theme"
        fontSize={18}
        fontFamily={fonts.primaryFont_700}
        marginTop={70}
        marginBottom={1}
      />
      <View
        alignItems="flex-start"
        height={100}
        justifyContent="space-between"
        // flexDirection="column"
        // justifyContent="space-between"
        // width={200}
      >
        <Button
          text="System"
          preset="link"
          onPress={() => onChangeTheme('system')}
        />
        <Button
          text="Light"
          preset="link"
          onPress={() => onChangeTheme('light')}
        />
        <Button
          text="Dark"
          preset="link"
          onPress={() => onChangeTheme('dark')}
        />
      </View>

      {changedTheme && (
        <Text
          text="Please, re-start to update your theme!"
          fontSize={15}
          fontFamily={fonts.primaryFont_400}
          marginTop={10}
          color={colors().primary}
        />
      )}
    </Screen>
  );
};

export default ProfileScreen;

const LOG_OUT: TextStyle = {
  fontSize: 14,
};
