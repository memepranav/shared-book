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

// Suppress InteractionManager deprecation warning from third-party libraries
LogBox.ignoreLogs([
  'InteractionManager has been deprecated',
]);

function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {showOnboarding ? (
          <OnboardingContainer onComplete={handleOnboardingComplete} />
        ) : (
          <HomeScreen />
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
