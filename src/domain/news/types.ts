// News Listing
export interface UINewsListing {
  id: string;
  title: string;
  image_url: string;
  topic: string;
  author: string;
  publication_date: string;
}
export interface ServerNewsListing {
  _id: string;
  title: string;
  topic: string;
  imageUrl: string;
  author: string;
  published: string;
}
export interface GetNewsListRequest extends PageReq {}
export interface GetNewsListResponse
  extends ServerResponse<PageRes<ServerNewsListing>> {}

// News Detail
export interface UINewsDetail {
  id: string;
  title: string;
  topic: string;
  image_url: string;
  author: string;
  publication_date: string;
  audience_score: number;
  summary: string;
  content: string;
}
export interface ServerNewsDetail {
  _id: string;
  title: string;
  topic: string;
  imageUrl: string;
  author: string;
  published: string;
  audienceScore: number;
  summary: string;
  content: string;
}
export interface GetNewsDetailRequest {
  news_id: string;
}
export interface GetNewsDetailResponse
  extends ServerResponse<ServerNewsDetail> {}
