import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../app/store";
import { setTheme } from "../../theme/model/themeSlice";

export const useTheme = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();

  const changeTheme = (newTheme: "dark" | "light") => {
    dispatch(setTheme(newTheme));
  };

  return { theme, setTheme: changeTheme };
};