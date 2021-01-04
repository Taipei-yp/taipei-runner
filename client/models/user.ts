type User = {
  id: number;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  display_name: string;
  avatar?: string;
};
type SignUpUser = Omit<User, "id" | "role" | "avatar">;
type SignInUser = Pick<User, "login" | "password">;

export { User, SignInUser, SignUpUser };