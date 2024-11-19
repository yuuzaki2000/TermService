import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import * as SQLite from "expo-sqlite";

export default function UpdateScreen({ route }) {
  const id = route.params.id;
  const [title, setTitle] = useState("");
  const [explanation, setExplanation] = useState("");

  useEffect(() => {
    async function showPresentData() {
      try {
        const db = await SQLite.openDatabaseAsync("term_service.db");
        await db.execAsync(
          `CREATE TABLE IF NOT EXISTS term (id INTEGER PRIMARY KEY NOT NULL, title INTEGER NOT NULL, explanation TEXT);`
        );
        const results = await db.getFirstAsync(`
            SELECT * FROM term WHERE id = ${id}`);
        console.log(results);
        setTitle(results.title);
        setExplanation(results.explanation);
      } catch (error) {
        console.log("Error", error);
      }
    }
    showPresentData();
  }, []);

  return (
    <View>
      <Text>{id}</Text>
      <Text>UpdateScreen</Text>
      <View style={styles.upperContainer}>
        <Text style={{ fontSize: 15 }}>タイトル：</Text>
        <TextInput
          style={styles.titleBox}
          multiline={true}
          numberOfLines={2}
          value={title}
          onChangeText={(txt) => setTitle(txt)}
        />
        <Text style={{ fontSize: 15 }}>説明：</Text>
        <TextInput
          style={styles.titleBox}
          multiline={true}
          numberOfLines={4}
          value={explanation}
          onChangeText={(txt) => setExplanation(txt)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleBox: {
    width: "100%",
    borderWidth: 1,
    borderColor: "black",
    fontSize: 15,
  },
});
