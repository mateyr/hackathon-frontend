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
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.greetingSection}>
            <Text
              variant="headlineSmall"
              style={[styles.greeting, { color: theme.colors.onBackground }]}
            >
              Hola, Emorie 👋
            </Text>
            <Text
              variant="bodyMedium"
              style={[
                styles.subGreeting,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              ¿Cómo te encuentras hoy?
            </Text>
          </View>
          <View style={styles.notificationWrapper}>
            <View
              style={[
                styles.notificationButton,
                {
                  backgroundColor: theme.colors.primaryContainer,
                  borderColor: theme.colors.primary,
                },
              ]}
            >
              <IconButton
                icon="bell"
                size={24}
                iconColor={theme.colors.primary}
                onPress={() => {}}
                style={styles.iconButton}
              />
              <Badge
                style={[
                  styles.badge,
                  {
                    backgroundColor: theme.colors.error,
                  },
                ]}
                size={18}
              >
                1
              </Badge>
            </View>
          </View>
        </View>

        <Card
          style={[
            styles.card,
            { backgroundColor: theme.colors.primaryContainer },
          ]}
          elevation={2}
        >
          <View style={styles.cardContainer}>
            <Text
              variant="titleLarge"
              style={[styles.cardTitle, { color: theme.colors.primary }]}
            >
              Tu salud, siempre al alcance
            </Text>
            <View style={styles.rowContainer}>
              <View style={styles.textContainer}>
                <View style={styles.featureItem}>
                  <Text
                    style={[styles.bullet, { color: theme.colors.primary }]}
                  >
                    •
                  </Text>
                  <Text
                    variant="bodyMedium"
                    style={[
                      styles.featureText,
                      { color: theme.colors.onPrimaryContainer },
                    ]}
                  >
                    Agenda citas virtuales con especialistas
                  </Text>
                </View>

                <View style={styles.featureItem}>
                  <Text
                    style={[styles.bullet, { color: theme.colors.primary }]}
                  >
                    •
                  </Text>
                  <Text
                    variant="bodyMedium"
                    style={[
                      styles.featureText,
                      { color: theme.colors.onPrimaryContainer },
                    ]}
                  >
                    Atención médica 24/7 con doctores
                  </Text>
                </View>

                <Button
                  mode="contained"
                  buttonColor={theme.colors.primary}
                  textColor={theme.colors.onPrimary}
                  onPress={() => {}}
                  style={styles.ctaButton}
                  labelStyle={styles.ctaButtonLabel}
                  contentStyle={styles.ctaButtonContent}
                >
                  Reservar cita
                </Button>
              </View>

              <View style={styles.imageContainer}>
                <Image
                  source={require("../../assets/images/doctor-book-appoiment.png")}
                  style={styles.image}
                />
              </View>
            </View>
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 6,
  },
  greetingSection: {
    flex: 1,
    gap: 4,
  },
  greeting: {
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  subGreeting: {
    opacity: 0.8,
  },
  notificationWrapper: {
    marginLeft: 12,
  },
  notificationButton: {
    borderRadius: 16,
    borderWidth: 1.5,
    position: "relative",
    overflow: "visible",
  },
  iconButton: {
    margin: 0,
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    fontSize: 10,
    fontWeight: "700",
    minWidth: 18,
    height: 18,
  },
  card: {
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  cardContainer: {
    padding: 20,
  },
  cardTitle: {
    fontWeight: "700",
    marginBottom: 10,
    lineHeight: 28,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  textContainer: {
    flex: 1,
    gap: 12,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  bullet: {
    fontSize: 20,
    lineHeight: 20,
    fontWeight: "700",
  },
  featureText: {
    flex: 1,
    lineHeight: 20,
  },
  ctaButton: {
    alignSelf: "flex-start",
    borderRadius: 12,
    marginTop: 4,
    elevation: 0,
  },
  ctaButtonLabel: {
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 0.2,
  },
  ctaButtonContent: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  imageContainer: {
    width: 140,
    height: 160,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
