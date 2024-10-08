import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { registerRootComponent } from 'expo';  // Required to start the app

const App: React.FC = () => {
  // State to store the list of players (string array)
  const [players, setPlayers] = useState<string[]>([]);
  const [name, setName] = useState<string>('');

  // Function to add a player to the leaderboard
  const addPlayer = () => {
    if (name.trim()) {
      setPlayers([...players, name]);
      setName(''); // Clear the input after adding
    }
  };

  // Function to remove a player from the leaderboard
  const removePlayer = (index: number) => {
    const updatedPlayers = players.filter((_, i) => i !== index);
    setPlayers(updatedPlayers);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>

      {/* Input field for adding new players */}
      <TextInput
        style={styles.input}
        placeholder="Enter player's name"
        value={name}
        onChangeText={setName}
      />

      {/* Button to add player */}
      <Button title="Add Player" onPress={addPlayer} />

      {/* Display the list of players */}
      <FlatList
        data={players}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.playerRow}>
            <Text style={styles.playerName}>{item}</Text>
            <Button
              title="Remove"
              onPress={() => removePlayer(index)}
              color="#ff0000"
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  playerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  playerName: {
    fontSize: 18,
  },
});

// Register the component to be the root of the app
registerRootComponent(App);
