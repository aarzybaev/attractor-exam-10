import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { NewsApi, NewsItem } from '../../types';
import { createNews, fetchNews, fetchOne } from './newsThunks.ts';


interface NewsSlice {
  items: NewsApi[];
  newsItem: NewsItem | null;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  createLoading: boolean;
}

const initialState: NewsSlice = {
  items: [],
  newsItem: null,
  fetchLoading: false,
  fetchOneLoading: false,
  createLoading: false,

};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNews.pending, (state) => {
      state.fetchLoading = true;
    }).addCase(fetchNews.fulfilled, (state, {payload: news}) => {
      state.fetchLoading = false;
      state.items = news;
    }).addCase(fetchNews.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(fetchOne.pending, (state) => {
      state.fetchOneLoading = true;
    }).addCase(fetchOne.fulfilled, (state, {payload: item}) => {
      state.newsItem = item;
      state.fetchOneLoading = false;

    }).addCase(fetchOne.rejected, (state) => {
      state.fetchOneLoading = false;
    });

    builder.addCase(createNews.pending, (state) => {
      state.createLoading = true;
    }).addCase(createNews.fulfilled, (state) => {
      state.createLoading = false;
    }).addCase(createNews.rejected, (state) => {
      state.createLoading = false;
    });
  }
});


export const newsReducer = newsSlice.reducer;
export const selectNews = (state: RootState) => state.news.items;
export const selectOneNews = (state: RootState) => state.news.newsItem;
export const selectNewsFetching = (state: RootState) => state.news.fetchLoading;
export const selectOneNewsFetching = (state: RootState) => state.news.fetchOneLoading;

export const selectNewsCreating = (state: RootState) => state.news.createLoading;