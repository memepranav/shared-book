import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, typography, spacing, borderRadius} from '../../theme';
import {Button} from '../../components/Button';

const {width, height} = Dimensions.get('window');

interface OnboardingScreen3Props {
  onGetStarted: () => void;
  onSkip: () => void;
}

export const OnboardingScreen3: React.FC<OnboardingScreen3Props> = ({
  onGetStarted,
  onSkip,
}) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        {/* Main Content */}
        <View style={styles.content}>
          <Text style={styles.title}>
            Take your{'\n'}Control money{'\n'}Today's
          </Text>
          <Text style={styles.subtitle}>
            Join thousands who are building{'\n'}wealth goals
          </Text>
        </View>

        {/* Illustration Area */}
        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationCircle}>
            <Text style={styles.illustrationEmoji}>💼</Text>
          </View>
          <View style={styles.cardIcon}>
            <Text style={styles.cardEmoji}>💳</Text>
          </View>
          <View style={styles.noteIcon}>
            <Text style={styles.noteEmoji}>📝</Text>
          </View>
          <View style={styles.circleIcon}>
            <Text style={styles.circleEmoji}>⚪</Text>
          </View>
        </View>

        {/* Bottom Button */}
        <View style={styles.bottomButtonContainer}>
          <Button title="Get Started" onPress={onGetStarted} />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.card,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: spacing.xl,
  },
  content: {
    marginTop: height * 0.1,
  },
  title: {
    fontSize: typography.sizes['4xl'],
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    lineHeight: typography.lineHeights['4xl'] + 8,
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: typography.sizes.base,
    color: colors.text.secondary,
    marginBottom: spacing.xl,
  },
  illustrationContainer: {
    position: 'absolute',
    bottom: height * 0.25,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.accent.lightPurple,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationEmoji: {
    fontSize: 70,
  },
  cardIcon: {
    position: 'absolute',
    top: -10,
    right: width * 0.15,
  },
  cardEmoji: {
    fontSize: 35,
    transform: [{rotate: '15deg'}],
  },
  noteIcon: {
    position: 'absolute',
    bottom: 10,
    left: width * 0.15,
  },
  noteEmoji: {
    fontSize: 35,
    transform: [{rotate: '-10deg'}],
  },
  circleIcon: {
    position: 'absolute',
    top: 30,
    left: width * 0.2,
    opacity: 0.5,
  },
  circleEmoji: {
    fontSize: 20,
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: spacing.xl + spacing.lg,
    left: spacing.xl,
    right: spacing.xl,
  },
});
