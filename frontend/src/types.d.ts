export interface Message {
  author: string;
  message: string;
  image: string | null;
  createdAt?: string;
}

export interface MessageWithID extends Message {
  id: string;
}



export interface MessageMutation {
  author: string;
  message: string;
  image: File | null;
}