import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import type {AppProps} from "next/app";
import {ThemeProvider} from "@mui/material/styles";
import {CssBaseline, createTheme, Box, useMediaQuery} from "@mui/material";
import "@/styles/globals.css";
import {createContext, useEffect, useState} from "react";

export const DarkMode = createContext<{
    darkMode: boolean,
    setDarkMode: (mode: boolean) => void
}>({
    darkMode: false,
    setDarkMode: () => {
    },
});
const theme = (mode?: "light" | "dark") => createTheme({
    palette: {
        mode: mode || "light",
        primary: {
            main: "#f44336",
        },
        secondary: {
            main: "#3f51b5",
        },
    },
});

export default function App({Component, pageProps}: AppProps) {
    const [darkMode, setDarkMode] = useState(false);
    const print = useMediaQuery("print")

    return (<>
        <DarkMode.Provider value={{darkMode, setDarkMode}}>
            <ThemeProvider theme={theme(darkMode && !print ? "dark" : "light")}>
                <CssBaseline>
                    <Component {...pageProps} />
                </CssBaseline>
            </ThemeProvider>
        </DarkMode.Provider>
    </>);
}
