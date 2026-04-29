import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const COLORS = {
  bg: '#07090d',
  text: '#f6f1ea',
  textDim: '#6b7280',
  border: '#1e2433',
};

const STAGE_CONFIG = {
  deep: { color: '#6366f1', label: 'Profondo', icon: '●' },
  rem: { color: '#99aeff', label: 'REM', icon: '●' },
  light: { color: '#8ee3ff', label: 'Leggero', icon: '●' },
  awake: { color: '#f87171', label: 'Sveglio', icon: '●' },
};

const STAGE_ORDER = ['deep', 'rem', 'light', 'awake'];

/**
 * SleepStageBar - Horizontal stacked bar showing sleep stage distribution.
 *
 * Props:
 *   stageSummary: { deep: { minutes, percent }, rem: ..., light: ..., awake: ... }
 *   height: bar height in pixels (default 12)
 *   showLegend: whether to show legend below (default true)
 *   showPercentages: whether to show % in legend (default true)
 */
export default function SleepStageBar({
  stageSummary,
  height = 12,
  showLegend = true,
  showPercentages = true,
}) {
  if (!stageSummary) return null;

  const totalPercent = STAGE_ORDER.reduce((sum, s) => sum + (stageSummary[s]?.percent || 0), 0);

  return (
    <View style={styles.container}>
      {/* Stacked bar */}
      <View style={[styles.barContainer, { height, borderRadius: height / 2 }]}>
        {STAGE_ORDER.map((stage, index) => {
          const data = stageSummary[stage];
          if (!data || data.percent === 0) return null;

          const widthPercent = totalPercent > 0 ? (data.percent / totalPercent) * 100 : 0;
          const config = STAGE_CONFIG[stage];

          return (
            <View
              key={stage}
              style={[
                styles.barSegment,
                {
                  width: `${widthPercent}%`,
                  backgroundColor: config.color,
                  borderTopLeftRadius: index === 0 ? height / 2 : 0,
                  borderBottomLeftRadius: index === 0 ? height / 2 : 0,
                  borderTopRightRadius: index === STAGE_ORDER.length - 1 ? height / 2 : 0,
                  borderBottomRightRadius: index === STAGE_ORDER.length - 1 ? height / 2 : 0,
                },
              ]}
            />
          );
        })}
      </View>

      {/* Legend */}
      {showLegend && (
        <View style={styles.legend}>
          {STAGE_ORDER.map((stage) => {
            const data = stageSummary[stage];
            if (!data) return null;

            const config = STAGE_CONFIG[stage];
            const hours = Math.floor(data.minutes / 60);
            const mins = data.minutes % 60;
            const timeStr = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;

            return (
              <View key={stage} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: config.color }]} />
                <View>
                  <Text style={styles.legendLabel}>{config.label}</Text>
                  <Text style={styles.legendValue}>
                    {timeStr}
                    {showPercentages && (
                      <Text style={styles.legendPercent}> ({data.percent}%)</Text>
                    )}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

/**
 * SleepStageTimeline - Vertical timeline of sleep stages throughout the night.
 *
 * Props:
 *   stages: array of { stage, startMinute, duration }
 *   totalMinutes: total sleep duration
 */
export function SleepStageTimeline({ stages, totalMinutes }) {
  if (!stages || stages.length === 0) return null;

  return (
    <View style={styles.timelineContainer}>
      {stages.map((block, index) => {
        const heightPercent = (block.duration / totalMinutes) * 100;
        if (heightPercent < 1) return null;

        const config = STAGE_CONFIG[block.stage];
        const leftOffset =
          block.stage === 'deep' ? 0 :
          block.stage === 'light' ? 1 :
          block.stage === 'rem' ? 2 : 3;

        return (
          <View
            key={index}
            style={[
              styles.timelineBlock,
              {
                height: `${Math.max(heightPercent, 2)}%`,
                backgroundColor: config.color,
                marginLeft: leftOffset * 20,
                opacity: 0.85,
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  barContainer: {
    flexDirection: 'row',
    overflow: 'hidden',
    backgroundColor: COLORS.border,
  },
  barSegment: {
    height: '100%',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
    flexWrap: 'wrap',
    gap: 4,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    minWidth: '22%',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
    marginTop: 3,
  },
  legendLabel: {
    fontSize: 11,
    color: COLORS.textDim,
    fontWeight: '500',
  },
  legendValue: {
    fontSize: 13,
    color: COLORS.text,
    fontWeight: '600',
    marginTop: 1,
  },
  legendPercent: {
    fontSize: 11,
    color: COLORS.textDim,
    fontWeight: '400',
  },
  timelineContainer: {
    width: '100%',
    height: 200,
    backgroundColor: COLORS.border,
    borderRadius: 8,
    overflow: 'hidden',
    padding: 2,
  },
  timelineBlock: {
    width: '70%',
    borderRadius: 3,
    marginVertical: 0.5,
  },
});
