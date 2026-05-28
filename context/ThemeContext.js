import { createContext, useContext, useState } from "react";

export const LIGHT = {
  bg:              "#ffffff",
  surface:         "#f2f2f2",
  surfaceAlt:      "#fafafa",
  border:          "#e8e8e8",
  borderStrong:    "#000000",
  divider:         "#f0f0f0",
  text:            "#000000",
  textMuted:       "#888888",
  textDim:         "#bbbbbb",
  placeholder:     "#bbbbbb",
  accent:          "#000000",
  accentText:      "#ffffff",
  avatarInactive:  "#cccccc",
  switchTrackOff:  "#e0e0e0",
  statusBar:       "dark",
};

export const DARK = {
  bg:              "#0a0a0a",
  surface:         "#1a1a1a",
  surfaceAlt:      "#141414",
  border:          "#2a2a2a",
  borderStrong:    "#ffffff",
  divider:         "#1e1e1e",
  text:            "#ffffff",
  textMuted:       "#888888",
  textDim:         "#444444",
  placeholder:     "#444444",
  accent:          "#ffffff",
  accentText:      "#000000",
  avatarInactive:  "#333333",
  switchTrackOff:  "#333333",
  statusBar:       "light",
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? DARK : LIGHT;
  const toggleTheme = () => setIsDark((d) => !d);

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
