import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

import {Names} from '../names/names';

const NameDirectoryFlatList = () => {
  const [expandedSections, setExpandedSections] = useState({});

  // Convert Names.boys into a flat list with headers and items
  const getFlatData = () => {
    const flatData = [];

    Object.entries(Names.boys).forEach(([letter, names]) => {
      flatData.push({ type: 'header', letter });

      if (expandedSections[letter]) {
        names.forEach((nameObj) => {
          flatData.push({ type: 'item', ...nameObj, letter });
        });
      }
    });

    return flatData;
  };

  const toggleSection = (letter) => {
    setExpandedSections((prev) => ({
      // ...prev,
      [letter]: !prev[letter],
    }));
  };

  const renderItem = ({ item }) => {
    if (item.type === 'header') {
      return (
        <TouchableOpacity
          style={styles.header}
          onPress={() => toggleSection(item.letter)}
        >
          <Text style={styles.headerText}>{item.letter}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.item}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.meaning}>{item.meaning}</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={getFlatData()}
      keyExtractor={(item, index) =>
        item.type === 'header' ? `header-${item.letter}` : `${item.name}-${index}`
      }
      renderItem={renderItem}
    />
  );
};

export default NameDirectoryFlatList;
const styles = StyleSheet.create({
    header: {
      backgroundColor: '#4A90E2',
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginVertical: 5,
      borderRadius: 8,
      alignItems: 'center',
    },
    headerText: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
    },
    item: {
      backgroundColor: '#f0f0f0',
      padding: 12,
      marginVertical: 3,
      marginHorizontal: 20,
      borderRadius: 6,
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    meaning: {
      fontSize: 14,
      color: '#555',
    },
  });
  