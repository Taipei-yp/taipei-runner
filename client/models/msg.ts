export type Msg = {
  id: number;
  author: {
    firstName: string;
    lastName: string;
    avatar: string;
  };
  createdAt: string;
  text: string;
};
