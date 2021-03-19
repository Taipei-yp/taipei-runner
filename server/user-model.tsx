export type ServerUser = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  email: string;
  avatar?: string | null;
};
