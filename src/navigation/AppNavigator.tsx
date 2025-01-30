import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from '@screens/HomeScreen';
import { ManageLocationScreen } from '@screens/ManageLocationScreen';
import { SettingsScreen } from '@screens/SettingsScreen';

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  ManageLocation: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: 'transparent',
        },
      }}
    >
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTransparent: true,
        }}
      >
        <Stack.Screen
          component={ManageLocationScreen}
          name="ManageLocation"
          options={{
            animation: 'reveal_from_bottom',
          }}
        />
        <Stack.Screen
          component={HomeScreen}
          name="Home"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen component={SettingsScreen} name="Settings" />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
