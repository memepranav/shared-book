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

interface OnboardingScreen1Props {
  onNext: () => void;
  onSkip: () => void;
}

export const OnboardingScreen1: React.FC<OnboardingScreen1Props> = ({
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
            Unlock's{'\n'}Financial Free{'\n'}Manage
          </Text>
          <Text style={styles.subtitle}>
            Your financial future is protected.
          </Text>
        </View>

        {/* Illustration Area */}
        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationCircle}>
            <Text style={styles.illustrationEmoji}>💪</Text>
          </View>
          <View style={styles.moneyIcon}>
            <Text style={styles.moneyEmoji}>💵</Text>
          </View>
          <View style={styles.dollarIcon}>
            <Text style={styles.dollarEmoji}>$</Text>
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
  illustrationCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.accent.lightPink,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationEmoji: {
    fontSize: 70,
  },
  moneyIcon: {
    position: 'absolute',
    top: -10,
    left: width * 0.25,
  },
  moneyEmoji: {
    fontSize: 40,
    transform: [{rotate: '-15deg'}],
  },
  dollarIcon: {
    position: 'absolute',
    bottom: 20,
    right: width * 0.2,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.accent.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dollarEmoji: {
    fontSize: 20,
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: spacing.xl + spacing.lg,
    left: spacing.xl,
    right: spacing.xl,
  },
});
