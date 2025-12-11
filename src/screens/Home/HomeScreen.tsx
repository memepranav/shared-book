import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, StatusBar, Animated} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {BottomNavigation} from '../../components/BottomNavigation';
import {BooksScreen, BookDetailsScreen, PendingRecordsScreen, RecordDetailsScreen, GroupDetailsScreen} from '../Books';
import {colors} from '../../theme';

export const HomeScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState('books');
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<'books' | 'bookDetails' | 'groupDetails' | 'pendingRecords' | 'recordDetails'>('books');
  const [previousScreen, setPreviousScreen] = useState<'bookDetails' | 'pendingRecords'>('bookDetails');
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

  const handlePendingRecordsPress = () => {
    setCurrentScreen('pendingRecords');
    setIsNavVisible(false); // Hide navigation on pending records screen
  };

  const handleBackFromPendingRecords = () => {
    setCurrentScreen('bookDetails');
    setIsNavVisible(false); // Keep navigation hidden on details screen
  };

  const handleRecordPress = () => {
    setPreviousScreen('pendingRecords');
    setCurrentScreen('recordDetails');
    setIsNavVisible(false); // Hide navigation on record details screen
  };

  const handleBackFromRecordDetails = () => {
    setCurrentScreen(previousScreen);
    setIsNavVisible(false); // Keep navigation hidden
  };

  const handleRecordDetailsFromBookDetails = () => {
    setPreviousScreen('bookDetails');
    setCurrentScreen('recordDetails');
    setIsNavVisible(false); // Hide navigation on record details screen
  };

  const handleGroupDetailsPress = () => {
    setPreviousScreen('bookDetails');
    setCurrentScreen('groupDetails');
    setIsNavVisible(false); // Hide navigation on group details screen
  };

  const handleGroupDetailsPressFromBooks = () => {
    setCurrentScreen('groupDetails');
    setIsNavVisible(false); // Hide navigation on group details screen
  };

  const handleBackFromGroupDetails = () => {
    // Check if we came from books list or book details
    if (previousScreen === 'bookDetails') {
      setCurrentScreen('bookDetails');
      setIsNavVisible(false); // Keep navigation hidden on details screen
    } else {
      setCurrentScreen('books');
      setIsNavVisible(true); // Show navigation when back to list
    }
  };

  const renderContent = () => {
    if (currentScreen === 'recordDetails') {
      return <RecordDetailsScreen onBack={handleBackFromRecordDetails} />;
    }

    if (currentScreen === 'pendingRecords') {
      return <PendingRecordsScreen onBack={handleBackFromPendingRecords} onRecordPress={handleRecordPress} />;
    }

    if (currentScreen === 'groupDetails') {
      return <GroupDetailsScreen onBack={handleBackFromGroupDetails} />;
    }

    if (currentScreen === 'bookDetails') {
      return <BookDetailsScreen onBack={handleBackFromDetails} onPendingRecordsPress={handlePendingRecordsPress} onRecordDetailsPress={handleRecordDetailsFromBookDetails} onGroupDetailsPress={handleGroupDetailsPress} />;
    }

    switch (activeTab) {
      case 'books':
        return <BooksScreen onScrollDirectionChange={handleScrollDirectionChange} onBookPress={handleBookPress} onGroupDetailsPress={handleGroupDetailsPressFromBooks} />;
      case 'notifications':
        return null; // Placeholder for notifications screen
      case 'friends':
        return null; // Placeholder for friends screen
      case 'balance':
        return null; // Placeholder for balance screen
      case 'profile':
        return null; // Placeholder for profile screen
      default:
        return <BooksScreen onScrollDirectionChange={handleScrollDirectionChange} onBookPress={handleBookPress} onGroupDetailsPress={handleGroupDetailsPressFromBooks} />;
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.gradients.home.start, colors.gradients.home.middle, colors.gradients.home.end]}
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
