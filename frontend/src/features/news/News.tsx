import { Box, Button, Grid, LinearProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useEffect } from 'react';
import NewsItem from './components/NewsItem.tsx';
import { selectNews, selectNewsFetching } from './newsSlice.ts';
import { fetchNews, removeNews } from './newsThunks.ts';

const News = () => {
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectNews);
  const fetchLoading = useAppSelector(selectNewsFetching);


  useEffect( () => {
    dispatch(fetchNews());
  }, [dispatch]);

  const navigate = useNavigate();

  const progress = (<Box sx={{ width: '100%' }}>
                                  <LinearProgress/>
                                </Box>);

  const newPostHandler = () => {
    navigate('/news/new');
  };

  const removeNewsHandler = async (id: string) => {
    await dispatch(removeNews(id));
    dispatch(fetchNews());
  }

  return fetchLoading ? progress : (
    <>
      <Grid container direction="column" gap={2}>
        <Grid container item direction="row" justifyContent="space-between">
          <Grid item>
            <Typography variant="h4" sx={{mb: 2}}>Posts</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={newPostHandler}>Add new Post</Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="column" gap={1} sx={{mt: 3}}>
        {news.map(item => (
          <NewsItem
            removeHandler={removeNewsHandler}
            key={item.id}
            item={item} />
        ))}
      </Grid>
    </>
  );
};

export default News;