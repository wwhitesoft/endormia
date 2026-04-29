import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
  bg: '#07090d',
  surface: '#0f1219',
  card: '#161b26',
  accent: '#99aeff',
  accent2: '#8ee3ff',
  text: '#f6f1ea',
  textDim: '#6b7280',
  border: '#1e2433',
};

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState({
    bedtimeReminder: true,
    morningReport: true,
    weeklyInsights: true,
    routineStart: true,
  });

  const [preferences, setPreferences] = useState({
    hapticFeedback: true,
    darkMode: true,
    autoTrack: false,
    smartAlarm: true,
  });

  const [devicePaired, setDevicePaired] = useState(false);

  const toggleNotification = (key) => {
    Haptics.selectionAsync();
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const togglePreference = (key) => {
    Haptics.selectionAsync();
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.screenTitle}>Impostazioni</Text>

        {/* Profile Section */}
        <View style={styles.card}>
          <TouchableOpacity style={styles.profileRow} activeOpacity={0.7}>
            <View style={styles.profileAvatar}>
              <Ionicons name="person" size={28} color={COLORS.accent} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Utente Endormia</Text>
              <Text style={styles.profileEmail}>Sleep OS Premium</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textDim} />
          </TouchableOpacity>
        </View>

        {/* Notifications */}
        <Text style={styles.sectionLabel}>Notifiche</Text>
        <View style={styles.card}>
          <SettingToggle
            icon="bed-outline"
            label="Promemoria ora di dormire"
            description="Notifica 30 min prima dell'orario impostato"
            value={notifications.bedtimeReminder}
            onToggle={() => toggleNotification('bedtimeReminder')}
            color={COLORS.accent}
          />
          <SettingToggle
            icon="sunny-outline"
            label="Report mattutino"
            description="Riepilogo del sonno al risveglio"
            value={notifications.morningReport}
            onToggle={() => toggleNotification('morningReport')}
            color="#fbbf24"
          />
          <SettingToggle
            icon="analytics-outline"
            label="Insights settimanali"
            description="Analisi e suggerimenti ogni lunedi"
            value={notifications.weeklyInsights}
            onToggle={() => toggleNotification('weeklyInsights')}
            color={COLORS.accent2}
          />
          <SettingToggle
            icon="musical-notes-outline"
            label="Avvio routine"
            description="Notifica quando inizia la routine serale"
            value={notifications.routineStart}
            onToggle={() => toggleNotification('routineStart')}
            color="#a78bfa"
            isLast
          />
        </View>

        {/* Preferences */}
        <Text style={styles.sectionLabel}>Preferenze</Text>
        <View style={styles.card}>
          <SettingToggle
            icon="phone-portrait-outline"
            label="Feedback aptico"
            description="Vibrazioni durante le interazioni"
            value={preferences.hapticFeedback}
            onToggle={() => togglePreference('hapticFeedback')}
            color={COLORS.accent}
          />
          <SettingToggle
            icon="moon-outline"
            label="Tema scuro"
            description="Modalita scura sempre attiva"
            value={preferences.darkMode}
            onToggle={() => togglePreference('darkMode')}
            color={COLORS.accent2}
          />
          <SettingToggle
            icon="recording-outline"
            label="Tracking automatico"
            description="Rileva automaticamente inizio e fine sonno"
            value={preferences.autoTrack}
            onToggle={() => togglePreference('autoTrack')}
            color="#6ee7b7"
          />
          <SettingToggle
            icon="alarm-outline"
            label="Sveglia intelligente"
            description="Sveglia nella fase di sonno piu leggera"
            value={preferences.smartAlarm}
            onToggle={() => togglePreference('smartAlarm')}
            color="#fbbf24"
            isLast
          />
        </View>

        {/* Device Pairing */}
        <Text style={styles.sectionLabel}>Dispositivi</Text>
        <View style={styles.card}>
          {devicePaired ? (
            <View style={styles.deviceRow}>
              <View style={styles.deviceIconWrap}>
                <Ionicons name="watch-outline" size={24} color={COLORS.accent2} />
              </View>
              <View style={styles.deviceInfo}>
                <Text style={styles.deviceName}>Endormia Band Pro</Text>
                <View style={styles.deviceStatusRow}>
                  <View style={styles.connectedDot} />
                  <Text style={styles.deviceStatus}>Connesso</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.unpairButton}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  setDevicePaired(false);
                }}
              >
                <Text style={styles.unpairText}>Disconnetti</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.pairButton}
              onPress={() => {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                setDevicePaired(true);
              }}
              activeOpacity={0.7}
            >
              <View style={styles.pairIconWrap}>
                <Ionicons name="bluetooth-outline" size={24} color={COLORS.accent} />
              </View>
              <View style={styles.pairInfo}>
                <Text style={styles.pairLabel}>Associa dispositivo</Text>
                <Text style={styles.pairDesc}>Connetti un tracker o un dispositivo smart</Text>
              </View>
              <Ionicons name="add-circle-outline" size={22} color={COLORS.accent} />
            </TouchableOpacity>
          )}
        </View>

        {/* Sleep Schedule */}
        <Text style={styles.sectionLabel}>Orario del sonno</Text>
        <View style={styles.card}>
          <SettingNavRow
            icon="bed-outline"
            label="Ora di dormire"
            value="23:00"
            color={COLORS.accent}
          />
          <SettingNavRow
            icon="sunny-outline"
            label="Ora di sveglia"
            value="07:00"
            color="#fbbf24"
          />
          <SettingNavRow
            icon="calendar-outline"
            label="Giorni attivi"
            value="Lun-Ven"
            color={COLORS.accent2}
            isLast
          />
        </View>

        {/* About */}
        <Text style={styles.sectionLabel}>Info</Text>
        <View style={styles.card}>
          <SettingNavRow icon="information-circle-outline" label="Versione" value="1.0.0" color={COLORS.textDim} />
          <SettingNavRow icon="document-text-outline" label="Privacy Policy" value="" color={COLORS.textDim} />
          <SettingNavRow icon="help-circle-outline" label="Supporto" value="" color={COLORS.textDim} isLast />
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} activeOpacity={0.7}>
          <Ionicons name="log-out-outline" size={18} color="#f87171" />
          <Text style={styles.logoutText}>Esci dall'account</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>Endormia Sleep OS v1.0{'\n'}Made with care for your sleep</Text>

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

function SettingToggle({ icon, label, description, value, onToggle, color, isLast = false }) {
  return (
    <View style={[styles.settingRow, !isLast && styles.settingRowBorder]}>
      <View style={[styles.settingIconWrap, { backgroundColor: `${color}15` }]}>
        <Ionicons name={icon} size={18} color={color} />
      </View>
      <View style={styles.settingInfo}>
        <Text style={styles.settingLabel}>{label}</Text>
        <Text style={styles.settingDesc}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: COLORS.border, true: `${color}60` }}
        thumbColor={value ? color : COLORS.textDim}
      />
    </View>
  );
}

function SettingNavRow({ icon, label, value, color, isLast = false }) {
  return (
    <TouchableOpacity style={[styles.settingRow, !isLast && styles.settingRowBorder]} activeOpacity={0.7}>
      <View style={[styles.settingIconWrap, { backgroundColor: `${color}15` }]}>
        <Ionicons name={icon} size={18} color={color} />
      </View>
      <View style={styles.settingInfo}>
        <Text style={styles.settingLabel}>{label}</Text>
      </View>
      {value ? <Text style={styles.settingValue}>{value}</Text> : null}
      <Ionicons name="chevron-forward" size={16} color={COLORS.textDim} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textDim,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
    marginTop: 8,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 4,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  profileAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.text,
  },
  profileEmail: {
    fontSize: 13,
    color: COLORS.accent,
    marginTop: 2,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  settingRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingInfo: {
    flex: 1,
    marginRight: 8,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  settingDesc: {
    fontSize: 11,
    color: COLORS.textDim,
    marginTop: 2,
  },
  settingValue: {
    fontSize: 14,
    color: COLORS.textDim,
    marginRight: 6,
  },
  deviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  deviceIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },
  deviceStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 6,
  },
  connectedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6ee7b7',
  },
  deviceStatus: {
    fontSize: 12,
    color: '#6ee7b7',
  },
  unpairButton: {
    backgroundColor: '#7f1d1d',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  unpairText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#f87171',
  },
  pairButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  pairIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
  },
  pairInfo: {
    flex: 1,
  },
  pairLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },
  pairDesc: {
    fontSize: 11,
    color: COLORS.textDim,
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#f87171',
  },
  footer: {
    textAlign: 'center',
    fontSize: 11,
    color: COLORS.textDim,
    opacity: 0.5,
    marginTop: 12,
    lineHeight: 18,
  },
});
