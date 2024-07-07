import React from 'react';
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/Screens/HomeScreen';
import GujaratiFood from './src/Screens/GujaratiFood';
import PopularFood from './src/Screens/PopularFood';
import BurgerFood from './src/Screens/BurgerFood';
import CakeFood from './src/Screens/CakeFood';
import FoodDetailScreen from './src/Screens/FoodDetailScreen';
import CartScreen from './src/Screens/CartScreen';
import OrderPlace from './src/Screens/OrderPlace';
import AppStatusBar from './src/Screens/AppStatusBar';
import BottomNavigation from './src/Screens/BottomNavigation';
import LoginScreen from './src/Screens/LoginScreen';
import Profile from './src/Screens/setting/Profile';
import EditProfile from './src/Screens/setting/EditProfile';
import Addresses from './src/Screens/setting/Addresses';
import AddAddressScreen from './src/Screens/setting/AddAddressScreen';
import FavouriteScreen from './src/Screens/setting/FavouriteScreen';
import EditAddressScreen from './src/Screens/setting/EditAddressScreen';
import GujaratiFoodViewAll from './src/Screens/GujaratiFoodViewAll';
import PubjabiFood from './src/Screens/PunjabiFood';
import PopularFoodViewALl from './src/Screens/PopularFoodViewAll';
import FoodConformation from './src/Screens/FoodConformation';
import MainScreen from './src/Screens/MainScreen';
import NotificationScreen from './src/Screens/setting/NotificationScreen';
import FAQsScreen from './src/Screens/setting/FAQsScreen';
import DailyFood from './src/Screens/setting/DailyFood';
import SouthIndianFood from './src/Screens/SouthIndianFood';
import SearchBox from './src/Screens/SearchBox';
import PaynemtMethod from './src/Screens/setting/PaynmentMethod';
import ReviewsScreen from './src/Screens/setting/ReviewsScreen';
import PunjabiFoodViewAll from './src/Screens/PunjabiFoodViewAll';
import SouthIndianFoodViewAll from './src/Screens/SouthIndianFoodViewAll';
import PizzaFoodViewAll from './src/Screens/PizzaFoodViewAll';
import RoolsFoodViewAll from './src/Screens/RollsFoodViewAll';

const cart = require('./src/img/cart.png');
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <AppStatusBar
          backgroundColor="#fff"
          barStyle="dark-content"
        />
        <Stack.Navigator>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              headerShown: false,
              headerTitle: () => (
                <Text style={styles.AppTitle}>Your Custom App Title</Text>
              ),
            }}
          />
          <Stack.Screen
            name="GujaratiFood"
            component={GujaratiFood}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GujaratiFoodViewAll"
            component={GujaratiFoodViewAll}
            options={{
              headerShown: true, headerTitle: () => (
                <Text style={{ fontSize: 23, fontWeight: '700', color: '#525562' }}>Gujarati Food</Text>
              )
            }
            }
          />
          <Stack.Screen
            name="PunjabiFoodViewAll"
            component={PunjabiFoodViewAll}
            options={{
              headerShown: true, headerTitle: () => (
                <Text style={{ fontSize: 23, fontWeight: '700', color: '#525562' }}>Punjabi Food</Text>
              )
            }
            }
          />
          <Stack.Screen
            name="SouthIndianFoodViewAll"
            component={SouthIndianFoodViewAll}
            options={{
              headerShown: true, headerTitle: () => (
                <Text style={{ fontSize: 23, fontWeight: '700', color: '#525562' }}>South Indian Food</Text>
              )
            }
            }
          />
          <Stack.Screen
            name="PopularFoodViewALl"
            component={PopularFoodViewALl}
            options={{
              headerShown: true, headerTitle: () => (
                <Text style={{ fontSize: 23, fontWeight: '700', color: '#525562' }}>Popular Food</Text>
              )
            }
            }
          />
          <Stack.Screen
            name="PizzaFoodViewAll"
            component={PizzaFoodViewAll}
            options={{
              headerShown: true, headerTitle: () => (
                <Text style={{ fontSize: 23, fontWeight: '700', color: '#525562' }}>Pizza Food</Text>
              )
            }
            }
          />
          <Stack.Screen
            name="RoolsFoodViewAll"
            component={RoolsFoodViewAll}
            options={{
              headerShown: true, headerTitle: () => (
                <Text style={{ fontSize: 23, fontWeight: '700', color: '#525562' }}>Rools Food</Text>
              )
            }
            }
          />
          <Stack.Screen
            name="PubjabiFood"
            component={PubjabiFood}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PopularFood"
            component={PopularFood}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BurgerFood"
            component={BurgerFood}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CakeFood"
            component={CakeFood}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SouthIndianFood"
            component={SouthIndianFood}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FoodDetailScreen"
            component={FoodDetailScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('CartScreen')}
                  style={styles.cartButton}>
                  <Image source={cart} style={styles.cartIcon} />
                </TouchableOpacity>
              ),
              headerTitle: () => (
                <Text style={styles.CartText}>Food Details</Text>
              ),
            })}
          />
          <Stack.Screen
            name="CartScreen"
            component={CartScreen}
            options={{
              headerTitle: () => (
                <Text style={styles.CartHeader}>Cart</Text>
              ),
            }}
          />
          <Stack.Screen
            name="OrderPlace"
            component={OrderPlace}
            options={{
              headerTitle: () => (
                <Text style={styles.CartHeader}>Order Place</Text>
              ),
            }}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{
              headerTitle: () => (
                <Text style={{ fontSize: 18, fontWeight: '500', color: '#525562' }}>Edit Profile</Text>
              ),
            }}
          />
          <Stack.Screen
            name="Addresses"
            component={Addresses}
            options={{
              headerTitle: () => (
                <Text style={{ fontSize: 18, fontWeight: '500', color: '#525562' }}>My Address</Text>
              ),
            }}
          />
          <Stack.Screen
            name="AddAddressScreen"
            component={AddAddressScreen}
            options={{
              headerTitle: () => (
                <Text style={{ fontSize: 18, fontWeight: '500', color: '#525562' }}>Add Address</Text>
              ),
            }}
          />
          <Stack.Screen
            name="EditAddressScreen"
            component={EditAddressScreen}
            options={{
              headerTitle: () => (
                <Text style={{ fontSize: 18, fontWeight: '500', color: '#525562' }}>Edit Address</Text>
              ),
            }}
          />
          <Stack.Screen
            name="FavouriteScreen"
            component={FavouriteScreen}
            options={{
              headerTitle: () => (
                <Text style={{ fontSize: 18, fontWeight: '500', color: '#525562' }}>Favourite</Text>
              ),
            }}
          />
          <Stack.Screen
            name="FoodConformation"
            component={FoodConformation}
            options={{
              headerTitle: () => (
                <Text style={{ fontSize: 18, fontWeight: '500', color: '#525562' }}>Food Conformation</Text>
              ),
            }}
          />
          <Stack.Screen
            name="NotificationScreen"
            component={NotificationScreen}
            options={{
              headerTitle: () => (
                <Text style={{ fontSize: 18, fontWeight: '500', color: '#525562' }}>Notification</Text>
              ),
            }}
          />
          <Stack.Screen
            name="PaynemtMethod"
            component={PaynemtMethod}
            options={{
              headerTitle: () => (
                <Text style={{ fontSize: 18, fontWeight: '500', color: '#525562' }}>Payment Method</Text>
              ),
            }}
          />
          <Stack.Screen
            name="ReviewsScreen"
            component={ReviewsScreen}
            options={{
              headerTitle: () => (
                <Text style={{ fontSize: 18, fontWeight: '500', color: '#525562' }}>Reviews</Text>
              ),
            }}
          />
          <Stack.Screen
            name="FAQsScreen"
            component={FAQsScreen}
            options={{
              headerTitle: () => (
                <Text style={{ fontSize: 18, fontWeight: '500', color: '#525562' }}>FAQs</Text>
              ),
            }}
          />
          <Stack.Screen
            name="DailyFood"
            component={DailyFood}
            options={{
              headerTitle: () => (
                <Text style={{ fontSize: 18, fontWeight: '500', color: '#525562' }}>Schedule Daily Food</Text>
              ),
            }}
          />
          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SearchBox"
            component={SearchBox}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
        {/* Add the BottomNavigation component */}
        <BottomNavigation />
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  cartButton: {
    width: 40,
    height: 40,
    backgroundColor: '#f5fcff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  CartText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },
  CartHeader: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },
  cartIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  AppTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },

});

export default App;
