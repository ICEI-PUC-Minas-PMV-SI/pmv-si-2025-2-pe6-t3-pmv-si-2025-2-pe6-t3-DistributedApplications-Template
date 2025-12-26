import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Toast from "react-native-toast-message";
import LoadingComponent from './src/components/Loading';
import { LoadingProvider } from './src/context/loadingContext';
import checkout from './src/screens/checkout';
import HomeScreen from "./src/screens/home";
import LoginScreen from "./src/screens/login";
import NewOrdersScreen from "./src/screens/newOrders";
import NewProductScreen from './src/screens/newProduct';
import NewReservationScreen from './src/screens/newReservation';
import NewUserScreen from './src/screens/newUser';
import PedidosScreen from "./src/screens/pedidos";
import ProductsScreen from './src/screens/products';
import QuartosCheckin from './src/screens/QuartosCheckin';
import ReservationsScreen from './src/screens/reservations';
import RoomsScreen from "./src/screens/rooms";

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
    <LoadingProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Rooms" component={RoomsScreen} />
          <Stack.Screen name="Reservations" component={ReservationsScreen} />
          <Stack.Screen name="NewReservation" component={NewReservationScreen} />
          <Stack.Screen name="NewUser" component={NewUserScreen} />
          <Stack.Screen name="Products" component={ProductsScreen} />
          <Stack.Screen name="NewProduct" component={NewProductScreen} />
          <Stack.Screen name="Pedidos" component={PedidosScreen} />
          <Stack.Screen name="NewOrders" component={NewOrdersScreen} />
          <Stack.Screen name="CheckinRoom" component={QuartosCheckin} />
          <Stack.Screen name="Checkout" component={checkout} />
        </Stack.Navigator>
      </NavigationContainer>
      <LoadingComponent />
    </LoadingProvider>
    <Toast />
    </>
  );
}
