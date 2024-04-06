import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useAppSelector } from '../../../app/hooks.ts';
import { CommentsFormMutation } from '../../../types';
import { selectCommentCreating } from '../commentsSlice.ts';

interface Props {
  formHandler: (item: CommentsFormMutation) => void;
  newsID: string|undefined;
}

const initialState: CommentsFormMutation = {
  newsID: '',
  author: '',
  commentText: ''
};
const CommentsForm: React.FC<Props> = ({
  formHandler,
  newsID
}) => {
  const [state, setState] = useState<CommentsFormMutation>(initialState);
  const Loading = useAppSelector(selectCommentCreating);

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newsID) {
      formHandler({...state, newsID});
    }
    setState(initialState);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  return (
    <form
      autoComplete="off"
      onSubmit={submitFormHandler}
    >
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            id="author" label="Name"
            value={state.author}
            onChange={inputChangeHandler}
            name="author"
          />
        </Grid>
        <Grid item xs>
          <TextField
            id="commentText" label="Comment"
            value={state.commentText}
            onChange={inputChangeHandler}
            name="commentText"
            multiline={true}
            rows={5}
            required
          />
        </Grid>

        <Grid item xs>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={Loading}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CommentsForm;