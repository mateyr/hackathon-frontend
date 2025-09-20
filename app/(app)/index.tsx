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
  ImageBackground
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

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
  ecgBackground: "#000000"
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

  // Ocultar modal después de 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomeModal(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Simular datos ECG
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        const newDataPoint = Math.sin(Date.now() / 200) * 0.8;
        setEcgData(prev => {
          const newData = [...prev, newDataPoint];
          return newData.slice(-200);
        });
      }
    }, 50);
    return () => clearInterval(interval);
  }, [isPaused]);

  const renderECGChart = () => {
    return (
      <View style={styles.ecgContainer}>
        <View style={styles.ecgChart}>
          {ecgData.map((point, index) => (
            <View
              key={index}
              style={[
                styles.ecgPoint,
                {
                  left: `${(index / 200) * 100}%`,
                  bottom: `${50 + point * 20}%`
                }
              ]}
            />
          ))}
        </View>
      </View>
    );
  };

  const renderWelcomeModal = () => (
    <Modal visible={showWelcomeModal} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <FontAwesome5 name="heartbeat" size={48} color={Colors.primary} />
          <Text style={styles.modalTitle}>¡Bienvenido!</Text>
          <Text style={styles.modalSubtitle}>Monitoreo cardíaco activado</Text>
          <ActivityIndicator size="large" color={Colors.primary} style={styles.modalSpinner} />
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

        {/* Contenido Principal */}
        <ScrollView style={styles.mainContent}>
          {/* Panel ECG */}
          <View style={styles.ecgSection}>
            <Text style={styles.sectionTitle}>Monitoreo ECG en Tiempo Real</Text>
            
            {renderECGChart()}
            
            {/* Controles */}
            <View style={styles.ecgControls}>
              <TouchableOpacity 
                style={styles.controlButton}
                onPress={() => setIsPaused(!isPaused)}
              >
                <MaterialIcons 
                  name={isPaused ? "play-arrow" : "pause"} 
                  size={24} 
                  color={Colors.white} 
                />
              </TouchableOpacity>
            </View>

            {/* Métricas */}
            <View style={styles.metricsContainer}>
              <View style={styles.metricCard}>
                <MaterialIcons name="favorite" size={24} color={Colors.error} />
                <Text style={styles.metricValue}>{heartRate}</Text>
                <Text style={styles.metricLabel}>lpm</Text>
              </View>
              
              <View style={styles.metricCard}>
                <MaterialIcons name="show-chart" size={24} color={Colors.primary} />
                <Text style={styles.metricStatus}>{ecgStatus}</Text>
              </View>
            </View>
          </View>

          {/* Accesos Rápidos */}
          <View style={styles.quickActionsPanel}>
            <Text style={styles.panelTitle}>Accesos Rápidos</Text>
            
            <View style={styles.quickActionsGrid}>
              <TouchableOpacity style={styles.quickActionItem}>
                <MaterialIcons name="event" size={24} color={Colors.primary} />
                <Text style={styles.quickActionLabel}>Agenda</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.quickActionItem}>
                <MaterialIcons name="people" size={24} color={Colors.primary} />
                <Text style={styles.quickActionLabel}>Pacientes</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.quickActionItem}>
                <MaterialIcons name="history" size={24} color={Colors.primary} />
                <Text style={styles.quickActionLabel}>Historial</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.quickActionItem}>
                <MaterialIcons name="settings" size={24} color={Colors.primary} />
                <Text style={styles.quickActionLabel}>Configuración</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Navegación Inferior */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerButton}>
            <MaterialIcons name="home" size={24} color={Colors.primary} />
            <Text style={styles.footerText}>Inicio</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.footerButton}>
            <MaterialIcons name="event" size={24} color={Colors.textSecondary} />
            <Text style={styles.footerText}>Citas</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.footerButton}>
            <MaterialIcons name="people" size={24} color={Colors.textSecondary} />
            <Text style={styles.footerText}>Doctores</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.footerButton}>
            <MaterialIcons name="history" size={24} color={Colors.textSecondary} />
            <Text style={styles.footerText}>Historial</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.footerButton}>
            <MaterialIcons name="person" size={24} color={Colors.textSecondary} />
            <Text style={styles.footerText}>Perfil</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary,
    marginLeft: 10,
    fontFamily: 'Montserrat-Bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statusText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontFamily: 'OpenSans-Regular',
  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
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
  },
  ecgSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
  },
  ecgContainer: {
    backgroundColor: Colors.ecgBackground,
    borderRadius: 15,
    height: 200,
    overflow: 'hidden',
    marginBottom: 15,
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
  ecgControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  controlButton: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 25,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  metricCard: {
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginVertical: 5,
  },
  metricLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  metricStatus: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
    marginTop: 5,
    textAlign: 'center',
  },
  quickActionsPanel: {
    backgroundColor: Colors.white,
    margin: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  quickActionItem: {
    width: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryContainer,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  quickActionLabel: {
    marginLeft: 10,
    color: Colors.primary,
    fontWeight: '500',
    fontFamily: 'OpenSans-Regular',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  footerButton: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 5,
    fontFamily: 'OpenSans-Regular',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.white,
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    minWidth: 300,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary,
    marginTop: 15,
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
    marginTop: 15,
  },
});