import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeBaseProvider } from "native-base";
import { Provider } from "react-redux";
import { Icon } from "native-base";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// Screens
import HomeScreen from "./features/home/HomeScreen";
import MovieDetailsScreen from "./features/movie_details/MovieDetailsScreen";
import MyListScreen from "./features/my_list/MyListScreen";

import { store } from "./redux/store";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case "HomeTab":
              iconName = "home";
              break;
            case "MyList":
              iconName = "list";
              break;
            default:
              iconName = "home";
          }

          return (
            <Icon 
              as={MaterialIcons} 
              name={iconName} 
              size={size} 
              color={color} 
            />
          );
        },
        tabBarActiveTintColor: "#2196F3",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: "#E0E0E0",
          paddingTop: 0,
         
        }
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen} 
        options={{ title: "Home" }}
      />
      <Tab.Screen 
        name="MyList" 
        component={MyListScreen} 
        options={{ title: "My List" }}
      />
    </Tab.Navigator>
  );
}

function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{ 
        headerShown: false,
        animation: 'slide_from_right'
      }}
      initialRouteName="MainTabs"
    >
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}