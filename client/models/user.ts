type User = {
  id: number | null;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  display_name: string;
  avatar?: string | null;
};
type SignUpUser = Omit<User, "id" | "avatar" | "display_name">;
type SignInUser = Pick<User, "login" | "password">;
type UserProfile = Omit<User, "id" | "password" | "avatar">;

export { SignInUser, SignUpUser, User, UserProfile };
