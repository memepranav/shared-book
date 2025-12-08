/**
 * SharedBook - Financial Management App
 *
 * @format
 */

import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {OnboardingContainer} from './src/screens/Onboarding';

function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  return (
    <SafeAreaProvider>
      {showOnboarding ? (
        <OnboardingContainer onComplete={handleOnboardingComplete} />
      ) : (
        <View style={styles.container}>
          <Text style={styles.text}>Main App Screen</Text>
          <Text style={styles.subtext}>
            Onboarding completed! Home screen will go here.
          </Text>
        </View>
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8EAF0',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2D3142',
    marginBottom: 8,
  },
  subtext: {
    fontSize: 16,
    color: '#8F92A1',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

export default App;
