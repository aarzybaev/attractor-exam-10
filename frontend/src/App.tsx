import AppToolbar from './components/UI/AppToolbar/AppToolbar.tsx';
import { Container, Typography } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import News from './features/news/News.tsx';
import NewsForm from './features/news/components/NewsForm.tsx';
import NewsFull from './features/news/components/NewsFull.tsx';

function App() {
  return (
    <>
      <header>
        <AppToolbar/>
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<News />} />
            <Route path="/news/new" element={<NewsForm />} />
            <Route path="/news/:id" element={<NewsFull />} />
            <Route path="*" element={<Typography variant="h1">Not found!</Typography>} />
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
