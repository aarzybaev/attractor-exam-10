export interface News {
    newsHeader: string;
    newsContent: string;
    image: string | null;
    createdAt: string;
}

export interface NewsApi extends News {
    id: string;
}

export type NewsApiWoNewsContent  = Omit<NewsApi, 'newsContent'>;

export interface Comments {
    newsID: string;
    author: string;
    commentText: string;
}

export interface CommentsApi extends Comments {
    id: string;
}