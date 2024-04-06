import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { NewsApi, NewsFormMutation, NewsItem } from '../../types';
export const fetchNews = createAsyncThunk<NewsApi[]>(
  'news/fetchAll',
  async () => {
    const messagesResponse = await axiosApi.get<NewsApi[]>('/news');
    return messagesResponse.data;
  }
);

export const fetchOne = createAsyncThunk<NewsItem, string>(
  'news/fetchOne',
  async (id) => {

    const {data: newsItem} = await axiosApi.get<NewsItem | null>(`/news/${id}`);
    if (newsItem === null) {
      throw new Error('Not found');
    }
    return newsItem;

  },
);
export const createNews = createAsyncThunk<void, NewsFormMutation>(
  'news/create',
   async ( newsForm: NewsFormMutation) => {
    const formData = new FormData();
    const keys = Object.keys(newsForm) as (keyof NewsFormMutation)[];

    keys.forEach(key => {
      const value = newsForm[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });

    try {
       await axiosApi.post('/news', formData);
    } catch (e) {
      console.error(e);
    }

  }
);

export const removeNews = createAsyncThunk<void, string>(
  'news/remove',
  async (id) => {
    await axiosApi.delete('/news/' + id);
  }
);