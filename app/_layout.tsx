import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    'outfit': require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('./../assets/fonts/Outfit-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    // <Stack screenOptions={{ headerShown: false }}>
    //   <Stack.Screen name="index" />
    // </Stack>
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{headerShown:false}} />
    </Stack>

  );
}
