import React, { createContext, useContext, useEffect, useState } from "react";
import { PokemonListItem } from "../types";
import { getPokemonList } from "../api";

interface PokemonContextType {
  list: PokemonListItem[];
  loading: boolean;
}

const PokemonContext = createContext<PokemonContextType>({
  list: [],
  loading: true,
});

export const PokemonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [list, setList] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPokemonList().then((data) => {
      setList(data);
      setLoading(false);
    });
  }, []);

  return (
    <PokemonContext.Provider value={{ list, loading }}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = () => useContext(PokemonContext);
