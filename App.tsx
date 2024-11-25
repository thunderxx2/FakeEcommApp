import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "./src/navigation/types";
import { NavigationContainer } from "@react-navigation/native";
import { COLORS, SIZES } from "./src/shared/utils/GlobalStyles";
import { LoginScreen } from "./src/features/auth/screens/LoginScreen";
import { BottomTabNavigator } from "./src/navigation/BotttomTabNavigator";
import { ProductDetailScreen } from "./src/features/products/screens/ProductDetailScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: true,
            headerStyle: { backgroundColor: COLORS.white },
            headerShadowVisible: true,
            headerTitleStyle: { color: COLORS.dark, fontSize: 18 },
            contentStyle: { backgroundColor: COLORS.light },
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="MainApp"
            component={BottomTabNavigator}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />

          <Stack.Screen
            name="ProductDetail"
            component={ProductDetailScreen}
            options={{
              title: "Product Details",
              headerBackVisible: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
