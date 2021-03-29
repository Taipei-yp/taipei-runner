import { User } from "./user";

export type Message = {
  id: number;
  text: string;
  author: User;
  createdAt: string;
  reply: Message[] | undefined;
  parent_id: number;
  likes: number;
};

export type Topic = {
  id: number;
  name: string;
  createdAt: string;
  message: Message;
};
