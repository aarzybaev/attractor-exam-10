export interface NewsApi {
  id: string;
  newsHeader: string;
  image: string | null;
  createdAt: string;
}

export interface NewsItem extends NewsApi {
  newsContent: string;
}

export interface NewsFormMutation {
  newsHeader: string;
  newsContent: string;
  image: File | null;
}


export interface CommentsApi {
  id: string;
  newsID: string;
  author: string;
  commentText: string;
}

export interface CommentsFormMutation {
  newsID: string;
  author: string;
  commentText: string;
}

