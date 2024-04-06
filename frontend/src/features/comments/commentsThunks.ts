import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { CommentsApi, CommentsFormMutation } from '../../types';
export const fetchComments = createAsyncThunk<CommentsApi[], string|undefined>(
  'comments/fetchAll',
  async (id: string|undefined) => {

    if (id === undefined) {
      const {data: comments} = await axiosApi.get<CommentsApi[]>('/news');
      return comments;
    } else {
      const {data: comments} = await axiosApi.get<CommentsApi[]>(`/comments?news_id=${id}`);
      return comments;
    }

  }
);

// export const fetchById = createAsyncThunk<CommentsApi[], string>(
//   'comments/fetchById',
//   async (id) => {
//     const {data: comments} = await axiosApi.get<CommentsApi[]>(`/comments?news_id=${id}`);
//     return comments;
//   }
// );
export const createComment = createAsyncThunk<void, CommentsFormMutation>(
  'comments/create',
   async ( commentForm: CommentsFormMutation) => {

    try {
       await axiosApi.post('/comments', commentForm);
    } catch (e) {
      console.error(e);
    }

  }
);

export const removeComment = createAsyncThunk<void, string>(
  'comments/remove',
  async (id) => {
    await axiosApi.delete('/comments/' + id);
  }
);