import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { createMessage, fetchMessages } from './messagesThunks.ts';
import { MessageWithID } from '../../types';

interface MessagesSlice {
  items: MessageWithID[];
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: MessagesSlice = {
  items: [],
  fetchLoading: false,
  createLoading: false,
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.pending, (state) => {
      state.fetchLoading = true;
    }).addCase(fetchMessages.fulfilled, (state, {payload: messages}) => {
      state.fetchLoading = false;
      state.items = messages;
    }).addCase(fetchMessages.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(createMessage.pending, (state) => {
      state.createLoading = true;
    }).addCase(createMessage.fulfilled, (state) => {
      state.createLoading = false;
    }).addCase(createMessage.rejected, (state) => {
      state.createLoading = false;
    });
  }
});


export const messagesReducer = messagesSlice.reducer;
export const selectMessages = (state: RootState) => state.messages.items;
export const selectMessagesFetching = (state: RootState) => state.messages.fetchLoading;
export const selectMessagesCreating = (state: RootState) => state.messages.createLoading;