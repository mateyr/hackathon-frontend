import { handleApiRequestHelper } from "@/helper/api";
import { useLogin } from "@/queries/useLogin";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutateAsync: loginUser } = useLogin();

  const handleLogin = () => {
    handleApiRequestHelper({
      request: loginUser,
      params: { username: email, password },
      onSuccess: (response) => {
        router.replace("/");
      },
      onFailed: (error) => {},
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
      }}
    >
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={{ width: "100%", marginBottom: 12 }}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ width: "100%", marginBottom: 12 }}
      />
      <Button mode="contained" onPress={handleLogin} style={{ width: "100%" }}>
        Log In
      </Button>
    </View>
  );
}
