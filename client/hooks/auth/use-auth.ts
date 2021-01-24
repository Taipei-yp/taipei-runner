import { useSelector } from "react-redux";
import { authStatusSelector } from "client/redux/auth/auth-selectors";

const useAuth = () => {
  const isAuthorized = useSelector(authStatusSelector);

  return {
    isAuthorized,
  };
};

export { useAuth };
