import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import SleepScoreRing from '../components/SleepScoreRing';
import SleepStageBar from '../components/SleepStageBar';
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

const QUICK_ACTIONS = [
  { id: 'sleep_now', icon: 'moon', label: 'Dormi ora', color: COLORS.accent, gradient: ['#99aeff', '#6366f1'] },
  { id: 'routine', icon: 'musical-notes', label: 'Routine serale', color: COLORS.accent2, gradient: ['#8ee3ff', '#0ea5e9'] },
  { id: 'woke_up', icon: 'sunny', label: 'Mi sono svegliato', color: '#fbbf24', gradient: ['#fbbf24', '#f59e0b'] },
];

export default function HomeScreen({ navigation }) {
  const [sleepData, setSleepData] = useState(null);
  const [routine, setRoutine] = useState(null);

  useEffect(() => {
    setSleepData(EndormiaService.getSleepData(new Date()));
    setRoutine(EndormiaService.getRoutineRecommendation());
  }, []);

  const handleQuickAction = (actionId) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  if (!sleepData) return <View style={styles.container} />;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0c1120', COLORS.bg, COLORS.bg]}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Buongiorno</Text>
            <Text style={styles.dateText}>
              {new Date().toLocaleDateString('it-IT', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
            </Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle-outline" size={36} color={COLORS.accent} />
          </TouchableOpacity>
        </View>

        {/* Sleep Score */}
        <View style={styles.scoreSection}>
          <SleepScoreRing score={sleepData.score} size={200} strokeWidth={10} />
        </View>

        {/* Last Night Summary */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="moon-outline" size={18} color={COLORS.accent} />
            <Text style={styles.cardTitle}>La notte scorsa</Text>
          </View>

          <View style={styles.summaryRow}>
            <SummaryItem
              icon="time-outline"
              label="Durata"
              value={sleepData.duration}
              color={COLORS.accent}
            />
            <SummaryItem
              icon="bed-outline"
              label="A letto"
              value={sleepData.bedtime}
              color={COLORS.accent2}
            />
            <SummaryItem
              icon="sunny-outline"
              label="Sveglia"
              value={sleepData.wakeTime}
              color="#fbbf24"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <SummaryItem
              icon="hourglass-outline"
              label="Latenza"
              value={`${sleepData.latency} min`}
              color={COLORS.accent}
            />
            <SummaryItem
              icon="heart-outline"
              label="FC Media"
              value={`${sleepData.heartRateAvg} bpm`}
              color="#f87171"
            />
            <SummaryItem
              icon="pulse-outline"
              label="Respirazione"
              value={`${sleepData.breathingRate}/min`}
              color="#6ee7b7"
            />
          </View>
        </View>

        {/* Sleep Stages */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="layers-outline" size={18} color={COLORS.accent2} />
            <Text style={styles.cardTitle}>Fasi del sonno</Text>
          </View>
          <SleepStageBar stageSummary={sleepData.stageSummary} height={14} />
        </View>

        {/* Tonight's Routine */}
        {routine && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="sparkles-outline" size={18} color={COLORS.accent} />
              <Text style={styles.cardTitle}>Routine consigliata stasera</Text>
            </View>

            {routine.steps.slice(0, 3).map((step, index) => (
              <View key={step.id} style={styles.routineStep}>
                <View style={styles.routineTimeCol}>
                  <Text style={styles.routineTime}>{step.time}</Text>
                  {index < 2 && <View style={styles.routineLine} />}
                </View>
                <View style={styles.routineContent}>
                  <View style={styles.routineIconWrap}>
                    <Ionicons name={step.icon} size={18} color={COLORS.accent} />
                  </View>
                  <View style={styles.routineTextWrap}>
                    <Text style={styles.routineLabel}>{step.label}</Text>
                    <Text style={styles.routineDesc}>{step.description}</Text>
                  </View>
                </View>
              </View>
            ))}

            <TouchableOpacity
              style={styles.seeAllButton}
              onPress={() => navigation.navigate('Routine')}
            >
              <Text style={styles.seeAllText}>Vedi routine completa</Text>
              <Ionicons name="chevron-forward" size={16} color={COLORS.accent} />
            </TouchableOpacity>
          </View>
        )}

        {/* Quick Actions */}
        <Text style={styles.sectionLabel}>Azioni rapide</Text>
        <View style={styles.quickActions}>
          {QUICK_ACTIONS.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={styles.quickActionButton}
              onPress={() => handleQuickAction(action.id)}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={action.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.quickActionGradient}
              >
                <Ionicons name={action.icon} size={24} color={COLORS.bg} />
              </LinearGradient>
              <Text style={styles.quickActionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

function SummaryItem({ icon, label, value, color }) {
  return (
    <View style={styles.summaryItem}>
      <Ionicons name={icon} size={16} color={color} />
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 28,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
  },
  dateText: {
    fontSize: 14,
    color: COLORS.textDim,
    marginTop: 4,
    textTransform: 'capitalize',
  },
  profileButton: {
    padding: 4,
  },
  scoreSection: {
    alignItems: 'center',
    marginBottom: 28,
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
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryLabel: {
    fontSize: 11,
    color: COLORS.textDim,
    marginTop: 6,
    letterSpacing: 0.3,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 14,
  },
  routineStep: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  routineTimeCol: {
    width: 50,
    alignItems: 'center',
  },
  routineTime: {
    fontSize: 12,
    color: COLORS.textDim,
    fontWeight: '500',
  },
  routineLine: {
    width: 1,
    flex: 1,
    backgroundColor: COLORS.border,
    marginVertical: 4,
  },
  routineContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: 16,
    paddingLeft: 8,
  },
  routineIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  routineTextWrap: {
    flex: 1,
  },
  routineLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  routineDesc: {
    fontSize: 12,
    color: COLORS.textDim,
    lineHeight: 16,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginTop: 4,
  },
  seeAllText: {
    fontSize: 13,
    color: COLORS.accent,
    fontWeight: '600',
    marginRight: 4,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 14,
    marginTop: 8,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    alignItems: 'center',
  },
  quickActionGradient: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickActionLabel: {
    fontSize: 11,
    color: COLORS.textDim,
    textAlign: 'center',
    fontWeight: '500',
  },
});
