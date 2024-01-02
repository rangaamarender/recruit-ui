import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const toggleTheme = () => {
        const root = document.documentElement;
        root.classList.toggle('dark-theme');
        root.style.setProperty('color-scheme', isDarkTheme ? 'light' : 'dark');
        if (root.classList.contains('dark-theme')) {
            root.style.setProperty('--cui-body-bg', 'var(--custom-body-dark-bg)');

            root.style.setProperty('--cui-body-color', 'cui-body-color');
        } else {
            root.style.setProperty('--cui-body-bg', 'var( --custom-body-light-bg)');

            root.style.setProperty('--cui-body-color', 'cui-body-color');
        }
        setIsDarkTheme((prev) => !prev);
    };

    return <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
