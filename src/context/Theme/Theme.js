import { createTheme } from "@mui/material/styles";

export const Theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#689db5",
    },
    secondary: {
      main: "#e8d29d",
    },
    background: {
      default: "#b94a49",
      paper: "#434343",
    },
    text: {
      primary: "#dededc",
      dark: "#434343",
    },
  },
  typography: {
    fontFamily: "VT323",
  },
});
