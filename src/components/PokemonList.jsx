import React from "react";
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform,
  PlatformColor,
} from "react-native";
import PokemonCard from "./PokemonCard";

export default function PokemonList(props) {
  const { pokemons, loadPokemons, isNext, isLoading } = props;

  const loadMore = () => {
    loadPokemons();
  };

  return (
    <FlatList
      data={pokemons}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      keyExtractor={(pokemon) => String(pokemon.id)}
      renderItem={({ item }) => <PokemonCard pokemon={item} />}
      contentContainerStyle={styles.flatListContentContainer}
      onEndReached={!isLoading && isNext && loadMore}
      onEndReachedThreshold={0.1}
      ListFooterComponent={
        isLoading &&
        isNext && (
          <ActivityIndicator size="large" color="#000" style={styles.spinner} />
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingHorizontal: 5,
    marginTop: Platform.OS === "android" ? 30 : 0,
  },
  spinner: {
    marginTop: 20,
    marginBottom: 60,
  },
});
