import React from "react";
import { View, Text } from "react-native";

export default function NextScreen({ route }) {
  const id = route.params.id;
  return (
    <View>
      <Text>{id}</Text>
      <Text>NextScreen</Text>
    </View>
  );
}
