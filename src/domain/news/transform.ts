import {
  ServerNewsDetail,
  ServerNewsListing,
  UINewsDetail,
  UINewsListing,
} from './types';

export function transformNewsListings(
  data: ServerNewsListing[],
): UINewsListing[] {
  return data?.map(item => ({
    id: item?._id,
    title: item?.title,
    image_url: item?.imageUrl,
    topic: item?.topic,
    publication_date: item?.published,
    author: item?.author,
  }));
}

export function transformNewsDetail(data: ServerNewsDetail): UINewsDetail {
  return {
    id: data?._id,
    author: data?.author,
    title: data?.title,
    topic: data?.topic,
    image_url: data?.imageUrl,
    publication_date: data?.published,
    audience_score: data?.audienceScore,
    summary: data?.summary,
    content: data?.content,
  };
}
