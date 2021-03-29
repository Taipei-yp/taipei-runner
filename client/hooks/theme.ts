import { useSelector } from "react-redux";
import { themeSelector } from "client/redux/theme/theme-selectors";

const useTheme = () => {
  const { now } = useSelector(themeSelector);

  return {
    nowTheme: now,
  };
};

export { useTheme };
