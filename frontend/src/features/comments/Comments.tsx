import { Box, Grid, LinearProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import React, { useEffect } from 'react';
import { selectComments, selectCommentsFetching } from './commentsSlice.ts';
import { createComment, fetchComments, removeComment } from './commentsThunks.ts';
import CommentsItem from './components/CommentsItem.tsx';
import CommentsForm from './components/CommentsForm.tsx';
import { CommentsFormMutation } from '../../types';

interface Props {
  newsID: string|undefined;
}
const Comments: React.FC<Props> = ({newsID}) => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectComments);
  const fetchLoading = useAppSelector(selectCommentsFetching);

  useEffect( () => {
    dispatch(fetchComments(newsID));
  }, [dispatch, newsID]);


  const progress = (<Box sx={{ width: '100%' }}>
    <LinearProgress/>
  </Box>);

  const onSubmit = async (comment: CommentsFormMutation) => {
    await dispatch(createComment(comment));
    dispatch(fetchComments(newsID));
  };

  const removeCommentHandler = async (id: string) => {
    await dispatch(removeComment(id));
    dispatch(fetchComments(newsID));
  }

  return fetchLoading ? progress : (
    <>
      <Grid container direction="column" gap={1} sx={{mt: 3, mb:3}}>
        {comments.map(item => (
          <CommentsItem
            key={item.id}
            removeHandler={removeCommentHandler}
            id={item.id}
            author={item.author}
            commentText = {item.commentText}

          />
        ))}
      </Grid>
      <CommentsForm
        formHandler={onSubmit}
        newsID={newsID}
      />
    </>
  );
};

export default Comments;