import {
  Typography,
  Box,
  Button,
  IconButton,
  Stack,
  LinearProgress,
  Container,
  Divider,
} from "@mui/material";
import { Card } from "../Card/Card";
import { useContext, useState } from "react";
import PokeContext from "../../context/PokeContext/PokeContext";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ReplyIcon from "@mui/icons-material/Reply";

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

  const [showData, setShowdata] = useState(false);
  const [dataIconText, setDataIconText] = useState({
    icon: <VisibilityIcon />,
    text: "Show Info",
  });

  const { image, text, icon, iconColor, textColor } = checkShiny();

  const typeImage = `../../../images/poke-types/${pokemonData.type}.png`;

  const handlePokemonData = () => {
    setShowdata(!showData);

    showData
      ? setDataIconText({ icon: <VisibilityIcon />, text: "Show Info" })
      : setDataIconText({ icon: <VisibilityOffIcon />, text: "Hide Info" });
  };

  const checkJustify = () => {
    if (loading || error) {
      return "center";
    } else {
      return "flex-start";
    }
  };

  return (
    <Container
      disableGutters
      sx={{
        width: { xs: "90%", md: "560px" },
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: checkJustify(),
        alignItems: "center",
        py: "33px",
      }}
    >
      {loading ? (
        <CircularProgress color="secondary" />
      ) : error ? (
        <Stack gap="16px">
          <Button
            size="small"
            startIcon={<ReplyIcon />}
            disableElevation
            sx={{ borderRadius: "12px" }}
            variant="contained"
            LinkComponent={Link}
            to="/"
            color="secondary"
            fullWidth={false}
          >
            Search another pokemon
          </Button>
          <Typography variant="h3">Pokemon not found</Typography>
        </Stack>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              py: "16px",
            }}
          >
            <Button
              size="small"
              startIcon={<ReplyIcon />}
              disableElevation
              sx={{ borderRadius: "12px", alignSelf: "flex-start" }}
              variant="contained"
              LinkComponent={Link}
              to="/"
              color="secondary"
            >
              Search another pokemon
            </Button>
            <Button
              size="small"
              startIcon={dataIconText.icon}
              disableElevation
              sx={{ borderRadius: "12px" }}
              variant="contained"
              onClick={handlePokemonData}
            >
              {dataIconText.text}
            </Button>
          </Box>
          <Divider
            variant="fullWidth"
            flexItem={true}
            sx={{ color: "primary" }}
          >
            NAME & NUMBER
          </Divider>
          <Stack pb="16px" pt="8px">
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
            <Typography color="primary" variant="h4" textAlign="center">
              #{pokemonData.number}
            </Typography>
          </Stack>
          <Divider
            variant="fullWidth"
            flexItem={true}
            sx={{ color: "primary" }}
          >
            SPRITE
          </Divider>
          <Stack
            py="16px"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <IconButton color="primary" onClick={handlePrevious}>
              <NavigateBeforeIcon fontSize="large" />
            </IconButton>
            <Box
              sx={{
                width: { xs: "200px", md: "260px" },
                height: { xs: "200px", md: "260px" },
              }}
              component="img"
              src={image}
            ></Box>
            <IconButton color="primary" onClick={handleNext}>
              <NavigateNextIcon fontSize="large" />
            </IconButton>
          </Stack>
          <Button
            size="small"
            startIcon={icon}
            disableElevation
            sx={{ my: "16px", borderRadius: "12px" }}
            variant="contained"
            onClick={handleShiny}
            color={iconColor}
          >
            {text}
          </Button>
          {showData ? (
            <>
              <Divider variant="fullWidth" flexItem={true}>
                INFO
              </Divider>
              <Box
                width="100%"
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap="22px"
              >
                <Box>
                  {" "}
                  <Typography variant="h6">Type:</Typography>
                  <Card>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                      gap="6px"
                    >
                      <Box
                        component="img"
                        src={typeImage}
                        sx={{ height: "32px", width: "32px" }}
                      ></Box>
                      <Typography variant="h5">
                        {pokemonData.type.toUpperCase()}
                      </Typography>
                    </Stack>
                  </Card>
                </Box>
                <Box>
                  <Typography variant="h6">Stats:</Typography>
                  <Stack gap="12px" width="100%" alignItems="center">
                    {pokemonData.stats.map((stat) => (
                      <Card
                        sx={{
                          width: "100%",
                        }}
                      >
                        <Stack justifyContent="space-between" direction="row">
                          <Typography>
                            {stat.stat.name.toUpperCase()}
                          </Typography>
                          <Typography color="secondary">
                            {stat.base_stat}
                          </Typography>
                        </Stack>
                        <LinearProgress
                          color="primary"
                          variant="determinate"
                          value={stat.base_stat}
                        />
                      </Card>
                    ))}
                  </Stack>
                </Box>
              </Box>
            </>
          ) : null}
        </>
      )}
    </Container>
  );
};
