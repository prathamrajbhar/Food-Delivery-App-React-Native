import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Select, NativeBaseProvider } from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const DailyFood = () => {
  const [food, setFood] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedMinute, setSelectedMinute] = useState(null);
  const [selectedAMPM, setSelectedAMPM] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [brackfastFood, setBrackfastFood] = useState([]);
  const [lunchFood, setLunchFood] = useState([]);
  const [dinnerFood, setDinnerFood] = useState([]);

  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const time = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const minutes = ['00', '15', '30', '45'];
  const AMPM = ['AM', 'PM'];
  const categories = ['Breakfast', 'Lunch', 'Dinner'];


  const [BrackfastFoodAPI, setBrackfastFoodData] = useState([]);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/FoodieMunch/Foodie-Munch/main/FoodAPI.json')
      .then((response) => response.json())
      .then((data) => {
        if (data && data.BrackfastFoodAPI) {
          setBrackfastFoodData(data.BrackfastFoodAPI);
        }
        if (data && data.LunchFoodAPI) {
          setLunchFood(data.LunchFoodAPI);
        }
        if (data && data.DinnerFoodAPI) {
          setDinnerFood(data.DinnerFoodAPI);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const toggleDaySelection = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };





  const [storedFullName, setStoredFullName] = useState('');
  const [addressList, setAddressList] = useState([]);
  const handleOrder = async () => {
    try {
      const value = await AsyncStorage.getItem('fullName');
      const storedAddresses = await AsyncStorage.getItem('addresses');
      const parsedAddresses = JSON.parse(storedAddresses);
      if (parsedAddresses) {
        setAddressList(parsedAddresses);
      }
      if (value !== null) {
        setStoredFullName(value);
      }
    }
    catch (e) {
      console.error('Error getting name:', e);
    }
    if (selectedDays.length === 0) {
      alert('Please select at least one day');
      return;
    }
    if (!selectedHour || !selectedMinute || !selectedAMPM) {
      alert('Please select time');
      return;
    }
    if (!food) {
      alert('Please select food');
      return;
    }
    if (!selectedCategory) {
      alert('Please select category');
      return;
    }
    axios
      .post('https://foodie-munch-7505f-default-rtdb.firebaseio.com/DailyFood.json', {
        food,
        CustomerName: storedFullName,
        days: selectedDays,
        time: `${selectedHour}:${selectedMinute} ${selectedAMPM}`,
        category: selectedCategory,
        address: addressList[0].apartment + ' ' + addressList[0].address + ' ' + addressList[0].street + ' ' + addressList[0].postalCode,
      })
      .then((response) => {
        alert('Order placed successfully!');
      })
      .catch((error) => {
        console.error('Error placing order:', error);
      });
  };

  return (
    <NativeBaseProvider>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.label}>Select Day of the Week:</Text>
          <View style={styles.row}>
            {days.map((day) => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.weekButton,
                  { backgroundColor: selectedDays.includes(day) ? '#6f00ff' : '#324EB7' },
                ]}
                onPress={() => toggleDaySelection(day)}
              >
                <Text style={styles.weekText}>{day}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Select Time: </Text>
          <View style={styles.column}>
            <View style={styles.row}>
              <Select
                minW={120}
                bgColor={'#fff'}
                accessibilityLabel="Select Hour"
                selectedValue={selectedHour}
                style={styles.dateInput}
                placeholder="Hours"
                onValueChange={(itemValue) => setSelectedHour(itemValue)}
              >
                {time.map((hour) => (
                  <Select.Item key={hour} label={hour} value={hour} />
                ))}
              </Select>
              <Text style={{ fontSize: 26, fontWeight: 'bold', margin: 5, color: 'black' }}>:</Text>
              <Select
                minW={120}
                bgColor={'#fff'}
                accessibilityLabel="Select Minute"
                selectedValue={selectedMinute}
                style={styles.dateInput}
                placeholder="Minutes"
                onValueChange={(itemValue) => setSelectedMinute(itemValue)}
              >
                {minutes.map((minute) => (
                  <Select.Item key={minute} label={minute} value={minute} />
                ))}

              </Select>
              <Text style={{ fontSize: 26, fontWeight: 'bold', margin: 5, color: 'black' }}>:</Text>
              <Select
                minW={120}
                bgColor={'#fff'}
                accessibilityLabel="Select AM/PM"
                selectedValue={selectedAMPM}
                style={styles.dateInput}
                placeholder="AM/PM"
                onValueChange={(itemValue) => setSelectedAMPM(itemValue)}
              >
                {AMPM.map((ampm) => (
                  <Select.Item key={ampm} label={ampm} value={ampm} />
                ))}
              </Select>
            </View>
          </View>




          <Text style={styles.label}>Choose Food:</Text>
          <Select
            minW={200}
            bgColor={'#fff'}
            accessibilityLabel="Select Food"
            selectedValue={food}
            style={styles.foodInput}
            placeholder="Select Food"
            onValueChange={(itemValue) => setFood(itemValue)}
          >
            <Select.Item label="Breakfast" value="Breakfast" />
            <Select.Item label="Lunch" value="Lunch" />
            <Select.Item label="Dinner" value="Dinner" />
          </Select>

          {food === 'Breakfast' && (
            <View>
              <Text style={styles.label}>Select Food:</Text>
              <Select
                minW={200}
                bgColor={'#fff'}
                accessibilityLabel="Select Food"
                selectedValue={selectedCategory}
                style={styles.foodInput}
                placeholder="Select Food"
                onValueChange={(itemValue) => setSelectedCategory(itemValue)}
              >
                {BrackfastFoodAPI.map((item, index) => (
                  // show name and price
                  <Select.Item key={index} label={item.name} value={item.name} />
                ))}
              </Select>
            </View>
          )}
          {food === 'Lunch' && (
            <View>
              <Text style={styles.label}>Select Food:</Text>
              <Select
                minW={200}
                bgColor={'#fff'}
                accessibilityLabel="Select Food"
                selectedValue={selectedCategory}
                style={styles.foodInput}
                placeholder="Select Food"
                onValueChange={(itemValue) => setSelectedCategory(itemValue)}
              >
                {lunchFood.map((item, index) => (
                  <Select.Item key={index} label={item.name} value={item.name} />
                ))}
              </Select>
            </View>
          )}
          {food === 'Dinner' && (
            <View>
              <Text style={styles.label}>Select Food:</Text>
              <Select
                minW={200}
                bgColor={'#fff'}
                accessibilityLabel="Select Food"
                selectedValue={selectedCategory}
                style={styles.foodInput}
                placeholder="Select Food"
                onValueChange={(itemValue) => setSelectedCategory(itemValue)}
              >
                {dinnerFood.map((item, index) => (
                  <Select.Item key={index} label={item.name} value={item.name} />
                ))}
              </Select>
            </View>
          )}





          <TouchableOpacity style={styles.primaryButton} onPress={handleOrder}>
            <Text style={styles.primaryButtonText}>Order Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weekButton: {
    width: 45,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: 5,

  },
  weekText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    width: '100%',
    textAlign: 'left',
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
    margin: 10,
  },
  dateInput: {
    width: 100,
    height: 40,
    margin: 5,
    backgroundColor: '#fff',
    padding: 10,
    fontSize: 18,
    borderRadius: 5,
  },
  foodInput: {
    width: '100%',
    height: 40,
    margin: 5,
    backgroundColor: '#fff',
    padding: 10,
    fontSize: 18,
    borderRadius: 5,
  },
  primaryButton: {
    marginTop: 30,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E359D',
    borderRadius: 10,
  },
  primaryButtonText: {
    _fontSize: 18,
    get fontSize() {
      return this._fontSize;
    },
    set fontSize(value) {
      this._fontSize = value;
    },
    fontWeight: 'bold',
    color: 'white',
  },
});

export default DailyFood;
