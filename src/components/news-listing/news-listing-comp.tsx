import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { UINewsListing } from 'src/domain/news';
import { Text, Button, View, Image } from '..';
import { colors } from 'src/design-system';
import { errorToast } from 'src/helpers';
import { fonts } from 'src/assets/fonts/fonts';
import { formatDate } from 'src/utils/format-date';

export function NewsListingComp(props: UINewsListing): React.JSX.Element {
  const navigation = useNavigation();

  const navToNewsDetailsScreen = (news_id: string) => {
    if (news_id) {
      navigation.navigate('AppStack', {
        screen: 'NewsDetailsScreen',
        params: {
          news_id,
        },
      });
    } else {
      errorToast({
        message: 'Invalid ID!',
      });
    }
  };

  return (
    <Button
      marginBottom={15}
      onPress={() => navToNewsDetailsScreen(props.id)}
      borderRadius={8}
      height={'auto'}
      backgroundColor={colors().transparent}>
      <View flexDirection="row" justifyContent="space-between">
        <View flex={1} paddingHorizontal={10} paddingVertical={5}>
          <Text
            text={`${props.title?.slice(0, 55)}${
              props.title.length > 55 ? '...' : ''
            }`}
            fontSize={14}
            fontFamily={fonts.primaryFont_700}
          />

          <Text
            text={`${props.topic?.slice(0, 60)}${
              props.topic.length > 60 ? '...' : ''
            }`}
            fontSize={11}
            fontFamily={fonts.primaryFont_400}
            marginTop={4}
          />

          <Text
            text={formatDate(props.publication_date)}
            fontSize={10}
            fontFamily={fonts.primaryFont_500}
            marginTop={'auto'}
          />
        </View>

        <Image
          sourceFile={{ uri: props.image_url }}
          aspectRatio={'auto'}
          width={100}
          minWidth={100}
          minHeight={100}
          height={100}
          borderRadius={8}
        />
      </View>
    </Button>
  );
}
