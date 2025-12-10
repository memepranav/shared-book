import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, StatusBar, Animated} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {BottomNavigation} from '../../components/BottomNavigation';
import {BooksScreen, BookDetailsScreen} from '../Books';
import {colors} from '../../theme';

export const HomeScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState('books');
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<'books' | 'bookDetails'>('books');
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const isFirstMount = useRef(true);

  useEffect(() => {
    // Skip animation on initial mount
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    // Animate on screen changes
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [currentScreen]);

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
    setCurrentScreen('books'); // Reset to books list when changing tabs
    // Handle navigation based on tabId
    console.log('Tab pressed:', tabId);
  };

  const handleScrollDirectionChange = (isScrollingDown: boolean) => {
    setIsNavVisible(!isScrollingDown);
  };

  const handleBookPress = (bookId: string) => {
    console.log('Book pressed:', bookId);
    setCurrentScreen('bookDetails');
    setIsNavVisible(false); // Hide navigation on details screen
  };

  const handleBackFromDetails = () => {
    setCurrentScreen('books');
    setIsNavVisible(true); // Show navigation when back to list
  };

  const renderContent = () => {
    if (currentScreen === 'bookDetails') {
      return <BookDetailsScreen onBack={handleBackFromDetails} />;
    }

    switch (activeTab) {
      case 'books':
        return <BooksScreen onScrollDirectionChange={handleScrollDirectionChange} onBookPress={handleBookPress} />;
      case 'notifications':
        return null; // Placeholder for notifications screen
      case 'add':
        return null; // Placeholder for add screen
      case 'balance':
        return null; // Placeholder for balance screen
      case 'profile':
        return null; // Placeholder for profile screen
      default:
        return <BooksScreen onScrollDirectionChange={handleScrollDirectionChange} onBookPress={handleBookPress} />;
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
          <Animated.View style={[styles.contentArea, {opacity: fadeAnim}]}>
            {renderContent()}
          </Animated.View>

          {/* Bottom Navigation */}
          <BottomNavigation
            activeTab={activeTab}
            onTabPress={handleTabPress}
            isVisible={isNavVisible}
          />
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
  contentArea: {
    flex: 1,
  },
});
