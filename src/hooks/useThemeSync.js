import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../features/ui/uiSlice.js";
import { useLocalStorage } from "./useLocalStorage.js";

export function useThemeSync() {
  const dispatch = useDispatch();
  const theme = useSelector((s) => s.ui.theme);
  const [storedTheme, setStoredTheme] = useLocalStorage(
    "taskorbit.theme",
    theme,
  );

  useEffect(() => {
    if (storedTheme && storedTheme !== theme) {
      dispatch(setTheme(storedTheme));
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const isDark = theme === "dark";
    root.classList.toggle("dark", isDark);
    setStoredTheme(theme);
  }, [theme, setStoredTheme]);
}
