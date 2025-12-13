/**
 * SharedBook - Financial Management App
 *
 * @format
 */

import React, {useState} from 'react';
import {LogBox} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {OnboardingContainer} from './src/screens/Onboarding';
import {HomeScreen} from './src/screens/Home/HomeScreen';
import {LoginScreen, OTPVerificationScreen, UserDetailsScreen} from './src/screens/Auth';

// Suppress InteractionManager deprecation warning from third-party libraries
LogBox.ignoreLogs([
  'InteractionManager has been deprecated',
]);

function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const handleLoginComplete = (phone: string) => {
    setPhoneNumber(phone);
    setShowOTPVerification(true);
  };

  const handleOTPVerifyComplete = () => {
    setIsVerified(true);
    setShowUserDetails(true);
  };

  const handleUserDetailsComplete = (userDetails: {firstName: string; lastName: string; email?: string}) => {
    console.log('User details:', userDetails);
    setShowOnboarding(true);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {!showOTPVerification ? (
          <LoginScreen onLoginComplete={handleLoginComplete} />
        ) : !isVerified ? (
          <OTPVerificationScreen
            phoneNumber={phoneNumber}
            onVerifyComplete={handleOTPVerifyComplete}
          />
        ) : !showOnboarding ? (
          <UserDetailsScreen onContinue={handleUserDetailsComplete} />
        ) : showOnboarding ? (
          <OnboardingContainer onComplete={handleOnboardingComplete} />
        ) : (
          <HomeScreen />
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
