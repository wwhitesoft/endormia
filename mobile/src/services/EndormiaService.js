/**
 * EndormiaService - Mock API service with realistic sleep data.
 * Generates deterministic but varied sleep data for demo/development.
 */

const STAGE_LABELS = ['awake', 'rem', 'light', 'deep'];
const STAGE_COLORS = {
  awake: '#f87171',
  rem: '#99aeff',
  light: '#8ee3ff',
  deep: '#6366f1',
};

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateSleepStages(date) {
  const seed = new Date(date).getTime();
  const rng = seededRandom(seed);

  const stages = [];
  let currentMinute = 0;
  const totalMinutes = 360 + Math.floor(rng() * 120); // 6-8 hours

  while (currentMinute < totalMinutes) {
    const elapsed = currentMinute / totalMinutes;
    let weights;

    if (elapsed < 0.05) {
      weights = [0.3, 0.0, 0.6, 0.1]; // falling asleep: mostly light
    } else if (elapsed < 0.3) {
      weights = [0.02, 0.1, 0.35, 0.53]; // early: heavy deep sleep
    } else if (elapsed < 0.6) {
      weights = [0.05, 0.3, 0.4, 0.25]; // mid: mixed
    } else {
      weights = [0.08, 0.45, 0.4, 0.07]; // late: more REM
    }

    const r = rng();
    let cumulative = 0;
    let stageIndex = 0;
    for (let i = 0; i < weights.length; i++) {
      cumulative += weights[i];
      if (r <= cumulative) {
        stageIndex = i;
        break;
      }
    }

    const duration = 5 + Math.floor(rng() * 25); // 5-30 min blocks
    stages.push({
      stage: STAGE_LABELS[stageIndex],
      startMinute: currentMinute,
      duration: Math.min(duration, totalMinutes - currentMinute),
    });
    currentMinute += duration;
  }

  return { stages, totalMinutes };
}

function computeStageSummary(stages, totalMinutes) {
  const summary = { awake: 0, rem: 0, light: 0, deep: 0 };
  stages.forEach((s) => {
    summary[s.stage] += s.duration;
  });

  return {
    awake: { minutes: summary.awake, percent: Math.round((summary.awake / totalMinutes) * 100) },
    rem: { minutes: summary.rem, percent: Math.round((summary.rem / totalMinutes) * 100) },
    light: { minutes: summary.light, percent: Math.round((summary.light / totalMinutes) * 100) },
    deep: { minutes: summary.deep, percent: Math.round((summary.deep / totalMinutes) * 100) },
  };
}

function computeSleepScore(stageSummary, totalMinutes) {
  let score = 50;

  // Duration bonus: 7-9h is ideal
  const hours = totalMinutes / 60;
  if (hours >= 7 && hours <= 9) score += 20;
  else if (hours >= 6) score += 10;
  else score -= 10;

  // Deep sleep: 13-23% is ideal
  if (stageSummary.deep.percent >= 13 && stageSummary.deep.percent <= 23) score += 15;
  else if (stageSummary.deep.percent >= 10) score += 8;

  // REM: 20-25% is ideal
  if (stageSummary.rem.percent >= 18 && stageSummary.rem.percent <= 28) score += 10;
  else if (stageSummary.rem.percent >= 15) score += 5;

  // Low awake time is good
  if (stageSummary.awake.percent < 5) score += 5;
  else if (stageSummary.awake.percent > 15) score -= 10;

  return Math.max(0, Math.min(100, score));
}

function formatMinutes(min) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h}h ${m > 0 ? m + 'min' : ''}`.trim();
}

function dateKey(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

class EndormiaService {
  /**
   * Get full sleep data for a given night.
   */
  static getSleepData(date = new Date()) {
    const { stages, totalMinutes } = generateSleepStages(date);
    const stageSummary = computeStageSummary(stages, totalMinutes);
    const score = computeSleepScore(stageSummary, totalMinutes);

    const seed = new Date(date).getTime();
    const rng = seededRandom(seed + 999);

    const bedHour = 22 + Math.floor(rng() * 2);
    const bedMin = Math.floor(rng() * 4) * 15;
    const wakeHour = 6 + Math.floor(rng() * 2);
    const wakeMin = Math.floor(rng() * 4) * 15;

    return {
      date: dateKey(date),
      score,
      quality: score >= 85 ? 'Eccellente' : score >= 70 ? 'Buono' : score >= 50 ? 'Sufficiente' : 'Scarso',
      totalMinutes,
      duration: formatMinutes(totalMinutes),
      bedtime: `${String(bedHour).padStart(2, '0')}:${String(bedMin).padStart(2, '0')}`,
      wakeTime: `${String(wakeHour).padStart(2, '0')}:${String(wakeMin).padStart(2, '0')}`,
      latency: 5 + Math.floor(rng() * 25), // minutes to fall asleep
      stages,
      stageSummary,
      heartRateAvg: 52 + Math.floor(rng() * 12),
      breathingRate: 12 + Math.floor(rng() * 6),
    };
  }

  /**
   * Get sleep data for the past N days.
   */
  static getSleepHistory(days = 30) {
    const history = [];
    const now = new Date();
    for (let i = 0; i < days; i++) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      history.push(EndormiaService.getSleepData(d));
    }
    return history;
  }

  /**
   * Get weekly summary stats.
   */
  static getWeeklySummary() {
    const week = EndormiaService.getSleepHistory(7);
    const avgScore = Math.round(week.reduce((s, d) => s + d.score, 0) / week.length);
    const avgDuration = Math.round(week.reduce((s, d) => s + d.totalMinutes, 0) / week.length);
    const avgDeep = Math.round(
      week.reduce((s, d) => s + d.stageSummary.deep.percent, 0) / week.length
    );
    const avgRem = Math.round(
      week.reduce((s, d) => s + d.stageSummary.rem.percent, 0) / week.length
    );

    return {
      avgScore,
      avgDuration: formatMinutes(avgDuration),
      avgDeepPercent: avgDeep,
      avgRemPercent: avgRem,
      trend: week[0].score > week[6].score ? 'improving' : week[0].score < week[6].score ? 'declining' : 'stable',
      days: week.reverse(),
    };
  }

  /**
   * Get tonight's recommended routine.
   */
  static getRoutineRecommendation() {
    return {
      title: 'Routine Serale',
      startTime: '22:00',
      steps: [
        {
          id: 'dim_lights',
          time: '22:00',
          label: 'Luci soffuse',
          icon: 'bulb-outline',
          description: 'Abbassa gradualmente le luci a toni caldi',
          duration: 30,
          type: 'light',
        },
        {
          id: 'breathing',
          time: '22:30',
          label: 'Respirazione 4-7-8',
          icon: 'leaf-outline',
          description: '3 cicli di respirazione rilassante',
          duration: 10,
          type: 'breathing',
        },
        {
          id: 'soundscape',
          time: '22:40',
          label: 'Suoni della natura',
          icon: 'water-outline',
          description: 'Pioggia leggera con fade-out in 30 min',
          duration: 30,
          type: 'sound',
        },
        {
          id: 'temperature',
          time: '22:40',
          label: 'Temperatura',
          icon: 'thermometer-outline',
          description: 'Abbassa a 18°C per sonno ottimale',
          duration: 0,
          type: 'temperature',
        },
        {
          id: 'vibration',
          time: '23:00',
          label: 'Vibrazione gentile',
          icon: 'pulse-outline',
          description: 'Micro-vibrazioni a frequenza delta',
          duration: 15,
          type: 'vibration',
        },
      ],
    };
  }

  /**
   * Available sounds for routine builder.
   */
  static getSoundLibrary() {
    return [
      { id: 'rain', label: 'Pioggia', icon: 'rainy-outline', category: 'nature' },
      { id: 'ocean', label: 'Oceano', icon: 'water-outline', category: 'nature' },
      { id: 'forest', label: 'Foresta', icon: 'leaf-outline', category: 'nature' },
      { id: 'wind', label: 'Vento', icon: 'cloud-outline', category: 'nature' },
      { id: 'fireplace', label: 'Camino', icon: 'flame-outline', category: 'ambient' },
      { id: 'white_noise', label: 'Rumore bianco', icon: 'radio-outline', category: 'noise' },
      { id: 'pink_noise', label: 'Rumore rosa', icon: 'radio-outline', category: 'noise' },
      { id: 'brown_noise', label: 'Rumore marrone', icon: 'radio-outline', category: 'noise' },
      { id: 'binaural_delta', label: 'Binaural Delta', icon: 'pulse-outline', category: 'binaural' },
      { id: 'binaural_theta', label: 'Binaural Theta', icon: 'pulse-outline', category: 'binaural' },
    ];
  }

  /**
   * Calendar data for month view - which days have sleep data.
   */
  static getCalendarData(year, month) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    const data = {};

    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(year, month, day);
      if (d > today) continue;
      const sleepData = EndormiaService.getSleepData(d);
      data[day] = {
        score: sleepData.score,
        quality: sleepData.quality,
        duration: sleepData.duration,
      };
    }

    return data;
  }

  static STAGE_COLORS = STAGE_COLORS;
}

export default EndormiaService;
