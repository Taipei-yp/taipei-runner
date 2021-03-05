type Theme = {
  id: number;
  theme: string;
  description?: string;
};
type UserThemeResponce = {
  id: number;
  user_id: number;
  theme: Theme;
  description?: string;
};
export { Theme, UserThemeResponce };
