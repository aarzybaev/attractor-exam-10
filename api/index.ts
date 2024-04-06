import express from 'express';
import cors from 'cors';
import newsRouter from "./routers/news";
import commentsRouter from "./routers/comments";
import newsFileDb from "./newsFileDb";
import commentsFileDb from "./commentsFileDb";

const app = express();
const port  = 8000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.use('/news', newsRouter);
app.use('/comments', commentsRouter);


const run = async () => {
    await newsFileDb.init();
    await commentsFileDb.init();

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
};

void run();