import React, { FunctionComponent, useEffect } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Button, Screen, Text, View } from 'src/components';
import { AppStackParamList } from 'src/routes/types';
import { useAppDispatch, useAppSelector } from 'src/redux/store';
import {
  clearNewsDetail,
  getNewsDetailState,
  getNewsDetailThunk,
} from 'src/redux/slice/news/detail-slice';
import { ActivityIndicator } from 'react-native';
import { colors } from 'src/design-system';

const NewsDetailsScreen: FunctionComponent = (): React.JSX.Element => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<AppStackParamList, 'NewsDetailsScreen'>>();

  const newsData = useAppSelector(getNewsDetailState);

  const { news_id } = route.params;

  console.log(newsData);

  const retryFetch = () => {
    dispatch(
      getNewsDetailThunk({
        news_id,
      }),
    );
  };

  useEffect(() => {
    dispatch(clearNewsDetail());
    dispatch(getNewsDetailThunk({ news_id }));
  }, [dispatch, news_id]);

  return (
    <Screen baseAllowance={10}>
      {newsData?.error && (
        <View flex={1} justifyContent="center" alignItems="center">
          <Text text="Something went wrong" fontSize={14} marginBottom={1} />
          {newsData?.error && (
            <Text
              text={newsData?.error}
              fontSize={12}
              marginBottom={3}
              color={'red'}
            />
          )}
          <Button preset="link" onPress={retryFetch} text="Retry" />
        </View>
      )}

      {newsData?.isLoading && !newsData?.isError && (
        <View flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator color={colors.grayText} />
        </View>
      )}
      {/* <Text text="News Screen" marginTop={20} />
      <Text text={JSON.stringify(route)} marginTop={20} />
      <Button
        text="Go Back"
        marginTop={'auto'}
        onPress={() => navigation.goBack()}
      /> */}
    </Screen>
  );
};

export default NewsDetailsScreen;
