import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { getPokemonDetailsApi } from "../src/api/usePokemon";
import Header from "../src/components/Pokemon/Header";
import Type from "../src/components/Pokemon/Type";
import Stats from "../src/components/Pokemon/Stats";

export default function Pokemon(props) {
  const {
    nagivation,
    route: { params },
  } = props;

  const [pokemon, setPokemon] = useState();

  console.log(params.id);

  useEffect(() => {
    (async () => {
      try {
        const response = await getPokemonDetailsApi(params.id);
        setPokemon(response);
      } catch (error) {
        navigation.goBack();
      }
    })();
  }, [params]);

  if (!pokemon) return null;

  return (
    <ScrollView>
      <Header
        name={pokemon.name}
        order={pokemon.order}
        image={pokemon.sprites.other["official-artwork"].front_default}
        type={pokemon.types[0].type.name}
      />
      <Type types={pokemon.types} />
      <Stats stats={pokemon.stats} />
    </ScrollView>
  );
}
