import React, { useState } from "react";
import "./App.scss";
import Button from "@mui/material/Button";
import { ClipLoader } from "react-spinners";
import PokemonCard from "./PokemonCard";

interface Pokemon {
  name: string;
  types: { type: { name: string } }[];
  sprites: {
    front_default: string;
    stats: { base_stat: number }[];
  };
  id: number;
  stats: { base_stat: number; stat: { name: string } }[];
}

const App: React.FC = () => {
  const [pokemonName, setPokemonName] = useState<string>("");
  const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Add loading state
  const [error, setError] = useState<string | null>(null);

  const fetchPokemon = async () => {
    setLoading(true);
    setError(null);
    setPokemonData(null);

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      if (!response.ok) {
        throw new Error("Pokemon not found!");
      }
      const data: Pokemon = await response.json();
      setPokemonData(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPokemonName(event.target.value.toLowerCase());
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchPokemon();
  };

  return (
    <div className="container">
      <div className="top-of-app">
        <h1>Pokemon Search Engine!</h1>
      </div>
      <p>Search a Pokemons name to get its info!</p>
      <form onSubmit={handleSubmit}>
        <input type="text" value={pokemonName} onChange={handleInputChange} />
        <Button variant="contained" type="submit" color="warning">
          Search
        </Button>
      </form>

      {loading ? (
        <div className="loading-spinner">
          <ClipLoader size={30} />
        </div>
      ) : (
        <>
          {error && <p>{error}</p>}
          {pokemonData && <PokemonCard pokemonData={pokemonData} />}
        </>
      )}
    </div>
  );
};

export default App;
