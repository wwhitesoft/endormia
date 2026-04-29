import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import EndormiaService from '../services/EndormiaService';

const { width } = Dimensions.get('window');

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

const TYPE_ICONS = {
  sound: 'volume-medium-outline',
  light: 'bulb-outline',
  temperature: 'thermometer-outline',
  vibration: 'pulse-outline',
  breathing: 'leaf-outline',
};

const TYPE_COLORS = {
  sound: COLORS.accent,
  light: '#fbbf24',
  temperature: COLORS.accent2,
  vibration: '#a78bfa',
  breathing: '#6ee7b7',
};

export default function RoutineScreen() {
  const [routine, setRoutine] = useState(() => EndormiaService.getRoutineRecommendation());
  const [enabledSteps, setEnabledSteps] = useState(() =>
    routine.steps.reduce((acc, step) => ({ ...acc, [step.id]: true }), {})
  );
  const [selectedSound, setSelectedSound] = useState('rain');
  const [showSoundPicker, setShowSoundPicker] = useState(false);
  const [isRoutineActive, setIsRoutineActive] = useState(false);

  const sounds = EndormiaService.getSoundLibrary();

  const toggleStep = useCallback((stepId) => {
    Haptics.selectionAsync();
    setEnabledSteps((prev) => ({ ...prev, [stepId]: !prev[stepId] }));
  }, []);

  const startRoutine = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setIsRoutineActive(true);
  };

  const stopRoutine = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsRoutineActive(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text style={styles.screenTitle}>Routine Serale</Text>
        <Text style={styles.screenSubtitle}>
          Personalizza la tua sequenza pre-sonno per un addormentamento ottimale.
        </Text>

        {/* Active Routine Banner */}
        {isRoutineActive && (
          <View style={styles.activeBanner}>
            <LinearGradient
              colors={['#141a2e', '#0f1219']}
              style={styles.activeBannerGradient}
            >
              <View style={styles.activePulse} />
              <View style={styles.activeBannerContent}>
                <Ionicons name="moon" size={20} color={COLORS.accent} />
                <View style={styles.activeBannerText}>
                  <Text style={styles.activeBannerTitle}>Routine in corso</Text>
                  <Text style={styles.activeBannerDesc}>La tua routine serale e attiva</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.stopButton} onPress={stopRoutine}>
                <Text style={styles.stopButtonText}>Ferma</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        )}

        {/* Routine Steps */}
        <View style={styles.stepsSection}>
          <Text style={styles.sectionLabel}>Sequenza</Text>

          {routine.steps.map((step, index) => {
            const isEnabled = enabledSteps[step.id];
            const typeColor = TYPE_COLORS[step.type] || COLORS.accent;

            return (
              <View key={step.id} style={styles.stepRow}>
                {/* Timeline connector */}
                <View style={styles.timelineCol}>
                  <View style={[styles.timelineDot, { backgroundColor: isEnabled ? typeColor : COLORS.border }]} />
                  {index < routine.steps.length - 1 && (
                    <View style={[styles.timelineConnector, { backgroundColor: isEnabled ? typeColor : COLORS.border, opacity: 0.3 }]} />
                  )}
                </View>

                {/* Step card */}
                <View style={[styles.stepCard, !isEnabled && styles.stepCardDisabled]}>
                  <View style={styles.stepCardHeader}>
                    <View style={[styles.stepIconWrap, { backgroundColor: isEnabled ? `${typeColor}20` : COLORS.surface }]}>
                      <Ionicons
                        name={TYPE_ICONS[step.type] || step.icon}
                        size={20}
                        color={isEnabled ? typeColor : COLORS.textDim}
                      />
                    </View>
                    <View style={styles.stepInfo}>
                      <Text style={[styles.stepLabel, !isEnabled && styles.stepLabelDisabled]}>
                        {step.label}
                      </Text>
                      <Text style={styles.stepTime}>
                        {step.time} {step.duration > 0 ? `- ${step.duration} min` : ''}
                      </Text>
                    </View>
                    <Switch
                      value={isEnabled}
                      onValueChange={() => toggleStep(step.id)}
                      trackColor={{ false: COLORS.border, true: `${typeColor}60` }}
                      thumbColor={isEnabled ? typeColor : COLORS.textDim}
                    />
                  </View>

                  <Text style={[styles.stepDesc, !isEnabled && styles.stepDescDisabled]}>
                    {step.description}
                  </Text>

                  {/* Sound picker for sound steps */}
                  {step.type === 'sound' && isEnabled && (
                    <TouchableOpacity
                      style={styles.soundSelector}
                      onPress={() => setShowSoundPicker(!showSoundPicker)}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="musical-note" size={16} color={COLORS.accent} />
                      <Text style={styles.soundSelectorText}>
                        {sounds.find((s) => s.id === selectedSound)?.label || 'Scegli suono'}
                      </Text>
                      <Ionicons name="chevron-down" size={16} color={COLORS.textDim} />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          })}
        </View>

        {/* Sound Library */}
        {showSoundPicker && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="musical-notes-outline" size={18} color={COLORS.accent} />
              <Text style={styles.cardTitle}>Libreria suoni</Text>
              <TouchableOpacity onPress={() => setShowSoundPicker(false)}>
                <Ionicons name="close" size={20} color={COLORS.textDim} />
              </TouchableOpacity>
            </View>

            {['nature', 'noise', 'binaural', 'ambient'].map((category) => {
              const categorySounds = sounds.filter((s) => s.category === category);
              if (categorySounds.length === 0) return null;

              const categoryLabel = {
                nature: 'Natura',
                noise: 'Rumore',
                binaural: 'Binaural',
                ambient: 'Ambiente',
              }[category];

              return (
                <View key={category} style={styles.soundCategory}>
                  <Text style={styles.soundCategoryLabel}>{categoryLabel}</Text>
                  <View style={styles.soundGrid}>
                    {categorySounds.map((sound) => {
                      const isSelected = selectedSound === sound.id;
                      return (
                        <TouchableOpacity
                          key={sound.id}
                          style={[styles.soundChip, isSelected && styles.soundChipSelected]}
                          onPress={() => {
                            Haptics.selectionAsync();
                            setSelectedSound(sound.id);
                          }}
                          activeOpacity={0.7}
                        >
                          <Ionicons
                            name={sound.icon}
                            size={16}
                            color={isSelected ? COLORS.accent : COLORS.textDim}
                          />
                          <Text style={[styles.soundChipText, isSelected && styles.soundChipTextSelected]}>
                            {sound.label}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {/* Custom settings */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="options-outline" size={18} color={COLORS.accent2} />
            <Text style={styles.cardTitle}>Impostazioni routine</Text>
          </View>

          <SettingRow label="Inizio automatico" description="Avvia la routine all'orario impostato" defaultValue={true} />
          <SettingRow label="Fade-out audio" description="Riduzione graduale del volume" defaultValue={true} />
          <SettingRow label="Vibrazione polso" description="Micro-vibrazioni per rilassamento" defaultValue={false} />
          <SettingRow label="Luce notturna" description="Luce ambientale a bassa intensita" defaultValue={false} />
        </View>

        {/* Start Button */}
        {!isRoutineActive && (
          <TouchableOpacity style={styles.startButton} onPress={startRoutine} activeOpacity={0.8}>
            <LinearGradient
              colors={[COLORS.accent, '#7b93e8']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.startButtonGradient}
            >
              <Ionicons name="moon" size={22} color={COLORS.bg} />
              <Text style={styles.startButtonText}>Avvia routine serale</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

function SettingRow({ label, description, defaultValue }) {
  const [value, setValue] = useState(defaultValue);

  return (
    <View style={styles.settingRow}>
      <View style={styles.settingInfo}>
        <Text style={styles.settingLabel}>{label}</Text>
        <Text style={styles.settingDesc}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={(v) => {
          Haptics.selectionAsync();
          setValue(v);
        }}
        trackColor={{ false: COLORS.border, true: `${COLORS.accent2}60` }}
        thumbColor={value ? COLORS.accent2 : COLORS.textDim}
      />
    </View>
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
    marginBottom: 8,
  },
  screenSubtitle: {
    fontSize: 14,
    color: COLORS.textDim,
    lineHeight: 20,
    marginBottom: 24,
  },
  activeBanner: {
    marginBottom: 20,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  activeBannerGradient: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activePulse: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6ee7b7',
    marginRight: 12,
  },
  activeBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 10,
  },
  activeBannerText: {
    flex: 1,
  },
  activeBannerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  activeBannerDesc: {
    fontSize: 11,
    color: COLORS.textDim,
  },
  stopButton: {
    backgroundColor: '#7f1d1d',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  stopButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#f87171',
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 16,
  },
  stepsSection: {
    marginBottom: 20,
  },
  stepRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  timelineCol: {
    width: 24,
    alignItems: 'center',
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 18,
  },
  timelineConnector: {
    width: 2,
    flex: 1,
    marginVertical: 4,
  },
  stepCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 16,
    marginLeft: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  stepCardDisabled: {
    opacity: 0.5,
  },
  stepCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepInfo: {
    flex: 1,
  },
  stepLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },
  stepLabelDisabled: {
    color: COLORS.textDim,
  },
  stepTime: {
    fontSize: 12,
    color: COLORS.textDim,
    marginTop: 2,
  },
  stepDesc: {
    fontSize: 12,
    color: COLORS.textDim,
    lineHeight: 16,
  },
  stepDescDisabled: {
    opacity: 0.6,
  },
  soundSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 10,
    gap: 6,
  },
  soundSelectorText: {
    fontSize: 13,
    color: COLORS.accent,
    flex: 1,
    fontWeight: '500',
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
  },
  soundCategory: {
    marginBottom: 16,
  },
  soundCategoryLabel: {
    fontSize: 12,
    color: COLORS.textDim,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  soundGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  soundChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  soundChipSelected: {
    borderColor: COLORS.accent,
    backgroundColor: '#141a2e',
  },
  soundChipText: {
    fontSize: 12,
    color: COLORS.textDim,
    fontWeight: '500',
  },
  soundChipTextSelected: {
    color: COLORS.accent,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingInfo: {
    flex: 1,
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  settingDesc: {
    fontSize: 11,
    color: COLORS.textDim,
  },
  startButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 8,
  },
  startButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 10,
  },
  startButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.bg,
  },
});
