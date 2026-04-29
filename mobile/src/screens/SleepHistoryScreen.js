import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import EndormiaService from '../services/EndormiaService';
import SleepStageBar from '../components/SleepStageBar';

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

const DAYS_IT = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
const MONTHS_IT = [
  'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
  'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre',
];

export default function SleepHistoryScreen() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' or 'weekly'

  const calendarData = useMemo(
    () => EndormiaService.getCalendarData(currentYear, currentMonth),
    [currentYear, currentMonth]
  );

  const weeklySummary = useMemo(() => EndormiaService.getWeeklySummary(), []);

  const selectedSleepData = useMemo(() => {
    const d = new Date(currentYear, currentMonth, selectedDay);
    if (d > today) return null;
    return EndormiaService.getSleepData(d);
  }, [currentYear, currentMonth, selectedDay]);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDay(1);
  };

  const nextMonth = () => {
    const now = new Date();
    const nextM = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextY = currentMonth === 11 ? currentYear + 1 : currentYear;
    if (new Date(nextY, nextM, 1) > now) return;
    setCurrentMonth(nextM);
    setCurrentYear(nextY);
    setSelectedDay(1);
  };

  const renderCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const offset = firstDay === 0 ? 6 : firstDay - 1; // Monday start

    const cells = [];
    for (let i = 0; i < offset; i++) {
      cells.push(<View key={`empty-${i}`} style={styles.calendarCell} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const data = calendarData[day];
      const isSelected = day === selectedDay;
      const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
      const isFuture = new Date(currentYear, currentMonth, day) > today;

      let bgColor = 'transparent';
      if (data && !isFuture) {
        if (data.score >= 85) bgColor = '#166534';
        else if (data.score >= 70) bgColor = '#1e3a5f';
        else if (data.score >= 50) bgColor = '#713f12';
        else bgColor = '#7f1d1d';
      }

      cells.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.calendarCell,
            { backgroundColor: bgColor },
            isSelected && styles.calendarCellSelected,
            isToday && styles.calendarCellToday,
          ]}
          onPress={() => !isFuture && setSelectedDay(day)}
          disabled={isFuture}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.calendarDayText,
              isFuture && styles.calendarDayFuture,
              isSelected && styles.calendarDaySelected,
            ]}
          >
            {day}
          </Text>
          {data && !isFuture && (
            <Text style={styles.calendarScore}>{data.score}</Text>
          )}
        </TouchableOpacity>
      );
    }

    return cells;
  };

  const renderWeeklyChart = () => {
    const { days } = weeklySummary;
    const maxMinutes = Math.max(...days.map((d) => d.totalMinutes));

    return (
      <View style={styles.weeklyChart}>
        {days.map((day, index) => {
          const heightPercent = (day.totalMinutes / maxMinutes) * 100;
          const dayName = DAYS_IT[new Date(day.date).getDay() === 0 ? 6 : new Date(day.date).getDay() - 1];

          return (
            <View key={day.date} style={styles.weeklyBarCol}>
              <Text style={styles.weeklyBarScore}>{day.score}</Text>
              <View style={styles.weeklyBarTrack}>
                <LinearGradient
                  colors={[COLORS.accent, COLORS.accent2]}
                  style={[styles.weeklyBarFill, { height: `${heightPercent}%` }]}
                />
              </View>
              <Text style={styles.weeklyBarLabel}>{dayName}</Text>
              <Text style={styles.weeklyBarDuration}>{day.duration}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text style={styles.screenTitle}>Storico Sonno</Text>

        {/* View Toggle */}
        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'calendar' && styles.toggleButtonActive]}
            onPress={() => setViewMode('calendar')}
          >
            <Ionicons name="calendar-outline" size={16} color={viewMode === 'calendar' ? COLORS.bg : COLORS.textDim} />
            <Text style={[styles.toggleText, viewMode === 'calendar' && styles.toggleTextActive]}>Calendario</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'weekly' && styles.toggleButtonActive]}
            onPress={() => setViewMode('weekly')}
          >
            <Ionicons name="bar-chart-outline" size={16} color={viewMode === 'weekly' ? COLORS.bg : COLORS.textDim} />
            <Text style={[styles.toggleText, viewMode === 'weekly' && styles.toggleTextActive]}>Settimana</Text>
          </TouchableOpacity>
        </View>

        {viewMode === 'calendar' ? (
          <>
            {/* Month Navigation */}
            <View style={styles.monthNav}>
              <TouchableOpacity onPress={prevMonth} style={styles.monthNavButton}>
                <Ionicons name="chevron-back" size={20} color={COLORS.text} />
              </TouchableOpacity>
              <Text style={styles.monthLabel}>
                {MONTHS_IT[currentMonth]} {currentYear}
              </Text>
              <TouchableOpacity onPress={nextMonth} style={styles.monthNavButton}>
                <Ionicons name="chevron-forward" size={20} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            {/* Day headers */}
            <View style={styles.dayHeaders}>
              {DAYS_IT.map((d) => (
                <Text key={d} style={styles.dayHeaderText}>{d}</Text>
              ))}
            </View>

            {/* Calendar Grid */}
            <View style={styles.calendarGrid}>{renderCalendar()}</View>

            {/* Selected Day Detail */}
            {selectedSleepData && (
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Ionicons name="moon-outline" size={18} color={COLORS.accent} />
                  <Text style={styles.cardTitle}>
                    {selectedDay} {MONTHS_IT[currentMonth]}
                  </Text>
                  <View style={styles.scoreBadge}>
                    <Text style={styles.scoreBadgeText}>{selectedSleepData.score}</Text>
                  </View>
                </View>

                <View style={styles.detailRow}>
                  <DetailItem label="Durata" value={selectedSleepData.duration} />
                  <DetailItem label="Qualita" value={selectedSleepData.quality} />
                  <DetailItem label="Latenza" value={`${selectedSleepData.latency}min`} />
                </View>

                <View style={styles.divider} />
                <SleepStageBar stageSummary={selectedSleepData.stageSummary} height={10} />
              </View>
            )}
          </>
        ) : (
          <>
            {/* Weekly Summary Stats */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name="analytics-outline" size={18} color={COLORS.accent2} />
                <Text style={styles.cardTitle}>Riepilogo settimanale</Text>
              </View>

              <View style={styles.weeklyStats}>
                <WeeklyStat label="Score medio" value={`${weeklySummary.avgScore}`} accent={COLORS.accent} />
                <WeeklyStat label="Durata media" value={weeklySummary.avgDuration} accent={COLORS.accent2} />
                <WeeklyStat label="Profondo" value={`${weeklySummary.avgDeepPercent}%`} accent="#6366f1" />
                <WeeklyStat label="REM" value={`${weeklySummary.avgRemPercent}%`} accent={COLORS.accent} />
              </View>

              <View style={styles.trendRow}>
                <Ionicons
                  name={weeklySummary.trend === 'improving' ? 'trending-up' : weeklySummary.trend === 'declining' ? 'trending-down' : 'remove'}
                  size={18}
                  color={weeklySummary.trend === 'improving' ? '#6ee7b7' : weeklySummary.trend === 'declining' ? '#f87171' : COLORS.textDim}
                />
                <Text style={[
                  styles.trendText,
                  { color: weeklySummary.trend === 'improving' ? '#6ee7b7' : weeklySummary.trend === 'declining' ? '#f87171' : COLORS.textDim }
                ]}>
                  {weeklySummary.trend === 'improving' ? 'In miglioramento' : weeklySummary.trend === 'declining' ? 'In calo' : 'Stabile'}
                </Text>
              </View>
            </View>

            {/* Weekly Chart */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name="bar-chart-outline" size={18} color={COLORS.accent} />
                <Text style={styles.cardTitle}>Durata per giorno</Text>
              </View>
              {renderWeeklyChart()}
            </View>
          </>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

function DetailItem({ label, value }) {
  return (
    <View style={styles.detailItem}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

function WeeklyStat({ label, value, accent }) {
  return (
    <View style={styles.weeklyStatItem}>
      <Text style={styles.weeklyStatLabel}>{label}</Text>
      <Text style={[styles.weeklyStatValue, { color: accent }]}>{value}</Text>
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
    marginBottom: 20,
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  toggleButtonActive: {
    backgroundColor: COLORS.accent,
  },
  toggleText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textDim,
  },
  toggleTextActive: {
    color: COLORS.bg,
  },
  monthNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  monthNavButton: {
    padding: 8,
  },
  monthLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  dayHeaders: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  dayHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textDim,
    letterSpacing: 0.5,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  calendarCell: {
    width: (width - 40) / 7,
    height: (width - 40) / 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginBottom: 2,
  },
  calendarCellSelected: {
    borderWidth: 2,
    borderColor: COLORS.accent,
  },
  calendarCellToday: {
    borderWidth: 1,
    borderColor: COLORS.accent2,
  },
  calendarDayText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
  },
  calendarDayFuture: {
    color: COLORS.border,
  },
  calendarDaySelected: {
    color: COLORS.accent,
  },
  calendarScore: {
    fontSize: 9,
    color: COLORS.text,
    opacity: 0.7,
    marginTop: 1,
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
  scoreBadge: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  scoreBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.bg,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
  detailLabel: {
    fontSize: 11,
    color: COLORS.textDim,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 14,
  },
  weeklyStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  weeklyStatItem: {
    width: '46%',
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    padding: 14,
  },
  weeklyStatLabel: {
    fontSize: 11,
    color: COLORS.textDim,
    marginBottom: 4,
  },
  weeklyStatValue: {
    fontSize: 22,
    fontWeight: '600',
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    gap: 6,
  },
  trendText: {
    fontSize: 13,
    fontWeight: '600',
  },
  weeklyChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 200,
    alignItems: 'flex-end',
  },
  weeklyBarCol: {
    flex: 1,
    alignItems: 'center',
  },
  weeklyBarScore: {
    fontSize: 10,
    color: COLORS.textDim,
    marginBottom: 4,
  },
  weeklyBarTrack: {
    width: 24,
    height: 120,
    backgroundColor: COLORS.border,
    borderRadius: 6,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  weeklyBarFill: {
    width: '100%',
    borderRadius: 6,
  },
  weeklyBarLabel: {
    fontSize: 11,
    color: COLORS.textDim,
    fontWeight: '600',
    marginTop: 6,
  },
  weeklyBarDuration: {
    fontSize: 9,
    color: COLORS.textDim,
    marginTop: 2,
  },
});
