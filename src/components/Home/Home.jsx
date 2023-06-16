import { TextField, Typography, Stack, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import PokeContext from "../../context/PokeContext/PokeContext";

export const Home = () => {
  const navigate = useNavigate();
  const { setPokemon } = useContext(PokeContext);
  const [toSearch, setToSearch] = useState("");

  const handleChange = (e) => {
    setToSearch(e.target.value.toLowerCase());
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && toSearch !== "") {
      handleOnClick();
    }
  };

  const handleOnClick = () => {
    setPokemon(toSearch);
    navigate("/pokedex");
  };

  return (
    <>
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
    </>
  );
};
