import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, Container, ThemeProvider } from "@mui/material";
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
          <Container
            disableGutters
            sx={{
              width: { xs: "90%", md: "560px" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pokedex" element={<Pokedex />} />
            </Routes>
          </Container>
        </ThemeProvider>
      </BrowserRouter>
    </PokeProvider>
  );
}

export default App;
