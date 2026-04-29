import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

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

const SLEEP_GOALS = [
  { id: 'fall_asleep', icon: 'bed-outline', label: 'Addormentarmi piu velocemente', desc: 'Ridurre il tempo di latenza' },
  { id: 'stay_asleep', icon: 'moon-outline', label: 'Dormire tutta la notte', desc: 'Meno risvegli notturni' },
  { id: 'deep_sleep', icon: 'pulse-outline', label: 'Piu sonno profondo', desc: 'Migliorare la qualita rigenerativa' },
  { id: 'wake_up', icon: 'sunny-outline', label: 'Svegliarmi riposato', desc: 'Energia al mattino' },
  { id: 'routine', icon: 'time-outline', label: 'Orario regolare', desc: 'Stabilizzare il ritmo circadiano' },
];

const ENVIRONMENTS = [
  { id: 'dark', icon: 'eye-off-outline', label: 'Stanza buia', selected: false },
  { id: 'quiet', icon: 'volume-mute-outline', label: 'Silenzioso', selected: false },
  { id: 'cool', icon: 'snow-outline', label: 'Temperatura fresca', selected: false },
  { id: 'noisy', icon: 'volume-high-outline', label: 'Rumore di fondo', selected: false },
  { id: 'partner', icon: 'people-outline', label: 'Con partner', selected: false },
  { id: 'pets', icon: 'paw-outline', label: 'Con animali', selected: false },
];

const SCHEDULE_OPTIONS = {
  bedtime: ['21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '00:00', '00:30'],
  wakeTime: ['05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30'],
};

export default function OnboardingScreen({ onComplete }) {
  const [step, setStep] = useState(0);
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [selectedEnv, setSelectedEnv] = useState([]);
  const [bedtime, setBedtime] = useState('23:00');
  const [wakeTime, setWakeTime] = useState('07:00');
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const animateTransition = (nextStep) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
    setTimeout(() => setStep(nextStep), 200);
  };

  const toggleGoal = (id) => {
    Haptics.selectionAsync();
    setSelectedGoals((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const toggleEnv = (id) => {
    Haptics.selectionAsync();
    setSelectedEnv((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const handleComplete = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onComplete();
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {[0, 1, 2].map((i) => (
        <View
          key={i}
          style={[
            styles.stepDot,
            i === step && styles.stepDotActive,
            i < step && styles.stepDotComplete,
          ]}
        />
      ))}
    </View>
  );

  const renderStep0 = () => (
    <View style={styles.stepContent}>
      <Ionicons name="moon" size={40} color={COLORS.accent} style={styles.stepIcon} />
      <Text style={styles.stepTitle}>I tuoi obiettivi del sonno</Text>
      <Text style={styles.stepSubtitle}>Seleziona uno o piu obiettivi. Li useremo per personalizzare la tua esperienza.</Text>

      <ScrollView style={styles.optionsList} showsVerticalScrollIndicator={false}>
        {SLEEP_GOALS.map((goal) => {
          const isSelected = selectedGoals.includes(goal.id);
          return (
            <TouchableOpacity
              key={goal.id}
              style={[styles.optionCard, isSelected && styles.optionCardSelected]}
              onPress={() => toggleGoal(goal.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.optionIconWrap, isSelected && styles.optionIconWrapSelected]}>
                <Ionicons name={goal.icon} size={22} color={isSelected ? COLORS.bg : COLORS.accent} />
              </View>
              <View style={styles.optionTextWrap}>
                <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                  {goal.label}
                </Text>
                <Text style={styles.optionDesc}>{goal.desc}</Text>
              </View>
              {isSelected && (
                <Ionicons name="checkmark-circle" size={22} color={COLORS.accent} />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  const renderStep1 = () => (
    <View style={styles.stepContent}>
      <Ionicons name="bed" size={40} color={COLORS.accent2} style={styles.stepIcon} />
      <Text style={styles.stepTitle}>Il tuo ambiente</Text>
      <Text style={styles.stepSubtitle}>Come e la tua camera da letto? Seleziona tutto cio che si applica.</Text>

      <View style={styles.envGrid}>
        {ENVIRONMENTS.map((env) => {
          const isSelected = selectedEnv.includes(env.id);
          return (
            <TouchableOpacity
              key={env.id}
              style={[styles.envCard, isSelected && styles.envCardSelected]}
              onPress={() => toggleEnv(env.id)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={env.icon}
                size={28}
                color={isSelected ? COLORS.accent2 : COLORS.textDim}
              />
              <Text style={[styles.envLabel, isSelected && styles.envLabelSelected]}>
                {env.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContent}>
      <Ionicons name="time" size={40} color={COLORS.accent} style={styles.stepIcon} />
      <Text style={styles.stepTitle}>Il tuo orario</Text>
      <Text style={styles.stepSubtitle}>Quando vai a dormire e quando ti svegli di solito?</Text>

      <View style={styles.scheduleSection}>
        <Text style={styles.scheduleLabel}>
          <Ionicons name="moon-outline" size={16} color={COLORS.accent} /> Ora di andare a letto
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.timeScroll}>
          {SCHEDULE_OPTIONS.bedtime.map((time) => (
            <TouchableOpacity
              key={time}
              style={[styles.timeChip, bedtime === time && styles.timeChipSelected]}
              onPress={() => { Haptics.selectionAsync(); setBedtime(time); }}
            >
              <Text style={[styles.timeChipText, bedtime === time && styles.timeChipTextSelected]}>
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.scheduleSection}>
        <Text style={styles.scheduleLabel}>
          <Ionicons name="sunny-outline" size={16} color={COLORS.accent2} /> Ora di sveglia
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.timeScroll}>
          {SCHEDULE_OPTIONS.wakeTime.map((time) => (
            <TouchableOpacity
              key={time}
              style={[styles.timeChip, wakeTime === time && styles.timeChipSelected]}
              onPress={() => { Haptics.selectionAsync(); setWakeTime(time); }}
            >
              <Text style={[styles.timeChipText, wakeTime === time && styles.timeChipTextSelected]}>
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.sleepDurationBox}>
        <Text style={styles.sleepDurationLabel}>Durata prevista del sonno</Text>
        <Text style={styles.sleepDurationValue}>
          {(() => {
            const [bH, bM] = bedtime.split(':').map(Number);
            const [wH, wM] = wakeTime.split(':').map(Number);
            let diff = (wH * 60 + wM) - (bH * 60 + bM);
            if (diff <= 0) diff += 24 * 60;
            const h = Math.floor(diff / 60);
            const m = diff % 60;
            return `${h}h ${m > 0 ? m + 'min' : ''}`;
          })()}
        </Text>
      </View>
    </View>
  );

  const canProceed = () => {
    if (step === 0) return selectedGoals.length > 0;
    if (step === 1) return selectedEnv.length > 0;
    return true;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0a0f1a', COLORS.bg]}
        style={StyleSheet.absoluteFill}
      />

      {renderStepIndicator()}

      <Animated.View style={[styles.animatedContent, { opacity: fadeAnim }]}>
        {step === 0 && renderStep0()}
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
      </Animated.View>

      <View style={styles.bottomBar}>
        {step > 0 && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => animateTransition(step - 1)}
          >
            <Ionicons name="chevron-back" size={20} color={COLORS.textDim} />
            <Text style={styles.backText}>Indietro</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.nextButton, !canProceed() && styles.nextButtonDisabled]}
          onPress={() => {
            if (!canProceed()) return;
            if (step < 2) animateTransition(step + 1);
            else handleComplete();
          }}
          disabled={!canProceed()}
        >
          <LinearGradient
            colors={canProceed() ? [COLORS.accent, '#7b93e8'] : [COLORS.card, COLORS.card]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.nextButtonGradient}
          >
            <Text style={[styles.nextText, !canProceed() && styles.nextTextDisabled]}>
              {step === 2 ? 'Inizia a dormire meglio' : 'Continua'}
            </Text>
            {step < 2 && <Ionicons name="chevron-forward" size={18} color={canProceed() ? COLORS.bg : COLORS.textDim} />}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingTop: 60,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
  },
  stepDot: {
    width: 32,
    height: 3,
    borderRadius: 2,
    backgroundColor: COLORS.border,
  },
  stepDotActive: {
    backgroundColor: COLORS.accent,
    width: 48,
  },
  stepDotComplete: {
    backgroundColor: COLORS.accent,
    opacity: 0.4,
  },
  animatedContent: {
    flex: 1,
  },
  stepContent: {
    flex: 1,
    paddingHorizontal: 24,
  },
  stepIcon: {
    marginBottom: 16,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  stepSubtitle: {
    fontSize: 15,
    color: COLORS.textDim,
    lineHeight: 22,
    marginBottom: 28,
  },
  optionsList: {
    flex: 1,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  optionCardSelected: {
    borderColor: COLORS.accent,
    backgroundColor: '#141a2e',
  },
  optionIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  optionIconWrapSelected: {
    backgroundColor: COLORS.accent,
  },
  optionTextWrap: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  optionLabelSelected: {
    color: COLORS.accent,
  },
  optionDesc: {
    fontSize: 12,
    color: COLORS.textDim,
  },
  envGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  envCard: {
    width: (width - 60) / 2,
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  envCardSelected: {
    borderColor: COLORS.accent2,
    backgroundColor: '#0f1a22',
  },
  envLabel: {
    fontSize: 13,
    color: COLORS.textDim,
    marginTop: 10,
    textAlign: 'center',
  },
  envLabelSelected: {
    color: COLORS.accent2,
  },
  scheduleSection: {
    marginBottom: 28,
  },
  scheduleLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 12,
  },
  timeScroll: {
    flexGrow: 0,
  },
  timeChip: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: COLORS.card,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  timeChipSelected: {
    backgroundColor: '#141a2e',
    borderColor: COLORS.accent,
  },
  timeChipText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textDim,
  },
  timeChipTextSelected: {
    color: COLORS.accent,
  },
  sleepDurationBox: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sleepDurationLabel: {
    fontSize: 12,
    color: COLORS.textDim,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  sleepDurationValue: {
    fontSize: 32,
    fontWeight: '200',
    color: COLORS.accent,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  backText: {
    fontSize: 15,
    color: COLORS.textDim,
    marginLeft: 4,
  },
  nextButton: {
    flex: 1,
    marginLeft: 12,
    borderRadius: 14,
    overflow: 'hidden',
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
  nextButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 14,
  },
  nextText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.bg,
    marginRight: 4,
  },
  nextTextDisabled: {
    color: COLORS.textDim,
  },
});
