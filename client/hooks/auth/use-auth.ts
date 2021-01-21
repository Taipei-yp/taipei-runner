import { useSelector } from "react-redux";
import { authSelector } from "client/redux/user/user-selectors";

const useAuth = () => {
  const isAuthorized = useSelector(authSelector);

  return {
    isAuthorized,
  };
};

export { useAuth };
