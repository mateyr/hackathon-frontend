import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { CommonActions } from "@react-navigation/native";
import { Tabs } from "expo-router";
import { Text } from "react-native";
import { BottomNavigation, useTheme } from "react-native-paper";

export default function Layout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          style={{
            backgroundColor: "white",
            borderTopWidth: 1,
            borderTopColor: "#E5E7EB",
            elevation: 8,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.05,
            shadowRadius: 8,
          }}
          activeColor={theme.colors.primary}
          inactiveColor="#9CA3AF"
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) =>
            descriptors[route.key].options.tabBarIcon?.({
              focused,
              color,
              size: 26,
            }) || null
          }
          renderLabel={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            const label =
              typeof options.tabBarLabel === "string"
                ? options.tabBarLabel
                : typeof options.title === "string"
                ? options.title
                : route.name;

            return (
              <Text
                style={{
                  color,
                  fontSize: 14,
                  fontWeight: focused ? "600" : "400",
                  // marginTop: 6,
                  textAlign: "center",
                }}
              >
                {label}
              </Text>
            );
          }}
        />
      )}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 size={26} name="house-medical" color={color} solid />
          ),
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          title: "Citas",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={26} name="calendar" color={color} solid />
          ),
        }}
      />
      <Tabs.Screen
        name="doctors"
        options={{
          title: "Doctores",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 size={26} name="user-doctor" color={color} solid />
          ),
        }}
      />
      <Tabs.Screen
        name="medical-history"
        options={{
          title: "Historial",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              size={26}
              name="file-document"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={26} name="user" color={color} solid />
          ),
        }}
      />
    </Tabs>
  );
}
