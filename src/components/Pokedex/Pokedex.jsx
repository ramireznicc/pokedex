import {
  Typography,
  Box,
  Button,
  Tooltip,
  IconButton,
  Stack,
} from "@mui/material";
import { useContext } from "react";
import PokeContext from "../../context/PokeContext/PokeContext";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export const Pokedex = () => {
  const {
    loading,
    error,
    pokemonData,
    checkShiny,
    shiny,
    handleShiny,
    handlePrevious,
    handleNext,
  } = useContext(PokeContext);

  const { image, tooltip, iconColor, textColor } = checkShiny();

  return loading ? (
    <CircularProgress color="secondary" />
  ) : error ? (
    <>
      <Button LinkComponent={Link} to="/">
        Search another pokemon
      </Button>
      <Typography variant="h3">Pokemon not found</Typography>
    </>
  ) : (
    <>
      <Button LinkComponent={Link} to="/">
        Search another pokemon
      </Button>
      <Stack my="16px">
        {shiny ? (
          <Typography
            lineHeight="0px"
            color="secondary"
            variant="body"
            textAlign="center"
          >
            - Shiny -
          </Typography>
        ) : null}
        <Typography
          lineHeight="62px"
          color={textColor}
          textTransform="capitalize"
          variant="h2"
        >
          {pokemonData.name}
        </Typography>
      </Stack>
      <Typography variant="h4" color="primary">
        #{pokemonData.number}
      </Typography>
      <Stack px="10px" direction="row" alignItems="center">
        <IconButton color="primary" onClick={handlePrevious}>
          <NavigateBeforeIcon fontSize="large" />
        </IconButton>
        <Box
          alt="pokemon image"
          component="img"
          src={image}
          sx={{
            widht: { xs: "300px", md: "360px" },
            height: { xs: "300px", md: "360px" },
            border: "1px solid rgba(0, 0, 0, 0.3)",
            borderRadius: "50%",
            backgroundColor: "primary.main",
          }}
        ></Box>
        <IconButton color="primary" onClick={handleNext}>
          <NavigateNextIcon fontSize="large" />
        </IconButton>
      </Stack>
      <Tooltip title={tooltip}>
        <IconButton sx={{ my: "26px" }} color={iconColor} onClick={handleShiny}>
          <AutoAwesomeIcon fontSize="large" />
        </IconButton>
      </Tooltip>
    </>
  );
};
