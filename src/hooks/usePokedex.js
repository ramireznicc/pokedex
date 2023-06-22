import { useEffect, useState } from "react";
import axios from "axios";

export const usePokedex = () => {
  const [loading, setLoading] = useState(true);

  const [shiny, setShiny] = useState(false);

  const [pokemon, setPokemon] = useState("");

  const [pokemonData, setPokemonData] = useState({
    name: "",
    image: "",
    imageShiny: "",
    number: 0,
    type: "",
    types: [],
    stats: [],
    weight: 0,
    height: 0,
  });

  const [error, setError] = useState(false);

  const checkShiny = () => {
    let image;
    let text;
    let icon;
    let iconColor;
    let textColor;

    if (shiny) {
      image = pokemonData.imageShiny;
      textColor = "secondary";
    } else {
      image = pokemonData.image;
      textColor = "text.primary";
    }

    return { image, text, icon, iconColor, textColor };
  };

  const URL = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

  useEffect(() => {
    setError(false);
    setLoading(true);

    axios
      .get(URL)
      .then((res) => {
        setPokemonData({
          ...pokemonData,
          name: res.data.name,
          image: res.data.sprites.front_default,
          imageShiny: res.data.sprites.front_shiny,
          number: res.data.id,
          types: res.data.types,
          stats: res.data.stats,
          weight: res.data.weight / 10,
          height: res.data.height / 10,
        });
        setPokemon(res.data.id);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemon]);

  const handleShiny = () => {
    setShiny(!shiny);
  };

  const handlePrevious = () => {
    setPokemon((prev) => prev - 1);
  };

  const handleNext = () => {
    setPokemon((prev) => prev + 1);
  };

  return {
    loading,
    setPokemon,
    pokemonData,
    handleShiny,
    shiny,
    checkShiny,
    error,
    handlePrevious,
    handleNext,
  };
};
