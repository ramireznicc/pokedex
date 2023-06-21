import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Home } from "./components/Home/Home";
import { Pokedex } from "./components/Pokedex/Pokedex";
import { Theme } from "./context/Theme/Theme";
import { PokeProvider } from "./context/PokeContext/PokeContext";

function App() {
  return (
    <PokeProvider>
      <BrowserRouter>
        <ThemeProvider theme={Theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokedex" element={<Pokedex />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </PokeProvider>
  );
}

export default App;
