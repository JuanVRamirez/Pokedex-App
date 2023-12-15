import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function Stats(props) {
  const { stats } = props;
  return (
    <View style={styles.content}>
      <Text style={styles.title}>Base Stats</Text>
      {stats.map((item, index) => (
        <View key={index} style={styles.block}>
          <Text>{item.stat.name}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    marginTop: 40,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    paddingBottom: 5,
  },
});
