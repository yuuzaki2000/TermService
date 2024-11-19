import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as SQLite from "expo-sqlite";

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [explanation, setExplanation] = useState("");

  useEffect(() => {
    async function showPresentData() {
      try {
        const db = await SQLite.openDatabaseAsync("term_service.db");
        await db.execAsync(
          `CREATE TABLE IF NOT EXISTS term (id INTEGER PRIMARY KEY NOT NULL, title INTEGER NOT NULL, explanation TEXT);`
        );
        const results = await db.getAllAsync(`SELECT * FROM term`);
        console.log("Results", results);
        setData(results);
      } catch (error) {
        console.log("Error", error);
      }
    }
    showPresentData();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Update", { id: item.id })}
      >
        <View>
          <Text>{item.title}</Text>
          <Text>{item.explanation}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <Text style={{ fontSize: 20 }}>タイトル：</Text>
        <TextInput
          style={styles.titleBox}
          multiline={true}
          numberOfLines={2}
          placeholder="タイトル名を入力"
          value={title}
          onChangeText={(txt) => setTitle(txt)}
        />
        <Text style={{ fontSize: 20 }}>説明：</Text>
        <TextInput
          style={styles.titleBox}
          multiline={true}
          numberOfLines={4}
          placeholder="説明を記載"
          value={explanation}
          onChangeText={(txt) => setExplanation(txt)}
        />
      </View>
      <Button
        title="データベースにデータを追加"
        onPress={() => {
          async function insertData() {
            try {
              const db = await SQLite.openDatabaseAsync("term_service.db");
              await db.execAsync(`
                        CREATE TABLE IF NOT EXISTS term ( id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, explanation INTEGER);
                        INSERT INTO term (title, explanation) VALUES ('${title}','${explanation}');
                      `);
              const results = await db.getAllAsync(`
                        SELECT * FROM term;
                      `);
              console.log("results", results);
              setData(results);
              setTitle("");
              setExplanation("");
            } catch (error) {
              console.log("Error", error);
            }
          }
          insertData();
        }}
      />
      <Text>要素数：{data.length}</Text>
      <FlatList
        style={styles.flatlist}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  upperContainer: {
    marginTop: 50,
  },
  titleBox: {
    width: "100%",
    borderWidth: 1,
    borderColor: "black",
    fontSize: 20,
  },
  flatlist: {
    marginTop: 50,
    width: "100%",
  },
});
