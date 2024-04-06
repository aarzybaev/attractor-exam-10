import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectOneNews, selectOneNewsFetching } from '../newsSlice.ts';
import { useEffect } from 'react';
import { fetchOne } from '../newsThunks.ts';
import { Box, Grid, LinearProgress, Typography } from '@mui/material';
import dayjs from 'dayjs';
import Comments from '../../comments/Comments.tsx';

const NewsFull = () => {
  const  {id} = useParams();
  const dispatch = useAppDispatch();
  const Loading = useAppSelector(selectOneNewsFetching);
  const newsItem = useAppSelector(selectOneNews);
  useEffect(() => {
    if (id) {
      dispatch(fetchOne(id));
    }
  }, [dispatch, id]);

  const progress = (<Box sx={{ width: '100%' }}>
    <LinearProgress/>
  </Box>);

  return Loading ? progress : (
      newsItem && <Grid container direction="column">
        <Grid item>
          <Typography variant="h4" gutterBottom>
            {newsItem.newsHeader}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" gutterBottom>
            {dayjs(newsItem.createdAt).format('DD/MM/YYYY HH:mm')}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5" gutterBottom>
            {newsItem.newsContent}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h4" gutterBottom>
            Comments
          </Typography>
        </Grid>
        <Grid item>
          <Comments newsID={id} />
        </Grid>

      </Grid>
  );
};

export default NewsFull;