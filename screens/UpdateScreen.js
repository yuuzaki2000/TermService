import React from "react";
import { View, Text } from "react-native";

export default function UpdateScreen({ route }) {
  const id = route.params.id;
  return (
    <View>
      <Text>{id}</Text>
      <Text>UpdateScreen</Text>
    </View>
  );
}
