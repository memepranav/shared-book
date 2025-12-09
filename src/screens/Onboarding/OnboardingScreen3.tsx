import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  Image,
  Animated,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors, typography, spacing, borderRadius} from '../../theme';

const {width, height} = Dimensions.get('window');

interface OnboardingScreen3Props {
  isActive?: boolean;
}

export const OnboardingScreen3: React.FC<OnboardingScreen3Props> = ({
  isActive = true,
}) => {
  const insets = useSafeAreaInsets();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    if (isActive) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 30,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isActive, scaleAnim, fadeAnim, slideAnim]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.background.card}
        translucent={true}
      />

      {/* Main Content */}
      <Animated.View
        style={[
          styles.content,
          {
            marginTop: insets.top + height * 0.1,
            opacity: fadeAnim,
            transform: [{translateY: slideAnim}],
          },
        ]}>
        <Text style={styles.title}>
          One Family,{'\n'}One Account Book
        </Text>
        <Text style={styles.subtitle}>
          No more 'who paid the electricity bill?' Share expense sheets instantly with all family members.
        </Text>
      </Animated.View>

      {/* Illustration Area */}
      <View style={styles.illustrationContainer}>
        <Animated.Image
          source={require('../../assets/images/onboarding-3.png')}
          style={[
            styles.illustrationImage,
            {
              transform: [{scale: scaleAnim}],
            },
          ]}
          resizeMode="contain"
        />
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
    fontSize: typography.sizes['2xl'],
    fontFamily: typography.fonts.semibold,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
    lineHeight: typography.lineHeights['2xl'],
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
});
