// *REACT IMPORTS
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
// *MATERIAL UI IMPORTS
import {
  TextField,
  Typography,
  Stack,
  IconButton,
  Container,
} from "@mui/material";
// *ICONS IMPORTS
import { Search } from "@mui/icons-material";
// *CUSTOM COMPONENTS IMPORTS
import PokeContext from "../../context/PokeContext/PokeContext";

export const Home = () => {
  const navigate = useNavigate();
  const { setPokemon } = useContext(PokeContext);
  const [toSearch, setToSearch] = useState("");

  const handleChange = (e) => {
    setToSearch(e.target.value.toLowerCase());
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleOnClick();
    }
  };

  const handleOnClick = () => {
    if (toSearch === "") return;
    toSearch.startsWith("0")
      ? setPokemon(toSearch.slice(1))
      : setPokemon(toSearch);
    navigate("/pokedex");
  };

  return (
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
      <Stack gap="6px" alignSelf="flex-start" justifyContent="center" py="24px">
        <Typography lineHeight="4rem" letterSpacing=".2rem" variant="h1">
          Pokedex
        </Typography>
        <Typography color="secondary" letterSpacing=".2rem" variant="body">
          developed by Nicolás Ramirez
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" gap="12px" width="100%">
        <TextField
          onKeyDown={handleKeyPress}
          onChange={handleChange}
          label="Enter the pokemon name or number"
          sx={{ width: { md: "620px", xs: "100%" } }}
        />
        <IconButton onClick={handleOnClick} color="secondary">
          <Search />
        </IconButton>
      </Stack>
    </Container>
  );
};
