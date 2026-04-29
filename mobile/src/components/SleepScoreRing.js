import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Svg, { Circle, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const COLORS = {
  bg: '#07090d',
  accent: '#99aeff',
  accent2: '#8ee3ff',
  text: '#f6f1ea',
  textDim: '#6b7280',
  border: '#1e2433',
};

export default function SleepScoreRing({ score = 0, size = 200, strokeWidth = 10, label = 'Sleep Score' }) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: score,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, [score]);

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
    extrapolate: 'clamp',
  });

  const displayScore = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  const getScoreColor = () => {
    if (score >= 85) return '#6ee7b7';
    if (score >= 70) return COLORS.accent;
    if (score >= 50) return '#fbbf24';
    return '#f87171';
  };

  const getQualityLabel = () => {
    if (score >= 85) return 'Eccellente';
    if (score >= 70) return 'Buono';
    if (score >= 50) return 'Sufficiente';
    return 'Scarso';
  };

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} style={styles.svg}>
        <Defs>
          <SvgGradient id="scoreGradient" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={COLORS.accent} stopOpacity="1" />
            <Stop offset="1" stopColor={COLORS.accent2} stopOpacity="1" />
          </SvgGradient>
        </Defs>

        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={COLORS.border}
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progress circle */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#scoreGradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>

      <View style={styles.innerContent}>
        <AnimatedText animatedValue={displayScore} style={styles.scoreText} />
        <Text style={[styles.qualityLabel, { color: getScoreColor() }]}>
          {getQualityLabel()}
        </Text>
        <Text style={styles.label}>{label}</Text>
      </View>
    </View>
  );
}

function AnimatedText({ animatedValue, style }) {
  const textRef = useRef(null);
  const currentValue = useRef(0);

  useEffect(() => {
    const listener = animatedValue.addListener(({ value }) => {
      currentValue.current = Math.round(value);
      if (textRef.current) {
        textRef.current.setNativeProps({ text: String(Math.round(value)) });
      }
    });
    return () => animatedValue.removeListener(listener);
  }, [animatedValue]);

  // Fallback: use a regular Text with the animated value
  return (
    <View style={styles.scoreContainer}>
      <Text style={style} ref={textRef}>
        {Math.round(currentValue.current)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  svg: {
    position: 'absolute',
  },
  innerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 56,
    fontWeight: '200',
    color: COLORS.text,
    letterSpacing: -2,
  },
  qualityLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
    letterSpacing: 1,
  },
  label: {
    fontSize: 11,
    color: COLORS.textDim,
    marginTop: 4,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
