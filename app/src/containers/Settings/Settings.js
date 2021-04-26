import React, { useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";

const DATA = [
  {
    id: "Modifiy Personal Information",
    title: "Modifiy Personal Information",
  },
  {
    id: "Modify Email",
    title: "Modify Email",
  },
  {
    id: "Modify Sim",
    title: "Modify Sim",
  },
  {
    id: "About App",
    title: "About App",
  },
  {
    id: "Need Assistance",
    title: "Need Assistance",
  },
  {
    id: "Privacy Policy",
    title: "Privacy Policy",
  },
  {
    id: "Terms & Conditions",
    title: "Terms & Conditions",
  },

];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

const Settings = () => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    // const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    // const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={ 'white' }
        textColor={'black'}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
      backgroundColor:'white',
      flex: 1,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,

  },
});

export default Settings;