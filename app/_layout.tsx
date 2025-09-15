import { theme } from "@/app/theme";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <Stack />
    </PaperProvider>
  );
}
