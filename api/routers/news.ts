import express from 'express';
import {News} from "../types";
import newsFileDb from "../newsFileDb";
import {imagesUpload} from "../multer";
import commentsFileDb from "../commentsFileDb";
const newsRouter = express.Router();

newsRouter.get('/', async (req, res) => {
    try {
        const news = await newsFileDb.getItems();
        return res.json(news);
    } catch (e) {
        console.error(e);
    }
});

newsRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const newsItem = await newsFileDb.getItemById(id);
        if (!newsItem) {
            return res.status(404).json({error: 'Not found'});
        }
        return res.send(newsItem);
    } catch (e) {
        console.error(e);
    }
});

newsRouter.post('/', imagesUpload.single('image'), async (req, res) => {
    const newsHeader = req.body.newsHeader;
    const newsContent = req.body.newsContent;

    if (
        newsHeader == undefined ||
        (/^\s*$/.test(newsHeader)) ||
        newsContent == undefined ||
        (/^\s*$/.test(newsContent))
    ) {
        return res.status(404).json({"error": "News header and content must be present in the request"});
    }

    const newsItem: News = {
        newsHeader,
        newsContent,
        image: req.file ? req.file.filename : null,
        createdAt: new Date().toISOString(),
    };

    try {
        const savedItem = await newsFileDb.addItem(newsItem);
        return res.send(savedItem);
    } catch (e) {
        console.error(e);
    }
});

newsRouter.delete('/:id', async (req, res) => {

    try {
        const id = req.params.id;
        await commentsFileDb.removeItemsByNewsId(id);
        const status = await newsFileDb.removeItem(id);
        return status ? res.json({"message": "success"}) : res.status(404).json({"error": "Not found"});
    } catch (e) {
        console.error(e);
    }
});

export default newsRouter;