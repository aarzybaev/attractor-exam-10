import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';

interface Props {
  id: string;
  author: string;
  commentText: string;
  removeHandler: (id: string) => void;
}
const CommentsItem: React.FC<Props> = ({
  removeHandler,
  id,
  author,
  commentText
}) => {

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {author} wrote: {commentText}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={() => removeHandler(id)}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </CardContent>

    </Card>
  );
};

export default CommentsItem;