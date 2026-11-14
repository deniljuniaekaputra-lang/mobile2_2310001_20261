import { authStyles } from "@/styles/authStyles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Validasi sederhana
    if (!email || !password) {
      Alert.alert("Error", "Email dan Password harus diisi!");
      return;
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Format email tidak valid!");
      return;
    }

    // Login berhasil (UI Mode - tanpa backend)
    Alert.alert("Login Berhasil", `Selamat datang, ${email}!`, [
      {
        text: "OK",
        onPress: () => {
          router.replace({
            pathname: "/(tabs)/home",
            params: { email },
          });
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={authStyles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={authStyles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo & Title */}
          <View style={authStyles.logoContainer}>
            <View style={authStyles.logoCircle}>
              <Ionicons name="shield-checkmark" size={40} color="#FFFFFF" />
            </View>
            <Text style={authStyles.title}>Selamat Datang</Text>
            <Text style={authStyles.subtitle}>
              Masuk ke akun Anda untuk melanjutkan
            </Text>
          </View>

          {/* Form Card */}
          <View style={authStyles.card}>
            {/* Email Input */}
            <View style={authStyles.inputGroup}>
              <Text style={authStyles.label}>Alamat Email</Text>
              <View
                style={[
                  authStyles.inputWrapper,
                  emailFocused && authStyles.inputWrapperFocused,
                ]}
              >
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={emailFocused ? "#2563EB" : "#94A3B8"}
                  style={authStyles.inputIcon}
                />
                <TextInput
                  style={authStyles.input}
                  placeholder="nama@kampus.ac.id"
                  placeholderTextColor="#94A3B8"
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={authStyles.inputGroup}>
              <Text style={authStyles.label}>Kata Sandi</Text>
              <View
                style={[
                  authStyles.inputWrapper,
                  passwordFocused && authStyles.inputWrapperFocused,
                ]}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={passwordFocused ? "#2563EB" : "#94A3B8"}
                  style={authStyles.inputIcon}
                />
                <TextInput
                  style={authStyles.input}
                  placeholder="Masukkan kata sandi"
                  placeholderTextColor="#94A3B8"
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={authStyles.eyeButton}
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color="#94A3B8"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={authStyles.button}
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <Text style={authStyles.buttonText}>Masuk Sekarang →</Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={authStyles.divider}>
            <View style={authStyles.dividerLine} />
            <Text style={authStyles.dividerText}>atau</Text>
            <View style={authStyles.dividerLine} />
          </View>

          {/* Link to Register */}
          <View style={authStyles.linkContainer}>
            <Text style={authStyles.linkText}>Belum punya akun? </Text>
            <TouchableOpacity onPress={() => router.push("/register")}>
              <Text style={authStyles.link}>Daftar Sekarang</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
