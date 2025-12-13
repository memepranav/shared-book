import React, {useState, useRef} from 'react';
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
import {colors, typography, spacing} from '../../theme';

interface OTPVerificationScreenProps {
  phoneNumber?: string;
  onVerifyComplete?: () => void;
  onResendOTP?: () => void;
}

export const OTPVerificationScreen: React.FC<OTPVerificationScreenProps> = ({
  phoneNumber = '+91 1234567890',
  onVerifyComplete,
  onResendOTP,
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) {
      value = value.charAt(0);
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join('');
    if (otpCode.length === 6) {
      console.log('OTP:', otpCode);
      onVerifyComplete?.();
    }
  };

  const handleResend = () => {
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
    onResendOTP?.();
  };

  const isOtpComplete = otp.every(digit => digit !== '');

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
                <Text style={styles.welcomeTitle}>Verify OTP</Text>
                <Text style={styles.welcomeSubtitle}>
                  Enter the 6-digit code sent to{'\n'}
                  <Text style={styles.phoneNumber}>{phoneNumber}</Text>
                </Text>
              </View>

              {/* OTP Input */}
              <View style={styles.otpContainer}>
                <Text style={styles.otpLabel}>Enter OTP</Text>
                <View style={styles.otpInputWrapper}>
                  {otp.map((digit, index) => (
                    <TextInput
                      key={index}
                      ref={ref => (inputRefs.current[index] = ref)}
                      style={[
                        styles.otpInput,
                        digit && styles.otpInputFilled,
                      ]}
                      value={digit}
                      onChangeText={(value) => handleOtpChange(value, index)}
                      onKeyPress={(e) => handleKeyPress(e, index)}
                      keyboardType="number-pad"
                      maxLength={1}
                      selectTextOnFocus
                    />
                  ))}
                </View>
              </View>

              {/* Resend OTP */}
              <TouchableOpacity
                style={styles.resendContainer}
                onPress={handleResend}
                activeOpacity={0.7}>
                <Text style={styles.resendText}>
                  Didn't receive the code?{' '}
                  <Text style={styles.resendLink}>Resend OTP</Text>
                </Text>
              </TouchableOpacity>

              {/* Spacer */}
              <View style={styles.spacer} />

              {/* Verify Button */}
              <TouchableOpacity
                style={[
                  styles.verifyButton,
                  !isOtpComplete && styles.verifyButtonDisabled,
                ]}
                onPress={handleVerify}
                disabled={!isOtpComplete}
                activeOpacity={0.8}>
                <Text style={styles.verifyButtonText}>Verify & Continue</Text>
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
    lineHeight: 22,
  },
  phoneNumber: {
    fontFamily: typography.fonts.semibold,
    color: colors.text.primary,
  },
  otpContainer: {
    marginBottom: spacing.lg,
  },
  otpLabel: {
    fontSize: 12.8,
    fontFamily: typography.fonts.medium,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  otpInputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  otpInput: {
    flex: 1,
    height: 56,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    fontSize: 20,
    fontFamily: typography.fonts.semibold,
    color: colors.text.primary,
    textAlign: 'center',
    paddingVertical: 0,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  otpInputFilled: {
    borderColor: colors.primary.pink,
    borderWidth: 2,
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  resendText: {
    fontSize: 12.8,
    fontFamily: typography.fonts.regular,
    color: colors.text.secondary,
  },
  resendLink: {
    color: colors.primary.pink,
    fontFamily: typography.fonts.semibold,
    textDecorationLine: 'underline',
  },
  spacer: {
    minHeight: 40,
    flex: 1,
  },
  verifyButton: {
    backgroundColor: colors.primary.pink,
    borderRadius: 12,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  verifyButtonDisabled: {
    backgroundColor: colors.neutral.gray300,
    opacity: 0.6,
  },
  verifyButtonText: {
    fontSize: 16,
    fontFamily: typography.fonts.semibold,
    color: colors.neutral.white,
  },
});
