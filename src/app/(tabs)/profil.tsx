import {
    clearAuthSession,
    getAuthSession,
    logoutApi,
    UserData,
} from "@/services/authService";
import { tabStyles } from "@/styles/tabStyles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function ProfilScreen() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  const loadUserData = async () => {
    try {
      const session = await getAuthSession();
      if (session) {
        setUser(session.user);
      } else {
        router.replace("/login");
      }
    } catch {
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadUserData();
  }, []);

  const handleLogout = async () => {
    Alert.alert(
      "Konfirmasi Logout",
      "Apakah Anda yakin ingin keluar dari akun?",
      [
        {
          text: "Batal",
          style: "cancel",
        },
        {
          text: "Keluar",
          style: "destructive",
          onPress: async () => {
            setLoggingOut(true);
            try {
              const session = await getAuthSession();
              if (session?.token) {
                // Panggil API Logout untuk hapus token di database
                await logoutApi(session.token);
              }
              // Hapus session lokal di AsyncStorage
              await clearAuthSession();
              // Redirect ke Login
              router.replace("/login");
            } catch {
              // Meski API logout gagal, tetap hapus session lokal
              await clearAuthSession();
              router.replace("/login");
            } finally {
              setLoggingOut(false);
            }
          },
        },
      ],
    );
  };

  if (loading) {
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

  return (
    <ScrollView
      style={tabStyles.screenContainer}
      contentContainerStyle={tabStyles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={tabStyles.card}>
        <View style={tabStyles.profileAvatar}>
          <Ionicons name="person" size={30} color="#2563EB" />
        </View>
        <Text style={tabStyles.sectionTitle}>
          {user?.name || "Nama Pengguna"}
        </Text>
        <Text style={tabStyles.sectionSubtitle}>
          {user?.email || "email@example.com"}
        </Text>
      </View>

      {/* Info Detail */}
      <View style={tabStyles.card}>
        <View style={tabStyles.infoRow}>
          <View style={tabStyles.infoIconWrapper}>
            <Ionicons name="mail-outline" size={20} color="#2563EB" />
          </View>
          <View style={tabStyles.infoContent}>
            <Text style={tabStyles.infoLabel}>Email</Text>
            <Text style={tabStyles.infoValue}>
              {user?.email || "Tidak tersedia"}
            </Text>
          </View>
        </View>

        <View style={tabStyles.infoRow}>
          <View style={tabStyles.infoIconWrapper}>
            <Ionicons name="call-outline" size={20} color="#2563EB" />
          </View>
          <View style={tabStyles.infoContent}>
            <Text style={tabStyles.infoLabel}>Nomor HP</Text>
            <Text style={tabStyles.infoValue}>
              {user?.no_hp || "Belum diisi"}
            </Text>
          </View>
        </View>

        <View style={tabStyles.infoRow}>
          <View style={tabStyles.infoIconWrapper}>
            <Ionicons name="finger-print-outline" size={20} color="#2563EB" />
          </View>
          <View style={tabStyles.infoContent}>
            <Text style={tabStyles.infoLabel}>User ID</Text>
            <Text style={tabStyles.infoValue}>{user?.id || "-"}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={[
          tabStyles.logoutButton,
          loggingOut && { opacity: 0.6 },
        ]}
        activeOpacity={0.8}
        onPress={handleLogout}
        disabled={loggingOut}
      >
        {loggingOut ? (
          <>
            <ActivityIndicator size="small" color="#DC2626" />
            <Text style={tabStyles.logoutButtonText}>Memproses...</Text>
          </>
        ) : (
          <>
            <Ionicons name="log-out-outline" size={20} color="#DC2626" />
            <Text style={tabStyles.logoutButtonText}>Keluar dari Akun</Text>
          </>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}
