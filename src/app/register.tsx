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

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = () => {
    // Validasi sederhana
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Semua field harus diisi!");
      return;
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Format email tidak valid!");
      return;
    }

    // Validasi password
    if (password.length < 6) {
      Alert.alert("Error", "Password minimal 6 karakter!");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Password dan Konfirmasi Password tidak sama!");
      return;
    }

    // Register berhasil (UI Mode - tanpa backend)
    Alert.alert("Registrasi Berhasil", `Akun ${email} berhasil dibuat!`, [
      {
        text: "OK",
        onPress: () => {
          router.replace("/login");
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
              <Ionicons name="person-add" size={40} color="#FFFFFF" />
            </View>
            <Text style={authStyles.title}>Buat Akun Baru</Text>
            <Text style={authStyles.subtitle}>
              Daftar untuk memulai penggunaan aplikasi
            </Text>
          </View>

          {/* Form Card */}
          <View style={authStyles.card}>
            {/* Name Input */}
            <View style={authStyles.inputGroup}>
              <Text style={authStyles.label}>Nama Lengkap</Text>
              <View
                style={[
                  authStyles.inputWrapper,
                  nameFocused && authStyles.inputWrapperFocused,
                ]}
              >
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={nameFocused ? "#2563EB" : "#94A3B8"}
                  style={authStyles.inputIcon}
                />
                <TextInput
                  style={authStyles.input}
                  placeholder="Masukkan nama lengkap"
                  placeholderTextColor="#94A3B8"
                  value={name}
                  onChangeText={setName}
                  onFocus={() => setNameFocused(true)}
                  onBlur={() => setNameFocused(false)}
                  autoCapitalize="words"
                />
              </View>
            </View>

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
                  placeholder="Minimal 6 karakter"
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

            {/* Confirm Password Input */}
            <View style={authStyles.inputGroup}>
              <Text style={authStyles.label}>Konfirmasi Kata Sandi</Text>
              <View
                style={[
                  authStyles.inputWrapper,
                  confirmPasswordFocused && authStyles.inputWrapperFocused,
                ]}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={confirmPasswordFocused ? "#2563EB" : "#94A3B8"}
                  style={authStyles.inputIcon}
                />
                <TextInput
                  style={authStyles.input}
                  placeholder="Ketik ulang kata sandi"
                  placeholderTextColor="#94A3B8"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  onFocus={() => setConfirmPasswordFocused(true)}
                  onBlur={() => setConfirmPasswordFocused(false)}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={authStyles.eyeButton}
                >
                  <Ionicons
                    name={
                      showConfirmPassword ? "eye-outline" : "eye-off-outline"
                    }
                    size={20}
                    color="#94A3B8"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Register Button */}
            <TouchableOpacity
              style={authStyles.button}
              onPress={handleRegister}
              activeOpacity={0.8}
            >
              <Text style={authStyles.buttonText}>Daftar Sekarang →</Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={authStyles.divider}>
            <View style={authStyles.dividerLine} />
            <Text style={authStyles.dividerText}>atau</Text>
            <View style={authStyles.dividerLine} />
          </View>

          {/* Link to Login */}
          <View style={authStyles.linkContainer}>
            <Text style={authStyles.linkText}>Sudah punya akun? </Text>
            <TouchableOpacity onPress={() => router.replace("/login")}>
              <Text style={authStyles.link}>Masuk</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
