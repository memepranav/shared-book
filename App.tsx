/**
 * SharedBook - Financial Management App
 *
 * @format
 */

import React, {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {OnboardingContainer} from './src/screens/Onboarding';
import {HomeScreen} from './src/screens/Home/HomeScreen';

function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  return (
    <SafeAreaProvider>
      {showOnboarding ? (
        <OnboardingContainer onComplete={handleOnboardingComplete} />
      ) : (
        <HomeScreen />
      )}
    </SafeAreaProvider>
  );
}

export default App;
