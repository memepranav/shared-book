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
import {colors, typography, spacing} from '../../theme';

interface UserDetailsScreenProps {
  onContinue?: (userDetails: {firstName: string; lastName: string; email?: string}) => void;
}

export const UserDetailsScreen: React.FC<UserDetailsScreenProps> = ({
  onContinue,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleContinue = () => {
    if (!firstName.trim() || !lastName.trim()) {
      return;
    }

    const userDetails = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim() || undefined,
    };

    console.log('User Details:', userDetails);
    onContinue?.(userDetails);
  };

  const isFormValid = firstName.trim() && lastName.trim();

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
              <Text style={styles.welcomeTitle}>Your Details</Text>
              <Text style={styles.welcomeSubtitle}>
                Please provide your information to continue
              </Text>
            </View>

            {/* Name Inputs */}
            <View style={styles.nameRow}>
              <View style={styles.nameInputContainer}>
                <Text style={styles.inputLabel}>First Name</Text>
                <TextInput
                  style={styles.input}
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder="First name"
                  placeholderTextColor={colors.text.secondary}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>

              <View style={styles.nameInputContainer}>
                <Text style={styles.inputLabel}>Last Name</Text>
                <TextInput
                  style={styles.input}
                  value={lastName}
                  onChangeText={setLastName}
                  placeholder="Last name"
                  placeholderTextColor={colors.text.secondary}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                Email Address <Text style={styles.optionalText}>(Optional)</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email address"
                placeholderTextColor={colors.text.secondary}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Spacer */}
            <View style={styles.spacer} />

            {/* Continue Button */}
            <TouchableOpacity
              style={[
                styles.continueButton,
                !isFormValid && styles.continueButtonDisabled,
              ]}
              onPress={handleContinue}
              disabled={!isFormValid}
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
  nameRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  nameInputContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: spacing.lg,
  },
  inputLabel: {
    fontSize: 12.8,
    fontFamily: typography.fonts.medium,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  optionalText: {
    fontSize: 11.2,
    fontFamily: typography.fonts.regular,
    color: colors.text.secondary,
    fontStyle: 'italic',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingTop: 0,
    paddingBottom: 0,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    fontSize: 14.4,
    fontFamily: typography.fonts.regular,
    color: colors.text.primary,
    height: 48,
    includeFontPadding: false,
    textAlignVertical: 'center',
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
