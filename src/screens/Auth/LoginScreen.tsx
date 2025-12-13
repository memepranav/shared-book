import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {Path} from 'react-native-svg';
import {colors, typography, spacing} from '../../theme';

const ChevronDownIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 9L12 15L18 9"
      stroke={colors.text.secondary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

interface LoginScreenProps {
  onLoginComplete?: (phoneNumber: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({onLoginComplete}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleContinue = () => {
    if (!phoneNumber.trim()) {
      return;
    }
    const fullPhoneNumber = `${countryCode} ${phoneNumber}`;
    // TODO: Implement phone number verification
    console.log('Phone number:', fullPhoneNumber);
    onLoginComplete?.(fullPhoneNumber);
  };

  return (
    <LinearGradient
      colors={[
        colors.gradients.home.start,
        colors.gradients.home.middle,
        colors.gradients.home.end,
      ]}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}
      style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              bounces={false}>
              {/* Welcome Section */}
              <View style={styles.welcomeSection}>
                <Text style={styles.welcomeTitle}>Welcome!</Text>
                <Text style={styles.welcomeSubtitle}>Please enter your phone number</Text>
              </View>

              {/* Phone Input */}
              <View style={styles.phoneInputContainer}>
                <Text style={styles.phoneLabel}>Phone</Text>
                <View style={styles.phoneInputWrapper}>
                  {/* Country Code Selector */}
                  <TouchableOpacity style={styles.countryCodeButton}>
                    <Text style={styles.flagEmoji}>🇮🇳</Text>
                    <Text style={styles.countryCodeText}>{countryCode}</Text>
                    <ChevronDownIcon />
                  </TouchableOpacity>

                  {/* Phone Number Input */}
                  <TextInput
                    style={styles.phoneInput}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    placeholder="123456789"
                    placeholderTextColor={colors.text.secondary}
                    keyboardType="phone-pad"
                    maxLength={10}
                  />
                </View>
              </View>

              {/* Terms and Conditions */}
              <TouchableOpacity
                style={styles.termsContainer}
                onPress={() => setAgreedToTerms(!agreedToTerms)}
                activeOpacity={0.7}>
                <View style={styles.checkbox}>
                  {agreedToTerms && <View style={styles.checkboxChecked} />}
                </View>
                <Text style={styles.termsText}>
                  I agree to the{' '}
                  <Text style={styles.termsLink}>Terms and Conditions</Text>
                </Text>
              </TouchableOpacity>

              {/* Spacer */}
              <View style={styles.spacer} />

              {/* Continue Button */}
              <TouchableOpacity
                style={[
                  styles.continueButton,
                  (!phoneNumber.trim() || !agreedToTerms) && styles.continueButtonDisabled,
                ]}
                onPress={handleContinue}
                disabled={!phoneNumber.trim() || !agreedToTerms}
                activeOpacity={0.8}>
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
  },
  welcomeSection: {
    marginTop: spacing.xl * 2,
    marginBottom: spacing.xl * 2,
  },
  welcomeTitle: {
    fontSize: 32,
    fontFamily: typography.fonts.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  welcomeSubtitle: {
    fontSize: 14.4,
    fontFamily: typography.fonts.regular,
    color: colors.text.secondary,
  },
  phoneInputContainer: {
    marginBottom: spacing.lg,
  },
  phoneLabel: {
    fontSize: 12.8,
    fontFamily: typography.fonts.medium,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  countryCodeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingRight: spacing.md,
    borderRightWidth: 1,
    borderRightColor: colors.neutral.gray200,
  },
  flagEmoji: {
    fontSize: 20,
    lineHeight: 20,
  },
  countryCodeText: {
    fontSize: 14.4,
    fontFamily: typography.fonts.medium,
    color: colors.text.primary,
    lineHeight: 20,
  },
  phoneInput: {
    flex: 1,
    fontSize: 14.4,
    fontFamily: typography.fonts.regular,
    color: colors.text.primary,
    paddingLeft: spacing.md,
    paddingTop: 0,
    paddingBottom: 0,
    height: 40,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.text.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  checkboxChecked: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: colors.primary.pink,
  },
  termsText: {
    flex: 1,
    fontSize: 12,
    fontFamily: typography.fonts.regular,
    color: colors.text.secondary,
    lineHeight: 18,
  },
  termsLink: {
    color: colors.primary.pink,
    fontFamily: typography.fonts.semibold,
    textDecorationLine: 'underline',
  },
  spacer: {
    minHeight: 40,
    flex: 1,
  },
  continueButton: {
    backgroundColor: colors.primary.pink,
    borderRadius: 12,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  continueButtonDisabled: {
    backgroundColor: colors.neutral.gray300,
    opacity: 0.6,
  },
  continueButtonText: {
    fontSize: 16,
    fontFamily: typography.fonts.semibold,
    color: colors.neutral.white,
  },
});
