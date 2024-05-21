import React from "react";

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

interface Props {
  pokemonData: Pokemon;
}

const PokemonCard: React.FC<Props> = ({ pokemonData }) => {
  const getHP = (pokemon: Pokemon): number => {
    const hpStat = pokemon.stats.find((stat) => stat.stat.name === "hp");
    return hpStat ? hpStat.base_stat : 0;
  };

  return (
    <div className="box">
      <div className="innerBox">
        <div className="title">
          <h2 className="pokemonName">{pokemonData.name}</h2>
          <h3 className="pokemonHP">HP : {getHP(pokemonData)}</h3>
        </div>
        <div className="imageBorder">
          <img
            className="pokemonSprite"
            src={pokemonData.sprites.front_default}
            alt={pokemonData.name}
          />
        </div>
        <div className="poke-info">
          <h4 className="pokemonID">PokeDex ID : {pokemonData.id}</h4>
          <ul className="pokemonTypes">
            {pokemonData.types.map((type, index) => (
              <li key={index}>{type.type.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
