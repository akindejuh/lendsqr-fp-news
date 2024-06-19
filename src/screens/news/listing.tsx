import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TextStyle,
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

const NewsListingScreen: FunctionComponent = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const { error, items, isError, isLoading, page } =
    useAppSelector(getNewsListingState);
  const data_items = items.flatMap(item => item.data);

  const [search, setSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const retryFetch = () => {
    dispatch(
      getNewsListingThunk({
        page: currentPage.toString(),
        search,
      }),
    );
  };

  const fetchNextPage = () => {
    if (page.current_page < page.total_page && data_items?.length > 0) {
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
        refreshing={isLoading && data_items?.length > 0}
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
        <ActivityIndicator />
      </View>
    );
  };

  return (
    <Screen preset="fixed">
      <View
        marginTop={20}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <Text
          text="Headlines"
          fontFamily={fonts.primaryFont_500}
          fontSize={19}
        />
        <Button text="Throw Error" preset="link" textStyle={ERROR_TEXT} />
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
          <Text text="Something went wrong" fontSize={14} marginBottom={1} />
          {error && (
            <Text text={error} fontSize={12} marginBottom={3} color={'red'} />
          )}
          <Button preset="link" onPress={retryFetch} text="Retry" />
        </View>
      )}

      {isLoading && data_items?.length === 0 && !isError && (
        <View flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator color={colors.grayText} />
        </View>
      )}

      {data_items?.length > 0 && !isError && (
        <FlatList
          renderItem={({ item, index }) => (
            <NewsListingComp
              key={`${item?.id}-${index.toString()}`}
              {...item}
            />
          )}
          data={data_items}
          refreshControl={onRefetchNews()}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `${item?.id}-${index}`}
          windowSize={5}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          onEndReachedThreshold={0.5}
          onEndReached={() => fetchNextPage()}
          ListFooterComponent={renderListFooterComp()}
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
