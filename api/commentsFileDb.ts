import { promises as fs } from 'fs';
import crypto from "crypto";
import {Comments, CommentsApi} from "./types";
import newsFileDb from "./newsFileDb";

const filename = './commentsDb.json';
let data: CommentsApi[] = [];

const commentsFileDb = {
    async init() {
        try {
            const fileContents = await fs.readFile(filename);
            data = JSON.parse(fileContents.toString());
        } catch (e) {
            data = [];
        }
    },
    async getItems(newsID: string | undefined) {
        if (newsID) {
            return data.filter(item => item.newsID === newsID);
        }
        return data;
    },
    async addItem(item: Comments) {
        if (await newsFileDb.isExistID(item.newsID)) {
            const commentItem= {
                id: crypto.randomUUID(),
                ...item
            };
            data.push(commentItem);
            await this.save();
            return true;
        }

        return false;

    },
    async removeItem(id: string) {
        const index = data.findIndex(item => item.id === id);
        if (index === -1) return false;
        data.splice(index, 1);
        await this.save();
        return true;
    },
    async removeItemsByNewsId(id: string) {
       const filteredItems = data.filter(item => item.newsID !== id);
       data = [...filteredItems];
       await this.save();
    },
    async save() {
        return fs.writeFile(filename, JSON.stringify(data, null, 2));
    }
};

export default commentsFileDb;