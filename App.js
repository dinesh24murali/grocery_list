/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
// import RNBootSplash from "react-native-bootsplash";
// import {
//   useColorScheme,
// } from 'react-native';
import { useTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Products from './src/screens/products/index';
import HomeScreen from './src/screens/homeScreen/index';
import AddProduct from './src/screens/addEditProduct/index';
import AddGroceryList from './src/screens/addEditGroceryList/index';
import AppProvider from './src/store/store';
import appTheme from './src/constants/theme';
import routes from './src/constants/routes';

const { home, products, addProduct, addGroceryList } = routes;

const Stack = createNativeStackNavigator();

const App = () => {
  const { colors } = useTheme();
  // const isDarkMode = useColorScheme() === 'dark';

  return (
    <Stack.Navigator
      initialRouteName={home}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}>
      <Stack.Screen
        name={home}
        component={HomeScreen}
        options={{
          title: 'Grocery list',
        }}
      />
      <Stack.Screen
        name={products}
        component={Products}
        options={{ title: 'Product List' }}
      />
      <Stack.Screen
        name={addProduct}
        component={AddProduct}
        options={{ title: 'Add new Product' }}
      />
      <Stack.Screen
        name={addGroceryList}
        component={AddGroceryList}
        options={{ title: 'Create Grocery List' }}
      />
    </Stack.Navigator>
  );
};

const AppWrapper = () => {


  // React.useEffect(() => {
  //   (async function appInit() {
  //     await RNBootSplash.hide({ fade: true, duration: 250 });
  //   })();
  // }, []);

  return (
    <SafeAreaProvider>
      <AppProvider>
        <NavigationContainer theme={appTheme}>
          <App />
        </NavigationContainer>
      </AppProvider>
    </SafeAreaProvider>
  );
};

export default AppWrapper;
