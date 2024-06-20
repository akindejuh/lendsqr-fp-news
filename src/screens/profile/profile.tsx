import React, { FunctionComponent } from 'react';
import { Alert, Platform, TextStyle } from 'react-native';
import { fonts } from 'src/assets/fonts/fonts';
import { Button, Image, Screen, Text, View } from 'src/components';
import { useAuth } from 'src/context/auth-config/interfaces';
import { colors } from 'src/design-system';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import analytics from '@react-native-firebase/analytics';
import { images } from 'src/assets/images/images';

const ProfileScreen: FunctionComponent = () => {
  const authStatus = useAuth();
  const userInfo = authStatus?.user;

  const signUserOut = async () => {
    // await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    await analytics().resetAnalyticsData();
    auth().signOut();
    authStatus?.setUser(null);
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

  return (
    <Screen preset="fixed">
      <View marginTop={Platform.OS === 'ios' ? 20 : 10}>
        <Text
          text="Your Profile"
          fontSize={20}
          fontFamily={fonts.primaryFont_700}
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
        borderColor={colors.primary}>
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

      <Button
        preset="link"
        text="Logout"
        marginTop={40}
        textStyle={LOG_OUT}
        onPress={onLogout}
      />
    </Screen>
  );
};

export default ProfileScreen;

const LOG_OUT: TextStyle = {
  fontSize: 14,
};
