import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  Image,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
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
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.background.card}
        translucent={true}
      />

      {/* Main Content */}
      <View style={[styles.content, {marginTop: insets.top + height * 0.1}]}>
        <Text style={styles.title}>
          Stop the Money{'\n'}Math Drama
        </Text>
        <Text style={styles.subtitle}>
          Track trip expenses, collect funds, and save for goals - all in one place. No more awkward conversations.
        </Text>
      </View>

      {/* Illustration Area */}
      <View style={styles.illustrationContainer}>
        <Image
          source={require('../../assets/images/onboarding-1.png')}
          style={styles.illustrationImage}
          resizeMode="contain"
        />
      </View>

      {/* Bottom Button */}
      <View style={[styles.bottomButtonContainer, {bottom: insets.bottom + spacing.xl + spacing.lg}]}>
        <Button title="Next" onPress={onNext} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.card,
    paddingHorizontal: spacing.xl,
  },
  content: {},
  title: {
    fontSize: typography.sizes['3xl'],
    fontFamily: typography.fonts.semibold,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
    lineHeight: typography.lineHeights['3xl'],
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fonts.regular,
    color: colors.text.primary,
    opacity: 0.7,
    marginBottom: spacing.xl,
  },
  illustrationContainer: {
    position: 'absolute',
    bottom: height * 0.12,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.6,
  },
  illustrationImage: {
    width: width,
    height: '100%',
  },
  bottomButtonContainer: {
    position: 'absolute',
    left: spacing.xl,
    right: spacing.xl,
  },
});
