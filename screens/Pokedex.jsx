import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import {
  getPokemonApi,
  getPokemonDetailsByUrlApi,
} from "../src/api/usePokemon";
import PokemonList from "../src/components/PokemonList";

function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      await loadPokemons();
    })();
  }, []);

  const loadPokemons = async () => {
    try {
      setLoading(true);
      const response = await getPokemonApi(nextUrl);
      setNextUrl(response.next);

      const pokemonsArray = await Promise.all(
        response.results.map(async (pokemon) => {
          const pokemonDetails = await getPokemonDetailsByUrlApi(pokemon.url);
          return {
            id: pokemonDetails.id,
            name: pokemonDetails.name,
            type: pokemonDetails.types[0].type.name,
            order: pokemonDetails.order,
            image:
              pokemonDetails.sprites.other["official-artwork"].front_default,
          };
        })
      );

      setPokemons([...pokemons, ...pokemonsArray]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <PokemonList
        pokemons={pokemons}
        loadPokemons={loadPokemons}
        isNext={nextUrl}
        isLoading={loading}
      />
    </SafeAreaView>
  );
}

export default Pokedex;
