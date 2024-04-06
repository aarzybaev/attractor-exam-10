import { Box, Grid, LinearProgress, Typography } from '@mui/material';
import MessageForm from './components/MessageForm.tsx';
import { MessageMutation } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { createMessage, fetchMessages } from './messagesThunks.ts';
import { useEffect } from 'react';
import { selectMessages, selectMessagesCreating, selectMessagesFetching } from './messagesSlice.ts';
import MessageItem from './components/MessageItem.tsx';

const Messages = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectMessages);
  const createLoading = useAppSelector(selectMessagesCreating);
  const fetchLoading = useAppSelector(selectMessagesFetching);
  const onFormSubmit = async (messageMutation: MessageMutation) => {
    await dispatch(createMessage(messageMutation));
          dispatch(fetchMessages());
  };

  useEffect( () => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const progress = (<Box sx={{ width: '100%' }}>
                                  <LinearProgress/>
                                </Box>);
  return fetchLoading ? progress : (
    <>
      <Grid container direction="column" gap={2}>
        <Grid item>
          <Grid item>
            <Typography variant="h4" sx={{mb: 2}}>Messages</Typography>
          </Grid>
          <Grid item>
            <MessageForm onSubmit={onFormSubmit} Loading={createLoading}/>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="column" gap={1} sx={{mt: 3}}>
        {messages.map(item => (
          <MessageItem
            key={item.id}
            item={item} />
        ))}
      </Grid>
    </>
  );
};

export default Messages;