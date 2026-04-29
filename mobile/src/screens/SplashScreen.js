import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const COLORS = {
  bg: '#07090d',
  accent: '#99aeff',
  accent2: '#8ee3ff',
  text: '#f6f1ea',
};

export default function SplashScreen() {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const glowOpacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowOpacity, {
          toValue: 0.8,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(glowOpacity, {
          toValue: 0.3,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0a0f1a', COLORS.bg, '#07090d']}
        style={StyleSheet.absoluteFill}
      />

      <Animated.View style={[styles.glowCircle, { opacity: glowOpacity }]} />

      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          },
        ]}
      >
        <View style={styles.moonIcon}>
          <View style={styles.moonOuter} />
          <View style={styles.moonInner} />
        </View>
        <Text style={styles.logoText}>endormia</Text>
        <View style={styles.logoDivider} />
      </Animated.View>

      <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
        Sleep Operating System
      </Animated.Text>

      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>v1.0 — Sleep OS</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowCircle: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: COLORS.accent,
    opacity: 0.05,
    top: height * 0.25,
  },
  logoContainer: {
    alignItems: 'center',
  },
  moonIcon: {
    width: 64,
    height: 64,
    marginBottom: 20,
    position: 'relative',
  },
  moonOuter: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.accent,
    position: 'absolute',
  },
  moonInner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.bg,
    position: 'absolute',
    top: -4,
    right: -4,
  },
  logoText: {
    fontSize: 42,
    fontWeight: '200',
    color: COLORS.text,
    letterSpacing: 8,
    textTransform: 'lowercase',
  },
  logoDivider: {
    width: 40,
    height: 1,
    backgroundColor: COLORS.accent,
    marginTop: 16,
    opacity: 0.6,
  },
  tagline: {
    marginTop: 24,
    fontSize: 13,
    color: COLORS.accent2,
    letterSpacing: 4,
    textTransform: 'uppercase',
    fontWeight: '300',
  },
  versionContainer: {
    position: 'absolute',
    bottom: 60,
  },
  versionText: {
    fontSize: 11,
    color: COLORS.accent,
    opacity: 0.4,
    letterSpacing: 2,
  },
});
