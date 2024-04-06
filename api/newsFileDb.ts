import { promises as fs } from 'fs';
import {News, NewsApi, NewsApiWoNewsContent} from "./types";
import crypto from "crypto";

const filename = './newsDb.json';
let data: NewsApi[] = [];

const newsFileDb = {
    async init() {
        try {
            const fileContents = await fs.readFile(filename);
            data = JSON.parse(fileContents.toString());
        } catch (e) {
            data = [];
        }
    },
    async getItems() {
        const newData: NewsApiWoNewsContent[] = data.map(item =>
            ({id: item.id, newsHeader: item.newsHeader, image: item.image, createdAt: item.createdAt})
        );
        return newData;
    },
    async getItemById(id: string) {
        return data.find(item => item.id === id);
    },
    async addItem(item: News) {
        const newsItem = {
            id: crypto.randomUUID(),
            ...item
        };
        data.push(newsItem);
        await this.save();
        return {id: newsItem.id, newsHeader: newsItem.newsHeader};
    },
    async removeItem(id: string) {
        const index = data.findIndex(item => item.id === id);
        if (index === -1) return false;
        data.splice(index, 1);
        await this.save();
        return true;
    },

    async save() {
        return fs.writeFile(filename, JSON.stringify(data, null, 2));
    },

    async isExistID(id: string) {
        return !!data.find(item => item.id === id);
    }
};

export default newsFileDb;