import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { MessageMutation, MessageWithID } from '../../types';
export const fetchMessages = createAsyncThunk<MessageWithID[]>(
  'messages/fetchAll',
  async () => {
    const messagesResponse = await axiosApi.get<MessageWithID[]>('/messages');
    return messagesResponse.data;
  }
);
export const createMessage = createAsyncThunk<void, MessageMutation>(
  'messages/create',
   async ( messagesMutation) => {
    const formData = new FormData();
    const keys = Object.keys(messagesMutation) as (keyof MessageMutation)[];

    keys.forEach(key => {
      const value = messagesMutation[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });

    try {
       await axiosApi.post('/messages', formData);
    } catch (e) {
      console.error(e);
    }

  }
);