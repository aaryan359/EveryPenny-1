import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Inter_900Black, useFonts } from "@expo-google-fonts/inter";
import { ClerkProvider } from '@clerk/clerk-expo';
import { useAuth } from "@clerk/clerk-expo";
import * as WebBrowser from 'expo-web-browser';
import { tokenCache } from "@/cache";

SplashScreen.preventAutoHideAsync();

const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

const AppContent = () => {
  useWarmUpBrowser();

  const [fontsLoaded, fontsError] = useFonts({ Inter_900Black });
  const { isSignedIn } = useAuth();
  const router = useRouter(); 

  useEffect(() => {
    if (fontsLoaded || fontsError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError]);

  useEffect(() => {
    if (fontsLoaded) {
      if (isSignedIn) {
        router.replace("/(main)"); 
      } else {
        router.replace("/(auth)");
      }
    }
  }, [fontsLoaded, isSignedIn]); 

  if (!fontsLoaded && !fontsError) {
    return null; 
  }

  return <Stack screenOptions={{ headerShown: false }} />;
};

const RootLayout = () => {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  if (!publishableKey) {
    throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file");
  }

  return (

    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
            <AppContent />
    </ClerkProvider>
    
  );
};

export default RootLayout;
