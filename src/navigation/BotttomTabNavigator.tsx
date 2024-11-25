import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { BottomTabParamList } from "./types";
import React from "react";
import { COLORS } from "../shared/utils/GlobalStyles";
import { DashboardScreen } from "../features/products/screens/DashboardScreen";
import { StyleSheet, Text, View } from "react-native";

const Tab = createBottomTabNavigator<BottomTabParamList>();

const FavoritesScreen = () => (
    <View style={styles.container}>
        <Text>Favorites Screen</Text>
    </View>
);

const ProfileScren = () => (
    <View style={styles.container}>
        <Text>Profile Screen</Text>
    </View>
);

export const BottomTabNavigator: React.FC = () => {
    return (
        <Tab.Navigator
        screenOptions={{
            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: COLORS.gray,
        }}
        >
            <Tab.Screen
            name="Home"
            component={DashboardScreen}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="home" color={color} size={size}/>
                ),
            }}
            />

            <Tab.Screen
            name="Favorites"
            component={FavoritesScreen}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="favorite-outline" color={color} size={size}/>
                ),
            }}/>

            <Tab.Screen
            name="Profile"
            component={ProfileScren}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="person-outline" color={color} size={size}/>
                ),
            }}/>

        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    }
});