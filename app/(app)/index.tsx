import { Image, StyleSheet, View } from "react-native";
import {
  Badge,
  Button,
  Card,
  IconButton,
  Text,
  useTheme,
} from "react-native-paper";
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
            Hola, Rodian Matey!
          </Text>
          <Text variant="labelLarge">¿Cómo te encuentras hoy?</Text>
        </View>
        <View style={[styles.notificationContainer]}>
          <IconButton
            icon="bell-circle"
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

      {/* Card principal */}
      <Card style={[styles.card, { backgroundColor: theme.colors.primary }]}>
        <View style={styles.cardContainer}>
          {/* Título */}
          <Text
            variant="titleLarge"
            style={{
              color: theme.colors.onPrimary,
              fontWeight: "700",
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Tu salud, siempre al alcance
          </Text>

          {/* Row con texto y imagen */}
          <View style={styles.rowContainer}>
            <View style={styles.textContainer}>
              <Text
                variant="bodyMedium"
                style={{ color: theme.colors.onPrimary, marginTop: 6 }}
              >
                Agenda citas virtuales con especialistas.
              </Text>
              <Text
                variant="bodyMedium"
                style={{ color: theme.colors.onPrimary, marginBottom: 12 }}
              >
                Atención médica 24/7 con doctores.
              </Text>
              <Button
                mode="contained"
                buttonColor={theme.colors.background}
                textColor={theme.colors.primary}
                onPress={() => {}}
                style={{ alignSelf: "flex-start" }}
              >
                Reservar cita
              </Button>
            </View>

            <Image
              source={require("../../assets/images/doctor-book-appoiment.png")}
              style={styles.image}
            />
          </View>
        </View>
      </Card>
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
  card: {
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 4,
  },
  cardContainer: {
    flexDirection: "column",
    padding: 16,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  textContainer: {
    flex: 1,
    marginRight: -10,
    paddingRight: 12,
  },
  image: {
    width: 150,
    height: 150,
  },
});
