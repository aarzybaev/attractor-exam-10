import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { NewsFormMutation } from '../../../types';
import FileInput from '../../../components/UI/FileInput/FileInput.tsx';
import { createNews } from '../newsThunks.ts';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectNewsCreating } from '../newsSlice.ts';


const initialState: NewsFormMutation = {
  newsHeader: '',
  newsContent: '',
  image: null
};
const NewsForm = () => {
  const [state, setState] = useState<NewsFormMutation>(initialState);
  const dispatch = useAppDispatch();
  const Loading = useAppSelector(selectNewsCreating);

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createNews(state));
    setState(initialState);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };
  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setState(prevState => ({
        ...prevState, [name]: files[0]
      }));
    }
  };

  return (
    <form
      autoComplete="off"
      onSubmit={submitFormHandler}
    >
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            id="newsHeader" label="New header"
            value={state.newsHeader}
            onChange={inputChangeHandler}
            name="newsHeader"
            required
          />
        </Grid>
        <Grid item xs>
          <TextField
            id="newsContent" label="News content"
            value={state.newsContent}
            onChange={inputChangeHandler}
            name="newsContent"
            multiline={true}
            rows={5}
            required
          />
        </Grid>
        <Grid item xs>
          <FileInput
            label="Image"
            name="image"
            onChange={fileInputChangeHandler}
          />
        </Grid>
        <Grid item xs>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={Loading}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default NewsForm;