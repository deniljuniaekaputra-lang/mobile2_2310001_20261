import { getAuthSession } from "@/services/authService";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  const checkSession = async () => {
    try {
      const session = await getAuthSession();
      if (session) {
        // Token ada → langsung masuk ke Home
        router.replace("/home");
      } else {
        // Token tidak ada → arahkan ke Login
        router.replace("/login");
      }
    } catch {
      // Jika error, anggap belum login
      router.replace("/login");
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    checkSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (checking) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F8FAFC",
        }}
      >
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return null;
}
