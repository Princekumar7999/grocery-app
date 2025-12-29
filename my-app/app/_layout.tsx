import { Stack, router } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",

        headerLeft: () => (
          <Pressable
            onPress={() => router.back()}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Text style={{ fontSize: 26 }}>‹</Text>
            <Text style={{ marginLeft: 6, fontSize: 16 }}>Index</Text>
          </Pressable>
        ),
      }}
    />
  );
}
