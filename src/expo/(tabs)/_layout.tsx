import { CircleUserRound, Home, Search } from "@tamagui/lucide-icons";
import { Tabs } from "expo-router";
import { NavBar } from "src/view/navigation/NavBar";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#BF755F",
                tabBarInactiveTintColor: "#5A6A6A",
                headerShown: true,
                header: (props) => (
                    <NavBar
                        canGoBack={props.navigation.canGoBack()}
                        onBack={props.navigation.goBack}
                    />
                ),
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Home
                            color={color}
                            width={24}
                            height={24}
                            size={size}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Search color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="account"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <CircleUserRound color={color} size={size} />
                    ),
                }}
            />
        </Tabs>
    );
}
