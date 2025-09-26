import { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
  Switch,
  Modal,
  TextInput,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

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
  warning: "#FFA726",
  purple: "#9C27B0"
};

const { width, height } = Dimensions.get('window');

export default function Profile() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Datos del usuario
  const [userData, setUserData] = useState({
    name: "Dr. Alejandro Rodríguez",
    email: "alejandro.rodriguez@cardio.com",
    phone: "+52 55 1234 5678",
    specialty: "Cardiólogo",
    hospital: "Hospital General de México",
    experience: "15 años",
    patientCount: "1,247",
    rating: "4.9",
    memberSince: "2018"
  });

  const statsData = [
    { icon: "favorite", label: "Pacientes Activos", value: "24", color: Colors.error },
    { icon: "show-chart", label: "ECG Realizados", value: "1,847", color: Colors.primary },
    { icon: "star", label: "Calificación", value: "4.9/5", color: Colors.warning },
    { icon: "calendar-today", label: "Consultas Mes", value: "56", color: Colors.success }
  ];

  const menuItems = [
    { icon: "history", label: "Historial Médico", color: Colors.primary },
    { icon: "notifications", label: "Notificaciones", color: Colors.warning, badge: 3 },
    { icon: "logout", label: "Cerrar Sesión", color: Colors.error }
  ];

  const handleEditProfile = () => {
    setShowEditModal(true);
  };

  const handleSaveProfile = (newData: any) => {
    setUserData(newData);
    setShowEditModal(false);
    setIsEditing(false);
    Alert.alert("Éxito", "Perfil actualizado correctamente");
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <MaterialIcons name="arrow-back" size={24} color={Colors.primary} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Mi Perfil</Text>
      <TouchableOpacity 
        style={styles.editButton}
        onPress={handleEditProfile}
      >
        <Feather name="edit-3" size={20} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );

  const renderProfileCard = () => (
    <View style={styles.profileCard}>
      <View style={styles.avatarContainer}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150' }}
          style={styles.avatar}
        />
        <View style={styles.verifiedBadge}>
          <MaterialIcons name="verified" size={16} color={Colors.white} />
        </View>
      </View>
      
      <Text style={styles.userName}>{userData.name}</Text>
      <Text style={styles.userSpecialty}>{userData.specialty}</Text>
      <Text style={styles.userHospital}>{userData.hospital}</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{userData.experience}</Text>
          <Text style={styles.statLabel}>Experiencia</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{userData.patientCount}</Text>
          <Text style={styles.statLabel}>Pacientes</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{userData.rating}</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>
    </View>
  );

  const renderStatsGrid = () => (
    <View style={styles.statsGrid}>
      {statsData.map((stat, index) => (
        <View key={index} style={styles.statCard}>
          <View style={[styles.statIconContainer, { backgroundColor: `${stat.color}20` }]}>
            <MaterialIcons name={stat.icon} size={20} color={stat.color} />
          </View>
          <Text style={styles.statCardValue}>{stat.value}</Text>
          <Text style={styles.statCardLabel}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );

  const renderMenuItems = () => (
    <View style={styles.menuContainer}>
      <Text style={styles.sectionTitle}>Configuración</Text>
      <View style={styles.menuList}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={[styles.menuIcon, { backgroundColor: `${item.color}20` }]}>
                <MaterialIcons name={item.icon} size={20} color={item.color} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
            </View>
            <View style={styles.menuItemRight}>
              {item.badge && (
                <View style={styles.menuBadge}>
                  <Text style={styles.menuBadgeText}>{item.badge}</Text>
                </View>
              )}
              <MaterialIcons name="chevron-right" size={20} color={Colors.outline} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderSettings = () => (
    <View style={styles.settingsContainer}>
      <Text style={styles.sectionTitle}>Preferencias</Text>
      <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <Ionicons name="notifications" size={22} color={Colors.warning} />
          <Text style={styles.settingLabel}>Notificaciones Push</Text>
        </View>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: Colors.border, true: Colors.primaryLight }}
          thumbColor={notificationsEnabled ? Colors.primary : Colors.white}
        />
      </View>
      
      <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <Ionicons name="moon" size={22} color={Colors.purple} />
          <Text style={styles.settingLabel}>Modo Oscuro</Text>
        </View>
        <Switch
          value={darkModeEnabled}
          onValueChange={setDarkModeEnabled}
          trackColor={{ false: Colors.border, true: Colors.primaryLight }}
          thumbColor={darkModeEnabled ? Colors.primary : Colors.white}
        />
      </View>
    </View>
  );

  const renderEditModal = () => (
    <Modal visible={showEditModal} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Editar Perfil</Text>
            <TouchableOpacity onPress={() => setShowEditModal(false)}>
              <MaterialIcons name="close" size={24} color={Colors.text} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalForm}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nombre Completo</Text>
              <TextInput
                style={styles.textInput}
                value={userData.name}
                onChangeText={(text) => setUserData({...userData, name: text})}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Correo Electrónico</Text>
              <TextInput
                style={styles.textInput}
                value={userData.email}
                onChangeText={(text) => setUserData({...userData, email: text})}
                keyboardType="email-address"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Teléfono</Text>
              <TextInput
                style={styles.textInput}
                value={userData.phone}
                onChangeText={(text) => setUserData({...userData, phone: text})}
                keyboardType="phone-pad"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Especialidad</Text>
              <TextInput
                style={styles.textInput}
                value={userData.specialty}
                onChangeText={(text) => setUserData({...userData, specialty: text})}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Hospital</Text>
              <TextInput
                style={styles.textInput}
                value={userData.hospital}
                onChangeText={(text) => setUserData({...userData, hospital: text})}
              />
            </View>
          </ScrollView>
          
          <View style={styles.modalActions}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setShowEditModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={() => handleSaveProfile(userData)}
            >
              <Text style={styles.saveButtonText}>Guardar Cambios</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderProfileCard()}
        {renderStatsGrid()}
        {renderSettings()}
        {renderMenuItems()}
        
        {/* Espacio al final */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {renderEditModal()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 10,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary,
    fontFamily: 'Montserrat-Bold',
  },
  editButton: {
    padding: 8,
  },
  profileCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.primaryContainer,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
  },
  userSpecialty: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '600',
    marginBottom: 2,
    fontFamily: 'OpenSans-SemiBold',
  },
  userHospital: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'OpenSans-Regular',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryContainer + '20',
    padding: 16,
    borderRadius: 16,
    width: '100%',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    fontFamily: 'Montserrat-Bold',
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
    fontFamily: 'OpenSans-Regular',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: Colors.border,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    width: '48%',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statCardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 2,
    fontFamily: 'Montserrat-Bold',
  },
  statCardLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontFamily: 'OpenSans-Regular',
  },
  settingsContainer: {
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
    marginBottom: 16,
    fontFamily: 'Montserrat-Bold',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: Colors.text,
    fontFamily: 'OpenSans-Regular',
  },
  menuContainer: {
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
  menuList: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuLabel: {
    fontSize: 16,
    color: Colors.text,
    fontFamily: 'OpenSans-Regular',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuBadge: {
    backgroundColor: Colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  menuBadgeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  bottomSpacer: {
    height: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    fontFamily: 'Montserrat-Bold',
  },
  modalForm: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
    fontFamily: 'OpenSans-Regular',
  },
  textInput: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    backgroundColor: Colors.background,
    fontFamily: 'OpenSans-Regular',
  },
  modalActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'OpenSans-SemiBold',
  },
  saveButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'OpenSans-SemiBold',
  },
});