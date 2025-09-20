import { handleApiRequestHelper } from "@/helper/api";
import { useLogin } from "@/queries/useLogin";
import { router } from "expo-router";
import { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, ImageBackground, Image, Dimensions } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

// Colores basados en tu paleta
// Para iniciar el backend y conectar el login, ejecuta este comando en tu terminal:
// poetry run uvicorn hackathon_backend.main:app --host 0.0.0.0 --port 8000 --reload
const Colors = {
  primary: "#006492",
  primaryLight: "#8CCDFF",
  primaryContainer: "#CAE6FF",
  white: "#FFFFFF",
  background: "#FCFCFF",
  surface: "#FFFFFF",
  text: "#1A1C1E",
  textSecondary: "#41474E",
  error: "#BA1A1A",
  border: "#DDE3EA",
  success: "#4CDA64",
  outline: "#72787E"
};

// Material Icons mapping
// Eliminado MaterialIcons y MaterialIcon
// Usando MaterialIcons de react-native-vector-icons

export default function Login() {
  const { mutateAsync: loginUser } = useLogin();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; submit?: string }>({});

  const validateForm = () => {
  const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email inválido";
    }
    
    if (!password) {
      newErrors.password = "La contraseña es requerida";
    } else if (password.length < 4) {
      newErrors.password = "Mínimo 4 caracteres";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      await handleApiRequestHelper({
        request: loginUser,
        params: { username: email, password },
        onSuccess: () => router.replace("/"),
        onFailed: (error) => {
          setErrors({ submit: "Error al iniciar sesión. Verifica tus credenciales." });
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const { width, height } = Dimensions.get('window');
  return (
    <ImageBackground source={require('../assets/images/fondo.jpg')} style={[styles.bg, { width, height }]} resizeMode="cover">
      <SafeAreaView style={styles.safeContainerFinal}>
        <View style={styles.centeredContentFinal}>
          {/* Logo y nombre */}
          <View style={styles.logoFinalContainer}>
            <FontAwesome5 name="clinic-medical" size={80} color={Colors.primary} style={styles.logoFinalIcon} />
            <Text style={styles.logoFinalName}>MediNic</Text>
          </View>
          {/* Iconos flotantes */}
          <FontAwesome5 name="user-nurse" size={38} color={Colors.primaryLight} style={[styles.floatIcon, { top: 40, left: 30 }]} />
          <FontAwesome5 name="pills" size={34} color={Colors.primaryContainer} style={[styles.floatIcon, { top: 120, right: 40 }]} />
          <FontAwesome5 name="syringe" size={32} color={Colors.success} style={[styles.floatIcon, { bottom: 80, left: 60 }]} />
          <FontAwesome5 name="heartbeat" size={36} color={Colors.error} style={[styles.floatIcon, { bottom: 40, right: 50 }]} />
          {/* Inputs y botones directamente sobre fondo */}
          <View style={{width: '100%', alignItems: 'center', marginTop: 10}}>
            <View style={[styles.inputFinalWrapper, errors.email && styles.inputFinalError, {backgroundColor: 'rgba(255,255,255,0.85)', borderWidth: 0}]}> 
              <MaterialIcons name="alternate-email" size={24} color={Colors.primaryLight} style={styles.inputFinalIcon} />
              <TextInput
                style={styles.inputFinal}
                value={email}
                onChangeText={setEmail}
                placeholder="Correo electrónico"
                placeholderTextColor={Colors.outline}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            {errors.email && (
              <Text style={styles.errorFinal}>{errors.email}</Text>
            )}
            <View style={[styles.inputFinalWrapper, errors.password && styles.inputFinalError, {backgroundColor: 'rgba(255,255,255,0.85)', borderWidth: 0}]}> 
              <MaterialIcons name="lock" size={24} color={Colors.primaryLight} style={styles.inputFinalIcon} />
              <TextInput
                style={styles.inputFinal}
                value={password}
                onChangeText={setPassword}
                placeholder="Contraseña"
                placeholderTextColor={Colors.outline}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <MaterialIcons name={showPassword ? "visibility-off" : "visibility"} size={24} color={Colors.primaryLight} />
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text style={styles.errorFinal}>{errors.password}</Text>
            )}
            <TouchableOpacity style={styles.forgotFinal}>
              <Text style={styles.forgotFinalText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.loginFinalButton, {paddingVertical: 10, minWidth: 160, maxWidth: 220}, isLoading && styles.loginFinalButtonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={Colors.white} />
              ) : (
                <Text style={[styles.loginFinalButtonText, {fontSize: 15}]}>Iniciar Sesión</Text>
              )}
            </TouchableOpacity>
            {errors.submit && (
              <Text style={styles.errorFinal}>{errors.submit}</Text>
            )}
            <View style={styles.footerFinalContainer}>
              <FontAwesome5 name="notes-medical" size={22} color={Colors.primary} />
              <Text style={styles.footerFinalText}>Tus datos están protegidos y encriptados</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  safeContainerFinal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
  centeredContentFinal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 24,
    position: 'relative',
  },
  logoFinalContainer: {
    alignItems: 'center',
    marginBottom: 18,
    marginTop: 10,
  },
  logoFinalIcon: {
    marginBottom: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 6,
  },
  logoFinalName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
    letterSpacing: 1,
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
  },
  floatIcon: {
    position: 'absolute',
    opacity: 0.18,
    zIndex: 1,
  },
  formFinalContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 18,
    padding: 22,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 16,
  },
  inputFinalWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginBottom: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  inputFinalIcon: {
    marginRight: 10,
  },
  inputFinal: {
    flex: 1,
    fontSize: 17,
    color: Colors.text,
    paddingVertical: 12,
    backgroundColor: 'transparent',
    fontFamily: 'SourceSansPro-Regular',
  },
  inputFinalError: {
    borderColor: Colors.error,
  },
  errorFinal: {
    color: Colors.error,
    fontSize: 14,
    marginBottom: 2,
    marginLeft: 4,
    alignSelf: 'flex-start',
    fontFamily: 'OpenSans-Regular',
  },
  forgotFinal: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  forgotFinalText: {
    color: Colors.primary,
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'OpenSans-Regular',
  },
  loginFinalButton: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 8,
  },
  loginFinalButtonDisabled: {
    opacity: 0.7,
  },
  loginFinalButtonText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 1,
    fontFamily: 'Montserrat-Bold',
  },
  footerFinalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    gap: 8,
  },
  footerFinalText: {
    color: Colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
    fontFamily: 'SourceSansPro-Regular',
  },
  logoAppContainer: {
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  logoAppCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    elevation: 4,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
  },
  logoAppName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary,
    letterSpacing: 1,
    textAlign: 'center',
  },
  formCreativeContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 8,
  },
  safeContainerCreative: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  bannerContainer: {
    width: '100%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
  },
  bannerGradient: {
    width: '90%',
    height: 100,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 8,
  },
  bannerTitle: {
  color: Colors.white,
  fontSize: 24,
  fontWeight: 'bold',
  letterSpacing: 1,
  marginBottom: 2,
  fontFamily: 'Montserrat-Bold',
  },
  bannerSubtitle: {
  color: Colors.primaryLight,
  fontSize: 15,
  fontWeight: '500',
  letterSpacing: 0.5,
  fontFamily: 'OpenSans-Regular',
  },
  keyboardAvoidCreative: {
    flex: 1,
  },
  scrollContainerCreative: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  cardContainer: {
    width: '90%',
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 28,
    marginTop: -40,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 12,
    alignItems: 'center',
  },
  cardBadge: {
    position: 'absolute',
    top: -22,
    left: 24,
    backgroundColor: Colors.primaryLight,
    borderRadius: 16,
    padding: 4,
    elevation: 4,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
  },
  cardTitle: {
  fontSize: 22,
  fontWeight: 'bold',
  color: Colors.primary,
  letterSpacing: 1,
  textAlign: 'center',
  fontFamily: 'Poppins-Regular',
  marginTop: 8,
  },
  cardSubtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 18,
  },
  inputCreativeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginBottom: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  inputCreativeIcon: {
    marginRight: 10,
  },
  inputCreative: {
  flex: 1,
  fontSize: 17,
  color: Colors.text,
  paddingVertical: 12,
  backgroundColor: 'transparent',
  fontFamily: 'SourceSansPro-Regular',
  },
  inputCreativeError: {
    borderColor: Colors.error,
  },
  errorCreative: {
  color: Colors.error,
  fontSize: 14,
  marginBottom: 2,
  marginLeft: 4,
  alignSelf: 'flex-start',
  fontFamily: 'OpenSans-Regular',
  },
  forgotCreative: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  forgotCreativeText: {
    color: Colors.primary,
    fontSize: 15,
    fontWeight: '500',
  },
  loginCreativeButton: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 8,
  },
  loginCreativeButtonDisabled: {
    opacity: 0.7,
  },
  loginCreativeButtonText: {
  color: Colors.white,
  fontSize: 17,
  fontWeight: 'bold',
  letterSpacing: 1,
  fontFamily: 'Montserrat-Bold',
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    gap: 8,
  },
  footerText: {
  color: Colors.textSecondary,
  fontSize: 13,
  fontWeight: '500',
  fontFamily: 'SourceSansPro-Regular',
  },
  headerBg: {
    width: '100%',
    height: 260,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 0,
  },
  headerGradient: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,100,146,0.7)',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  logoBigContainer: {
    alignItems: 'center',
    marginBottom: 0,
  },
  logoCircleBig: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 4,
    borderColor: Colors.white,
    elevation: 4,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  appNameBig: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 2,
    letterSpacing: 1,
    textShadowColor: Colors.primary,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  subtitleBig: {
    fontSize: 16,
    color: Colors.primaryLight,
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '500',
  },
  nicaraguaMap: {
    width: 80,
    height: 80,
    position: 'absolute',
    right: 24,
    bottom: 8,
    opacity: 0.18,
  },
  safeContainerMinimal: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
  },
  keyboardAvoidMinimal: {
    flex: 1,
  },
  scrollContainerMinimal: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 0,
  },
  logoMinimalContainer: {
    alignItems: 'center',
    marginTop: 48,
    marginBottom: 8,
  },
  appNameMinimal: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 4,
    letterSpacing: 1,
  },
  subtitleMinimal: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  formMinimalContainer: {
    width: '100%',
    gap: 12,
  },
  inputMinimalWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 12,
    paddingVertical: 2,
    marginBottom: 4,
  },
  inputMinimalIcon: {
    marginRight: 6,
  },
  inputMinimal: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    paddingVertical: 10,
    backgroundColor: 'transparent',
  },
  inputMinimalError: {
    borderColor: Colors.error,
  },
  errorMinimal: {
    color: Colors.error,
    fontSize: 13,
    marginBottom: 2,
    marginLeft: 4,
  },
  forgotMinimal: {
    alignSelf: 'flex-end',
    marginBottom: 12,
  },
  forgotMinimalText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  loginMinimalButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  loginMinimalButtonDisabled: {
    opacity: 0.7,
  },
  loginMinimalButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    color: Colors.textSecondary,
    fontSize: 16,
    marginBottom: 5,
  },
  appName: {
    color: Colors.primary,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  formContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 24,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginLeft: 4,
  },
  label: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 16,
  },
  inputError: {
    borderColor: Colors.error,
  },
  input: {
    flex: 1,
    padding: 16,
    color: Colors.text,
    fontSize: 16,
  },
  eyeButton: {
    padding: 8,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 4,
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    marginLeft: 6,
  },
  forgotPassword: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 25,
  },
  forgotPasswordText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  loginButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  submitError: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEBEE',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  submitErrorText: {
    color: Colors.error,
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  securityMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryContainer + '40',
    padding: 16,
    borderRadius: 12,
  },
  securityTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  securityTitle: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  securityDescription: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
});