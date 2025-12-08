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

interface OnboardingScreen2Props {
  onNext: () => void;
  onSkip: () => void;
}

export const OnboardingScreen2: React.FC<OnboardingScreen2Props> = ({
  onNext,
  onSkip,
}) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        {/* Main Content */}
        <View style={styles.content}>
          <Text style={styles.title}>
            Budget is{'\n'}Smarter, Not{'\n'}Harder
          </Text>
          <Text style={styles.subtitle}>
            Instantly categorize your spending,{'\n'}set personalized budgets
          </Text>
        </View>

        {/* Illustration Area */}
        <View style={styles.illustrationContainer}>
          <View style={styles.characterCircle}>
            <Text style={styles.illustrationEmoji}>📊</Text>
          </View>
          <View style={styles.chartIcon}>
            <Text style={styles.chartEmoji}>📈</Text>
          </View>
          <View style={styles.starIcon1}>
            <Text style={styles.starEmoji}>⭐</Text>
          </View>
          <View style={styles.starIcon2}>
            <Text style={styles.starEmoji}>✨</Text>
          </View>
        </View>

        {/* Bottom Button */}
        <View style={styles.bottomButtonContainer}>
          <Button title="Next" onPress={onNext} />
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
  characterCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.accent.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationEmoji: {
    fontSize: 70,
  },
  chartIcon: {
    position: 'absolute',
    top: 20,
    left: width * 0.2,
  },
  chartEmoji: {
    fontSize: 40,
  },
  starIcon1: {
    position: 'absolute',
    top: 10,
    right: width * 0.25,
  },
  starEmoji: {
    fontSize: 30,
  },
  starIcon2: {
    position: 'absolute',
    bottom: 10,
    right: width * 0.15,
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: spacing.xl + spacing.lg,
    left: spacing.xl,
    right: spacing.xl,
  },
});
