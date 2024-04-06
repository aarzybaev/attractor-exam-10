import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from './axiosApi.ts';

export interface NewsApi {
  id: string;
  newsHeader: string;
  image: string | null;
  createdAt: string;
}

export interface NewsItem extends NewsApi {
  newsContent: string;
}

export interface NewsFormMutation {
  newsHeader: string;
  newsContent: string;
  image: File | null;
}


export interface CommentsApi {
  id: string;
  newsID: string;
  author: string;
  commentText: string;
}

export interface CommentsFormMutation {
  newsID: string;
  author: string;
  commentText: string;
}

// export const fetchComments = createAsyncThunk<CommentsApi[]>(
//   'comments/fetchAll',
//   async () => {
//     const {data: comments} = await axiosApi.get<CommentsApi[]>('/news');
//     return comments;
//   }
// );