import { StyleSheet, View } from "react-native";
import { Badge, IconButton, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const theme = useTheme();

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View>
          <Text
            variant="titleLarge"
            theme={{
              fonts: { titleLarge: { fontSize: 20, fontWeight: "700" } },
            }}
          >
            Hola, Rodian Matey !
          </Text>
          <Text variant="labelLarge">¿Cómo te encuentras hoy?</Text>
        </View>
        <View style={[styles.notificationContainer]}>
          <IconButton
            icon="bell-circle"
            // containerColor={theme.colors.secondary}
            iconColor={theme.colors.primary}
            size={46}
            style={{ margin: 0 }}
            onPress={() => {}}
          />
          <Badge
            size={16}
            style={[styles.badge, { backgroundColor: theme.colors.primary }]}
          >
            {1}
          </Badge>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 24,
  },
  notificationContainer: {
    height: 62,
    width: 62,
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: 5,
    right: 5,
  },
});
