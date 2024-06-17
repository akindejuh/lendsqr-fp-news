import instance from 'src/configs/axios';
import {
  GetNewsDetailRequest,
  GetNewsDetailResponse,
  GetNewsListRequest,
  GetNewsListResponse,
} from './types';

export async function getNewsListing(
  payload: GetNewsListRequest,
): Promise<GetNewsListResponse> {
  const response = await instance.get(
    `/news?search=${payload.search}&page=${payload.page}`,
  );
  return response.data;
}

export async function getNewsDetail(
  payload: GetNewsDetailRequest,
): Promise<GetNewsDetailResponse> {
  const response = await instance.get(`/news/${payload.news_id}`);
  return response.data;
}
