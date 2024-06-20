import React, { FunctionComponent, useEffect } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import {
  BackButton,
  Button,
  Icon,
  Image,
  Screen,
  Text,
  View,
} from 'src/components';
import { AppStackParamList } from 'src/routes/types';
import { useAppDispatch, useAppSelector } from 'src/redux/store';
import {
  clearNewsDetail,
  getNewsDetailState,
  getNewsDetailThunk,
} from 'src/redux/slice/news/detail-slice';
import {
  ActivityIndicator,
  Platform,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';
import { colors } from 'src/design-system';
import { fonts } from 'src/assets/fonts/fonts';
import RenderHTML, { RenderHTMLSourceProps } from 'react-native-render-html';
import { formatDate } from 'src/utils/format-date';
import Share from 'react-native-share';
import { infoToast, successToast } from 'src/helpers';
import { recordCrashlyticsError } from 'src/utils/crashlytics-handler';

const NewsDetailsScreen: FunctionComponent = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const route = useRoute<RouteProp<AppStackParamList, 'NewsDetailsScreen'>>();
  const { news_id } = route.params;

  const { width } = useWindowDimensions();

  const {
    audience_score,
    author,
    content,
    image_url,
    isError,
    isLoading,
    publication_date,
    summary,
    title,
    id,
  } = useAppSelector(getNewsDetailState);

  const contentData: RenderHTMLSourceProps = {
    source: {
      html: content ?? '',
    },
  };

  const contentStyle = {
    p: {
      color: colors.grayText,
      fontFamily: fonts.primaryFont_400,
      marginTop: 0,
    },
  };

  const shareNews = async () => {
    try {
      const result = await Share.open({
        message: 'Share this news?',
        url: `https://www.google.com/${id}`,
      });

      if (result.success) {
        successToast({
          message: 'Link shared successfully!',
        });
      }

      if (result.dismissedAction) {
        infoToast({
          message: 'Sharing Dismissed!',
        });
      }
    } catch (err) {
      recordCrashlyticsError(err);
    }
  };

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
      <View
        marginBottom={5}
        marginTop={Platform.OS === 'ios' ? 10 : 30}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <BackButton />

        <Button
          onPress={shareNews}
          backgroundColor={colors.transparent}
          width={50}
          alignItems="flex-end"
          children={<Icon name="share" size={20} style={ICON} />}
        />
      </View>

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

      {isLoading && !isError && (
        <View flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator color={colors.grayText} />
        </View>
      )}

      {!isLoading && !isError && (
        <Screen unsafe paddingHorizontal={0} preset="scroll">
          <Text
            text={title}
            fontFamily={fonts.primaryFont_700}
            marginTop={10}
            fontSize={19}
          />
          <Text
            text={formatDate(publication_date)}
            fontSize={13}
            marginTop={2}
          />

          <Image
            sourceFile={{
              uri: image_url,
            }}
            marginTop={20}
            borderRadius={8}
          />

          <View
            marginTop={10}
            marginBottom={10}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between">
            <Text
              text={author}
              fontSize={14}
              fontFamily={fonts.primaryFont_500}
              color={colors.secondary}
            />
            <View flexDirection="row" alignItems="center">
              <Text text={'Score: '} fontSize={14} color={colors.linkText} />
              <Text
                text={`${Math.round(audience_score)}%`}
                fontSize={14}
                fontFamily={fonts.primaryFont_500}
              />
            </View>
          </View>

          {summary && (
            <>
              <Text
                text="Summary"
                fontFamily={fonts.primaryFont_700}
                marginBottom={2}
                marginTop={10}
              />
              <Text text={summary} fontSize={14} />
            </>
          )}

          {content && (
            <>
              <Text
                text="Content"
                fontFamily={fonts.primaryFont_700}
                marginBottom={2}
                marginTop={15}
              />
              <RenderHTML
                contentWidth={width}
                source={contentData.source}
                tagsStyles={contentStyle}
              />
            </>
          )}
        </Screen>
      )}
    </Screen>
  );
};

export default NewsDetailsScreen;

const ICON = {
  color: colors.inputPLText,
} as ViewStyle;
