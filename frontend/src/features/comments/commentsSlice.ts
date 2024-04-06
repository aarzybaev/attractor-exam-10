import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { CommentsApi } from '../../types';
import { createComment, fetchComments } from './commentsThunks.ts';


interface CommentsSlice {
  items: CommentsApi[];
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: CommentsSlice = {
  items: [],
  fetchLoading: false,
  createLoading: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.fetchLoading = true;
    }).addCase(fetchComments.fulfilled, (state, {payload: comments}) => {
      state.fetchLoading = false;
      state.items = comments;
    }).addCase(fetchComments.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(createComment.pending, (state) => {
      state.createLoading = true;
    }).addCase(createComment.fulfilled, (state) => {
      state.createLoading = false;
    }).addCase(createComment.rejected, (state) => {
      state.createLoading = false;
    });
  }
});


export const commentsReducer = commentsSlice.reducer;
export const selectComments= (state: RootState) => state.comments.items;
export const selectCommentsFetching = (state: RootState) => state.comments.fetchLoading;
export const selectCommentCreating = (state: RootState) => state.comments.createLoading;