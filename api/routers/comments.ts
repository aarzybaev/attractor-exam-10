import express from 'express';
import commentsFileDb from "../commentsFileDb";
import {Comments} from "../types";

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res) => {
    try {
        const queryNewsId: string | undefined = req.query.news_id as string;
        const comments = await commentsFileDb.getItems(queryNewsId);
        return res.json(comments);
    } catch (e) {
        console.error(e);
    }
});


commentsRouter.post('/', async (req, res) => {
    const newsID = req.body.newsID;
    let author = req.body.author;
    const commentText = req.body.commentText;
    if (
        newsID === undefined ||
        (/^\s*$/.test(newsID)) ||
        author === undefined ||
        commentText === undefined ||
        (/^\s*$/.test(commentText))
    ) {
        return res.status(404).json({"error": "News ID and comment text must be present in the request"});
    }

    author = (/^\s*$/.test(author))? 'Anonymous' : author;

    const newComment: Comments  = {
        newsID,
        author,
        commentText
    };

    try {
        const response = await commentsFileDb.addItem(newComment);
        if(response) {
            return res.send({message: 'success'});
        } else {
            return res.status(404).json({"error": `News with ID: ${newsID} not found`});
        }

    } catch (e) {
        console.error(e);
    }
});

commentsRouter.delete('/:id', async (req, res) => {

    try {
        const id = req.params.id;
        const status = await commentsFileDb.removeItem(id);
        return status ? res.json({"message": "success"}) : res.status(404).json({"error": "Not found"});
    } catch (e) {
        console.error(e);
    }
});

export default commentsRouter;