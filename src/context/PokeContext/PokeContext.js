import { createContext } from "react";
import { usePokedex } from "../../hooks/usePokedex";

const PokeContext = createContext();

export const PokeProvider = ({ children }) => {
  return (
    <PokeContext.Provider value={usePokedex()}>{children}</PokeContext.Provider>
  );
};

export default PokeContext;
