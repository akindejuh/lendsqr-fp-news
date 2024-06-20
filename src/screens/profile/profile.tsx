import React, { FunctionComponent } from 'react';
import { Alert, Platform, TextStyle } from 'react-native';
import { fonts } from 'src/assets/fonts/fonts';
import { Button, Image, Screen, Text, View } from 'src/components';
import { colors } from 'src/design-system';

const ProfileScreen: FunctionComponent = () => {
  const onLogout = () => {
    Alert.alert(
      'Log out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yhup',
          style: 'destructive',
          onPress: () => {},
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
          sourceFile={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkR3lar-JsOhzP1ftPCSJhEfTUUIyBdYiXkw&s',
          }}
          borderRadius={200}
        />

        <Text
          text="Akindeju Gbenga"
          textAlign="center"
          marginTop={20}
          fontFamily={fonts.primaryFont_500}
          fontSize={18}
        />

        <Button
          preset="link"
          text="Logout"
          marginTop={5}
          textStyle={LOG_OUT}
          onPress={onLogout}
        />
      </View>
    </Screen>
  );
};

export default ProfileScreen;

const LOG_OUT: TextStyle = {
  fontSize: 14,
};
