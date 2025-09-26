import { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions,
  Modal,
  ActivityIndicator,
  ImageBackground,
  Animated
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Mismos colores que tu login
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
  outline: "#72787E",
  ecgGreen: "#00FF00",
  ecgBackground: "#000000",
  warning: "#FFA726"
};

const { width, height } = Dimensions.get('window');

export default function Home() {
  const router = useRouter();
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const [notificationsCount, setNotificationsCount] = useState(3);
  const [ecgData, setEcgData] = useState<number[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [heartRate, setHeartRate] = useState(78);
  const [ecgStatus, setEcgStatus] = useState("Ritmo Sinusal Normal");
  const [pulseAnim] = useState(new Animated.Value(1));

  // Animación de pulso para el corazón
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Ocultar modal después de 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomeModal(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Simular datos ECG más realistas
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        const time = Date.now() / 200;
        // Simulación más realista de ECG con ondas P, QRS, T
        const pWave = Math.sin(time) * 0.3;
        const qrsComplex = Math.sin(time * 5) * 1.5;
        const tWave = Math.sin(time * 0.8) * 0.4;
        const newDataPoint = pWave + qrsComplex + tWave;
        
        setEcgData(prev => {
          const newData = [...prev, newDataPoint];
          return newData.slice(-300); // Más puntos para mejor visualización
        });

        // Variación realista del ritmo cardíaco
        setHeartRate(prev => {
          const variation = Math.random() * 4 - 2; // ±2 bpm
          return Math.max(60, Math.min(100, Math.round(prev + variation)));
        });
      }
    }, 30);
    return () => clearInterval(interval);
  }, [isPaused]);

  const renderECGChart = () => {
    return (
      <View style={styles.ecgContainer}>
        <View style={styles.ecgGrid}>
          {/* Líneas de la grilla */}
          {[...Array(5)].map((_, i) => (
            <View key={i} style={[styles.gridLine, { top: `${i * 25}%` }]} />
          ))}
        </View>
        <View style={styles.ecgChart}>
          {ecgData.map((point, index) => (
            <View
              key={index}
              style={[
                styles.ecgPoint,
                {
                  left: `${(index / 300) * 100}%`,
                  bottom: `${50 + point * 15}%`,
                  opacity: index / 300 // Efecto fade-in
                }
              ]}
            />
          ))}
        </View>
      </View>
    );
  };

  const renderVitalSigns = () => (
    <View style={styles.vitalsContainer}>
      <Text style={styles.sectionTitle}>Signos Vitales</Text>
      <View style={styles.vitalsGrid}>
        <View style={styles.vitalCard}>
          <Animated.View style={[styles.vitalIcon, { transform: [{ scale: pulseAnim }] }]}>
            <MaterialIcons name="favorite" size={28} color={Colors.error} />
          </Animated.View>
          <Text style={styles.vitalValue}>{heartRate}</Text>
          <Text style={styles.vitalLabel}>LPM</Text>
          <Text style={styles.vitalStatus}>Normal</Text>
        </View>

        <View style={styles.vitalCard}>
          <Ionicons name="water" size={28} color={Colors.primary} />
          <Text style={styles.vitalValue}>98%</Text>
          <Text style={styles.vitalLabel}>SpO2</Text>
          <Text style={styles.vitalStatus}>Estable</Text>
        </View>

        <View style={styles.vitalCard}>
          <FontAwesome5 name="temperature-high" size={24} color={Colors.warning} />
          <Text style={styles.vitalValue}>36.5°</Text>
          <Text style={styles.vitalLabel}>Temp</Text>
          <Text style={styles.vitalStatus}>Normal</Text>
        </View>

        <View style={styles.vitalCard}>
          <Ionicons name="speedometer" size={28} color={Colors.success} />
          <Text style={styles.vitalValue}>120/80</Text>
          <Text style={styles.vitalLabel}>PA</Text>
          <Text style={styles.vitalStatus}>Óptima</Text>
        </View>
      </View>
    </View>
  );

  

  const renderStatusCard = () => (
    <View style={styles.statusCard}>
      <View style={styles.statusHeader}>
        <View style={styles.statusIndicator}>
          <View style={[styles.statusDot, { backgroundColor: Colors.success }]} />
          <Text style={styles.statusText}>Conectado</Text>
        </View>
        <Text style={styles.statusTime}>Última actualización: ahora</Text>
      </View>
      
      <View style={styles.ecgStatusContainer}>
        <MaterialIcons name="show-chart" size={20} color={Colors.primary} />
        <Text style={styles.ecgStatusText}>{ecgStatus}</Text>
      </View>
    </View>
  );

  const renderWelcomeModal = () => (
    <Modal visible={showWelcomeModal} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalIcon}>
            <FontAwesome5 name="heartbeat" size={48} color={Colors.primary} />
          </View>
          <Text style={styles.modalTitle}>¡Bienvenido!</Text>
          <Text style={styles.modalSubtitle}>Sistema de monitoreo cardíaco activado</Text>
          <ActivityIndicator size="large" color={Colors.primary} style={styles.modalSpinner} />
          <Text style={styles.modalLoadingText}>Inicializando sensores...</Text>
        </View>
      </View>
    </Modal>
  );

  return (
    <ImageBackground 
      source={require('../../assets/images/fondo.jpg')} 
      style={styles.bg} 
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeContainer}>
        {renderWelcomeModal()}

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.logo}>
              <FontAwesome5 name="heartbeat" size={24} color={Colors.primary} />
            </View>
            <View>
              <Text style={styles.appName}>MediNic</Text>
              <Text style={styles.appSubtitle}>Monitoreo en tiempo real</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications" size={24} color={Colors.text} />
            {notificationsCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationCount}>{notificationsCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Contenido Principal */}
        <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
          {/* Tarjeta de Estado */}
          {renderStatusCard()}

          {/* Panel ECG */}
          <View style={styles.ecgSection}>
            <View style={styles.ecgHeader}>
              <Text style={styles.ecgTitle}>Electrocardiograma</Text>
              <TouchableOpacity 
                style={styles.controlButton}
                onPress={() => setIsPaused(!isPaused)}
              >
                <MaterialIcons 
                  name={isPaused ? "play-arrow" : "pause"} 
                  size={20} 
                  color={Colors.white} 
                />
                <Text style={styles.controlButtonText}>
                  {isPaused ? "Reanudar" : "Pausar"}
                </Text>
              </TouchableOpacity>
            </View>
            
            {renderECGChart()}
          </View>

          {/* Signos Vitales */}
          {renderVitalSigns()}

          {/* Acciones Rápidas */}


          {/* Espacio al final */}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    fontFamily: 'Montserrat-Bold',
  },
  appSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontFamily: 'OpenSans-Regular',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.error,
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 15,
  },
  statusCard: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '600',
  },
  statusTime: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  ecgStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    backgroundColor: Colors.primaryContainer + '20',
    borderRadius: 10,
  },
  ecgStatusText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  ecgSection: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  ecgHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  ecgTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    fontFamily: 'Montserrat-Bold',
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  controlButtonText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '500',
  },
  ecgContainer: {
    backgroundColor: Colors.ecgBackground,
    borderRadius: 15,
    height: 160,
    overflow: 'hidden',
    position: 'relative',
  },
  ecgGrid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  ecgChart: {
    flex: 1,
    position: 'relative',
  },
  ecgPoint: {
    position: 'absolute',
    width: 2,
    height: 2,
    backgroundColor: Colors.ecgGreen,
    borderRadius: 1,
  },
  vitalsContainer: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 15,
    fontFamily: 'Montserrat-Bold',
  },
  vitalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  vitalCard: {
    width: '48%',
    backgroundColor: Colors.background,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  vitalIcon: {
    marginBottom: 8,
  },
  vitalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 2,
  },
  vitalLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  vitalStatus: {
    fontSize: 11,
    color: Colors.success,
    fontWeight: '500',
  },
  actionsContainer: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    width: '48%',
    alignItems: 'center',
    padding: 16,
    position: 'relative',
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 12,
    color: Colors.text,
    fontWeight: '500',
    textAlign: 'center',
  },
  actionBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: Colors.error,
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBadgeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  bottomSpacer: {
    height: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: Colors.white,
    padding: 30,
    borderRadius: 25,
    alignItems: 'center',
    minWidth: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  modalIcon: {
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 5,
    fontFamily: 'Montserrat-Bold',
  },
  modalSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'OpenSans-Regular',
  },
  modalSpinner: {
    marginVertical: 15,
  },
  modalLoadingText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
});