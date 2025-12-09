import React, {useState} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {BottomNavigation} from '../../components/BottomNavigation';
import {BooksScreen} from '../Books';
import {colors} from '../../theme';

export const HomeScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState('books');

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
    // Handle navigation based on tabId
    console.log('Tab pressed:', tabId);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'books':
        return <BooksScreen />;
      case 'notifications':
        return null; // Placeholder for notifications screen
      case 'add':
        return null; // Placeholder for add screen
      case 'balance':
        return null; // Placeholder for balance screen
      case 'profile':
        return null; // Placeholder for profile screen
      default:
        return <BooksScreen />;
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#fdd4d2', '#fef9f9', '#e8e8e8']}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}
        style={styles.gradient}>
        <SafeAreaView style={styles.safeArea} edges={['top']}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />

          {/* Content Area */}
          {renderContent()}

          {/* Bottom Navigation */}
          <BottomNavigation activeTab={activeTab} onTabPress={handleTabPress} />
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
});
