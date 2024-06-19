import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { UINewsListing } from 'src/domain/news';
import { Text, Button } from '..';
import { colors } from 'src/design-system';

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
      // TODO: Throw Error
    }
  };

  return (
    <Button
      marginBottom={10}
      onPress={() => navToNewsDetailsScreen(props.id)}
      borderRadius={8}
      height={200}
      backgroundColor={colors.primary}
      // backgroundColor={colors.background}
    >
      <Text text={props.title} />
    </Button>
  );
}
