import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { getPokemonDetailsApi } from "../src/api/usePokemon";
import Icon from "react-native-vector-icons/FontAwesome5";
import Header from "../src/components/Pokemon/Header";
import Type from "../src/components/Pokemon/Type";
import Stats from "../src/components/Pokemon/Stats";
import Favorite from "../src/components/Pokemon/Favorite";
import useAuth from "../src/hooks/useAuth";

export default function Pokemon(props) {
  const {
    navigation,
    route: { params },
  } = props;

  const [pokemon, setPokemon] = useState();
  const { auth } = useAuth();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => auth && <Favorite />,
      headerLeft: () => (
        <Icon
          name="arrow-left"
          color="#FFF"
          size={20}
          onPress={navigation.goBack}
        />
      ),
    });
  }, [navigation, params]);

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
