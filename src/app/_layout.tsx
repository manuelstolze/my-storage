import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Suspense, useCallback, useEffect, useState } from "react";
import { Buffer } from "buffer";
import { useColorScheme } from "@components/useColorScheme";
import { Text, View } from "@components/Themed";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import { SQLiteProvider } from "expo-sqlite/next";
import { ActivityIndicator } from "react-native";
import { DB_NAME } from "../constants/App";

global.Buffer = Buffer;

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const loadDatabase = async () => {
  const dbName = DB_NAME;
  const dbAsset = require("../../assets/storage-manager-app.db");
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  console.log(dbFilePath);
  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
  if (!fileInfo.exists) {
    await FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + "SQLite",
      {
        intermediates: true,
      },
    );
    await FileSystem.downloadAsync(dbUri, dbFilePath);
  }
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("@assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  const [isLoadingDB, setIsLoadingDB] = useState<boolean>(true);

  const loadDatabaseCallback = useCallback(() => {
    loadDatabase()
      .then(() => setIsLoadingDB(false))
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    loadDatabaseCallback();
  }, [loadDatabaseCallback]);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (isLoadingDB)
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator size={"large"} />
        <Text>Loading Database...</Text>
      </View>
    );

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <Suspense
      fallback={
        <View style={{ flex: 1 }}>
          <ActivityIndicator size={"large"} />
          <Text>Loading Database...</Text>
        </View>
      }
    >
      <SQLiteProvider databaseName={DB_NAME} useSuspense>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: "modal" }} />
          </Stack>
        </ThemeProvider>
      </SQLiteProvider>
    </Suspense>
  );
}
