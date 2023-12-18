import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function Favorite() {
  const addFavorite = () => {
    console.log("Añadir a Favoritos");
  };
  return (
    <Icon
      name="heart"
      color={"#FFF"}
      size={25}
      onPress={addFavorite}
      style={{ marginRight: 10 }}
    />
  );
}
