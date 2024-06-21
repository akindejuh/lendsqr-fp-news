import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  RefreshControl,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { fonts } from 'src/assets/fonts/fonts';
import {
  Button,
  NewsListingComp,
  Screen,
  Text,
  TextField,
  View,
} from 'src/components';
import { colors } from 'src/design-system';
import {
  getNewsListingState,
  getNewsListingThunk,
  clearNewsListing,
} from 'src/redux/slice/news/listing-slice';
import { useAppDispatch, useAppSelector } from 'src/redux/store';
import crashlytics from '@react-native-firebase/crashlytics';
import { logCrashlystics } from 'src/utils/crashlytics-handler';

const NewsListingScreen: FunctionComponent = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const { items, isError, isLoading, page } =
    useAppSelector(getNewsListingState);
  const data_items = items.flatMap(item => item.data);

  const data_items_memo = useMemo(() => data_items, [data_items]);

  const [search, setSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const crashTheApp = () => {
    logCrashlystics('Crashing the app now!');
    crashlytics().crash();
  };

  const retryFetch = () => {
    dispatch(
      getNewsListingThunk({
        page: currentPage.toString(),
        search,
      }),
    );
  };

  const fetchNextPage = () => {
    if (page.current_page < page.total_page && data_items_memo?.length > 0) {
      setCurrentPage(currentPage + 1);
    }
    return;
  };

  useEffect(() => {
    dispatch(clearNewsListing());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getNewsListingThunk({
        page: currentPage.toString(),
        search,
      }),
    );
  }, [search, currentPage, dispatch]);

  const onRefetchNews = () => {
    return (
      <RefreshControl
        refreshing={isLoading && data_items_memo?.length > 0}
        onRefresh={() => {
          if (search === '' && currentPage === 1) {
            dispatch(
              getNewsListingThunk({
                page: '1',
                search: '',
              }),
            );
          } else {
            setSearch('');
            setCurrentPage(1);
          }
        }}
      />
    );
  };

  const renderListFooterComp = (): React.JSX.Element => {
    return (
      <View>
        <ActivityIndicator color={colors().grayText} />
      </View>
    );
  };

  return (
    <Screen preset="fixed">
      <View
        marginTop={Platform.OS === 'ios' ? 20 : 30}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <Text
          text="Headlines"
          fontFamily={fonts.primaryFont_500}
          fontSize={19}
        />
        <Button
          text="Throw Error"
          preset="link"
          textStyle={ERROR_TEXT}
          onPress={crashTheApp}
        />
      </View>

      <TextField
        value={search}
        setValue={setSearch}
        placeholder="Search..."
        marginTop={10}
        marginBottom={10}
      />

      {isError && (
        <View flex={1} justifyContent="center" alignItems="center">
          <Text
            text="Something went wrong"
            fontSize={14}
            marginBottom={1}
            color={'red'}
          />
          <Button preset="link" onPress={retryFetch} text="Retry" />
        </View>
      )}

      {isLoading && data_items_memo?.length === 0 && !isError && (
        <View flex={1} justifyContent="flex-start" alignItems="center">
          <View marginBottom={40}>
            <Text text="DISCLAMER:" fontFamily={fonts.primaryFont_700} />
            <Text
              text="Please note that this loading state may take a minute or two to load on your first launch, as the API is hosted on a free server. If it doesn't load within a few minutes, kindly exit the app and try again. Thank you for your patience!"
              fontSize={14}
              fontFamily={fonts.primaryFont_400}
            />
          </View>
          <ActivityIndicator color={colors().grayText} style={LOAD_STATE} />
        </View>
      )}

      {data_items_memo?.length > 0 && !isError && (
        <FlatList
          renderItem={({ item, index }) => (
            <NewsListingComp
              key={`${item?.id}-${index.toString()}`}
              {...item}
            />
          )}
          data={data_items_memo}
          refreshControl={onRefetchNews()}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `${item?.id}-${index}`}
          windowSize={8}
          initialNumToRender={8}
          maxToRenderPerBatch={8}
          onEndReachedThreshold={0.5}
          onEndReached={() => fetchNextPage()}
          ListFooterComponent={renderListFooterComp()}
          style={FLAT_LIST}
        />
      )}
    </Screen>
  );
};

export default NewsListingScreen;

const ERROR_TEXT: TextStyle = {
  color: 'red',
  fontFamily: fonts.primaryFont_500,
  fontSize: 14,
};

const FLAT_LIST: ViewStyle = {
  paddingTop: 10,
};

const LOAD_STATE: ViewStyle = {
  justifyContent: 'center',
  flex: 1,
};
