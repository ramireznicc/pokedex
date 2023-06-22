import {
  Typography,
  Box,
  Button,
  IconButton,
  Switch,
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
import HeightIcon from "@mui/icons-material/Height";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

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

  const { image, textColor } = checkShiny();

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
        // LOADING
        <CircularProgress color="secondary" />
      ) : error ? (
        // ERROR
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
        // BUTTONS
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
          <Stack p="8px">
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
            IMAGE
          </Divider>
          <Stack
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
          <Stack direction="row" alignItems="center" pb="8px">
            <Typography color={shiny ? "background.default" : "disabled"}>
              Normal
            </Typography>
            <Switch
              color="secondary"
              defaultChecked={false}
              checked={shiny}
              onChange={handleShiny}
            />
            <Typography color={shiny ? "secondary" : "background.default"}>
              Shiny
            </Typography>
          </Stack>

          {showData ? (
            // INFO
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
                {/* TYPES */}
                <Box>
                  <Typography textAlign="center" variant="h6">
                    {pokemonData.types.length > 1 ? "- Types -" : "- Type -"}
                  </Typography>
                  <Stack gap="12px" width="100%" alignItems="center">
                    {pokemonData.types.map((type) => (
                      <Card key={type.type.name}>
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="center"
                          gap="8px"
                        >
                          <Box
                            component="img"
                            src={`../../../images/poke-types/${type.type.name}.png`}
                            sx={{ height: "32px", width: "32px" }}
                          ></Box>
                          <Typography variant="h6">
                            {type.type.name.toUpperCase()}
                          </Typography>
                        </Stack>
                      </Card>
                    ))}
                  </Stack>
                </Box>
                {/* WEIGHT AND HEIGHT */}
                <Box>
                  <Typography textAlign="center" variant="h6">
                    - Weight & Height -
                  </Typography>
                  <Stack gap="12px" width="100%" alignItems="center">
                    <Card
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                      }}
                    >
                      <FitnessCenterIcon />
                      <Typography variant="h6">
                        {pokemonData.weight} kg
                      </Typography>
                    </Card>
                    <Card
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                      }}
                    >
                      <HeightIcon />
                      <Typography variant="h6">
                        {pokemonData.height} mts
                      </Typography>
                    </Card>
                  </Stack>
                </Box>
                {/* STATS */}
                <Box>
                  <Typography textAlign="center" variant="h6">
                    - Stats -
                  </Typography>
                  <Stack gap="12px" width="100%" alignItems="center">
                    {pokemonData.stats.map((stat) => (
                      <Card key={stat.stat.name}>
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
