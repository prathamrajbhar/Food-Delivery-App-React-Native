import React, { useState, useEffect } from 'react';
import { View, Image, Text, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/FoodieMunch/Foodie-Munch/main/FoodAPI.json');
        const data = await response.json();
        const allFoods = [
          ...data.PopularFoodAPI,
          ...data.PunjabiFoodAPI,
          ...data.GujaratiFoodAPI,
        ];
        setFoods(allFoods);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredResults = foods.filter(food => food.name.toLowerCase().includes(query.toLowerCase()));
    setFilteredFoods(filteredResults.length > 0 ? filteredResults : null);
  };

  const renderFoodItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('FoodDetailScreen', { item })}>
      <View style={styles.foodItem}>
        <Image source={{ uri: item.image }} style={styles.foodImage} resizeMode="contain" />
        <Text style={styles.foodName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.SearchTitle}>Search</Text>
      <TextInput
        style={styles.input}
        placeholder="Search food..."
        onChangeText={handleSearch}
        value={searchQuery}
      />
      {filteredFoods !== null ? (
        <FlatList
          data={filteredFoods}
          keyExtractor={(item, index) => `${item.id}_${index}`}
          renderItem={renderFoodItem}
        />
      ) : (
        <Text style={styles.searchTitle}>Search for your favorite food</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  SearchTitle: {
    fontSize: 30,
    marginBottom: 10,
    fontWeight: '700',
    color: '#000',
    marginTop: 20,
  },
  input: {
    height: 60,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 18,
    backgroundColor: '#fff',
    color: '#000',
    marginVertical: 20,
  },
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 0.5,
    paddingBottom: 10,
  },
  foodImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  foodName: {
    fontSize: 18,
    marginLeft: 10,
    color: '#000',
  },
  searchTitle: {
    height: '70%',
    width: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    letterSpacing: 1,
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
  },
});

export default SearchBox;
