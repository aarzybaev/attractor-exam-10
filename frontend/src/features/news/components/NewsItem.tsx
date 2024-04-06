import React from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, Typography } from '@mui/material';
import { Link as NavLink } from 'react-router-dom';

import { apiURL } from '../../../constants.ts';
import { NewsApi } from '../../../types';
import dayjs from 'dayjs';

interface Props {
  removeHandler: (id: string) => void;
  item: NewsApi;
}
const NewsItem: React.FC<Props> = ({removeHandler, item}) => {

  return (
  <Grid item xs>
    <Card>
      <CardHeader
        title={"Author: " + item.newsHeader}
        subheader={dayjs(item.createdAt).format('DD/MM/YYYY HH:mm')}
      />
      {item.image && <CardMedia
        component="img"
        height="194"
        image={apiURL + '/' + item.image}
        alt={item.newsHeader}
        sx={{ maxWidth: 500 }}
      />}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {item.newsHeader}
        </Typography>
      </CardContent>

      <CardActions>
        <Grid container justifyContent="space-between">
          <Grid item>
            <NavLink to={`/news/${item.id}`}>Read Full Post</NavLink>
          </Grid>
          <Grid>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={() => removeHandler(item.id)}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </CardActions>

    </Card>
  </Grid>
  );
};
export default NewsItem;