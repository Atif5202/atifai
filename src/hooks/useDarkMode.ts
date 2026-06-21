import { useGlobalTheme } from "../context/ThemeContext";

export function useDarkMode() {
  return useGlobalTheme();
}
