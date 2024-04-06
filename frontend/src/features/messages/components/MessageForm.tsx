import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { MessageMutation } from '../../../types';
import FileInput from '../../../components/UI/FileInput/FileInput.tsx';


interface Props {
  onSubmit: (mutation: MessageMutation) => void;
  Loading: boolean;
}

const initialState: MessageMutation = {
  author: '',
  message: '',
  image: null
};
const MessageForm: React.FC<Props> = ({onSubmit, Loading}) => {



  const [state, setState] = useState<MessageMutation>(initialState);
  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
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
            id="author" label="Author"
            value={state.author}
            onChange={inputChangeHandler}
            name="author"
          />
        </Grid>
        <Grid item xs>
          <TextField
            id="message" label="Message"
            value={state.message}
            onChange={inputChangeHandler}
            name="message"
            multiline={true}
            rows={3}
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
          >Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default MessageForm;