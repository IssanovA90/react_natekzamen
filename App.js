import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserScreen } from './components/UserScreen';
import { InfoScreen } from "./components/InfoScreen"
import { RegistrsationScreen } from "./components/RegistrsationScreen";
import React from "react";

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RegistrsationScreen">
        <Stack.Screen
          name='UserScreen'
          component={UserScreen}
          options={{ title: 'Пользователи' }}
        />
        <Stack.Screen
          name='InfoScreen'
          component={InfoScreen}
          options={{ title: 'О пользователе' }}
        />
        <Stack.Screen
          name='RegistrsationScreen'
          component={RegistrsationScreen}
          options={{ title: 'Регистрация' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
